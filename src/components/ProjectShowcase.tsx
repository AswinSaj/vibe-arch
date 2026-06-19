import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { gsap } from 'gsap';
import { X, MapPin, Calendar, Layers, ArrowRight } from 'lucide-react';
import { Project } from '../types';

interface ProjectShowcaseProps {
  project: Project | null;
  onClose: () => void;
  onNext: () => void;
}

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ project, onClose, onNext }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const prevProjectIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!project) return;

    const isSwitching = prevProjectIdRef.current !== null && prevProjectIdRef.current !== project.id;
    prevProjectIdRef.current = project.id;

    // Use GSAP to execute a premier high-end full-screen theatrical entry!
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      if (!isSwitching) {
        // 1. Initial State elements
        gsap.set(overlayRef.current, { opacity: 0 });
        gsap.set(imageContainerRef.current, { scale: 1.15, opacity: 0 });
        gsap.set('.reveal-element', { y: 40, opacity: 0 });

        // 2. Timeline build
        tl.to(overlayRef.current, {
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
        })
        .to(imageContainerRef.current, {
          scale: 1,
          opacity: 1,
          duration: 1.1,
          ease: 'power3.out',
        }, '-=0.2')
        .to('.reveal-element', {
          y: 0,
          opacity: 1,
          stagger: 0.06,
          duration: 0.7,
        }, '-=0.7');
      } else {
        // Switch projects smoothly without flashing the black overlay
        gsap.set(imageContainerRef.current, { scale: 1.06, opacity: 0 });
        gsap.set('.reveal-element', { y: 25, opacity: 0 });

        tl.to(imageContainerRef.current, {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
        })
        .to('.reveal-element', {
          y: 0,
          opacity: 1,
          stagger: 0.04,
          duration: 0.5,
        }, '-=0.5');
      }
    });

    return () => ctx.revert();
  }, [project]);

  if (!project) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex flex-col md:flex-row bg-[#0A0A0C] text-white overflow-hidden"
    >
      {/* Absolute Close Trigger */}
      <button
        onClick={onClose}
        className="absolute top-8 right-8 z-50 text-white/60 hover:text-white transition-colors duration-300 p-2.5 bg-[#111]/80 border border-white/10 rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Hero Image Section (Occupies Left/Full space depending on layout) */}
      <div 
        ref={imageContainerRef}
        className="w-full md:w-3/5 h-[42vh] md:h-full relative overflow-hidden bg-neutral-900"
      >
        <img
          src={project.image}
          alt={project.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0A0A0C] via-transparent to-transparent opacity-60 md:opacity-40" />
      </div>

      {/* Narrative Specifications Section (Occupies Right) */}
      <div 
        ref={contentRef}
        className="w-full md:w-2/5 h-[58vh] md:h-full flex flex-col justify-between px-8 md:px-12 py-6 md:py-16 overflow-y-auto bg-gradient-to-b from-transparent to-[#0A0A0C] md:bg-none"
      >
        <div className="space-y-6 my-auto">
          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-3 reveal-element">
            <span className="px-2.5 py-0.5 bg-amber-500/10 border border-amber-500/20 text-amber-500 font-mono text-[9px] uppercase tracking-widest rounded-full">
              PROJECT REVEAL
            </span>
            <div className="flex items-center gap-1.5 text-xs text-white/50 font-mono">
              <Calendar className="w-3.5 h-3.5 text-amber-500/80" />
              <span>{project.year}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-white/50 font-mono">
              <MapPin className="w-3.5 h-3.5 text-amber-500/80" />
              <span>{project.location}</span>
            </div>
          </div>

          {/* Project Primary Title */}
          <div className="space-y-1.5 reveal-element">
            <h1 className="text-3xl md:text-4xl font-light tracking-tight text-white leading-none">
              {project.title}
            </h1>
            <p className="text-xs text-amber-500 font-mono mt-1.5 flex items-center gap-2">
              <Layers className="w-3.5 h-3.5" />
              <span>{project.material}</span>
            </p>
          </div>

          {/* Text Summary of Project */}
          <p className="text-white/70 leading-relaxed text-xs md:text-sm font-light reveal-element">
            {project.description}
          </p>

          {/* Core Technical Alignment */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/5 reveal-element">
            <div>
              <p className="text-[9px] font-mono text-white/40 mb-0.5">CRAFT METHOD</p>
              <p className="text-xs text-white/80">Dry-Lay Pre-Selection, Custom Cut-to-Size</p>
            </div>
            <div>
              <p className="text-[9px] font-mono text-white/40 mb-0.5">QUARRY ORIGIN</p>
              <p className="text-xs text-white/80">Tuscany quarries / Custom Direct Imported</p>
            </div>
          </div>
        </div>

        {/* Dynamic Gallery Advance Control */}
        <div className="pt-6 md:pt-0 border-t border-white/5 md:border-none flex items-center justify-between gap-4 reveal-element">
          <div className="text-[10px] text-white/30 font-mono tracking-wider">
            Explore next design.
          </div>
          <button
            onClick={onNext}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 active:bg-white/15 text-white rounded-full text-[10px] font-mono tracking-widest transition-all duration-300 border border-white/10 group cursor-pointer focus:outline-none shrink-0"
          >
            <span>NEXT PROJECT</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-500 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
};
