import { useState,  } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useBlogs } from '../hooks/useBlogs';
import { useAuth } from '../context/AuthContext';
import { NewBlog } from '../types/blog';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export function CreateBlog() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { addBlog } = useBlogs();

  const [formData, setFormData] = useState<NewBlog>({
    title: '',
    content: '',
    author: '',
    authorId: '',
    category: 'React',
    excerpt: '',
  });
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  const categories = ['React', 'TypeScript', 'CSS', 'JavaScript'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.content || !formData.excerpt) {
      alert('Please fill in all required fields');
      return;
    }

    let imageData = '';
    if (image) {
      imageData = await convertImageToBase64(image);
    }

    const blogData = {
      ...formData,
      author: user?.name || '',
      authorId: user?.id || '',
      image: imageData,
    };

    addBlog(blogData);
    navigate('/');
  };

  const convertImageToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      convertImageToBase64(file).then(setImagePreview);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview('');
  };

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex-1 max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Blog Post</h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
              Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter blog title"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="category" className="block text-gray-700 font-medium mb-2">
              Category *
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label htmlFor="image" className="block text-gray-700 font-medium mb-2">
              Blog Image
            </label>
            {imagePreview ? (
              <div className="mb-4">
                <img src={imagePreview} alt="Preview" className="w-full h-64 object-cover rounded-lg" />
                <button
                  type="button"
                  onClick={removeImage}
                  className="mt-2 text-red-600 hover:text-red-800 text-sm"
                >
                  Remove Image
                </button>
              </div>
            ) : (
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="excerpt" className="block text-gray-700 font-medium mb-2">
              Excerpt *
            </label>
            <textarea
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Brief summary of your blog post"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="content" className="block text-gray-700 font-medium mb-2">
              Content *
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={10}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Write your blog content here..."
              required
            />
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Create Blog Post
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}
