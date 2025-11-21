

export type LocalizedString = {
  en: string;
  tr: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  avatarUrl: string;
  role: 'admin' | 'user';
  isVerified: boolean;
}

export interface Game {
  id: string;
  title: LocalizedString;
  genre: LocalizedString;
  developer: LocalizedString;
  publisher: LocalizedString;
  verticalImageUrl: string;
  horizontalImageUrl: string;
  trailerUrl?: string;
  downloadUrl: string;
  releaseDate: string;
  description: LocalizedString;
  price: number;
  featured?: boolean;
  category: LocalizedString;
  patchUrl?: string;
  screenshots?: string[];
  platform?: string;
  systemRequirements?: {
    minimum: LocalizedString;
    recommended: LocalizedString;
  };
}

export interface ForumComment {
  id: string;
  authorId: string;
  authorName: string;
  avatarUrl: string;
  content: LocalizedString;
  createdAt: string;
}

export interface ForumTopic {
  id: string;
  title: LocalizedString;
  authorId: string;
  authorName: string;
  avatarUrl: string;
  content: LocalizedString;
  createdAt: string;
  comments: ForumComment[];
}

export interface RequestedGame {
  id: string;
  gameTitle: string;
  reason: string;
  userId: string;
  requestedBy: string; // username
  avatarUrl: string;
  createdAt: string; // ISO string
}