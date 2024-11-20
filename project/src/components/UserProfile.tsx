import React from 'react';
import { X } from 'lucide-react';
import { useStore } from '../store/useStore';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function UserProfile({ isOpen, onClose }: Props) {
  const [username, setUsername] = React.useState('');
  const [profilePic, setProfilePic] = React.useState('');
  const [bio, setBio] = React.useState('');
  
  const { currentUser, setCurrentUser, addUser, updateUser } = useStore();

  React.useEffect(() => {
    if (currentUser) {
      setUsername(currentUser.username);
      setProfilePic(currentUser.profilePic);
      setBio(currentUser.bio);
    }
  }, [currentUser]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const userData = {
      id: currentUser?.id || crypto.randomUUID(),
      username,
      profilePic: profilePic || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
      bio,
    };

    if (currentUser) {
      updateUser(userData);
    } else {
      addUser(userData);
      setCurrentUser(userData);
    }
    
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-lg">
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-xl font-semibold">Your Profile</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              placeholder="Enter username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profile Picture URL
            </label>
            <input
              type="url"
              value={profilePic}
              onChange={(e) => setProfilePic(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              placeholder="Enter image URL"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bio
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              rows={4}
              placeholder="Tell us about yourself"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
          >
            {currentUser ? 'Update Profile' : 'Create Profile'}
          </button>

          {currentUser && (
            <button
              type="button"
              onClick={() => {
                setCurrentUser(null);
                onClose();
              }}
              className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Sign Out
            </button>
          )}
        </form>
      </div>
    </div>
  );
}