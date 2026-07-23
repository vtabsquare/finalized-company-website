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
  duration = 0.6,
  className = '',
  width = '100%' 
}) => {

  const variants = {
    hidden: { 
      opacity: 0, 
      y: animation === 'fade-up' ? 50 : 0,
      x: animation === 'fade-left' ? 50 : animation === 'fade-right' ? -50 : 0,
      scale: animation === 'scale-up' ? 0.9 : 1
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      x: 0, 
      scale: 1 
    },
  };

  return (
    <div style={{ width }} className={className}>
      <motion.div
        variants={variants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        transition={{ 
          duration: duration, 
          delay: delay, 
          ease: [0.25, 0.25, 0, 1] // Custom cubic-bezier for buttery smooth ease-out
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
};
