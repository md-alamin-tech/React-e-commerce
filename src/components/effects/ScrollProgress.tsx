/**
 * ScrollProgress
 * Thin purple-to-gold bar fixed at the top showing page scroll progress.
 *
 * Used in: Layout
 */

import React, { useEffect, useRef } from 'react';

export const ScrollProgress: React.FC = () => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      if (barRef.current) barRef.current.style.width = `${pct}%`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[60] pointer-events-none" aria-hidden="true">
      <div
        ref={barRef}
        className="h-full w-0 bg-gradient-to-r from-[#7B2CBF] via-[#B57BFF] to-[#D4AF37]"
      />
    </div>
  );
};
