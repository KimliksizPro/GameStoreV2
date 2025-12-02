import React, { useState, useEffect } from 'react';
import { useTranslation } from '../hooks/useTranslation';

interface TopicModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string; content: string }) => void;
  initialData?: { title: string; content: string };
}

const TopicModal: React.FC<TopicModalProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { t } = useTranslation();

  const isEditing = !!initialData;

  useEffect(() => {
    if (isOpen) {
      if (isEditing) {
        setTitle(initialData.title);
        setContent(initialData.content);
      } else {
        setTitle('');
        setContent('');
      }
    }
  }, [isOpen, initialData, isEditing]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      onSubmit({ title, content });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn" onClick={onClose}>
      <div className="bg-[#1C162D] rounded-3xl border border-white/10 w-full max-w-2xl shadow-2xl relative overflow-hidden" onClick={e => e.stopPropagation()}>
        {/* Glow Effect */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-purple/20 blur-3xl rounded-full pointer-events-none"></div>

        <form onSubmit={handleSubmit} className="p-8 relative z-10">
          <h2 className="text-3xl font-black mb-6 text-white flex items-center gap-3">
             <span className="material-symbols-outlined text-brand-purple text-4xl">post_add</span>
             {isEditing ? t('modals.editTopic') : t('modals.createTopic')}
          </h2>
          
          <div className="space-y-6">
            <div>
                <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider">{t('modals.topicTitle')}</label>
                <input
                type="text"
                placeholder="Enter a catchy title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full bg-[#0f0720] rounded-xl p-4 border border-gray-700 focus:ring-2 focus:ring-brand-purple focus:border-brand-purple text-white transition-all font-bold text-lg"
                />
            </div>
            
            <div>
                <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider">Content</label>
                <textarea
                placeholder={t('modals.topicPlaceholder')}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows={6}
                className="w-full bg-[#0f0720] rounded-xl p-4 border border-gray-700 focus:ring-2 focus:ring-brand-purple focus:border-brand-purple text-white transition-all resize-none"
                />
            </div>
          </div>
          
          <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-white/5">
            <button type="button" onClick={onClose} className="text-gray-400 font-bold py-3 px-6 rounded-xl transition-colors hover:text-white hover:bg-white/5">{t('modals.cancel')}</button>
            <button type="submit" className="bg-brand-purple hover:bg-violet-500 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-brand-purple/30">
                {isEditing ? t('modals.saveChanges') : t('modals.createTopic')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TopicModal;