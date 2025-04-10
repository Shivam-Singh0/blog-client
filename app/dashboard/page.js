"use client"

import { useEffect, useState } from 'react';
import axios from 'axios';
import PostCard from "@/components/PostCard";
import Link from 'next/link';
import { useAuth } from '@/lib/AuthContext';

export default function Dashboard() {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  

  const {token, loading: tokenLoading} = useAuth();



  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get('/api/posts');
        const userPosts = data.posts.filter(post => post.author._id === token?.id);
        setPosts(userPosts);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchPosts();
    }
  }, [token]);

  if (loading || tokenLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }


  if (!token) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Please login to view your dashboard</h1>
        <Link href="/auth/login">
          <p className="text-blue-500 hover:text-blue-700">Go to Login</p>
        </Link>
      </div>
    );
  }

 
  return (
    <div className='p-10'>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Posts</h1>
        <Link href="/posts/create-post">
          <p className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Create New Post
          </p>
        </Link>
      </div>
      
      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">You haven't created any posts yet.</p>
          <Link href="/posts/create-post">
            <p className="text-blue-500 hover:text-blue-700">Create your first post</p>
          </Link>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}