import React from 'react';
import { useStore } from '../store/useStore';

export default function CreatePost() {
  const [isCreating, setIsCreating] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  
  const { currentUser, addPost } = useStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) return;

    const post = {
      id: crypto.randomUUID(),
      userId: currentUser.id,
      title,
      content,
      createdAt: new Date().toISOString(),
      votes: {},
      voteCount: 0,
    };

    addPost(post);
    setTitle('');
    setContent('');
    setIsCreating(false);
  };

  if (!currentUser) {
    return (
      <div className="bg-white p-4 rounded-lg shadow mb-4">
        <p className="text-center text-gray-500">Please sign in to create a post</p>
      </div>
    );
  }

  if (!isCreating) {
    return (
      <button
        onClick={() => setIsCreating(true)}
        className="w-full bg-white p-4 rounded-lg shadow mb-4 text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <img
            src={currentUser.profilePic || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop'}
            alt={currentUser.username}
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="text-gray-500">What's on your mind?</span>
        </div>
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow mb-4">
      <div className="flex items-center space-x-3 mb-4">
        <img
          src={currentUser.profilePic || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop'}
          alt={currentUser.username}
          className="w-10 h-10 rounded-full object-cover"
        />
        <span className="font-medium">{currentUser.username}</span>
      </div>
      
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Post title"
        required
        className="w-full px-3 py-2 border rounded-lg mb-3 focus:ring-2 focus:ring-red-500 focus:border-red-500"
      />
      
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
        required
        rows={4}
        className="w-full px-3 py-2 border rounded-lg mb-3 focus:ring-2 focus:ring-red-500 focus:border-red-500"
      />
      
      <div className="flex space-x-2 justify-end">
        <button
          type="button"
          onClick={() => setIsCreating(false)}
          className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Post
        </button>
      </div>
    </form>
  );
}