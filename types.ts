
export interface User {
  id: string;
  username: string;
  password: string;
  avatarUrl: string;
  role: 'admin' | 'user';
}

export interface Game {
  id: string;
  title: string;
  genre: string;
  verticalImageUrl: string;
  horizontalImageUrl: string;
  downloadUrl: string;
  releaseDate: string;
  description: string;
  price: number;
  featured?: boolean;
  category: string;
  patchUrl?: string;
  screenshots?: string[];
  platform?: string;
}

export interface ForumComment {
  id: string;
  authorId: string;
  authorName: string;
  avatarUrl: string;
  content: string;
  createdAt: string;
}

export interface ForumTopic {
  id: string;
  title: string;
  authorId: string;
  authorName: string;
  avatarUrl: string;
  content: string;
  createdAt: string;
  comments: ForumComment[];
}