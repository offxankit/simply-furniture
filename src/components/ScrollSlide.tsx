import React, { useEffect, useRef } from 'react';

interface ScrollSlideProps {
  children: React.ReactNode;
  from: 'left' | 'right';
  className?: string;
}

export const ScrollSlide: React.FC<ScrollSlideProps> = ({ children, from, className = '' }) => {
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frameId = 0;

    const updatePosition = () => {
      frameId = 0;
      if (reduceMotion.matches) {
        element.style.transform = '';
        return;
      }

      const bounds = element.getBoundingClientRect();
      const entranceStart = window.innerHeight * 0.95;
      const entranceEnd = window.innerHeight * 0.25;
      const progress = Math.min(1, Math.max(0, (entranceStart - bounds.top) / (entranceStart - entranceEnd)));
      const distance = window.innerWidth / 2 + bounds.width / 2 + 32;
      const direction = from === 'left' ? -1 : 1;
      element.style.transform = `translate3d(${direction * distance * (1 - progress)}px, 0, 0)`;
    };

    const scheduleUpdate = () => {
      if (frameId === 0) frameId = window.requestAnimationFrame(updatePosition);
    };

    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    reduceMotion.addEventListener('change', scheduleUpdate);
    updatePosition();

    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      reduceMotion.removeEventListener('change', scheduleUpdate);
      if (frameId !== 0) window.cancelAnimationFrame(frameId);
    };
  }, [from]);

  return (
    <div ref={elementRef} className={`w-full will-change-transform ${className}`}>
      {children}
    </div>
  );
};
