
import { useState, useEffect, useCallback } from 'react';
import { ForumTopic, ForumComment, LocalizedString } from '../types';
import { initialTopics } from '../data/forum';

const FORUM_STORAGE_KEY = 'game_store_forum_data';

export const useForum = () => {
  const [topics, setTopics] = useState<ForumTopic[]>([]);
  const [loading, setLoading] = useState(true);

  // Load topics from LocalStorage on mount
  useEffect(() => {
    try {
      const storedTopics = localStorage.getItem(FORUM_STORAGE_KEY);
      if (storedTopics) {
        setTopics(JSON.parse(storedTopics));
      } else {
        // If no data found, initialize with default data
        setTopics(initialTopics);
        localStorage.setItem(FORUM_STORAGE_KEY, JSON.stringify(initialTopics));
      }
    } catch (error) {
      console.error('Failed to load forum topics from storage:', error);
      setTopics(initialTopics);
    } finally {
      setLoading(false);
    }
  }, []);

  // Helper to save to LocalStorage
  const saveToStorage = (updatedTopics: ForumTopic[]) => {
    try {
      localStorage.setItem(FORUM_STORAGE_KEY, JSON.stringify(updatedTopics));
    } catch (error) {
      console.error('Failed to save forum topics to storage:', error);
    }
  };

  const addTopic = (topicData: Omit<ForumTopic, 'id' | 'comments' | 'createdAt'>): string => {
    const newTopic: ForumTopic = {
      ...topicData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      comments: [],
    };
    
    const updatedTopics = [newTopic, ...topics];
    setTopics(updatedTopics);
    saveToStorage(updatedTopics);
    return newTopic.id;
  };

  const updateTopic = (topicId: string, data: { title: LocalizedString; content: LocalizedString }) => {
    const updatedTopics = topics.map(topic => {
      if (topic.id === topicId) {
        return { ...topic, title: data.title, content: data.content };
      }
      return topic;
    });
    setTopics(updatedTopics);
    saveToStorage(updatedTopics);
  };

  const addComment = (topicId: string, commentData: Omit<ForumComment, 'id' | 'createdAt'>) => {
    const newComment: ForumComment = {
      ...commentData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };

    const updatedTopics = topics.map(topic => {
      if (topic.id === topicId) {
        const comments = topic.comments || [];
        return {
          ...topic,
          comments: [newComment, ...comments],
        };
      }
      return topic;
    });

    setTopics(updatedTopics);
    saveToStorage(updatedTopics);
  };

  const deleteTopic = async (topicId: string) => {
    const updatedTopics = topics.filter(topic => topic.id !== topicId);
    setTopics(updatedTopics);
    saveToStorage(updatedTopics);
  };
  
  const getTopicById = (topicId: string): ForumTopic | undefined => {
    return topics.find(topic => topic.id === topicId);
  };

  return { topics, loading, getTopicById, addTopic, addComment, deleteTopic, updateTopic };
};
