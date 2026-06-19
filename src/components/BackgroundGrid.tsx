import React from 'react';

interface BackgroundGridProps {
  panX: number;
  panY: number;
}

export const BackgroundGrid: React.FC<BackgroundGridProps> = ({ panX, panY }) => {
  return (
    <div
      className="absolute inset-0 pointer-events-none transition-all duration-75 ease-out"
      style={{
        backgroundColor: '#F5F5F3',
        backgroundImage: `
          linear-gradient(to right, rgba(210, 207, 198, 0.4) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(210, 207, 198, 0.4) 1px, transparent 1px)
        `,
        backgroundSize: '100px 100px',
        backgroundPosition: `${panX}px ${panY}px`,
      }}
    >
      {/* Decorative center axis markings matching the high-end architectural blueprint theme */}
      <div 
        className="absolute top-1/2 left-0 w-full h-[1px] bg-amber-800/5"
        style={{ transform: `translateY(${panY}px)` }}
      />
      <div 
        className="absolute left-1/2 top-0 h-full w-[1px] bg-amber-800/5"
        style={{ transform: `translateX(${panX}px)` }}
      />
    </div>
  );
};
