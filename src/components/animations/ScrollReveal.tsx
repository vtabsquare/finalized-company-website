import React, { ReactNode } from 'react';
import { motion } from 'motion/react';

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

  const variants = {
    hidden: { 
      opacity: 0, 
      y: animation === 'fade-up' ? 16 : 0,
      x: animation === 'fade-left' ? 16 : animation === 'fade-right' ? -16 : 0,
      scale: animation === 'scale-up' ? 0.96 : 1
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      x: 0, 
      scale: 1,
      transition: { 
        duration: duration, 
        delay: delay, 
        ease: [0.16, 1, 0.3, 1] // Ultra smooth Apple exponential ease-out
      }
    },
  };

  return (
    <div style={{ width }} className={className}>
      <motion.div
        variants={variants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-30px" }}
        style={{ willChange: 'opacity, transform' }}
        className="w-full h-full transform-gpu"
      >
        {children}
      </motion.div>
    </div>
  );
};
