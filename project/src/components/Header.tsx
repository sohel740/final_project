import React from 'react';
import { Menu, User as UserIcon } from 'lucide-react';
import { useStore } from '../store/useStore';
import UserProfile from './UserProfile';

export default function Header() {
  const [showProfile, setShowProfile] = React.useState(false);
  const currentUser = useStore((state) => state.currentUser);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowProfile(true)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold text-red-500">Reddit Clone</h1>
        </div>
        
        <div className="flex items-center space-x-2">
          {currentUser ? (
            <div className="flex items-center space-x-2">
              <img
                src={currentUser.profilePic || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop'}
                alt={currentUser.username}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="font-medium">{currentUser.username}</span>
            </div>
          ) : (
            <UserIcon className="w-6 h-6" />
          )}
        </div>
      </div>

      <UserProfile isOpen={showProfile} onClose={() => setShowProfile(false)} />
    </header>
  );
}