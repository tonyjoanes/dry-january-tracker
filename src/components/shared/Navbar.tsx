import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, User, Home, Sparkles } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { signOut } from '../../services/auth';
import Button from './Button';

const Navbar: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to={currentUser ? '/dashboard' : '/'} className="flex items-center gap-2">
            <span className="text-2xl">🍺</span>
            <span className="text-xl font-bold text-gray-900">Dry January Tracker</span>
          </Link>

          {/* Nav Links */}
          <div className="flex items-center gap-4">
            {currentUser ? (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors"
                >
                  <Home size={20} />
                  <span className="hidden sm:inline">Dashboard</span>
                </Link>
                <Link
                  to="/profile"
                  className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors"
                >
                  <User size={20} />
                  <span className="hidden sm:inline">Profile</span>
                </Link>
                <Link
                  to="/coming-soon"
                  className="flex items-center gap-2 text-amber-600 hover:text-amber-700 transition-colors"
                >
                  <Sparkles size={20} />
                  <span className="hidden sm:inline">Coming Soon</span>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSignOut}
                  className="flex items-center gap-2"
                >
                  <LogOut size={16} />
                  <span className="hidden sm:inline">Sign Out</span>
                </Button>
              </>
            ) : (
              <>
                <Link
                  to="/coming-soon"
                  className="flex items-center gap-2 text-amber-600 hover:text-amber-700 transition-colors font-semibold"
                >
                  <Sparkles size={20} />
                  <span className="hidden sm:inline">Coming Soon</span>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="primary" size="sm">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
