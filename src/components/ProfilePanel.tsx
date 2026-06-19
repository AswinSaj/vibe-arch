import React from 'react';
import { motion } from 'motion/react';
import { X, Award, Shield, Hammer } from 'lucide-react';

interface ProfilePanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfilePanel: React.FC<ProfilePanelProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#0c0c0d]/80 backdrop-blur-md"
      />

      {/* Panel Sheet */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 220 }}
        className="relative w-full max-w-2xl h-full bg-[#121214] text-white/90 shadow-2xl overflow-y-auto px-8 md:px-12 py-24 flex flex-col justify-between border-l border-white/5"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors duration-300 p-2 bg-white/5 rounded-full cursor-pointer focus:outline-none"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Headline */}
        <div>
          <span className="text-amber-500 font-mono text-xs tracking-[0.25em] uppercase">
            EST. 2024 / DESIGN & ARCHITECTURE
          </span>
          <h2 className="text-4xl md:text-5xl font-light tracking-tight text-white mt-4 mb-8">
            The Philosophy of <span className="font-normal text-amber-500">PromptedDev</span>
          </h2>

          <div className="space-y-6 text-white/70 leading-relaxed text-sm md:text-base">
            <p>
              At PromptedDev Designs, we look at digital and spatial design as the physical dialogue between architectural space and interactive geometry. Every grid axis, every hand-selected stone veneer, and every raw texture core tells a continuous narrative that we meticulously integrate into contemporary sanctuaries.
            </p>
            <p>
              We source our inspiration from certified masters of mid-century minimalism and raw brutalist forms. Our designers believe that precision cuts, paired with respect for raw, split-face organic edges, creates a depth that standard interfaces and builders can never replicate.
            </p>
          </div>

          {/* Pillars List */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
              <Award className="w-6 h-6 text-amber-500 mb-3" />
              <h3 className="text-white font-medium text-sm mb-1">Elite Sourcing</h3>
              <p className="text-xs text-white/40 leading-relaxed">Direct relationships with pristine natural quarries and bespoke material guilds.</p>
            </div>
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
              <Hammer className="w-6 h-6 text-amber-500 mb-3" />
              <h3 className="text-white font-medium text-sm mb-1">Meticulous Masonry</h3>
              <p className="text-xs text-white/40 leading-relaxed">Precision dry-laying, hand-chiselled design detailing, and tailored custom grids.</p>
            </div>
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
              <Shield className="w-6 h-6 text-amber-500 mb-3" />
              <h3 className="text-white font-medium text-sm mb-1">Immortal Durability</h3>
              <p className="text-xs text-white/40 leading-relaxed">Premium layout specifications and structurally sound engineering for lifetime wear.</p>
            </div>
          </div>
        </div>

        {/* Secondary Info Layout */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-start gap-6 text-xs text-white/40 font-mono">
          <div>
            <p className="text-amber-500/80 mb-1">HEADQUARTERS</p>
            <p className="text-white/60">40 High Street, Prahran</p>
            <p className="text-white/60">Melbourne, VIC 3181</p>
          </div>
          <div>
            <p className="text-amber-500/80 mb-1">SELECT AWARDS</p>
            <p className="text-white/60">Winner — Grand Archstone Design 2024</p>
            <p className="text-white/60">Shortlist — National Tiling Awards 2025</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
