import { useParams, Link, useNavigate } from 'react-router-dom';
import { useBlogs, useUsers } from '../hooks/useBlogs';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export function BlogDetails() {
  const { id } = useParams<{ id: string }>();
  const { getBlogById } = useBlogs();
  const { getUserById } = useUsers();
  const navigate = useNavigate();

  const blog = getBlogById(id || '');
  const author = blog ? getUserById(blog.authorId) : null;

  if (!blog) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex-1 max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Blog Not Found</h1>
          <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link
            to="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Back to Home
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <article className="flex-1 max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 hover:text-blue-800 mb-6 inline-flex items-center transition"
        >
          ← Back
        </button>

        <header className="mb-8">
          <span className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium mb-4">
            {blog.category}
          </span>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{blog.title}</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              {author && (
                <img
                  src={author.avatar}
                  alt={author.name}
                  className="w-12 h-12 rounded-full"
                />
              )}
              <div className="ml-3">
                <p className="font-semibold text-gray-900">{blog.author}</p>
                <p className="text-sm text-gray-500">{blog.createdAt}</p>
              </div>
            </div>
          </div>
        </header>

        {blog.image && (
          <div className="mb-8">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="prose prose-lg max-w-none">
            {blog.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <Link
            to="/"
            className="text-blue-600 hover:text-blue-800 font-medium transition"
          >
            ← View All Blogs
          </Link>
        </div>
      </article>
      <Footer />
    </div>
  );
}
