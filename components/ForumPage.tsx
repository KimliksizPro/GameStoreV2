
import React from 'react';
import { ForumTopic, User } from '../types';
import { formatDistanceToNow } from 'date-fns';
import { useTranslation } from '../hooks/useTranslation';
import { enUS, tr } from 'date-fns/locale';

interface TopicCardProps {
  topic: ForumTopic;
  onClick: () => void;
  onDelete: (e: React.MouseEvent) => void;
  onEdit: (e: React.MouseEvent) => void;
  canModify: boolean;
}

const TopicCard: React.FC<TopicCardProps> = ({ topic, onClick, onDelete, onEdit, canModify }) => {
  const { language, t } = useTranslation();
  const locale = language === 'tr' ? tr : enUS;
  const timeAgo = formatDistanceToNow(new Date(topic.createdAt), { addSuffix: true, locale });

  return (
    <div 
      onClick={onClick}
      className="group relative bg-[#1a102e]/60 backdrop-blur-md border border-white/5 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:border-brand-purple/50 hover:shadow-[0_0_20px_rgba(124,58,237,0.15)] hover:-translate-y-1 flex flex-col h-full"
    >
      <div className="flex items-start gap-4 mb-4">
          <div className="relative">
             <img src={topic.avatarUrl} alt={topic.authorName} className="w-12 h-12 rounded-xl object-cover border border-white/10" />
             <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-[#1a102e] rounded-full"></div>
          </div>
          <div>
              <h3 className="font-bold text-lg text-white leading-tight group-hover:text-brand-light-purple transition-colors line-clamp-2">{topic.title[language]}</h3>
              <p className="text-xs text-brand-gray mt-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">person</span>
                  <span className="font-medium text-white">{topic.authorName}</span>
              </p>
          </div>
      </div>
      
      <p className="text-sm text-gray-400 line-clamp-3 mb-6 flex-grow">{topic.content[language]}</p>

      <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-gray-500">
        <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">schedule</span>
            {timeAgo}
        </span>
        
        <div className="flex items-center gap-3">
             <div className="flex items-center gap-1 text-brand-light-purple bg-brand-purple/10 px-2 py-1 rounded-full">
                <span className="material-symbols-outlined text-[16px]">chat_bubble</span>
                <span className="font-bold">{topic.comments.length}</span>
             </div>
             {canModify && (
                <div className="flex items-center gap-1">
                     <button
                        onClick={onEdit}
                        className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                        title="Edit"
                    >
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                    </button>
                    <button
                        onClick={onDelete}
                        className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                        title="Delete"
                    >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                </div>
             )}
        </div>
      </div>
    </div>
  );
};


interface ForumPageProps {
  topics: ForumTopic[];
  onTopicClick: (id: string) => void;
  onOpenCreateTopic: () => void;
  currentUser: User | null;
  onRequestLogin: () => void;
  onDeleteTopic: (id: string) => void;
  onEditTopic: (topic: ForumTopic) => void;
}

const ForumPage: React.FC<ForumPageProps> = ({ topics, onTopicClick, onOpenCreateTopic, currentUser, onRequestLogin, onDeleteTopic, onEditTopic }) => {
  const { t } = useTranslation();

  const handleCreateClick = () => {
    if (currentUser) {
      onOpenCreateTopic();
    } else {
      onRequestLogin();
    }
  };

  const sortedTopics = [...topics].sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <section className="py-12 animate-fadeIn">
      {/* Header Section */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#2e1065] to-[#1e1b4b] border border-white/10 p-8 mb-12 shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-purple/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-2">{t('forum.title')}</h1>
              <p className="text-lg text-brand-light-purple max-w-xl">{t('forum.description')}</p>
            </div>
            <button
              onClick={handleCreateClick}
              className="bg-brand-purple hover:bg-violet-500 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:-translate-y-1 flex items-center gap-3 border border-white/10"
            >
              <span className="material-symbols-outlined text-2xl">add_circle</span>
              <span className="text-lg">{t('forum.createTopic')}</span>
            </button>
          </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedTopics.map((topic, index) => {
           const canModify = currentUser?.id === topic.authorId || currentUser?.role === 'admin';
           return (
             <div key={topic.id} className="animate-fadeInUp" style={{ animationDelay: `${index * 50}ms`}}>
               <TopicCard
                  topic={topic}
                  onClick={() => onTopicClick(topic.id)}
                  canModify={canModify}
                  onEdit={(e) => {
                      e.stopPropagation();
                      onEditTopic(topic);
                  }}
                  onDelete={(e) => {
                      e.stopPropagation();
                      onDeleteTopic(topic.id);
                  }}
              />
            </div>
           );
        })}
      </div>
      
      {sortedTopics.length === 0 && (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/5 border-dashed">
              <span className="material-symbols-outlined text-6xl text-brand-gray/50 mb-4">forum</span>
              <h3 className="text-xl font-bold text-white mb-2">No discussions yet</h3>
              <p className="text-gray-400">Be the first to start a conversation!</p>
          </div>
      )}
    </section>
  );
};

export default ForumPage;
