import { useState, useEffect, useCallback } from 'react';
import { ForumTopic, ForumComment } from '../types';
import { initialTopics } from '../data/forum';

const API_ENDPOINT = 'https://api.npoint.io/ca11c27cf089a13efc29';

export const useForum = () => {
  const [topics, setTopics] = useState<ForumTopic[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch initial data from the remote JSON store
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await fetch(API_ENDPOINT);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // npoint can return an empty object if the bin is empty, handle this case
        if (Array.isArray(data) && data.length > 0) {
           setTopics(data);
        } else {
           console.warn("Fetched data is not an array or is empty, falling back to initial data.");
           setTopics(initialTopics);
        }
      } catch (error) {
        console.error('Failed to fetch topics, falling back to initial data:', error);
        setTopics(initialTopics);
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, []);

  // Function to update the remote JSON store
  const updateRemoteTopics = useCallback(async (updatedTopics: ForumTopic[]) => {
    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTopics),
      });
      if (!response.ok) {
        throw new Error('Failed to update topics on the server.');
      }
    } catch (error) {
      console.error('Error updating remote topics:', error);
    }
  }, []);

  const addTopic = (topicData: Omit<ForumTopic, 'id' | 'comments' | 'createdAt'>): string => {
    const newTopic: ForumTopic = {
      ...topicData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      comments: [],
    };
    
    const updatedTopics = [newTopic, ...topics];
    setTopics(updatedTopics); // Optimistic update
    updateRemoteTopics(updatedTopics); // Push to remote
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
        const comments = topic.comments || [];
        return {
          ...topic,
          comments: [newComment, ...comments],
        };
      }
      return topic;
    });

    setTopics(updatedTopics); // Optimistic update
    updateRemoteTopics(updatedTopics); // Push to remote
  };
  
  const getTopicById = (topicId: string): ForumTopic | undefined => {
    return topics.find(topic => topic.id === topicId);
  };

  return { topics, loading, getTopicById, addTopic, addComment };
};