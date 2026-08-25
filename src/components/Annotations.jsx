import React from 'react';

export default function Annotations() {
  return (
    <div className="absolute inset-0 pointer-events-none z-20 hidden lg:block overflow-hidden">
      
      {/* Top Left Annotation */}
      <div className="absolute top-28 left-[8%] flex flex-col items-start animate-float">
        <span className="font-handwriting text-[#FF6B00] text-xl font-bold tracking-wide drop-shadow-[0_0_8px_rgba(255,107,0,0.5)]">
          Welcome to RExchange ✦
        </span>
        <svg className="w-16 h-10 text-[#FF6B00] opacity-80 mt-1" viewBox="0 0 100 60" fill="none" stroke="currentColor">
          <path d="M10 10 Q 50 50 90 20" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="4 2" />
          <path d="M75 12 L 92 18 L 82 32" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Top Right Annotation */}
      <div className="absolute top-36 right-[10%] flex flex-col items-end animate-float [animation-delay:2s]">
        <span className="font-handwriting text-[#FF8800] text-xl font-bold tracking-wide drop-shadow-[0_0_8px_rgba(255,107,0,0.5)]">
          Real-time ID Update ↑
        </span>
        <svg className="w-20 h-12 text-[#FF8800] opacity-80 mt-1" viewBox="0 0 100 60" fill="none" stroke="currentColor">
          <path d="M90 10 Q 50 45 15 15" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="4 2" />
          <path d="M28 10 L 10 12 L 18 28" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Bottom Left Annotation */}
      <div className="absolute bottom-24 left-[12%] flex flex-col items-start animate-float [animation-delay:4s]">
        <svg className="w-16 h-10 text-[#FF6B00] opacity-80 mb-1" viewBox="0 0 100 60" fill="none" stroke="currentColor">
          <path d="M10 50 Q 50 10 90 40" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M78 48 L 92 42 L 88 28" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="font-handwriting text-[#FF6B00] text-lg font-bold tracking-wide">
          Ready to exchange?
        </span>
      </div>

      {/* Bottom Right Annotation */}
      <div className="absolute bottom-32 right-[12%] flex flex-col items-end animate-float [animation-delay:1s]">
        <span className="font-handwriting text-[#FF8800] text-xl font-bold tracking-wide">
          Your campus starts here →
        </span>
        <svg className="w-24 h-6 text-[#FF8800] opacity-80 mt-1" viewBox="0 0 120 30" fill="none" stroke="currentColor">
          <path d="M5 15 Q 60 25 115 10" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M102 4 L 117 10 L 108 22" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

    </div>
  );
}
