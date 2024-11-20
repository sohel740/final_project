import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Post } from '../types';

interface Store {
  currentUser: User | null;
  users: User[];
  posts: Post[];
  setCurrentUser: (user: User | null) => void;
  addUser: (user: User) => void;
  updateUser: (user: User) => void;
  addPost: (post: Post) => void;
  updatePost: (post: Post) => void;
  deletePost: (postId: string) => void;
  votePost: (postId: string, userId: string, voteType: 'up' | 'down') => void;
}

export const useStore = create<Store>()(
  persist(
    (set) => ({
      currentUser: null,
      users: [],
      posts: [],
      setCurrentUser: (user) => set({ currentUser: user }),
      addUser: (user) =>
        set((state) => ({ users: [...state.users, user] })),
      updateUser: (user) =>
        set((state) => ({
          users: state.users.map((u) => (u.id === user.id ? user : u)),
          currentUser: state.currentUser?.id === user.id ? user : state.currentUser,
        })),
      addPost: (post) =>
        set((state) => ({ posts: [post, ...state.posts] })),
      updatePost: (post) =>
        set((state) => ({
          posts: state.posts.map((p) => (p.id === post.id ? post : p)),
        })),
      deletePost: (postId) =>
        set((state) => ({
          posts: state.posts.filter((p) => p.id !== postId),
        })),
      votePost: (postId, userId, voteType) =>
        set((state) => ({
          posts: state.posts.map((post) => {
            if (post.id !== postId) return post;
            
            const votes = { ...post.votes };
            const previousVote = votes[userId];
            
            if (previousVote === voteType) {
              delete votes[userId];
            } else {
              votes[userId] = voteType;
            }
            
            const voteCount = Object.values(votes).reduce(
              (acc, vote) => acc + (vote === 'up' ? 1 : -1),
              0
            );
            
            return { ...post, votes, voteCount };
          }),
        })),
    }),
    {
      name: 'reddit-clone-storage',
    }
  )
);