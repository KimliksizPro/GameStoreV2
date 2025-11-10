import { useState, useEffect } from 'react';
import { ForumTopic, ForumComment } from '../types';
import { initialTopics } from '../data/forum';

const FORUM_STORAGE_KEY = 'forum_data';

export const useForum = () => {
  const [topics, setTopics] = useState<ForumTopic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedTopics = localStorage.getItem(FORUM_STORAGE_KEY);
      if (storedTopics) {
        setTopics(JSON.parse(storedTopics));
      } else {
        setTopics(initialTopics);
        localStorage.setItem(FORUM_STORAGE_KEY, JSON.stringify(initialTopics));
      }
    } catch (error) {
      console.error("Failed to load forum topics from storage", error);
      setTopics(initialTopics);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateStorage = (updatedTopics: ForumTopic[]) => {
    setTopics(updatedTopics);
    localStorage.setItem(FORUM_STORAGE_KEY, JSON.stringify(updatedTopics));
  };

  const addTopic = (topicData: Omit<ForumTopic, 'id' | 'comments' | 'createdAt'>): string => {
    const newTopic: ForumTopic = {
      ...topicData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      comments: [],
    };
    updateStorage([newTopic, ...topics]);
    return newTopic.id;
  };

  const addComment = (topicId: string, commentData: Omit<ForumComment, 'id' | 'createdAt'>) => {
    const newComment: ForumComment = {
      ...commentData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };

    const updatedTopics = topics.map(topic => {
      if (topic.id === topicId) {
        return {
          ...topic,
          comments: [...topic.comments, newComment],
        };
      }
      return topic;
    });
    updateStorage(updatedTopics);
  };
  
  const getTopicById = (topicId: string): ForumTopic | undefined => {
    return topics.find(topic => topic.id === topicId);
  };

  return { topics, loading, getTopicById, addTopic, addComment };
};
