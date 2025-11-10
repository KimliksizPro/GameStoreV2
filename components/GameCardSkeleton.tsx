import React from 'react';

const GameCardSkeleton: React.FC = () => {
  return (
    <div className="animate-shimmer">
      <div className="bg-brand-dark rounded-lg aspect-[2/3] mb-3"></div>
      <div className="h-5 w-3/4 bg-brand-dark rounded-md mb-2"></div>
      <div className="h-4 w-1/2 bg-brand-dark rounded-md"></div>
    </div>
  );
};

export default GameCardSkeleton;