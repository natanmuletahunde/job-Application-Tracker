import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold hover:text-blue-200 transition">
              📝 Frontend Blog
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="px-3 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Home
            </Link>
            {isAuthenticated && user ? (
              <>
                <Link
                  to="/create"
                  className="px-3 py-2 rounded-md hover:bg-blue-700 transition"
                >
                  Create Blog
                </Link>
                <div className="flex items-center space-x-2">
                  {user.avatar && (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                  <span className="px-2 py-1 text-sm">{user.name}</span>
                  <button
                    onClick={logout}
                    className="px-3 py-2 rounded-md hover:bg-blue-700 transition"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-3 py-2 rounded-md hover:bg-blue-700 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-3 py-2 bg-white text-blue-600 rounded-md hover:bg-blue-50 transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
