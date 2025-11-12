
import React, { useState } from 'react';
import { ForumTopic, ForumComment, User } from '../types';
import { formatDistanceToNow } from 'date-fns';
import { useToast } from '../hooks/useToast';
import { availableAvatars } from '../data/avatars';
import { useTranslation } from '../hooks/useTranslation';
import { enUS, tr } from 'date-fns/locale';

interface TopicDetailProps {
  topic: ForumTopic;
  onAddComment: (topicId: string, commentData: Omit<ForumComment, 'id' | 'createdAt'>) => void;
  onBack: () => void;
  currentUser: User | null;
  onRequestLogin: () => void;
  onDeleteTopic: (topicId: string) => void;
  onEditTopic: (topic: ForumTopic) => void;
}

const CommentCard: React.FC<{ comment: ForumComment }> = ({ comment }) => {
  const { language } = useTranslation();
  const locale = language === 'tr' ? tr : enUS;
  const timeAgo = formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true, locale });
  return (
    <div className="flex items-start gap-4 p-4 bg-brand-dark-2/50 rounded-lg border border-gray-800/50">
      <img src={comment.avatarUrl} alt={comment.authorName} className="w-10 h-10 rounded-full flex-shrink-0 mt-1 object-cover" />
      <div className="flex-grow">
        <div className="flex items-baseline gap-3">
          <p className="font-semibold text-white">{comment.authorName}</p>
          <p className="text-xs text-brand-gray">{timeAgo}</p>
        </div>
        <p className="text-brand-light-purple mt-1">{comment.content[language]}</p>
      </div>
    </div>
  );
};


const TopicDetail: React.FC<TopicDetailProps> = ({ topic, onAddComment, onBack, currentUser, onRequestLogin, onDeleteTopic, onEditTopic }) => {
  const [newComment, setNewComment] = useState('');
  const { showToast } = useToast();
  const { t, language } = useTranslation();
  const locale = language === 'tr' ? tr : enUS;
  const timeAgo = formatDistanceToNow(new Date(topic.createdAt), { addSuffix: true, locale });
  const canModify = currentUser?.id === topic.authorId || currentUser?.role === 'admin';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      onRequestLogin();
      return;
    }
    if (newComment.trim()) {
      onAddComment(topic.id, {
        authorId: currentUser.id,
        authorName: currentUser.username,
        avatarUrl: currentUser.avatarUrl,
        content: { en: newComment, tr: newComment }, // Simple save for both languages
      });
      setNewComment('');
    }
  };

  const handleCopy = () => {
    const textToCopy = topic.content[language];
    navigator.clipboard.writeText(textToCopy).then(() => {
      showToast(t('topic.copySuccess'), 'success');
    }).catch(err => {
      console.error('Failed to copy content: ', err);
      showToast(t('topic.copyError'), 'error');
    });
  };

  return (
    <section className="py-12 animate-fadeIn">
       <div className="max-w-4xl mx-auto">
          <button 
                onClick={onBack}
                className="mb-8 inline-flex items-center gap-2 text-brand-gray hover:text-white transition-colors"
                aria-label="Back to forum"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {t('topic.backToForum')}
            </button>
            
            {/* Original Post */}
            <div className="bg-brand-dark border border-gray-800 rounded-lg p-6 mb-8">
              <div className="flex justify-between items-start gap-4">
                <h1 className="text-3xl md:text-4xl font-extrabold mb-4 flex-1">{topic.title[language]}</h1>
                <div className="flex items-center">
                    <button
                        onClick={handleCopy}
                        className="p-2 text-brand-gray hover:text-white rounded-full hover:bg-brand-light-gray/20 transition-colors"
                        title={t('topic.copyContent')}
                        aria-label={t('topic.copyContent')}
                    >
                        <span className="material-symbols-outlined">content_copy</span>
                    </button>
                    {canModify && (
                        <>
                            <button
                                onClick={() => onEditTopic(topic)}
                                className="p-2 text-brand-gray hover:text-yellow-400 rounded-full hover:bg-yellow-500/10 transition-colors"
                                title={t('topic.editTopic')}
                                aria-label={t('topic.editTopic')}
                            >
                                <span className="material-symbols-outlined">edit</span>
                            </button>
                            <button
                                onClick={() => onDeleteTopic(topic.id)}
                                className="p-2 text-brand-gray hover:text-red-500 rounded-full hover:bg-red-500/10 transition-colors"
                                title={t('topic.deleteTopic')}
                                aria-label={t('topic.deleteTopic')}
                            >
                                <span className="material-symbols-outlined">delete</span>
                            </button>
                        </>
                    )}
                </div>
              </div>
              <div className="flex items-center gap-3 border-b border-gray-800 pb-4 mb-4">
                  <img src={topic.avatarUrl} alt={topic.authorName} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-white">{topic.authorName}</p>
                    <p className="text-sm text-brand-gray">{timeAgo}</p>
                  </div>
              </div>
               <div className="prose prose-invert prose-p:text-brand-gray text-lg max-w-none">
                    <p>{topic.content[language]}</p>
                </div>
            </div>

            {/* Comments Section */}
            <div className="space-y-4 mb-8">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <span className="material-symbols-outlined">forum</span>
                {t('topic.replies', { count: topic.comments.length.toString() })}
              </h2>
              {topic.comments.map(comment => (
                <CommentCard key={comment.id} comment={comment} />
              ))}
            </div>

            {/* Add Comment Form */}
            <div className="bg-brand-dark border border-gray-800 rounded-lg p-6">
               <h3 className="text-xl font-bold mb-4">{t('topic.leaveReply')}</h3>
               <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-start gap-4">
                 <img src={currentUser ? currentUser.avatarUrl : availableAvatars[0]} alt="Your avatar" className="w-10 h-10 rounded-full hidden sm:block object-cover" />
                 <div className="flex-grow w-full">
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder={currentUser ? t('topic.joinDiscussion') : t('topic.loginToComment')}
                      required
                      rows={3}
                      className="w-full bg-brand-dark-2 rounded-md p-3 border border-gray-700 focus:ring-brand-purple focus:border-brand-purple transition-colors"
                      disabled={!currentUser}
                    ></textarea>
                    <div className="text-right mt-3">
                       <button
                        type="submit"
                        className="bg-brand-purple hover:bg-violet-500 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 ease-in-out hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!currentUser}
                      >
                        {t('topic.postReply')}
                      </button>
                    </div>
                 </div>
               </form>
            </div>
       </div>
    </section>
  );
};

export default TopicDetail;