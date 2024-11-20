import React from 'react';
import Header from './components/Header';
import CreatePost from './components/CreatePost';
import Post from './components/Post';
import { useStore } from './store/useStore';

function App() {
  const posts = useStore((state) => state.posts);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <main className="max-w-3xl mx-auto px-4 py-8">
        <CreatePost />
        
        <div className="space-y-4">
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
          
          {posts.length === 0 && (
            <div className="bg-white p-8 rounded-lg shadow text-center">
              <p className="text-gray-500">No posts yet. Be the first to create one!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;