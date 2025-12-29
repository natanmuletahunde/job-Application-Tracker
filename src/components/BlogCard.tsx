import { Link } from 'react-router-dom';
import { Blog } from '../types/blog';

interface BlogCardProps {
  blog: Blog;
}

export function BlogCard({ blog }: BlogCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
            {blog.category}
          </span>
          <span className="text-xs text-gray-500">{blog.createdAt}</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition">
          <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{blog.excerpt}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">
              {blog.author.charAt(0)}
            </div>
            <span className="ml-2 text-sm text-gray-700">{blog.author}</span>
          </div>
          <Link
            to={`/blog/${blog.id}`}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium transition"
          >
            Read More →
          </Link>
        </div>
      </div>
    </div>
  );
}
