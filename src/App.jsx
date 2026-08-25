import React, { useState } from 'react';
import LoginView from './components/LoginView';
import ExplorePage from './components/ExplorePage';

export default function App() {
  const [studentData, setStudentData] = useState({
    name: "Arjun Sharma",
    regNo: "23CS0567",
    department: "Computer Science",
    year: "2nd Year",
    college: "XYZ University",
    photoUrl: null
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [cardTilt, setCardTilt] = useState({ x: 0, y: 0 });

  // Audio feedback synthesis using Web Audio API for soft typewriter key clicks
  const playClickSound = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440 + Math.random() * 200, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.03, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.04);
    } catch (e) {
      // Audio context fallbacks
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentData((prev) => ({ ...prev, [name]: value }));
    playClickSound();
  };

  const handlePhotoUpload = (newPhotoUrl) => {
    setStudentData((prev) => ({ ...prev, photoUrl: newPhotoUrl }));
  };

  const handleLoginSuccess = () => {
    // DIRECTLY REDIRECT TO HOMEPAGE (NO SUCCESS MODAL)
    setIsLoggedIn(true);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#050505] text-[#F3F4F6] selection:bg-[#FF6B00] selection:text-black font-sans overflow-x-hidden">
      
      {/* USER FLOW STEP 1: INITIAL 3D ID CARD LOGIN / ONBOARDING PAGE */}
      {!isLoggedIn ? (
        <LoginView
          studentData={studentData}
          onChange={handleInputChange}
          onPhotoUpload={handlePhotoUpload}
          onLoginSuccess={handleLoginSuccess}
          isTyping={isTyping}
          setIsTyping={setIsTyping}
          cardTilt={cardTilt}
          setCardTilt={setCardTilt}
          soundEnabled={soundEnabled}
          setSoundEnabled={setSoundEnabled}
        />
      ) : (
        /* USER FLOW STEP 2: CINEMATIC POST-LOGIN HOMEPAGE */
        <ExplorePage
          studentData={studentData}
          onOpenStudentPass={() => setIsLoggedIn(false)}
        />
      )}

    </div>
  );
}
