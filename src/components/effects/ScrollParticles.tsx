/**
 * ScrollParticles
 * Spawns small music-themed particles (note, guitar, sax, drum) at the cursor
 * while the page is scrolled. Pure canvas overlay, ignores pointer events.
 *
 * Used in: Layout
 */

import React, { useEffect, useRef } from 'react';

type ParticleType = 0 | 1 | 2 | 3;

export const ScrollParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let lastScrollY = window.scrollY;
    let accumulatedScroll = 0;
    const SCROLL_THRESHOLD = 35;
    const MAX_PARTICLES = 15;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', onMouseMove);

    class Particle {
      x: number;
      y: number;
      size: number;
      type: ParticleType;
      opacity = 1;
      speedY: number;
      speedX: number;
      rotation: number;
      rotSpeed: number;
      fadeRate: number;

      constructor(x: number, y: number) {
        this.x = x + (Math.random() - 0.5) * 20;
        this.y = y + (Math.random() - 0.5) * 20;
        this.size = Math.random() * 8 + 14;
        this.type = Math.floor(Math.random() * 4) as ParticleType;
        this.speedY = -(Math.random() * 0.8 + 0.4);
        this.speedX = (Math.random() - 0.5) * 0.6;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotSpeed = (Math.random() - 0.5) * 0.03;
        this.fadeRate = Math.random() * 0.012 + 0.008;
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotSpeed;
        this.opacity -= this.fadeRate;
      }

      draw(c: CanvasRenderingContext2D) {
        if (this.opacity <= 0) return;
        c.save();
        c.globalAlpha = Math.max(0, this.opacity);
        c.translate(this.x, this.y);
        c.rotate(this.rotation);
        switch (this.type) {
          case 0: this.drawMusicNote(c); break;
          case 1: this.drawGuitar(c); break;
          case 2: this.drawSaxophone(c); break;
          case 3: this.drawDrum(c); break;
        }
        c.restore();
      }

      drawMusicNote(c: CanvasRenderingContext2D) {
        c.fillStyle = '#9b59b6';
        const s = this.size / 15;
        c.beginPath();
        c.arc(-4 * s, 4 * s, 3 * s, 0, Math.PI * 2);
        c.fill();
        c.beginPath();
        c.arc(4 * s, 2 * s, 3 * s, 0, Math.PI * 2);
        c.fill();
        c.strokeStyle = '#9b59b6';
        c.lineWidth = 1.5 * s;
        c.beginPath();
        c.moveTo(-1.5 * s, 4 * s);
        c.lineTo(-1.5 * s, -6 * s);
        c.lineTo(6.5 * s, -8 * s);
        c.lineTo(6.5 * s, 2 * s);
        c.stroke();
        c.fillRect(-1.5 * s, -8 * s, 8 * s, 3 * s);
      }

      drawGuitar(c: CanvasRenderingContext2D) {
        const s = this.size / 16;
        c.fillStyle = '#e67e22';
        c.beginPath();
        c.arc(0, 4 * s, 5 * s, 0, Math.PI * 2);
        c.arc(0, -1 * s, 3.5 * s, 0, Math.PI * 2);
        c.fill();
        c.fillStyle = '#2c3e50';
        c.beginPath();
        c.arc(0, 1.5 * s, 1.8 * s, 0, Math.PI * 2);
        c.fill();
        c.fillStyle = '#d35400';
        c.fillRect(-1 * s, -11 * s, 2 * s, 8 * s);
        c.fillRect(-1.5 * s, -13 * s, 3 * s, 2.5 * s);
      }

      drawSaxophone(c: CanvasRenderingContext2D) {
        const s = this.size / 16;
        c.strokeStyle = '#f1c40f';
        c.fillStyle = '#f1c40f';
        c.lineWidth = 2 * s;
        c.beginPath();
        c.moveTo(-3 * s, -8 * s);
        c.lineTo(-3 * s, 3 * s);
        c.arcTo(-3 * s, 7 * s, 2 * s, 7 * s, 4 * s);
        c.lineTo(3 * s, 2 * s);
        c.stroke();
        c.beginPath();
        c.ellipse(3.5 * s, 0, 1.5 * s, 3.5 * s, -Math.PI / 6, 0, Math.PI * 2);
        c.fill();
      }

      drawDrum(c: CanvasRenderingContext2D) {
        const s = this.size / 16;
        c.fillStyle = '#e74c3c';
        c.fillRect(-6 * s, -2 * s, 12 * s, 6 * s);
        c.fillStyle = '#ecf0f1';
        c.beginPath();
        c.ellipse(0, -2 * s, 6 * s, 2 * s, 0, 0, Math.PI * 2);
        c.ellipse(0, 4 * s, 6 * s, 2 * s, 0, 0, Math.PI * 2);
        c.fill();
        c.strokeStyle = '#f39c12';
        c.lineWidth = 1 * s;
        c.beginPath();
        c.moveTo(-7 * s, -6 * s);
        c.lineTo(5 * s, 2 * s);
        c.moveTo(7 * s, -6 * s);
        c.lineTo(-5 * s, 2 * s);
        c.stroke();
      }
    }

    let particles: Particle[] = [];

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      accumulatedScroll += Math.abs(currentScrollY - lastScrollY);
      lastScrollY = currentScrollY;
      if (accumulatedScroll >= SCROLL_THRESHOLD) {
        accumulatedScroll = 0;
        if (particles.length < MAX_PARTICLES) {
          particles.push(new Particle(mouseX, mouseY));
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    let raf = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw(ctx);
        if (particles[i].opacity <= 0) particles.splice(i, 1);
      }
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      particles = [];
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 99999,
      }}
    />
  );
};
