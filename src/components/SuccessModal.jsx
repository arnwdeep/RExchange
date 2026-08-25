import React from 'react';
import { CheckCircle2, Download, ExternalLink, RefreshCw, Sparkles, ShieldCheck } from 'lucide-react';
import IDCard3D from './IDCard3D';

export default function SuccessModal({ studentData, onReset, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-[fadeIn_0.3s_ease-out]">
      <div className="relative w-full max-w-2xl bg-zinc-950 border-2 border-[#FF6B00] rounded-3xl p-6 sm:p-8 text-center shadow-[0_0_80px_rgba(255,107,0,0.4)] overflow-hidden max-h-[95vh] overflow-y-auto">
        
        {/* Glowing top ambient light */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-[#FF6B00]/20 blur-3xl pointer-events-none" />

        {/* Success Icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#FF6B00]/15 border-2 border-[#FF6B00] text-[#FF6B00] mb-4 shadow-[0_0_20px_rgba(255,107,0,0.5)]">
          <CheckCircle2 className="w-9 h-9 animate-bounce" />
        </div>

        <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-white mb-1">
          Identity Verified!
        </h2>
        <p className="font-handwriting text-[#FF6B00] text-xl sm:text-2xl mb-4">
          Welcome to the RExchange Student Community, {studentData.name || 'Member'}!
        </p>

        {/* Small Card Display */}
        <div className="my-2 transform scale-90 sm:scale-95 transition-transform">
          <IDCard3D studentData={studentData} isTyping={false} onTriggerPhotoUpload={() => {}} />
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
          <button
            onClick={() => window.print()}
            className="w-full sm:w-auto px-6 py-3 rounded-xl border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md"
          >
            <Download className="w-4 h-4 text-[#FF6B00]" />
            <span>Save / Print ID Pass</span>
          </button>

          <button
            onClick={onReset}
            className="w-full sm:w-auto px-6 py-3 rounded-xl border border-[#FF6B00]/40 bg-[#FF6B00]/10 hover:bg-[#FF6B00]/20 text-[#FF6B00] font-bold text-sm flex items-center justify-center gap-2 transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Edit Information</span>
          </button>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#FF8800] text-black font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,107,0,0.5)] hover:scale-105 transition-all"
          >
            <span>Proceed to Community</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
