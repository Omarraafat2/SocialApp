import { useCreatepostMutation } from '@/app/_slice/apiSlice';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

export default function AddPost() {
  const [newPost, setNewPost] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
  const [createPost, { isLoading, isError, isSuccess, error }] = useCreatepostMutation();

  const handlePostSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!newPost) {
      // Handle empty post body
      return;
    }

    try {
      await createPost({ body: newPost, image }).unwrap();
      // Clear the form
      setNewPost('');
      setImage(null);
      toast.success('Post created successfully');
    } catch (err) {
      toast.error('Failed to create post');
    }
  };

  return (
    <div className="mt-6">
      <textarea
        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        rows={3}
        placeholder="What's on your mind?"
        value={newPost}
        onChange={(e) => setNewPost(e.target.value)}
      />
      <input
        type="file"
        accept="image/*"
        className="mt-2"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const file = e.target.files ? e.target.files[0] : null;
          setImage(file);
        }}
      />
      <button
        className="mt-2 w-full text-white bg-blue-600 hover:bg-blue-700 p-2 rounded-lg"
        onClick={handlePostSubmit}
        disabled={isLoading}
      >
        {isLoading ? 'Posting...' : 'Post'}
      </button>
      {isSuccess && <p className="text-green-500 mt-2">Post created successfully!</p>}
    </div>
  );
}
