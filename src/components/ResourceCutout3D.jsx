import React, { useState } from 'react';

export default function ResourceCutout3D({ type = 'textbook', size = 'md', isHovered = false }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -20, y: x * 20 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-28 h-28 sm:w-36 sm:h-36',
    lg: 'w-44 h-44 sm:w-56 sm:h-56'
  }[size] || 'w-28 h-28';

  const renderVectorCutout = () => {
    switch (type) {
      case 'textbook':
        return (
          <svg className="w-full h-full cutout-shadow-dark" viewBox="0 0 160 200" fill="none">
            <rect x="25" y="20" width="115" height="160" rx="6" fill="#1E293B" stroke="#FF6B00" strokeWidth="2.5" />
            <path d="M25 20L140 20C143 20 145 22 145 25V175C145 178 143 180 140 180L25 180" fill="#0F172A" />
            <rect x="35" y="35" width="95" height="130" rx="3" fill="#334155" />
            <path d="M45 55H120M45 75H105M45 145H90" stroke="#FF6B00" strokeWidth="3" strokeLinecap="round" />
            <circle cx="105" cy="135" r="16" fill="#FF6B00" opacity="0.9" />
            <path d="M100 135L104 139L111 131" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="20" y="20" width="8" height="160" rx="2" fill="#FF6B00" />
          </svg>
        );
      case 'headphones':
        return (
          <svg className="w-full h-full cutout-shadow-dark" viewBox="0 0 180 180" fill="none">
            <path d="M35 90C35 55 60 30 90 30C120 30 145 55 145 90" stroke="#334155" strokeWidth="12" strokeLinecap="round" />
            <path d="M35 90C35 55 60 30 90 30C120 30 145 55 145 90" stroke="#FF6B00" strokeWidth="4" strokeLinecap="round" />
            <rect x="20" y="85" width="28" height="50" rx="14" fill="#0F172A" stroke="#FF6B00" strokeWidth="3" />
            <rect x="132" y="85" width="28" height="50" rx="14" fill="#0F172A" stroke="#FF6B00" strokeWidth="3" />
            <rect x="28" y="95" width="12" height="30" rx="6" fill="#FF6B00" />
            <rect x="140" y="95" width="12" height="30" rx="6" fill="#FF6B00" />
          </svg>
        );
      case 'notes':
        return (
          <svg className="w-full h-full cutout-shadow-dark" viewBox="0 0 160 190" fill="none">
            <rect x="25" y="25" width="115" height="150" rx="6" fill="#0F172A" stroke="#FF6B00" strokeWidth="2.5" />
            <line x1="25" y1="45" x2="140" y2="45" stroke="#FF6B00" strokeWidth="2" />
            <line x1="25" y1="65" x2="140" y2="65" stroke="#334155" strokeWidth="1.5" />
            <line x1="25" y1="85" x2="140" y2="85" stroke="#334155" strokeWidth="1.5" />
            <line x1="25" y1="105" x2="140" y2="105" stroke="#334155" strokeWidth="1.5" />
            <line x1="25" y1="125" x2="140" y2="125" stroke="#334155" strokeWidth="1.5" />
            <line x1="25" y1="145" x2="140" y2="145" stroke="#334155" strokeWidth="1.5" />
            <circle cx="25" cy="55" r="4" fill="#FF6B00" />
            <circle cx="25" cy="95" r="4" fill="#FF6B00" />
            <circle cx="25" cy="135" r="4" fill="#FF6B00" />
          </svg>
        );
      case 'calculator':
        return (
          <svg className="w-full h-full cutout-shadow-dark" viewBox="0 0 150 200" fill="none">
            <rect x="25" y="20" width="100" height="160" rx="10" fill="#0F172A" stroke="#FF6B00" strokeWidth="3" />
            <rect x="35" y="35" width="80" height="35" rx="4" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
            <rect x="42" y="42" width="66" height="20" rx="2" fill="#020617" />
            <rect x="35" y="85" width="18" height="14" rx="3" fill="#334155" />
            <rect x="66" y="85" width="18" height="14" rx="3" fill="#334155" />
            <rect x="97" y="85" width="18" height="14" rx="3" fill="#FF6B00" />
            <rect x="35" y="108" width="18" height="14" rx="3" fill="#1E293B" />
            <rect x="66" y="108" width="18" height="14" rx="3" fill="#1E293B" />
            <rect x="97" y="108" width="18" height="14" rx="3" fill="#1E293B" />
            <rect x="35" y="131" width="18" height="14" rx="3" fill="#1E293B" />
            <rect x="66" y="131" width="18" height="14" rx="3" fill="#1E293B" />
            <rect x="97" y="131" width="18" height="14" rx="3" fill="#1E293B" />
            <rect x="35" y="154" width="49" height="14" rx="3" fill="#FF6B00" />
            <rect x="97" y="154" width="18" height="14" rx="3" fill="#1E293B" />
          </svg>
        );
      case 'keyboard':
        return (
          <svg className="w-full h-full cutout-shadow-dark" viewBox="0 0 200 120" fill="none">
            <rect x="15" y="25" width="170" height="70" rx="8" fill="#0F172A" stroke="#FF6B00" strokeWidth="3" />
            <rect x="25" y="35" width="150" height="50" rx="4" fill="#1E293B" />
            <rect x="30" y="40" width="12" height="10" rx="2" fill="#FF6B00" />
            <rect x="46" y="40" width="12" height="10" rx="2" fill="#334155" />
            <rect x="62" y="40" width="12" height="10" rx="2" fill="#334155" />
            <rect x="78" y="40" width="12" height="10" rx="2" fill="#334155" />
            <rect x="94" y="40" width="12" height="10" rx="2" fill="#334155" />
            <rect x="110" y="40" width="12" height="10" rx="2" fill="#334155" />
            <rect x="126" y="40" width="12" height="10" rx="2" fill="#334155" />
            <rect x="142" y="40" width="28" height="10" rx="2" fill="#FF6B00" />
            <rect x="30" y="55" width="18" height="10" rx="2" fill="#334155" />
            <rect x="52" y="55" width="12" height="10" rx="2" fill="#334155" />
            <rect x="68" y="55" width="12" height="10" rx="2" fill="#334155" />
            <rect x="84" y="55" width="12" height="10" rx="2" fill="#334155" />
            <rect x="100" y="55" width="12" height="10" rx="2" fill="#334155" />
            <rect x="116" y="55" width="12" height="10" rx="2" fill="#334155" />
            <rect x="132" y="55" width="38" height="10" rx="2" fill="#334155" />
            <rect x="62" y="70" width="76" height="10" rx="2" fill="#FF6B00" />
          </svg>
        );
      case 'ticket':
        return (
          <svg className="w-full h-full cutout-shadow-dark" viewBox="0 0 180 120" fill="none">
            <path d="M20 25C20 25 20 50 10 50C0 50 0 70 10 70C20 70 20 95 20 95H160C160 95 160 70 170 70C180 70 180 50 170 50C160 50 160 25 160 25H20Z" fill="#0F172A" stroke="#FF6B00" strokeWidth="3" />
            <line x1="125" y1="25" x2="125" y2="95" stroke="#FF6B00" strokeWidth="2" strokeDasharray="4 4" />
            <circle cx="50" cy="60" r="16" fill="#FF6B00" opacity="0.9" />
            <path d="M44 60L48 64L56 56" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="75" y="45" width="40" height="8" rx="2" fill="#FF6B00" />
            <rect x="75" y="60" width="30" height="6" rx="2" fill="#334155" />
            <rect x="138" y="45" width="12" height="30" fill="#FF6B00" />
          </svg>
        );
      default:
        return (
          <svg className="w-full h-full cutout-shadow-dark" viewBox="0 0 160 160" fill="none">
            <circle cx="80" cy="80" r="60" fill="#0F172A" stroke="#FF6B00" strokeWidth="3" />
            <path d="M60 80L75 95L105 65" stroke="#FF6B00" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
    }
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovered ? 1.05 : 1})`,
        transition: 'transform 0.15s cubic-bezier(0.1, 0.8, 0.3, 1)'
      }}
      className={`cutout-3d-wrapper ${sizeClasses} flex items-center justify-center pointer-events-auto select-none`}
    >
      {renderVectorCutout()}
    </div>
  );
}
