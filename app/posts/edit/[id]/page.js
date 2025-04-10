"use client"
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PostForm from '../../create-post/page';
import { useParams } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';


export default function EditPost() {
  const router = useRouter();
  const params = useParams()
const id = params.id
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const {token, loading: tokenLoading} = useAuth();

  useEffect(() => {
    const fetchPost = async () => {
      try {
       
        const { data } = await axios.get(`/api/posts/${id}`);
      
        if (token && data?.author._id !== token.id) {
          alert('You are not authorized to edit this post');
          router.push('/dashboard');
          return;
        }
        setPost(data);
      } catch (err) {
        console.log(err)
        alert('Post not found');
        router.push('/');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id, router]);

  if (loading || tokenLoading) {
    return (
      <div className="flex justify-center items-center h-64 p-10">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto ">
      <h1 className="text-2xl font-bold my-4 text-center">Edit Post</h1>
      <PostForm post={post} />
    </div>
  );
}