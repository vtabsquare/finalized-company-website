import React, { ReactNode, useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  animation?: 'fade-up' | 'fade-in' | 'fade-left' | 'fade-right' | 'scale-up';
  delay?: number;
  duration?: number;
  className?: string;
  width?: 'fit-content' | '100%';
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({ 
  children, 
  animation = 'fade-up', 
  delay = 0, 
  duration = 0.5,
  className = '',
  width = '100%' 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
          observer.disconnect();
        }
      },
      {
        rootMargin: '-30px',
        threshold: 0.1
      }
    );

    observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
      observer.disconnect();
    };
  }, []);

  const getInitialStyle = (): React.CSSProperties => {
    switch (animation) {
      case 'fade-up': return { opacity: 0, transform: 'translateY(16px)' };
      case 'fade-left': return { opacity: 0, transform: 'translateX(16px)' };
      case 'fade-right': return { opacity: 0, transform: 'translateX(-16px)' };
      case 'scale-up': return { opacity: 0, transform: 'scale(0.96)' };
      case 'fade-in': default: return { opacity: 0 };
    }
  };

  const getVisibleStyle = (): React.CSSProperties => {
    return {
      opacity: 1,
      transform: 'translate(0px, 0px) scale(1)'
    };
  };

  return (
    <div style={{ width }} className={className}>
      <div
        ref={ref}
        style={{
          ...(isVisible ? getVisibleStyle() : getInitialStyle()),
          transition: `all ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
          willChange: isVisible ? 'auto' : 'opacity, transform'
        }}
        className="w-full h-full transform-gpu"
      >
        {children}
      </div>
    </div>
  );
};
