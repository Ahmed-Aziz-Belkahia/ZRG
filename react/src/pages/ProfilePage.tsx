import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, ShoppingBag, Heart, Settings, Key } from 'lucide-react';

type ActiveSection = 'orders' | 'wishlist' | 'settings' | null;

const ProfilePage: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<ActiveSection>(null);
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || ''
  });

  if (!user) {
    navigate('/signin');
    return null;
  }

  const handleOrdersClick = () => {
    setActiveSection('orders');
  };

  const handleWishlistClick = () => {
    navigate('/wishlist');
  };

  const handleSettingsClick = () => {
    setActiveSection('settings');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdateProfile = () => {
    // Here you would typically make an API call to update the user's profile
    console.log('Updating profile with:', formData);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'orders':
        return (
          <div className="bg-dark-gray rounded-lg p-6 mt-8">
            <h2 className="font-play text-2xl font-bold text-white mb-4">My Orders</h2>
            <div className="text-gray-400">
              <p>No orders found.</p>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="bg-dark-gray rounded-lg p-6 mt-8">
            <h2 className="font-play text-2xl font-bold text-white mb-4">Settings</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-white mb-2">Username</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full bg-black border border-gray-800 rounded px-4 py-2 text-white focus:outline-none focus:border-gold"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-white mb-2">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-black border border-gray-800 rounded px-4 py-2 text-white focus:outline-none focus:border-gold"
                />
              </div>
              <button 
                onClick={handleUpdateProfile}
                className="bg-gold hover:bg-gold/90 text-black font-bold px-6 py-2 rounded transition-colors duration-200"
              >
                Update Profile
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-black">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-play text-4xl font-bold text-white mb-2">
                My <span className="text-gold">Account</span>
              </h1>
              <p className="text-gray-400">Manage your account and view your purchases</p>
            </div>
            <button
              onClick={signOut}
              className="flex items-center gap-2 bg-red-500/20 text-red-500 px-4 py-2 rounded hover:bg-red-500/30 transition-colors duration-200"
            >
              <LogOut size={20} />
              Sign Out
            </button>
          </div>

          {/* Profile Info */}
          <div className="bg-dark-gray rounded-lg p-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center">
                <User className="text-gold" size={32} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">{formData.username}</h2>
                <p className="text-gray-400">{formData.email}</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <button 
              onClick={handleOrdersClick}
              className={`bg-dark-gray rounded-lg p-6 text-left hover:bg-dark-gray/80 transition-colors duration-200 ${
                activeSection === 'orders' ? 'ring-2 ring-gold' : ''
              }`}
            >
              <ShoppingBag className="text-gold mb-4" size={24} />
              <h3 className="font-play text-lg font-bold text-white mb-1">My Orders</h3>
              <p className="text-gray-400 text-sm">View your order history</p>
            </button>

            <button 
              onClick={handleWishlistClick}
              className="bg-dark-gray rounded-lg p-6 text-left hover:bg-dark-gray/80 transition-colors duration-200"
            >
              <Heart className="text-gold mb-4" size={24} />
              <h3 className="font-play text-lg font-bold text-white mb-1">Wishlist</h3>
              <p className="text-gray-400 text-sm">Manage your saved scripts</p>
            </button>

            <button 
              onClick={handleSettingsClick}
              className={`bg-dark-gray rounded-lg p-6 text-left hover:bg-dark-gray/80 transition-colors duration-200 ${
                activeSection === 'settings' ? 'ring-2 ring-gold' : ''
              }`}
            >
              <Settings className="text-gold mb-4" size={24} />
              <h3 className="font-play text-lg font-bold text-white mb-1">Settings</h3>
              <p className="text-gray-400 text-sm">Update your preferences</p>
            </button>
          </div>

          {/* Dynamic Content Section */}
          {renderContent()}

          {/* Security Section */}
          <div className="bg-dark-gray rounded-lg p-6">
            <h3 className="font-play text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Key className="text-gold" size={24} />
              Security
            </h3>
            <button className="w-full bg-gold/20 text-gold hover:bg-gold/30 px-4 py-2 rounded transition-colors duration-200 text-left">
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;