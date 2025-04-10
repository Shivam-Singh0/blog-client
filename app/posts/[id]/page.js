"use client"
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useAuth } from '@/lib/AuthContext';

export default function PostDetail() {
  const router = useRouter();
  const params = useParams()
  const id = params.id

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const {token, loading: tokenLoading} = useAuth();
 

  useEffect(() => {
    const fetchPost = async () => {
     const {data} = await axios.get(`/api/posts/${id}`)
      setPost(data);
      setLoading(false);
    };

    if (id) {
      fetchPost();
    }
  }, [id, router]);

 

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await axios.delete(`/api/posts/${id}`);
       
        router.push('/');
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to delete post');
      }
    }
  };

  if (loading || tokenLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!post) {
    return <div className="text-center py-12">Post not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-10">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center justify-between mb-6">
          <span className="text-gray-600">By {post.author.email}</span>
          <span className="text-gray-500 text-sm">
            {new Date(post.createdAt).toLocaleDateString()}
          </span>
        </div>
        <div className="prose max-w-none">
          <p className="whitespace-pre-line">{post.content}</p>
        </div>

        {token && token.id === post.author._id && (
          <div className="mt-8 flex space-x-4">
            <Link href={`/posts/edit/${post._id}`}>
              <p className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded">
                Edit Post
              </p>
            </Link>
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Delete Post
            </button>
          </div>
        )}
      </div>
    </div>
  );
}