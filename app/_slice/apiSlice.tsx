import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import {UserPostsQueryArgs} from '../_interfaces/_interfaces';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://linked-posts.routemisr.com/',
    prepareHeaders: (headers) => {
      const token = Cookies.get('token');
      if (token) {
        headers.set('token', `${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Posts', 'Comments','UserData'], // Define tags for cache management
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (userdata) => ({
        url: 'users/signup',
        method: 'POST',
        body: userdata,
      }),
    }),
    signin: builder.mutation({
      query: (userdata) => ({
        url: 'users/signin',
        method: 'POST',
        body: userdata,
      }),
    }),
    changepassword: builder.mutation({
      query: (userdata) => ({
        url: 'users/change-password',
        method: 'PATCH',
        body: userdata,
      }),
    }),
    userData: builder.query<any, void>({
      query: () => ({
        url: 'users/profile-data',
        method: 'GET',
      }),
      providesTags: ['UserData'], // Tag for cache management
    }),
    uploadProfilePhoto: builder.mutation({
      query: (photoData) => {
        const formData = new FormData();
        formData.append('photo', photoData);

        return {
          url: 'users/upload-photo',
          method: 'PATCH',
          body: formData,
        };
      },
      invalidatesTags: ['UserData'], // Invalidate cache when profile photo is updated
    }),
    allposts: builder.query<any, void>({
      query: () => ({
        url: 'posts?page=18&limit=50',
        method: 'GET',
      }),
      providesTags: ['Posts'], // Providing tag for posts
    }),
    userposts: builder.query<any, UserPostsQueryArgs>({
      query: ({ id, limit = 6 }) => ({
        url: `users/${id}/posts`,
        method: 'GET',
        params: { limit },
      }),
      providesTags: ['Posts'], // Providing tag for user posts
    }),
    createpost: builder.mutation({
      query: (userdata) => {
        const formData = new FormData();
        formData.append('body', userdata.body);
        if (userdata.image) {
          formData.append('image', userdata.image);
        }

        return {
          url: 'posts',
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: ['Posts'], // Invalidate post cache when new post is created
    }),
    updatePost: builder.mutation({
      query: ({ postId, body, image }) => {
        const formData = new FormData();
        formData.append('body', body);
        if (image) {
          formData.append('image', image);
        }

        return {
          url: `posts/${postId}`,
          method: 'PUT',
          body: formData,
        };
      },
      invalidatesTags: ['Posts'], // Invalidate post cache when post is updated
    }),
    deletePost: builder.mutation({
      query: (postId) => ({
        url: `posts/${postId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Posts'], // Invalidate post cache when post is deleted
    }),
    addComment: builder.mutation({
      query: ({ postId, content }) => ({
        url: `comments`,
        body: {
          content,
          post: postId,
        },
        method: 'POST',
      }),
      invalidatesTags: ['Posts', 'Comments'], // Invalidate cache for posts and comments when a new comment is added
    }),
    updateComment: builder.mutation({
      query: ({ commentId, content }) => ({
        url: `comments/${commentId}`,
        method: 'PUT',
        body: { content },
      }),
      invalidatesTags: ['Posts', 'Comments'], // Invalidate cache when comment is updated
    }),
    deleteComment: builder.mutation({
      query: (commentId) => ({
        url: `comments/${commentId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Posts', 'Comments'], // Invalidate cache when comment is deleted
    }),
  }),
});

export const { 
  useSignupMutation, 
  useSigninMutation, 
  useChangepasswordMutation, 
  useUserDataQuery,  
  useUploadProfilePhotoMutation,  
  useAllpostsQuery,  
  useCreatepostMutation,
  useUserpostsQuery,
  useUpdatePostMutation, 
  useDeletePostMutation, 
  useAddCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation
} = apiSlice;
