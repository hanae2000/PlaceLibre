import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Menu, X, MapPin } from 'lucide-react';

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="bg-blue-600 p-2 rounded-lg">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl text-slate-900 hidden sm:inline">PlaceLibre</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {user ? (
              <>
                <Link
                  to="/search"
                  className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
                >
                  Search
                </Link>
                <Link
                  to="/reservations"
                  className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
                >
                  My Reservations
                </Link>
                <div className="flex items-center gap-4 pl-4 border-l border-slate-200">
                  <span className="text-slate-600 text-sm">{user.email}</span>
                  <button
                    onClick={handleLogout}
                    className="btn-primary text-sm"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex gap-3">
                <Link
                  to="/login"
                  className="btn-outline text-sm"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn-primary text-sm"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </nav>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-slate-600" />
            ) : (
              <Menu className="w-6 h-6 text-slate-600" />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden border-t border-slate-200 py-4 space-y-3">
            {user ? (
              <>
                <Link
                  to="/search"
                  className="block text-slate-600 hover:text-blue-600 font-medium px-4 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Search
                </Link>
                <Link
                  to="/reservations"
                  className="block text-slate-600 hover:text-blue-600 font-medium px-4 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Reservations
                </Link>
                <div className="px-4 py-3 border-t border-slate-200 flex justify-between items-center">
                  <span className="text-slate-600 text-sm">{user.email}</span>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="btn-primary text-sm"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="px-4 py-3 border-t border-slate-200 flex gap-3">
                <Link
                  to="/login"
                  className="btn-outline text-sm flex-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn-primary text-sm flex-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};
