"use client";

import Link from 'next/link';
import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const { token, loading, logout } = useAuth();
  const router = useRouter();

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/">
          <p className="text-xl font-bold text-gray-800">Blog Platform</p>
        </Link>

        <div className="flex items-center space-x-4">
          <Link href="/" className="text-gray-600 hover:text-gray-800">
           Home
          </Link>
          {!loading && (
            <>
              {token ? (
                <>
                  <Link href="/dashboard">
                    <p className="text-gray-600 hover:text-gray-800">Dashboard</p>
                  </Link>
                  <Link href="/posts/create-post">
                    <p className="text-gray-600 hover:text-gray-800">Create Post</p>
                  </Link>
                  <button
                    onClick={async () => {
                      await logout();
                      router.push('/auth/login');
                    }}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/auth/login">
                    <p className="text-gray-600 hover:text-gray-800">Login</p>
                  </Link>
                  <Link href="/auth/register">
                    <p className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                      Register
                    </p>
                  </Link>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
