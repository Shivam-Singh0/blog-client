import Link from 'next/link';
import { format } from 'date-fns';

const PostCard = ({ post }) => {
  return (
    <Link href={`/posts/${post._id}`} className="block w-full sm:w-full md:w-1/3 lg:w-1/5">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6 hover:shadow-lg transition h-full">
        <p className="text-xl font-semibold text-gray-800 hover:text-blue-600">
          {post.title}
        </p>
        <p className="text-gray-600 mt-2">
          {post.content.substring(0, 150)}...
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm text-gray-500">By {post.author.email}</span>
          <span className="text-sm text-gray-500">
            {format(new Date(post.createdAt), 'MMM dd, yyyy')}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;