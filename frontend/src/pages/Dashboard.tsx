import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { LogOut, Shield, User as UserIcon } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [userContent, setUserContent] = useState<string>('');
  const [adminContent, setAdminContent] = useState<string>('');

  useEffect(() => {
    // Fetch User Content
    api.get('/user')
      .then(res => setUserContent(res.data.message))
      .catch(err => console.error('Failed to load user content', err));

    // Fetch Admin Content if user is ADMIN
    if (user?.role === 'ADMIN') {
      api.get('/admin')
        .then(res => setAdminContent(res.data.message))
        .catch(err => setAdminContent('Unauthorized to load admin content.'));
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-indigo-600" />
              <span className="font-bold text-xl text-gray-900">SecureApp</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 text-gray-600">
                <UserIcon className="h-5 w-5" />
                <span>{user?.name} ({user?.role})</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-red-50 hover:text-red-600 text-gray-700 rounded-lg transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* User Content Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-indigo-100 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 bg-indigo-100 rounded-lg">
                <UserIcon className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">User Dashboard</h3>
            </div>
            <div className="bg-indigo-50 rounded-lg p-4">
              <h4 className="font-medium text-indigo-900 mb-2">My Content</h4>
              <p className="text-gray-700">
                {userContent || 'Loading user content...'}
              </p>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              Only authenticatd users (USER or ADMIN) can see this section. This is protected by Spring Security.
            </p>
          </div>

          {/* Admin Content Card */}
          {user?.role === 'ADMIN' ? (
            <div className="bg-white rounded-2xl shadow-sm border border-rose-100 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-rose-100 rounded-lg">
                  <Shield className="h-6 w-6 text-rose-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Admin Section</h3>
              </div>
              <div className="bg-rose-50 rounded-lg p-4">
                <h4 className="font-medium text-rose-900 mb-2">High Privilege Access</h4>
                <p className="text-gray-700">
                  {adminContent || 'Loading admin content...'}
                </p>
              </div>
              <p className="mt-4 text-sm text-gray-500">
                You are viewing this because you have the <strong>ADMIN</strong> role. Standard users cannot access these API endpoints.
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col items-center justify-center text-center text-gray-500 opacity-60">
              <Shield className="h-12 w-12 mb-4 text-gray-400" />
              <h3 className="text-lg font-medium text-gray-900">Admin Access Required</h3>
              <p className="mt-2">You need ADMIN privileges to view this section.</p>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};
