import { useState, useEffect, useCallback } from 'react';
import { ForumTopic, ForumComment } from '../types';
import { initialTopics } from '../data/forum';

// This is a free-to-use JSON storage bin.
// It acts as a simple, no-auth backend for this demo.
// You can view the data here: https://www.npoint.io/docs/4c76717a6c2364f3d2f2
const API_ENDPOINT = 'https://api.npoint.io/4c76717a6c2364f3d2f2';


export const useForum = () => {
  const [topics, setTopics] = useState<ForumTopic[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTopics = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(API_ENDPOINT);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      // Sort by date to ensure newest is first
      const sortedData = data.sort((a: ForumTopic, b: ForumTopic) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setTopics(sortedData);
    } catch (error) {
      console.error("Failed to fetch topics, falling back to initial data:", error);
      // If the API fails, load the default static topics
      setTopics(initialTopics);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTopics();
  }, [fetchTopics]);
  
  const updateRemoteTopics = async (updatedTopics: ForumTopic[]) => {
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
          console.error("Error updating remote topics:", error);
          // Here you might want to add error handling, like reverting the optimistic update
          // or showing a toast message to the user.
      }
  };


  const addTopic = (topicData: Omit<ForumTopic, 'id' | 'comments' | 'createdAt'>): string => {
    const newTopic: ForumTopic = {
      ...topicData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      comments: [],
    };
    
    // Optimistic update for better UX
    const updatedTopics = [newTopic, ...topics];
    setTopics(updatedTopics);

    // Persist to remote
    updateRemoteTopics(updatedTopics);

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
        // Ensure comments array exists
        const comments = topic.comments || [];
        return {
          ...topic,
          comments: [...comments, newComment],
        };
      }
      return topic;
    });

    // Optimistic update
    setTopics(updatedTopics);
    
    // Persist to remote
    updateRemoteTopics(updatedTopics);
  };
  
  const getTopicById = (topicId: string): ForumTopic | undefined => {
    return topics.find(topic => topic.id === topicId);
  };

  return { topics, loading, getTopicById, addTopic, addComment };
};