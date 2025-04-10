'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';


const PostForm = ({ post = null }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: post?.title || '',
    content: post?.content || ''
  });
  const [loading, setLoading] = useState(false);

  const { title, content } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (post) {
        await axios.put(`/api/posts/${post._id}`, formData);
        alert('Post updated successfully');
      } else {
        await axios.post('/api/posts', formData);
        alert('Post created successfully');
      }
      router.push('/dashboard');
    } catch (err) {
     alert(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="bg-white rounded-lg shadow-md p-6 w-[80%] mx-auto my-[10%]">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={onChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
          Content
        </label>
        <textarea
          id="content"
          name="content"
          value={content}
          onChange={onChange}
          required
          rows="10"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
      >
        {loading ? 'Processing...' : post ? 'Update Post' : 'Create Post'}
      </button>
    </form>
  );
};

export default PostForm;