
import React, { useState } from 'react';
import { ForumTopic } from '../types';
import { UserProfile } from '../hooks/useUserProfile';
import { formatDistanceToNow } from 'date-fns';

interface TopicCardProps {
  topic: ForumTopic;
  onClick: () => void;
}

const TopicCard: React.FC<TopicCardProps> = ({ topic, onClick }) => {
  const timeAgo = formatDistanceToNow(new Date(topic.createdAt), { addSuffix: true });

  return (
    <div 
      onClick={onClick}
      className="bg-brand-dark border border-gray-800 rounded-lg p-5 flex items-start gap-4 cursor-pointer transition-all duration-300 hover:border-brand-purple hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand-purple/20"
    >
      <img src={topic.avatarUrl} alt={topic.author} className="w-12 h-12 rounded-full flex-shrink-0 mt-1 object-cover" />
      <div className="flex-grow">
        <h3 className="font-bold text-lg text-white mb-1 group-hover:text-brand-light-purple">{topic.title}</h3>
        <p className="text-sm text-brand-gray">
          by <span className="font-semibold text-brand-light-purple">{topic.author}</span> • {timeAgo}
        </p>
      </div>
      <div className="text-right flex-shrink-0">
        <div className="flex items-center gap-2 text-brand-gray">
          <span className="material-symbols-outlined text-lg">comment</span>
          <span className="font-semibold text-white">{topic.comments.length}</span>
        </div>
        <p className="text-xs text-brand-gray mt-1">Replies</p>
      </div>
    </div>
  );
};

const CreateTopicModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string, content: string }) => void;
}> = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      onSubmit({ title, content });
      setTitle('');
      setContent('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fadeIn" onClick={onClose}>
      <div className="bg-[#1C162D] rounded-xl border border-gray-800 w-full max-w-2xl" onClick={e => e.stopPropagation()}>
        <form onSubmit={handleSubmit} className="p-8">
          <h2 className="text-2xl font-bold mb-6 text-white">Create New Topic</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Topic Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full bg-[#2f2348] rounded-lg p-3 border border-gray-700 focus:ring-2 focus:ring-primary focus:border-primary text-white"
            />
            <textarea
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={6}
              className="w-full bg-[#2f2348] rounded-lg p-3 border border-gray-700 focus:ring-2 focus:ring-primary focus:border-primary text-white"
            />
          </div>
          <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-gray-800">
            <button type="button" onClick={onClose} className="text-gray-300 font-bold py-2 px-4 rounded-lg transition-colors hover:bg-gray-700">Cancel</button>
            <button type="submit" className="bg-primary hover:bg-primary/90 text-white font-bold py-2 px-6 rounded-lg transition-colors">Create Topic</button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface ForumPageProps {
  topics: ForumTopic[];
  onTopicClick: (id: string) => void;
  onCreateTopic: (data: Omit<ForumTopic, 'id' | 'comments' | 'createdAt'>) => void;
  profile: UserProfile;
  isProfileSet: boolean;
  onRequestProfileSetup: () => void;
}

const ForumPage: React.FC<ForumPageProps> = ({ topics, onTopicClick, onCreateTopic, profile, isProfileSet, onRequestProfileSetup }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateTopic = (data: { title: string, content: string }) => {
     onCreateTopic({
      ...data,
      author: profile.name,
      avatarUrl: profile.avatarUrl,
    });
    setIsModalOpen(false);
  };
  
  const handleCreateClick = () => {
    if (isProfileSet) {
      setIsModalOpen(true);
    } else {
      onRequestProfileSetup();
    }
  };

  const sortedTopics = [...topics].sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <section className="py-12 animate-fadeInUp">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold">Community Forum</h1>
          <p className="text-brand-gray mt-1">Discuss games, ask questions, and connect with other players.</p>
        </div>
        <button
          onClick={handleCreateClick}
          className="bg-brand-purple hover:bg-violet-500 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-brand-purple/50 flex items-center gap-2"
        >
          <span className="material-symbols-outlined">add_comment</span>
          <span>Create New Topic</span>
        </button>
      </div>

      <div className="space-y-4">
        {sortedTopics.map((topic, index) => (
           <div key={topic.id} className="animate-fadeInUp" style={{ animationDelay: `${index * 50}ms`}}>
             <TopicCard topic={topic} onClick={() => onTopicClick(topic.id)} />
          </div>
        ))}
      </div>
      
      <CreateTopicModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateTopic}
      />

    </section>
  );
};

export default ForumPage;
