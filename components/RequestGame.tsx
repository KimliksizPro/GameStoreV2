import React, { useState } from 'react';
import { useToast } from '../hooks/useToast';

interface RequestGameProps {
  onBack: () => void;
}

const RequestGame: React.FC<RequestGameProps> = ({ onBack }) => {
  const [gameTitle, setGameTitle] = useState('');
  const [reason, setReason] = useState('');
  const { showToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (gameTitle.trim()) {
      showToast(`Request for "${gameTitle}" submitted successfully!`, 'success');
      setGameTitle('');
      setReason('');
    } else {
      showToast('Please enter a game title.', 'error');
    }
  };

  return (
    <section className="py-12 md:py-20 animate-fadeInUp">
      <button 
        onClick={onBack}
        className="mb-8 inline-flex items-center gap-2 text-brand-gray hover:text-white transition-colors"
        aria-label="Back to store"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
        Back to Store
      </button>

      <div className="max-w-2xl mx-auto bg-brand-dark p-8 rounded-lg shadow-2xl shadow-brand-purple/20 border border-gray-800">
        <h1 className="text-3xl font-bold text-center mb-2">Request a Game</h1>
        <p className="text-brand-gray text-center mb-6">Is there a game you'd love to see on our site? Let us know!</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="gameTitle" className="block text-sm font-medium text-brand-gray mb-2">Game Title</label>
            <input
              type="text"
              name="gameTitle"
              id="gameTitle"
              value={gameTitle}
              onChange={(e) => setGameTitle(e.target.value)}
              placeholder="e.g., Stellar Odyssey"
              required
              className="w-full bg-brand-light-gray/20 rounded-md p-3 border border-gray-700 focus:ring-brand-purple focus:border-brand-purple transition-colors"
            />
          </div>
          <div>
            <label htmlFor="reason" className="block text-sm font-medium text-brand-gray mb-2">Why do you want this game? (Optional)</label>
            <textarea
              name="reason"
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={4}
              placeholder="e.g., It's a classic indie gem with a great story..."
              className="w-full bg-brand-light-gray/20 rounded-md p-3 border border-gray-700 focus:ring-brand-purple focus:border-brand-purple transition-colors"
            ></textarea>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="w-full sm:w-auto bg-brand-purple hover:bg-violet-500 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-brand-purple/50 focus:outline-none focus:shadow-lg focus:shadow-brand-purple/50"
            >
              Send Request
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default RequestGame;