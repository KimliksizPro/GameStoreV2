import { useState, useEffect } from 'react';
import { ForumTopic, ForumComment } from '../types';
import { initialTopics } from '../data/forum';

// NOTE FOR DEVELOPER:
// The forum data is currently managed in-memory and will reset on page refresh.
// For a persistent, multi-user forum, this hook should be connected to a backend API.
// The use of localStorage has been removed because it is client-specific and does not
// allow for data sharing between different users, which was the source of the issue.

export const useForum = () => {
  const [topics, setTopics] = useState<ForumTopic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching initial data from a server.
    // In a real app, this would be an API call.
    setTopics(initialTopics);
    setLoading(false);
  }, []);

  const addTopic = (topicData: Omit<ForumTopic, 'id' | 'comments' | 'createdAt'>): string => {
    const newTopic: ForumTopic = {
      ...topicData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      comments: [],
    };
    setTopics(currentTopics => [newTopic, ...currentTopics]);
    return newTopic.id;
  };

  const addComment = (topicId: string, commentData: Omit<ForumComment, 'id' | 'createdAt'>) => {
    const newComment: ForumComment = {
      ...commentData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };

    setTopics(currentTopics =>
      currentTopics.map(topic => {
        if (topic.id === topicId) {
          return {
            ...topic,
            comments: [...topic.comments, newComment],
          };
        }
        return topic;
      })
    );
  };
  
  const getTopicById = (topicId: string): ForumTopic | undefined => {
    return topics.find(topic => topic.id === topicId);
  };

  return { topics, loading, getTopicById, addTopic, addComment };
};
