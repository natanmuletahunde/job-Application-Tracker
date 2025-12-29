import { useState, useEffect } from 'react';
import { Blog, NewBlog } from '../types/blog';
import blogsData from '../data/blogs.json';
import usersData from '../data/users.json';

const STORAGE_KEY = 'blogs_data';

export function useBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        const storedBlogs = localStorage.getItem(STORAGE_KEY);
        if (storedBlogs) {
          setBlogs(JSON.parse(storedBlogs));
        } else {
          setBlogs(blogsData as Blog[]);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(blogsData));
        }
      } catch (error) {
        console.error('Error loading blogs:', error);
        setBlogs(blogsData as Blog[]);
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, []);

  const getBlogById = (id: string): Blog | undefined => {
    return blogs.find(blog => blog.id === id);
  };

  const getBlogsByAuthor = (authorId: string): Blog[] => {
    return blogs.filter(blog => blog.authorId === authorId);
  };

  const getBlogsByCategory = (category: string): Blog[] => {
    return blogs.filter(blog => blog.category === category);
  };

  const addBlog = (newBlog: NewBlog): Blog => {
    const blog: Blog = {
      ...newBlog,
      id: String(Date.now()),
      createdAt: new Date().toISOString().split('T')[0],
    };
    const updatedBlogs = [blog, ...blogs];
    setBlogs(updatedBlogs);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBlogs));
    return blog;
  };

  const updateBlog = (id: string, updatedBlog: Partial<Blog>): Blog | null => {
    const index = blogs.findIndex(blog => blog.id === id);
    if (index === -1) return null;

    const updated = { ...blogs[index], ...updatedBlog };
    const newBlogs = [...blogs];
    newBlogs[index] = updated;
    setBlogs(newBlogs);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newBlogs));
    return updated;
  };

  const deleteBlog = (id: string): boolean => {
    const index = blogs.findIndex(blog => blog.id === id);
    if (index === -1) return false;

    const newBlogs = blogs.filter(blog => blog.id !== id);
    setBlogs(newBlogs);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newBlogs));
    return true;
  };

  return {
    blogs,
    loading,
    getBlogById,
    getBlogsByAuthor,
    getBlogsByCategory,
    addBlog,
    updateBlog,
    deleteBlog,
  };
}

export function useUsers() {
  const [users] = useState(usersData);

  const getUserById = (id: string) => {
    return users.find(user => user.id === id);
  };

  return {
    users,
    getUserById,
  };
}
