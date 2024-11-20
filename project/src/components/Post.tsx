import React from 'react';
import { ArrowBigUp, ArrowBigDown, Trash2, Edit2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useStore } from '../store/useStore';
import { Post as PostType } from '../types';

interface Props {
  post: PostType;
}

export default function Post({ post }: Props) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedContent, setEditedContent] = React.useState(post.content);
  
  const { currentUser, users, updatePost, deletePost, votePost } = useStore();
  
  const author = users.find(u => u.id === post.userId);
  const isAuthor = currentUser?.id === post.userId;
  const userVote = currentUser ? post.votes[currentUser.id] : undefined;

  const handleVote = (type: 'up' | 'down') => {
    if (!currentUser) return;
    votePost(post.id, currentUser.id, type);
  };

  const handleUpdate = () => {
    updatePost({ ...post, content: editedContent });
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg shadow mb-4 overflow-hidden">
      <div className="p-4 border-b bg-gray-50">
        <div className="flex items-center space-x-2">
          <img
            src={author?.profilePic || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop'}
            alt={author?.username}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div>
            <p className="font-medium">{author?.username || 'Deleted User'}</p>
            <p className="text-sm text-gray-500">
              {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
            </p>
          </div>
        </div>
      </div>

      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
        
        {isEditing ? (
          <div className="space-y-2">
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              rows={4}
            />
            <div className="flex space-x-2">
              <button
                onClick={handleUpdate}
                className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition-colors"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-100 text-gray-700 py-1 px-3 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>
        )}
      </div>

      <div className="px-4 py-2 bg-gray-50 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <button
              onClick={() => handleVote('up')}
              className={`p-1 rounded hover:bg-gray-200 ${
                userVote === 'up' ? 'text-red-500' : 'text-gray-500'
              }`}
              disabled={!currentUser}
            >
              <ArrowBigUp className="w-6 h-6" />
            </button>
            <span className="font-medium">{post.voteCount}</span>
            <button
              onClick={() => handleVote('down')}
              className={`p-1 rounded hover:bg-gray-200 ${
                userVote === 'down' ? 'text-blue-500' : 'text-gray-500'
              }`}
              disabled={!currentUser}
            >
              <ArrowBigDown className="w-6 h-6" />
            </button>
          </div>
        </div>

        {isAuthor && (
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsEditing(true)}
              className="p-1 text-gray-500 hover:text-gray-700 rounded hover:bg-gray-200"
            >
              <Edit2 className="w-5 h-5" />
            </button>
            <button
              onClick={() => deletePost(post.id)}
              className="p-1 text-gray-500 hover:text-red-500 rounded hover:bg-gray-200"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}