import React from 'react';
import BackgroundCanvas from './BackgroundCanvas';
import HangingLanyard from './HangingLanyard';
import IDCard3D from './IDCard3D';
import { Volume2, VolumeX } from 'lucide-react';

export default function LoginView({
  studentData,
  onChange,
  onPhotoUpload,
  onLoginSuccess,
  isTyping,
  setIsTyping,
  cardTilt,
  setCardTilt,
  soundEnabled,
  setSoundEnabled
}) {
  return (
    <div className="relative h-screen w-screen max-h-screen overflow-hidden flex flex-col justify-between selection:bg-[#FF6B00] selection:text-black">
      
      {/* 3D Dark Atmospheric Canvas Background */}
      <BackgroundCanvas />

      {/* TOP BRANDING & TOOLBAR */}
      <header className="relative z-30 w-full px-6 py-2 flex items-center justify-between max-w-7xl mx-auto shrink-0">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white uppercase leading-none font-helvetica">
              REXCHANGE
            </h1>
            <p className="text-[8.5px] font-bold tracking-widest text-[#FF6B00] uppercase font-helvetica mt-0.5">
              EXCHANGE • SHARE • GROW
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-xl border border-zinc-800 bg-zinc-950/80 text-zinc-300 hover:text-[#FF6B00] hover:border-[#FF6B00]/40 transition-all flex items-center gap-2 text-xs font-semibold backdrop-blur cursor-pointer"
            title="Toggle haptic key sounds"
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-4 h-4 text-[#FF6B00]" />
                <span className="hidden sm:inline">Audio FX On</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-zinc-500" />
                <span className="hidden sm:inline">Muted</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* HERO SECTION: SHORTENED LANYARD & LIFTED ID CARD */}
      <main className="relative z-20 w-full max-w-4xl mx-auto flex flex-col items-center justify-start flex-1 min-h-0 -mt-6 sm:-mt-8 pt-0 pb-6 px-4">
        
        {/* Shortened Lanyard hanging naturally from top edge of screen */}
        <HangingLanyard isTyping={isTyping} tilt={cardTilt} />

        {/* 3D Physical ID Card Component anchored directly under lanyard ring */}
        <div className="-mt-3.5 w-full flex justify-center">
          <IDCard3D
            studentData={studentData}
            onChange={onChange}
            onPhotoUpload={onPhotoUpload}
            onSubmit={onLoginSuccess}
            onInputFocusChange={setIsTyping}
            onTiltChange={setCardTilt}
            isTyping={isTyping}
          />
        </div>

      </main>

      {/* FOOTER WITH HELVETICA FONT */}
      <footer className="relative z-20 w-full py-2 px-6 text-center text-xs border-t border-zinc-900 bg-black/60 backdrop-blur shrink-0 font-helvetica">
        <p className="flex items-center justify-center gap-1.5 font-medium text-[11px] sm:text-xs">
          <span className="text-zinc-400">RExchange Student Community</span>
          <span className="text-zinc-600">•</span>
          <span className="text-[#FF6B00] font-semibold">Click details or DP on card to edit directly • Click Issue Identity Pass to enter homepage</span>
        </p>
      </footer>

    </div>
  );
}
