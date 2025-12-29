export interface Blog {
  id: string;
  title: string;
  content: string;
  author: string;
  authorId: string;
  createdAt: string;
  category: string;
  excerpt: string;
  image?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  bio?: string;
  avatar?: string;
}

export interface NewBlog {
  title: string;
  content: string;
  author: string;
  authorId: string;
  category: string;
  excerpt: string;
  image?: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  bio?: string;
  avatar?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}
