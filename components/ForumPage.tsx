
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
      className="bg-brand-dark border border-gray-800 rounded-lg p-5 flex items-start gap-4 cursor-pointer transition-all duration-300 hover:border-brand-purple hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand-purple/20"
    >
      <img src={topic.avatarUrl} alt={topic.authorName} className="w-12 h-12 rounded-full flex-shrink-0 mt-1 object-cover" />
      <div className="flex-grow">
        <h3 className="font-bold text-lg text-white mb-1 group-hover:text-brand-light-purple">{topic.title[language]}</h3>
        <p className="text-sm text-brand-gray">
          {language === 'en' && t('forum.by') + ' '}<span className="font-semibold text-brand-light-purple">{topic.authorName}</span> • {timeAgo}
        </p>
      </div>
      <div className="text-right flex-shrink-0 flex items-center gap-1">
        <div className="flex items-center gap-2 text-brand-gray mr-2">
          <span className="material-symbols-outlined text-lg">comment</span>
          <span className="font-semibold text-white">{topic.comments.length}</span>
        </div>
        {canModify && (
            <>
                <button
                    onClick={onEdit}
                    className="p-2 text-brand-gray hover:text-yellow-400 rounded-full hover:bg-yellow-500/10 transition-colors"
                    aria-label="Edit topic"
                    title="Edit topic"
                >
                    <span className="material-symbols-outlined">edit</span>
                </button>
                <button
                    onClick={onDelete}
                    className="p-2 text-brand-gray hover:text-red-500 rounded-full hover:bg-red-500/10 transition-colors"
                    aria-label="Delete topic"
                    title="Delete topic"
                >
                    <span className="material-symbols-outlined">delete</span>
                </button>
            </>
        )}
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
    <section className="py-12 animate-fadeInUp">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold">{t('forum.title')}</h1>
          <p className="text-brand-gray mt-1">{t('forum.description')}</p>
        </div>
        <button
          onClick={handleCreateClick}
          className="bg-brand-purple hover:bg-violet-500 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-brand-purple/50 flex items-center gap-2"
        >
          <span className="material-symbols-outlined">add_comment</span>
          <span>{t('forum.createTopic')}</span>
        </button>
      </div>

      <div className="space-y-4">
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
    </section>
  );
};

export default ForumPage;