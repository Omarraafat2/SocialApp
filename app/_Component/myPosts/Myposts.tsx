import React, { useState } from 'react';
import {
  useUserpostsQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
  useAddCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
  useUserDataQuery
} from '@/app/_slice/apiSlice';
import { FaChevronDown, FaChevronUp, FaTrash, FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { Post, Comment } from '@/app/_interfaces/_interfaces'; // Import interfaces

export default function Myposts() {
  // Fetch user data
  const { data: userData, error: userError, isLoading: userLoading } = useUserDataQuery();
  
  // Use userData to get the dynamic user ID for fetching posts
  const userId = userData?.user._id;

  // Fetch posts with the dynamic user ID
  const { data, error, isLoading } = useUserpostsQuery({ id: userId }, { skip: !userId });

  const [updatePost] = useUpdatePostMutation();
  const [deletePost] = useDeletePostMutation();
  const [addComment] = useAddCommentMutation();
  const [updateComment] = useUpdateCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();

  const [editingPost, setEditingPost] = useState<string | null>(null);
  const [updatedContent, setUpdatedContent] = useState<string>('');
  const [openMenuPostId, setOpenMenuPostId] = useState<string | null>(null);
  const [visibleComments, setVisibleComments] = useState<Record<string, boolean>>({});
  const [newComment, setNewComment] = useState<Record<string, string>>({});
  const [editingComment, setEditingComment] = useState<Record<string, boolean>>({});
  const [editContent, setEditContent] = useState<Record<string, string>>({});

  // Use the Post interface for type checking
  const posts: Post[] = data?.posts || [];
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  const latestPosts = sortedPosts.slice(0, 40);

  if (userLoading || isLoading) return <p>Loading...</p>;
  if (userError || error) return <p>Error loading posts</p>;

  const handleUpdate = (post: Post) => {
    setEditingPost(post._id);
    setUpdatedContent(post.body);
    setOpenMenuPostId(null);
  };

  const handleDelete = async (postId: string) => {
    try {
      await deletePost(postId).unwrap();
      toast.success('Post deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete post.');
      console.error('Failed to delete post: ', error);
    }
    setOpenMenuPostId(null);
  };

  const handleSaveUpdate = async () => {
    try {
      await updatePost({ postId: editingPost, body: updatedContent }).unwrap();
      toast.success('Post updated successfully!');
    } catch (error) {
      toast.error('Failed to update post.');
      console.error('Failed to update post: ', error);
    }
    setEditingPost(null);
    setUpdatedContent('');
  };

  const toggleMenu = (postId: string) => {
    setOpenMenuPostId((prev) => (prev === postId ? null : postId));
  };

  const toggleComments = (postId: string) => {
    setVisibleComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const handleCommentChange = (postId: string, event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment((prev) => ({
      ...prev,
      [postId]: event.target.value,
    }));
  };

  const handleEditChange = (commentId: string, event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditContent((prev) => ({
      ...prev,
      [commentId]: event.target.value,
    }));
  };

  const handleCommentSubmit = async (postId: string, event: React.FormEvent) => {
    event.preventDefault();
    try {
      await addComment({ postId, content: newComment[postId] }).unwrap();
      toast.success('Comment posted successfully!');
      setNewComment((prev) => ({
        ...prev,
        [postId]: '',
      }));
    } catch (error) {
      toast.error('Failed to add comment.');
      console.error('Failed to add comment: ', error);
    }
  };

  const handleCommentEdit = async (commentId: string, postId: string) => {
    try {
      await updateComment({ commentId, content: editContent[commentId] }).unwrap();
      toast.success('Comment updated successfully!');
      setEditingComment((prev) => ({
        ...prev,
        [commentId]: false,
      }));
      setEditContent((prev) => ({
        ...prev,
        [commentId]: '',
      }));
    } catch (error) {
      toast.error('Failed to update comment.');
      console.error('Failed to update comment: ', error);
    }
  };

  const handleCommentDelete = async (commentId: string) => {
    try {
      await deleteComment(commentId).unwrap();
      toast.success('Comment deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete comment.');
      console.error('Failed to delete comment: ', error);
    }
  };
  console.log(latestPosts);
  

  return (
    <div className="space-y-6 p-6">
      {latestPosts.length === 0 ? (
        <p>You have no posts yet.</p>
      ) : (
        latestPosts.map((post) => (
          <div
            key={post._id}
            className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 mx-auto w-full max-w-3xl"
          >
            {/* Post Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                <img
                  src={post.user.photo || '/path/to/default-profile.jpg'}
                  alt="User"
                  className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{post.user.name}</h3>
                  <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              {/* 3-Dot Menu */}
              <div className="relative">
                <button
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                  onClick={() => toggleMenu(post._id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v.01M12 12v.01M12 18v.01"
                    />
                  </svg>
                </button>
                {openMenuPostId === post._id && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                    <button
                      onClick={() => handleUpdate(post)}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Update Post
                    </button>
                    <button
                      onClick={() => handleDelete(post._id)}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100"
                    >
                      Delete Post
                    </button>
                  </div>
                )}
              </div>
            </div>
    
            {/* Post Description or Edit Form */}
            {editingPost === post._id ? (
              <div>
                <textarea
                  value={updatedContent}
                  onChange={(e) => setUpdatedContent(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                />
                <button
                  onClick={handleSaveUpdate}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingPost(null)}
                  className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 ml-2"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <p className="text-gray-800 text-base leading-relaxed mb-4">{post.body}</p>
            )}
    
            {/* Post Image */}
            {post?.image && (
              <img
                src={post?.image}
                alt="Post Image"
                className="w-full h-auto rounded-md shadow-sm"
              />
            )}
    
            {/* Comments Section */}
            <div className="border-t border-gray-200 mt-4 pt-4">
              {/* Toggle Comments */}
              <button
                onClick={() => toggleComments(post._id)}
                className="flex items-center text-blue-600 hover:underline"
              >
                {visibleComments[post._id] ? (
                  <>
                    <FaChevronUp className="mr-2" /> Hide Comments
                  </>
                ) : (
                  <>
                    <FaChevronDown className="mr-2" /> Show Comments
                  </>
                )}
              </button>
    
              {/* Comments List */}
              {visibleComments[post._id] && post.comments.length > 0 && (
                <div className="mt-4 space-y-4">
                  {post.comments.map((comment: Comment) => (
                    <div key={comment._id} className="bg-gray-100 p-4 rounded-md shadow-sm">
                      <div className="flex items-start space-x-4">
                      <img
                            src={userData?.user.photo || "/path/to/default-profile.jpg"}
                            alt="Commenter"
                            className="w-8 h-8 rounded-full object-cover border-2 border-blue-500"
                          />
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <p className="text-sm font-semibold text-gray-900">{comment?.commentCreator?.name}</p>
                            {editingComment[comment._id] ? (
                              <div className="space-x-2">
                                <button
                                  onClick={() => handleCommentEdit(comment._id, post._id)}
                                  className="text-blue-500 hover:underline"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={() =>
                                    setEditingComment((prev) => ({
                                      ...prev,
                                      [comment._id]: false,
                                    }))
                                  }
                                  className="text-gray-500 hover:underline"
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <div className="flex space-x-2">
                                <button
                                  onClick={() =>
                                    setEditingComment((prev) => ({
                                      ...prev,
                                      [comment._id]: true,
                                    }))
                                  }
                                  className="text-blue-500 hover:underline"
                                >
                                  <FaEdit />
                                </button>
                                <button
                                  onClick={() => handleCommentDelete(comment._id)}
                                  className="text-red-500 hover:underline"
                                >
                                  <FaTrash />
                                </button>
                              </div>
                            )}
                          </div>
                          {editingComment[comment._id] ? (
                            <textarea
                              value={editContent[comment._id] || comment.content}
                              onChange={(e) => handleEditChange(comment._id, e)}
                              className="w-full mt-2 p-2 border border-gray-300 rounded"
                            />
                          ) : (
                            <p className="mt-2 text-gray-800">{comment.content}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
    
              {/* New Comment Form */}
              <form
                onSubmit={(e) => handleCommentSubmit(post._id, e)}
                className="mt-6"
              >
                <textarea
                  value={newComment[post._id] || ''}
                  onChange={(e) => handleCommentChange(post._id, e)}
                  placeholder="Add a comment..."
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <button
                  type="submit"
                  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Add Comment
                </button>
              </form>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
