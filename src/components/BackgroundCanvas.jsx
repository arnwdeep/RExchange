import React, { useEffect, useRef } from 'react';

export default function BackgroundCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle pool
    const particleCount = 45;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.6 + 0.2,
      speedY: Math.random() * 0.4 + 0.1,
      speedX: (Math.random() - 0.5) * 0.3,
      pulseSpeed: Math.random() * 0.02 + 0.005,
      pulseFactor: 0
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Deep dark cinematic background gradient
      const bgGrad = ctx.createRadialGradient(
        canvas.width / 2, canvas.height * 0.35, canvas.height * 0.1,
        canvas.width / 2, canvas.height / 2, canvas.height * 0.85
      );
      bgGrad.addColorStop(0, 'rgba(32, 20, 14, 0.9)');
      bgGrad.addColorStop(0.35, 'rgba(18, 12, 18, 0.95)');
      bgGrad.addColorStop(0.7, 'rgba(10, 9, 11, 0.98)');
      bgGrad.addColorStop(1, '#0A090B');

      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Central ambient orange neon lighting glow
      const orangeGlow = ctx.createRadialGradient(
        canvas.width / 2, canvas.height * 0.25, 0,
        canvas.width / 2, canvas.height * 0.25, canvas.width * 0.4
      );
      orangeGlow.addColorStop(0, 'rgba(255, 107, 0, 0.18)');
      orangeGlow.addColorStop(0.4, 'rgba(255, 85, 0, 0.07)');
      orangeGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = orangeGlow;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw dust/ember particles
      particles.forEach((p) => {
        p.y -= p.speedY;
        p.x += Math.sin(p.pulseFactor) * p.speedX;
        p.pulseFactor += p.pulseSpeed;

        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }

        const currentAlpha = p.alpha * (0.6 + Math.sin(p.pulseFactor) * 0.4);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        const particleGlow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3);
        particleGlow.addColorStop(0, `rgba(255, 136, 0, ${currentAlpha})`);
        particleGlow.addColorStop(0.5, `rgba(255, 107, 0, ${currentAlpha * 0.5})`);
        particleGlow.addColorStop(1, 'rgba(255, 107, 0, 0)');
        
        ctx.fillStyle = particleGlow;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 bg-grain"
    />
  );
}
