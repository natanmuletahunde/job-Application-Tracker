import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthUser, LoginData, RegisterData, User } from '../types/blog';

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (data: LoginData) => boolean;
  register: (data: RegisterData) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_KEY = 'blog_users';
const AUTH_USER_KEY = 'blog_auth_user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem(AUTH_USER_KEY);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const getStoredUsers = (): User[] => {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
  };

  const login = (data: LoginData): boolean => {
    const users = getStoredUsers();
    const foundUser = users.find(
      (u) => u.email === data.email && u.password === data.password
    );

    if (foundUser) {
      const authUser: AuthUser = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        bio: foundUser.bio,
        avatar: foundUser.avatar,
      };
      setUser(authUser);
      setIsAuthenticated(true);
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(authUser));
      return true;
    }

    return false;
  };

  const register = (data: RegisterData): boolean => {
    const users = getStoredUsers();

    if (users.some((u) => u.email === data.email)) {
      return false;
    }

    const newUser: User = {
      id: String(users.length + 1),
      name: data.name,
      email: data.email,
      password: data.password,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.name}`,
    };

    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));

    const authUser: AuthUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      bio: newUser.bio,
      avatar: newUser.avatar,
    };

    setUser(authUser);
    setIsAuthenticated(true);
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(authUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem(AUTH_USER_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
