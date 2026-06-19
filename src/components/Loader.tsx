import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoaderProps {
  onComplete: () => void;
}

export const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const brandName = "PromptedDev";
  const letters = brandName.split("");

  useEffect(() => {
    // Elegant transition duration before the main site fades in
    const timer = setTimeout(() => {
      onComplete();
    }, 2200);

    return () => clearTimeout(timer);
  }, [onComplete]);

  // Container variants to cascade stagger animations
  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      }
    }
  };

  // Modern character lift and reveal animation
  const letterVariants = {
    initial: { 
      y: 40, 
      opacity: 0,
    },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // cinematic custom cubic-bezier
      }
    }
  };

  return (
    <motion.div
      id="cinematic-loader"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        transition: { duration: 0.9, ease: [0.43, 0.13, 0.23, 0.96] } 
      }}
      className="fixed inset-0 z-[9999] bg-[#0A0A0C] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Dynamic ambient background glow */}
      <div className="absolute w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Staggered Letter Container */}
      <motion.div 
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="flex items-center justify-center select-none"
      >
        {letters.map((char, index) => (
          <motion.span
            key={index}
            variants={letterVariants}
            style={{ letterSpacing: '-0.04em' }}
            className="font-sans font-light text-white text-[9vw] sm:text-[6vw] md:text-[5vw] uppercase tracking-wide inline-block"
          >
            {char}
          </motion.span>
        ))}
      </motion.div>

      {/* Subtle indicator specs representing premium spatial engineering */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 1.0, ease: 'easeOut' }}
        className="absolute bottom-16 flex flex-col items-center gap-1.5"
      >
        <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
        <span className="font-mono text-[9px] tracking-[0.3em] text-white/40 uppercase">
          SPATIAL PORTFOLIO INCEPTION
        </span>
      </motion.div>
    </motion.div>
  );
};
