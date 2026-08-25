import React, { useRef } from 'react';
import { ArrowRight, Upload, Sparkles, User, Hash, BookOpen, GraduationCap, Building } from 'lucide-react';

export default function OnboardingForm({
  studentData,
  onChange,
  onPhotoUpload,
  onSubmit,
  onInputFocusChange,
  avatarPresets,
  onSelectPresetAvatar
}) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onPhotoUpload(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="w-full max-w-xl mx-auto space-y-4 bg-zinc-950/70 p-5 sm:p-7 rounded-2xl border border-[#FF6B00]/25 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(255,107,0,0.12)] backdrop-blur-md"
    >
      <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-2">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span>Create your student identity</span>
            <Sparkles className="w-5 h-5 text-[#FF6B00] animate-pulse" />
          </h2>
          <p className="font-handwriting text-[#FF6B00] text-base sm:text-lg">
            Your details become your RExchange ID card live.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* FULL NAME */}
        <div className="space-y-1 sm:col-span-2">
          <label className="flex items-center gap-1.5 font-handwriting text-[#FF6B00] text-base font-semibold">
            <User className="w-4 h-4" /> Full Name
          </label>
          <div className="neon-input rounded-xl relative flex items-center px-3.5 py-2.5">
            <input
              type="text"
              name="name"
              value={studentData.name}
              onChange={onChange}
              onFocus={() => onInputFocusChange(true)}
              onBlur={() => onInputFocusChange(false)}
              placeholder="Write your name"
              required
              className="w-full bg-transparent text-white placeholder-zinc-500 focus:outline-none font-sans text-sm sm:text-base font-medium"
            />
          </div>
        </div>

        {/* REGISTRATION NUMBER */}
        <div className="space-y-1">
          <label className="flex items-center gap-1.5 font-handwriting text-[#FF6B00] text-base font-semibold">
            <Hash className="w-4 h-4" /> Registration Number
          </label>
          <div className="neon-input rounded-xl relative flex items-center px-3.5 py-2.5">
            <input
              type="text"
              name="regNo"
              value={studentData.regNo}
              onChange={onChange}
              onFocus={() => onInputFocusChange(true)}
              onBlur={() => onInputFocusChange(false)}
              placeholder="Enter registration number"
              required
              className="w-full bg-transparent text-white placeholder-zinc-500 focus:outline-none font-sans text-sm font-medium"
            />
          </div>
        </div>

        {/* DEPARTMENT */}
        <div className="space-y-1">
          <label className="flex items-center gap-1.5 font-handwriting text-[#FF6B00] text-base font-semibold">
            <BookOpen className="w-4 h-4" /> Department
          </label>
          <div className="neon-input rounded-xl relative flex items-center px-3.5 py-2.5">
            <input
              type="text"
              name="department"
              value={studentData.department}
              onChange={onChange}
              onFocus={() => onInputFocusChange(true)}
              onBlur={() => onInputFocusChange(false)}
              placeholder="Enter department"
              required
              className="w-full bg-transparent text-white placeholder-zinc-500 focus:outline-none font-sans text-sm font-medium"
            />
          </div>
        </div>

        {/* YEAR DROPDOWN */}
        <div className="space-y-1">
          <label className="flex items-center gap-1.5 font-handwriting text-[#FF6B00] text-base font-semibold">
            <GraduationCap className="w-4 h-4" /> Year
          </label>
          <div className="neon-input rounded-xl relative flex items-center px-3.5 py-2.5">
            <select
              name="year"
              value={studentData.year}
              onChange={onChange}
              onFocus={() => onInputFocusChange(true)}
              onBlur={() => onInputFocusChange(false)}
              className="w-full bg-transparent text-white focus:outline-none font-sans text-sm font-medium cursor-pointer [&>option]:bg-zinc-900 [&>option]:text-white"
            >
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
            </select>
          </div>
        </div>

        {/* COLLEGE */}
        <div className="space-y-1">
          <label className="flex items-center gap-1.5 font-handwriting text-[#FF6B00] text-base font-semibold">
            <Building className="w-4 h-4" /> College / University
          </label>
          <div className="neon-input rounded-xl relative flex items-center px-3.5 py-2.5">
            <input
              type="text"
              name="college"
              value={studentData.college}
              onChange={onChange}
              onFocus={() => onInputFocusChange(true)}
              onBlur={() => onInputFocusChange(false)}
              placeholder="Enter college/university"
              required
              className="w-full bg-transparent text-white placeholder-zinc-500 focus:outline-none font-sans text-sm font-medium"
            />
          </div>
        </div>
      </div>

      {/* PROFILE PHOTO UPLOAD & PRESET AVATARS */}
      <div className="pt-2">
        <label className="flex items-center gap-1.5 font-handwriting text-[#FF6B00] text-base font-semibold mb-1.5">
          <Upload className="w-4 h-4" /> Student Profile Photo
        </label>
        
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-[#FF6B00]/40 bg-zinc-900/80 hover:bg-[#FF6B00]/10 text-white font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md group"
          >
            <Upload className="w-4 h-4 text-[#FF6B00] group-hover:scale-110 transition-transform" />
            <span>Upload Custom Photo</span>
          </button>
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />

          {/* Quick Preset Avatars */}
          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto py-1">
            <span className="text-[11px] font-medium text-zinc-400 whitespace-nowrap">Or pick sample:</span>
            {avatarPresets.map((preset, idx) => (
              <img
                key={idx}
                src={preset}
                alt={`Preset avatar ${idx + 1}`}
                onClick={() => onSelectPresetAvatar(preset)}
                className={`w-9 h-9 rounded-lg object-cover cursor-pointer border-2 transition-all hover:scale-110 ${
                  studentData.photoUrl === preset ? 'border-[#FF6B00] ring-2 ring-[#FF6B00]/50 scale-105' : 'border-zinc-700 opacity-70 hover:opacity-100'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* MAIN CTA BUTTON */}
      <div className="pt-3">
        <button
          type="submit"
          className="group relative w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#FF6B00] via-[#FF7700] to-[#FF9000] text-black font-extrabold text-base sm:text-lg uppercase tracking-wider shadow-[0_10px_30px_rgba(255,107,0,0.4)] hover:shadow-[0_15px_40px_rgba(255,107,0,0.6)] hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-3 overflow-hidden"
        >
          {/* Button inner glow overlay */}
          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <span>Enter RExchange</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
        </button>
      </div>
    </form>
  );
}
