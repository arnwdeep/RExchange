import React, { useState, useEffect, useRef } from 'react';
import { Camera, ShieldCheck, Sparkles, ArrowRight, LogOut, RotateCcw, Lock, CheckCircle, QrCode, ShieldAlert } from 'lucide-react';

export default function IDCard3D({
  studentData,
  onChange,
  onPhotoUpload,
  onSubmit,
  onInputFocusChange,
  avatarPresets = [],
  onSelectPresetAvatar,
  onTiltChange,
  onLogout,
  isTyping = false,
  readOnly = false
}) {
  const cardRef = useRef(null);
  const fileInputRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, glareX: 50, glareY: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  // Mouse Parallax 3D tilt tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const cardCenterX = rect.left + rect.width / 2;
      const cardCenterY = rect.top + rect.height / 2;

      // Distance from center (-1 to 1)
      const mouseX = (e.clientX - cardCenterX) / (window.innerWidth / 2);
      const mouseY = (e.clientY - cardCenterY) / (window.innerHeight / 2);

      // Max rotation: 12 degrees
      const rotY = mouseX * 12;
      const rotX = -mouseY * 12;

      const glareX = 50 + mouseX * 40;
      const glareY = 50 + mouseY * 40;

      const newTilt = { x: rotX, y: rotY, glareX, glareY };
      setTilt(newTilt);
      if (onTiltChange) onTiltChange(newTilt);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [onTiltChange]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && onPhotoUpload) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onPhotoUpload(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCardClick = (e) => {
    // If readOnly / post-login mode, clicking card flips it!
    if (readOnly) {
      e.stopPropagation();
      setIsFlipped(prev => !prev);
    }
  };

  const cardActiveGlow = isTyping ? 'shadow-[0_0_50px_rgba(255,107,0,0.5),0_20px_50px_rgba(0,0,0,0.9)] ring-2 ring-[#FF6B00]/60' : '';

  return (
    <div className="perspective-container flex justify-center items-center select-none py-1">
      <div
        ref={cardRef}
        onClick={handleCardClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y + (isFlipped ? 180 : 0)}deg) translateZ(${isHovered ? '15px' : '0px'})`,
          transition: isHovered ? 'transform 0.15s ease-out' : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        className="card-3d-wrapper relative w-[330px] sm:w-[370px] md:w-[395px] cursor-pointer"
        title={readOnly ? "Click to flip card & view logout option" : ""}
      >
        {/* TRANSPARENT PLASTIC ID CARD HOLDER (VINYL SLEEVE) - CLEAN FLOATING WITHOUT HEAVY BG */}
        <div className={`relative rounded-3xl p-1 sm:p-1.5 overflow-hidden transition-all duration-300 ${cardActiveGlow}`}>

          {/* Dynamic Specular Glare Reflection shifting with cursor */}
          <div
            className="vinyl-glare absolute -inset-[100%] z-40 opacity-70"
            style={{
              transform: `translate(${tilt.glareX - 50}%, ${tilt.glareY - 50}%) rotate(25deg)`
            }}
          />

          {/* Plastic Holder Header Construction: Punched Slot Hole & Eyelets */}
          <div className="relative w-full flex flex-col items-center mb-2">
            {/* Top Zipper Lock Seal Line */}
            <div className="zipper-line w-full h-2 rounded-full mb-2 opacity-70" />

            <div className="w-full flex items-center justify-between px-5">
              {/* Left Brass Eyelet */}
              <div className="w-3.5 h-3.5 rounded-full border-2 border-amber-300/60 bg-gradient-to-br from-zinc-800 to-zinc-950 shadow-inner flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-900" />
              </div>

              {/* Center Punched Oblong Slot Hole for Ring */}
              <div className="w-14 h-2.5 rounded-full bg-zinc-950/90 border border-white/30 shadow-[inset_0_2px_4px_rgba(0,0,0,0.9)] flex items-center justify-center">
                <div className="w-7 h-1 bg-white/20 rounded-full" />
              </div>

              {/* Right Brass Eyelet */}
              <div className="w-3.5 h-3.5 rounded-full border-2 border-amber-300/60 bg-gradient-to-br from-zinc-800 to-zinc-950 shadow-inner flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-900" />
              </div>
            </div>
          </div>

          {/* FRONT FACE OF THE MEMBER CARD */}
          {!isFlipped ? (
            <div className="card-paper-texture relative rounded-xl p-4 text-[#1A1918] shadow-inner border border-stone-300/60 overflow-hidden min-h-[440px] sm:min-h-[465px] flex flex-col justify-between">

              {/* Vintage paper corner stamp background accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-amber-100/60 to-transparent pointer-events-none" />

              {/* TOP BRANDING & CARD HEADER */}
              <div className="flex items-start justify-between border-b-2 border-[#1A1918] pb-1.5 mb-2.5">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tighter text-[#1A1918] leading-none uppercase font-helvetica">
                    REXCHANGE
                  </h1>
                  <p className="text-[9px] sm:text-[10px] font-bold tracking-widest text-[#1A1918]/80 uppercase font-helvetica mt-0.5">
                    EXCHANGE. SHARE. GROW.
                  </p>
                  <div className="inline-flex items-center gap-1 bg-[#1A1918] text-[#F7F4EB] px-2 py-0.5 rounded-full text-[8.5px] font-semibold tracking-wider mt-1 uppercase">
                    <ShieldCheck className="w-2.5 h-2.5 text-[#FF6B00]" />
                    STUDENT COMMUNITY
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-mono-code text-[10px] font-extrabold tracking-widest text-[#1A1918] bg-amber-200/70 px-1.5 py-0.5 rounded border border-[#1A1918]/20">
                    DROP : 01
                  </span>
                  <p className="text-[7.5px] font-mono-code text-[#1A1918]/60 mt-0.5 uppercase">
                    VERIFIED PASS
                  </p>
                </div>
              </div>

              {/* HIGH QUALITY DEFAULT STUDENT DP PHOTO AREA WITH VISIBLE UPLOAD OPTION */}
              <div className="flex flex-col items-center my-2 relative">
                <div
                  onClick={(e) => {
                    if (!readOnly && fileInputRef.current) {
                      e.stopPropagation();
                      fileInputRef.current.click();
                    }
                  }}
                  className="vintage-photo-frame relative w-28 h-32 sm:w-32 sm:h-36 bg-[#E5E7EB] rounded-sm overflow-hidden flex items-center justify-center shadow-inner cursor-pointer group transition-transform hover:scale-[1.02]"
                  title="Click to upload custom profile photo"
                >
                  {studentData.photoUrl ? (
                    <img
                      src={studentData.photoUrl}
                      alt="Student Profile"
                      className="w-full h-full object-cover filter contrast-[1.03] brightness-[0.99]"
                    />
                  ) : (
                    /* High Quality Crisp Vector Neutral Avatar SVG */
                    <div className="relative w-full h-full flex flex-col items-center justify-center">
                      <svg className="w-full h-full" viewBox="0 0 100 115" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="100" height="115" fill="#E5E7EB" />
                        <circle cx="50" cy="40" r="22" fill="#9CA3AF" />
                        <path d="M14 104C14 77 29 66 50 66C71 66 86 77 86 104V115H14V104Z" fill="#9CA3AF" />
                      </svg>
                    </div>
                  )}

                  {/* VISIBLE ALWAYS-ON CAMERA UPLOAD BADGE AT BOTTOM OF PHOTO */}
                  {!readOnly && (
                    <div className="absolute bottom-1 right-1 bg-black/80 text-white px-2 py-1 rounded border border-white/20 shadow-md flex items-center gap-1 backdrop-blur group-hover:bg-[#FF6B00] group-hover:text-black transition-colors z-20">
                      <Camera className="w-3 h-3 text-[#FF6B00] group-hover:text-black" />
                      <span className="text-[8px] font-mono-code font-black uppercase tracking-wider">
                        {studentData.photoUrl ? 'CHANGE' : '+ UPLOAD'}
                      </span>
                    </div>
                  )}

                  {/* Photo Hover Overlay */}
                  {!readOnly && (
                    <div className="absolute inset-0 bg-[#FF6B00]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10" />
                  )}
                </div>

                {!readOnly && (
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                )}
              </div>

              {/* HANDWRITTEN DIRECT INLINE EDITABLE DETAILS SECTION */}
              <div className="space-y-1.5 mt-2 text-left">

                {/* NAME FIELD */}
                <div className="relative pb-0.5">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[9.5px] font-extrabold tracking-wider text-[#1A1918]/70 uppercase shrink-0">
                      NAME:
                    </span>
                    {readOnly ? (
                      <span className="font-handwriting text-xl sm:text-2xl font-bold text-[#182B49] truncate pl-1">
                        {studentData.name}
                      </span>
                    ) : (
                      <input
                        type="text"
                        name="name"
                        value={studentData.name}
                        onChange={onChange}
                        onFocus={() => onInputFocusChange && onInputFocusChange(true)}
                        onBlur={() => onInputFocusChange && onInputFocusChange(false)}
                        placeholder="Write your name"
                        required
                        className="w-full bg-transparent font-handwriting text-xl sm:text-2xl font-bold text-[#182B49] focus:outline-none border-b-2 border-dashed border-[#1A1918]/40 focus:border-[#FF6B00] px-1 py-0"
                      />
                    )}
                  </div>
                </div>

                {/* REG. NO. FIELD */}
                <div className="relative pb-0.5">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[9.5px] font-extrabold tracking-wider text-[#1A1918]/70 uppercase shrink-0">
                      REG. NO:
                    </span>
                    {readOnly ? (
                      <span className="font-handwriting text-xl sm:text-2xl font-bold text-[#182B49] truncate pl-1">
                        {studentData.regNo}
                      </span>
                    ) : (
                      <input
                        type="text"
                        name="regNo"
                        value={studentData.regNo}
                        onChange={onChange}
                        onFocus={() => onInputFocusChange && onInputFocusChange(true)}
                        onBlur={() => onInputFocusChange && onInputFocusChange(false)}
                        placeholder="Enter reg number"
                        required
                        className="w-full bg-transparent font-handwriting text-xl sm:text-2xl font-bold text-[#182B49] focus:outline-none border-b-2 border-dashed border-[#1A1918]/40 focus:border-[#FF6B00] px-1 py-0"
                      />
                    )}
                  </div>
                </div>

                {/* DEPARTMENT FIELD */}
                <div className="relative pb-0.5">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[9.5px] font-extrabold tracking-wider text-[#1A1918]/70 uppercase shrink-0">
                      DEPT:
                    </span>
                    {readOnly ? (
                      <span className="font-handwriting text-lg sm:text-xl font-bold text-[#182B49] truncate pl-1">
                        {studentData.department}
                      </span>
                    ) : (
                      <input
                        type="text"
                        name="department"
                        value={studentData.department}
                        onChange={onChange}
                        onFocus={() => onInputFocusChange && onInputFocusChange(true)}
                        onBlur={() => onInputFocusChange && onInputFocusChange(false)}
                        placeholder="Enter department"
                        required
                        className="w-full bg-transparent font-handwriting text-lg sm:text-xl font-bold text-[#182B49] focus:outline-none border-b-2 border-dashed border-[#1A1918]/40 focus:border-[#FF6B00] px-1 py-0"
                      />
                    )}
                  </div>
                </div>

                {/* YEAR & COLLEGE ROW */}
                <div className="grid grid-cols-2 gap-2 relative pb-0.5">
                  <div>
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[9px] font-extrabold tracking-wider text-[#1A1918]/70 uppercase shrink-0">
                        YEAR:
                      </span>
                      {readOnly ? (
                        <span className="font-handwriting text-lg sm:text-xl font-bold text-[#182B49] truncate pl-1">
                          {studentData.year}
                        </span>
                      ) : (
                        <select
                          name="year"
                          value={studentData.year}
                          onChange={onChange}
                          onFocus={() => onInputFocusChange && onInputFocusChange(true)}
                          onBlur={() => onInputFocusChange && onInputFocusChange(false)}
                          className="w-full bg-transparent font-handwriting text-lg sm:text-xl font-bold text-[#182B49] focus:outline-none border-b-2 border-dashed border-[#1A1918]/40 focus:border-[#FF6B00] px-0.5 py-0 cursor-pointer [&>option]:bg-zinc-900 [&>option]:text-white"
                        >
                          <option value="1st Year">1st Year</option>
                          <option value="2nd Year">2nd Year</option>
                          <option value="3rd Year">3rd Year</option>
                          <option value="4th Year">4th Year</option>
                        </select>
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[9px] font-extrabold tracking-wider text-[#1A1918]/70 uppercase shrink-0">
                        UNIV:
                      </span>
                      {readOnly ? (
                        <span className="font-handwriting text-base sm:text-lg font-bold text-[#182B49] truncate pl-1">
                          {studentData.college}
                        </span>
                      ) : (
                        <input
                          type="text"
                          name="college"
                          value={studentData.college}
                          onChange={onChange}
                          onFocus={() => onInputFocusChange && onInputFocusChange(true)}
                          onBlur={() => onInputFocusChange && onInputFocusChange(false)}
                          placeholder="University"
                          required
                          className="w-full bg-transparent font-handwriting text-base sm:text-lg font-bold text-[#182B49] focus:outline-none border-b-2 border-dashed border-[#1A1918]/40 focus:border-[#FF6B00] px-1 py-0"
                        />
                      )}
                    </div>
                  </div>
                </div>

              </div>

              {/* EMBEDDED CTA BUTTON INSIDE CARD */}
              {!readOnly && onSubmit && (
                <div className="mt-2 pt-2 border-t border-[#1A1918]/20">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSubmit();
                    }}
                    className="group relative w-full py-2 px-3 rounded-lg bg-[#1A1918] hover:bg-[#FF6B00] text-[#F7F4EB] hover:text-black font-extrabold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-md cursor-pointer"
                  >
                    <span>Issue Identity Pass</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              )}

              {/* FOOTER NOTICE & SERIAL STAMP */}
              <div className="mt-2 pt-1.5 border-t border-[#1A1918]/30 flex items-center justify-between">
                <p className="text-[7px] font-extrabold leading-tight text-[#1A1918]/70 max-w-[190px] uppercase">
                  THE HOLDER OF THIS CARD IS AN OFFICIAL MEMBER OF REXCHANGE COMMUNITY
                </p>
                <span className="font-mono-code text-[10px] font-extrabold tracking-wider text-[#1A1918] bg-[#1A1918]/10 px-1.5 py-0.5 rounded">
                  RX-2026-STU
                </span>
              </div>

            </div>
          ) : (
            /* BACK FACE OF THE MEMBER CARD (DARK SECURITY IDENTITY & LOGOUT OPTION - MATCHING EXACT DIMENSIONS) */
            <div
              className="bg-[#0F172A] relative rounded-xl p-4 text-[#F3F4F6] shadow-2xl border border-zinc-700 overflow-hidden min-h-[440px] sm:min-h-[465px] flex flex-col justify-between"
              style={{ transform: 'rotateY(180deg)' }}
            >
              
              {/* MAGNETIC STRIPE ACROSS TOP */}
              <div className="-mx-4 -mt-4 mb-3 h-11 bg-zinc-950 border-b border-zinc-800 flex items-center px-4 justify-between">
                <div className="w-full h-7 bg-gradient-to-r from-zinc-900 via-zinc-950 to-zinc-900 rounded-sm flex items-center px-2">
                  <span className="text-[8px] font-mono-code text-zinc-500 tracking-widest">
                    MAGNETIC STRIP • SECURITY ENCRYPTED
                  </span>
                </div>
              </div>

              {/* BACK HEADER & SECURITY STATUS */}
              <div className="space-y-2 border-b border-zinc-800 pb-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono-code text-[#FF6B00] font-black uppercase tracking-wider flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5 text-[#FF6B00]" /> SECURITY VERIFIED
                  </span>
                  <span className="text-[9px] font-mono-code text-emerald-400 font-extrabold flex items-center gap-1 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-800/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> ACTIVE
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-extrabold text-white font-helvetica uppercase">
                    {studentData.name}
                  </h3>
                  <p className="text-xs font-mono-code text-zinc-300 font-bold">
                    {studentData.regNo} • {studentData.department}
                  </p>
                  <p className="text-[10px] font-mono-code text-zinc-400 mt-0.5">
                    {studentData.college} ({studentData.year})
                  </p>
                </div>
              </div>

              {/* TECHNICAL BARCODE & SECURITY QR CODE STAMP */}
              <div className="my-2 bg-zinc-950/90 border border-zinc-800 p-3 rounded-xl flex flex-col items-center justify-center space-y-1.5 shadow-inner">
                <div className="flex items-center justify-center gap-1 h-9 w-full px-2 bg-white rounded-sm py-1 opacity-90">
                  {/* Real CSS Barcode Lines */}
                  {[3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8, 9, 7, 9, 3, 2, 3, 8, 4, 6, 2, 5].map((w, idx) => (
                    <div key={idx} className="bg-black h-full" style={{ width: `${w * 1.5}px` }} />
                  ))}
                </div>
                <div className="flex items-center justify-between w-full text-[8.5px] font-mono-code text-zinc-400 px-1">
                  <span>NODE: RX-2026</span>
                  <span className="text-amber-300 font-bold">PASS: VERIFIED</span>
                </div>
              </div>

              {/* SECURITY TERMS NOTICE */}
              <div className="text-[7.5px] font-mono-code text-zinc-500 uppercase leading-tight border-t border-zinc-800/80 pt-2">
                This identity pass remains property of RExchange Student Network. Unauthorized reproduction or transfer is restricted.
              </div>

              {/* PROMINENT LOGOUT OPTION & FLIP BACK BUTTONS */}
              <div className="space-y-2 pt-2 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onLogout) onLogout();
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs uppercase font-mono-code tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(239,68,68,0.4)] cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>LOG OUT / EXIT PASS</span>
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsFlipped(false);
                  }}
                  className="w-full py-1.5 px-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white font-mono-code font-bold text-[10px] uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-zinc-800"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Flip back to Front</span>
                </button>
              </div>

            </div>
          )}

          {/* Plastic Holder Bottom Seam Detail */}
          <div className="w-full h-1 mt-1.5 rounded-full bg-white/10" />

        </div>
      </div>
    </div>
  );
}

export const IDCard3DMemoized = React.memo(IDCard3D);

