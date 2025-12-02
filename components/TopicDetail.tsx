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
    <div className="flex gap-4 p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/5 hover:border-white/10 transition-all">
      <div className="flex-shrink-0">
         <img src={comment.avatarUrl} alt={comment.authorName} className="w-12 h-12 rounded-xl object-cover border border-white/10" />
      </div>
      <div className="flex-grow">
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-2">
          <span className="font-bold text-white text-lg">{comment.authorName}</span>
          <span className="text-xs text-brand-gray">{timeAgo}</span>
        </div>
        <p className="text-gray-300 leading-relaxed">{comment.content[language]}</p>
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
    <div className="relative min-h-screen pb-20">
       {/* Ambient Background */}
       <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-[#0f0720]/95 z-10"></div>
          {/* Use avatar as a blurred background blob for theme consistency with user */}
          <img src={topic.avatarUrl} className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[600px] object-cover blur-[120px] opacity-20" alt="" />
      </div>

       <div className="relative z-10 max-w-4xl mx-auto pt-8">
          <button 
                onClick={onBack}
                className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-all backdrop-blur-md"
            >
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                <span className="text-sm font-bold">{t('topic.backToForum')}</span>
            </button>
            
            {/* Original Post */}
            <div className="bg-[#1a102e]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-8 shadow-2xl relative overflow-hidden">
              {/* Decorative top border */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-purple to-transparent opacity-50"></div>
              
              <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
                <h1 className="text-3xl md:text-4xl font-black text-white leading-tight flex-1">{topic.title[language]}</h1>
                <div className="flex items-center gap-2 bg-white/5 p-1 rounded-full border border-white/5">
                    <button
                        onClick={handleCopy}
                        className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
                        title={t('topic.copyContent')}
                    >
                        <span className="material-symbols-outlined text-[20px]">content_copy</span>
                    </button>
                    {canModify && (
                        <>
                            <div className="w-px h-6 bg-white/10"></div>
                            <button
                                onClick={() => onEditTopic(topic)}
                                className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-yellow-400 rounded-full hover:bg-yellow-500/10 transition-colors"
                                title={t('topic.editTopic')}
                            >
                                <span className="material-symbols-outlined text-[20px]">edit</span>
                            </button>
                            <button
                                onClick={() => onDeleteTopic(topic.id)}
                                className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-red-400 rounded-full hover:bg-red-500/10 transition-colors"
                                title={t('topic.deleteTopic')}
                            >
                                <span className="material-symbols-outlined text-[20px]">delete</span>
                            </button>
                        </>
                    )}
                </div>
              </div>

              <div className="flex items-center gap-4 border-b border-white/5 pb-6 mb-6">
                  <div className="relative">
                     <img src={topic.avatarUrl} alt={topic.authorName} className="w-14 h-14 rounded-2xl object-cover border-2 border-white/10" />
                     <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-[#1a102e] rounded-full"></div>
                  </div>
                  <div>
                    <p className="font-bold text-lg text-white">{topic.authorName}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                        <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                        <span>{timeAgo}</span>
                    </div>
                  </div>
              </div>
              
               <div className="prose prose-invert prose-lg max-w-none text-gray-200">
                    <p className="whitespace-pre-wrap">{topic.content[language]}</p>
                </div>
            </div>

            {/* Comments Section */}
            <div className="space-y-6 mb-12">
              <div className="flex items-center gap-3 mb-6">
                 <div className="h-px flex-1 bg-white/10"></div>
                 <h2 className="text-xl font-bold text-white flex items-center gap-2 px-4 py-1 bg-white/5 rounded-full border border-white/10">
                    <span className="material-symbols-outlined text-brand-purple">forum</span>
                    {t('topic.replies', { count: topic.comments.length.toString() })}
                 </h2>
                 <div className="h-px flex-1 bg-white/10"></div>
              </div>
              
              <div className="space-y-4">
                  {topic.comments.map(comment => (
                    <CommentCard key={comment.id} comment={comment} />
                  ))}
                  {topic.comments.length === 0 && (
                      <p className="text-center text-gray-500 italic py-8">No replies yet. Be the first!</p>
                  )}
              </div>
            </div>

            {/* Add Comment Form */}
            <div className="sticky bottom-6 z-20">
                <div className="bg-[#1C162D]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl ring-1 ring-white/5">
                   <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                       <span className="material-symbols-outlined text-brand-light-purple">reply</span>
                       {t('topic.leaveReply')}
                   </h3>
                   <form onSubmit={handleSubmit} className="flex gap-4">
                     <img src={currentUser ? currentUser.avatarUrl : availableAvatars[0]} alt="Your avatar" className="w-10 h-10 rounded-full hidden sm:block object-cover border border-white/10 opacity-50" />
                     <div className="flex-grow flex flex-col gap-3">
                        <textarea
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          placeholder={currentUser ? t('topic.joinDiscussion') : t('topic.loginToComment')}
                          required
                          rows={2}
                          className="w-full bg-[#0f0720] rounded-xl p-4 border border-gray-700 focus:ring-2 focus:ring-brand-purple focus:border-brand-purple transition-all text-white resize-none"
                          disabled={!currentUser}
                        ></textarea>
                        <div className="flex justify-end">
                           <button
                            type="submit"
                            className="bg-brand-purple hover:bg-violet-500 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 shadow-lg shadow-brand-purple/20 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={!currentUser}
                          >
                            <span>{t('topic.postReply')}</span>
                            <span className="material-symbols-outlined text-[18px]">send</span>
                          </button>
                        </div>
                     </div>
                   </form>
                </div>
            </div>
       </div>
    </div>
  );
};

export default TopicDetail;