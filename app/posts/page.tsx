"use client";
import { useAllpostsQuery, useAddCommentMutation, useUpdateCommentMutation, useDeleteCommentMutation, useUserDataQuery, useUpdatePostMutation, useDeletePostMutation } from "../_slice/apiSlice";
import { FaChevronDown, FaChevronUp, FaTrash, FaEdit } from 'react-icons/fa';
import { useState, FormEvent, ChangeEvent } from 'react';
import Sidebar from "../_Component/_sidebar/Sidebar";
import AddPost from "../_Component/_addPost/addpost";
import LoadingScreen from "../_Component/_addPost/_loadingScreen/LoadingScreen";
import { Post } from "../_interfaces/_interfaces"; 
import { toast } from 'react-toastify';

export default function Page() {
  const { data, error, isLoading } = useAllpostsQuery();
  const [addComment] = useAddCommentMutation();
  const [updateComment] = useUpdateCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();
  const { data: userData } = useUserDataQuery(); 
  const [updatePost] = useUpdatePostMutation();
  const [deletePost] = useDeletePostMutation();

  const posts: Post[] = data?.posts || [];
  const currentUserId = userData?.user._id;

  const sortedPosts = [...posts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  const latestPosts = sortedPosts.slice(0, 40);

  const [editingPost, setEditingPost] = useState<string | null>(null);
  const [updatedContent, setUpdatedContent] = useState<string>('');
  const [openMenuPostId, setOpenMenuPostId] = useState<string | null>(null);
  const [visibleComments, setVisibleComments] = useState<Record<string, boolean>>({});
  const [newComment, setNewComment] = useState<Record<string, string>>({});
  const [editingComment, setEditingComment] = useState<Record<string, boolean>>({});
  const [editContent, setEditContent] = useState<Record<string, string>>({});

  const toggleComments = (postId: string) => {
    setVisibleComments(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handleCommentChange = (postId: string, event: ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(prev => ({
      ...prev,
      [postId]: event.target.value
    }));
  };

  const handleEditChange = (commentId: string, event: ChangeEvent<HTMLTextAreaElement>) => {
    setEditContent(prev => ({
      ...prev,
      [commentId]: event.target.value
    }));
  };

  const handleCommentSubmit = async (postId: string, event: FormEvent) => {
    event.preventDefault();
    try {
      await addComment({ postId, content: newComment[postId] }).unwrap();
      setNewComment(prev => ({
        ...prev,
        [postId]: ""
      }));
    } catch (error) {
      console.error('Failed to add comment: ', error);
    }
  };

  const handleCommentEdit = async (commentId: string, postId: string) => {
    try {
      await updateComment({ commentId, content: editContent[commentId] }).unwrap();
      setEditingComment(prev => ({
        ...prev,
        [commentId]: false
      }));
      setEditContent(prev => ({
        ...prev,
        [commentId]: ""
      }));
    } catch (error) {
      console.error('Failed to update comment: ', error);
    }
  };

  const handleCommentDelete = async (commentId: string) => {
    try {
      await deleteComment(commentId).unwrap();
    } catch (error) {
      console.error('Failed to delete comment: ', error);
    }
  };

  const handleUpdate = (post: Post) => {
    setEditingPost(post._id);
    setUpdatedContent(post.body);
    setOpenMenuPostId(null);
  };

  const handleSaveUpdate = async () => {
    if (editingPost) {
      try {
        await updatePost({ postId: editingPost, body: updatedContent }).unwrap();
        toast.success('Post updated successfully!');
      } catch (error) {
        toast.error('Failed to update post.');
        console.error('Failed to update post: ', error);
      }
      setEditingPost(null);
      setUpdatedContent('');
    }
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

  if (isLoading) return <LoadingScreen />;
  if (error) return <p>Error loading posts</p>;

  return (
    <div className="flex flex-col md:flex-row">
      <div className="hidden md:block md:w-1/5 lg:w-1/6">
        <Sidebar />
      </div>

      <div className="flex-1 p-6 lg:me-24 space-y-6">
        <AddPost />
        {latestPosts.length === 0 ? (
          <p>No posts available.</p>
        ) : (
          latestPosts.map((post) => (
            <div
              key={post._id}
              className="relative bg-white p-6 rounded-lg shadow-lg border border-gray-200 mx-auto w-full max-w-3xl"
            >
              {/* Menu Button */}
              {post.user?._id === currentUserId && (
                <div className="absolute top-2 right-2">
                  <button
                    className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    onClick={() => setOpenMenuPostId(openMenuPostId === post._id ? null : post._id)}
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
              )}

              <div className="flex items-start space-x-4 mb-4">
                <img
                  src={post.user?.photo || "/path/to/default-profile.jpg"}
                  alt="User"
                  className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{post.user?.name || "User Name"}</h3>
                  <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              {editingPost === post._id ? (
                <div>
                  <textarea
                    value={updatedContent}
                    onChange={(e) => setUpdatedContent(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                  <div className="flex justify-end space-x-2 mt-2">
                    <button
                      onClick={handleSaveUpdate}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setEditingPost(null);
                        setUpdatedContent('');
                      }}
                      className="bg-gray-300 px-4 py-2 rounded-lg"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-800 text-base leading-relaxed mb-4">{post.body}</p>
              )}

              {post.image && (
                <img
                  src={post.image}
                  alt="Post Image"
                  className="w-full h-[400px] rounded-lg mb-4 object-cover"
                />
              )}

              <div>
                <button
                  onClick={() => toggleComments(post._id)}
                  className="flex items-center space-x-2 text-blue-500 hover:text-blue-700 mb-2"
                >
                  {visibleComments[post._id] ? <FaChevronUp /> : <FaChevronDown />}
                  <span>{visibleComments[post._id] ? 'Hide Comments' : 'Show Comments'}</span>
                </button>

                {visibleComments[post._id] && (
                  <div className="space-y-2">
                    {post.comments.length > 0 ? (
                      post.comments.map((comment) => (
                        <div key={comment._id} className="flex items-start space-x-3 border-t pt-2">
                          <img
                            src={userData?.user.photo || "/path/to/default-profile.jpg"}
                            alt="Commenter"
                            className="w-8 h-8 rounded-full object-cover border-2 border-blue-500"
                          />
                          <div>
                            <h5 className="text-sm font-semibold text-gray-900">{comment.commentCreator?.name || "Commenter Name"}</h5>
                            {editingComment[comment._id] ? (
                              <div className="space-y-2">
                                <textarea
                                  value={editContent[comment._id] || comment.content}
                                  onChange={(e) => handleEditChange(comment._id, e)}
                                  rows={3}
                                  className="w-full p-2 border border-gray-300 rounded-md"
                                />
                                <button
                                  onClick={() => handleCommentEdit(comment._id, post._id)}
                                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={() => setEditingComment(prev => ({ ...prev, [comment._id]: false }))}
                                  className="mt-2 px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <p className="text-sm text-gray-700">{comment.content}</p>
                            )}
                            <div className="flex space-x-2 mt-2">
                              <button
                                onClick={() => setEditingComment(prev => ({ ...prev, [comment._id]: !prev[comment._id] }))}
                                className="text-blue-500 hover:text-blue-700 flex items-center"
                              >
                                <FaEdit className="mr-1" />
                                Edit
                              </button>
                              <button
                                onClick={() => handleCommentDelete(comment._id)}
                                className="text-red-500 hover:text-red-700 flex items-center"
                              >
                                <FaTrash className="mr-1" />
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-600">No comments yet.</p>
                    )}
                  </div>
                )}

                <form onSubmit={(e) => handleCommentSubmit(post._id, e)} className="mt-4">
                  <textarea
                    value={newComment[post._id] || ""}
                    onChange={(e) => handleCommentChange(post._id, e)}
                    rows={3}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Add a comment..."
                    required
                  />
                  <button
                    type="submit"
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Post Comment
                  </button>
                </form>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
