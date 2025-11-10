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
  author: string;
  avatarUrl: string;
  content: string;
  createdAt: string;
}

export interface ForumTopic {
  id: string;
  title: string;
  author: string;
  avatarUrl: string;
  content: string;
  createdAt: string;
  comments: ForumComment[];
}
