import React from 'react';

export default function HangingLanyard({ isTyping, tilt = { x: 0, y: 0 } }) {
  // Compute dynamic sway angle and subtle stretch scale from tilt coordinates
  const swayAngle = tilt.y * 0.4;
  const stretchScale = 1 + Math.abs(tilt.x) * 0.006;

  return (
    <div
      className="relative flex flex-col items-center z-30 w-full pointer-events-none select-none origin-top transition-transform duration-100 ease-out -mt-16 sm:-mt-20"
      style={{
        transform: `rotate(${swayAngle}deg) scaleY(${stretchScale})`,
      }}
    >
      {/* Shortened Black fabric lanyard extending off top edge of screen */}
      <div className="w-8 sm:w-9 h-24 sm:h-28 bg-[#121115] border-x border-[#2A2830] shadow-2xl relative overflow-hidden flex flex-col items-center justify-between transition-all">

        {/* Fabric texture weave */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:4px_4px] opacity-10" />

        {/* Dynamic orange glowing border edges */}
        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#FF6B00] via-[#FF6B00]/40 to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#FF6B00] via-[#FF6B00]/40 to-transparent" />

        {/* Repeating REXCHANGE text down the lanyard */}
        <div className="flex flex-col items-center justify-around h-full py-1 font-mono-code text-[9px] font-extrabold tracking-widest text-[#FF6B00] opacity-90 uppercase rotate-90 whitespace-nowrap drop-shadow-[0_0_8px_rgba(255,107,0,0.6)]">
          <span>REXCHANGE • SHARE</span>
        </div>
      </div>

      {/* Heavy Metal Clasp & Swivel Hook assembly */}
      <div className="relative flex flex-col items-center -mt-1 z-30">
        {/* Heavy Black/Steel Buckle */}
        <div className="w-9 h-3.5 bg-gradient-to-r from-zinc-800 via-zinc-600 to-zinc-800 rounded-sm border border-zinc-500 shadow-md flex items-center justify-center relative">
          <div className="w-6 h-1 bg-zinc-950 rounded-full" />
          <div className="absolute -bottom-1 w-4 h-2 bg-zinc-700 rounded-b-sm border-x border-b border-zinc-500" />
        </div>

        {/* Swivel Hook */}
        <div className="w-2.5 h-4 bg-gradient-to-b from-zinc-400 via-zinc-300 to-zinc-600 rounded-full border border-zinc-400 shadow-lg -mt-0.5 flex items-end justify-center pb-0.5">
          <div className="w-1 h-2 bg-zinc-800 rounded-full" />
        </div>

        {/* Metallic Circular Ring that loops through the card's center slot */}
        <div className="w-7 h-7 rounded-full border-[3px] border-zinc-300 bg-zinc-900/40 shadow-[0_0_10px_rgba(0,0,0,0.6),inset_0_0_4px_rgba(255,255,255,0.8)] -mt-2 z-40 flex items-center justify-center">
          <div className="w-4 h-4 rounded-full border border-zinc-400 opacity-70" />
        </div>
      </div>
    </div>
  );
}
