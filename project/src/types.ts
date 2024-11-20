export interface User {
  id: string;
  username: string;
  profilePic: string;
  bio: string;
}

export interface Post {
  id: string;
  userId: string;
  title: string;
  content: string;
  createdAt: string;
  votes: Record<string, 'up' | 'down'>;
  voteCount: number;
}