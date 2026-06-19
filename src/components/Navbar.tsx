import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project, ViewTab } from '../types';
import { PROJECTS } from '../data';
import { ChevronDown } from 'lucide-react';

interface NavbarProps {
  activeTab: ViewTab;
  onChangeTab: (tab: ViewTab) => void;
  onSelectProject?: (proj: Project) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onChangeTab, onSelectProject }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div id="app-navbar" className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4">
      <div className="bg-[#1C1C1E] border border-white/5 shadow-2xl rounded-full px-7 py-3 flex items-center justify-between gap-6 backdrop-blur-md">
        
        {/* Architectural Stylized 'PD' Logo */}
        <button
          onClick={() => onChangeTab('PROJECTS')}
          className="flex items-center gap-2 group cursor-pointer focus:outline-none"
        >
          <div className="relative w-12 h-8 flex items-center justify-center">
            {/* SVG custom parallel geometric lines forming 'PD' */}
            <svg
              viewBox="0 0 54 40"
              className="w-11 h-7 stroke-current text-[#E5E5E7] transition-all duration-300 group-hover:text-amber-500"
              fill="none"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* P component */}
              <path d="M 10,32 L 10,8 C 18,8 20,14 20,20 C 13,20 10,20 10,20" />
              {/* D component */}
              <path d="M 28,32 L 28,8 C 42,8 44,20 28,32" />
              
              {/* Extra technical grid alignment vectors */}
              <line x1="6" y1="8" x2="10" y2="8" strokeWidth="0.8" opacity="0.4" />
              <line x1="6" y1="32" x2="10" y2="32" strokeWidth="0.8" opacity="0.4" />
              <line x1="28" y1="20" x2="38" y2="20" strokeWidth="0.8" opacity="0.4" />
            </svg>
          </div>
        </button>

        {/* Tab Links */}
        <nav className="flex items-center gap-2">
          {((['PROJECTS', 'PROFILE', 'CONTACT'] as ViewTab[])).map((tab) => {
            const isActive = activeTab === tab;
            const isProjectsTab = tab === 'PROJECTS';

            if (isProjectsTab) {
              return (
                <div 
                  key={tab}
                  className="relative"
                  onMouseEnter={() => setShowDropdown(true)}
                  onMouseLeave={() => setShowDropdown(false)}
                >
                  <button
                    onClick={() => {
                      onChangeTab('PROJECTS');
                      setShowDropdown((prev) => !prev);
                    }}
                    className="relative px-3 py-1.5 text-xs tracking-[0.16em] font-medium transition-colors duration-300 cursor-pointer focus:outline-none select-none text-white/70 hover:text-white flex items-center gap-1 group/btn"
                  >
                    <span className="relative z-10">{tab}</span>
                    <ChevronDown className={`w-3.5 h-3.5 text-white/40 group-hover/btn:text-white/80 transition-transform duration-300 relative z-10 ${showDropdown ? 'rotate-180' : ''}`} />
                    {isActive && (
                      <motion.div
                        layoutId="active-pill-bg"
                        className="absolute inset-0 bg-white/10 rounded-full"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                    {/* Micro LED active status dot on active hover */}
                    {isActive && (
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-amber-500 rounded-full shadow-[0_0_4px_#f59e0b]" />
                    )}
                  </button>

                  {/* Dropdown Menu Container */}
                  <AnimatePresence>
                    {showDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 12, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute top-full -left-12 sm:left-1/2 sm:-translate-x-1/2 mt-3 w-80 max-h-[380px] overflow-y-auto bg-[#1C1C1E]/95 border border-white/10 rounded-2xl shadow-2xl p-2 z-[9999] backdrop-blur-md scrollbar-thin scrollbar-thumb-white/10"
                      >
                        <div className="px-3 py-2 border-b border-white/5 mb-1.5 select-none">
                          <span className="text-[9px] font-mono tracking-[0.2em] text-white/40 uppercase block">
                            FINE CRAFTED DESIGNS
                          </span>
                        </div>
                        <div className="space-y-0.5">
                          {PROJECTS.map((proj) => (
                            <button
                              key={proj.id}
                              onClick={() => {
                                onSelectProject?.(proj);
                                setShowDropdown(false);
                              }}
                              className="w-full flex items-center gap-3 p-1.5 rounded-xl hover:bg-white/5 transition-all duration-200 cursor-pointer text-left group/item focus:outline-none"
                            >
                              {/* Small Thumbnail */}
                              <div className="w-10 h-10 rounded-lg overflow-hidden border border-white/5 bg-neutral-900 flex-shrink-0 relative">
                                <img
                                  src={proj.image}
                                  alt={proj.title}
                                  referrerPolicy="no-referrer"
                                  className="w-full h-full object-cover grayscale opacity-70 group-hover/item:grayscale-0 group-hover/item:opacity-100 transition-all duration-300"
                                />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-[11px] font-medium text-white/95 group-hover/item:text-amber-500 transition-colors truncate">
                                  {proj.title}
                                </p>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                  <span className="text-[8px] font-mono text-white/40 truncate max-w-[110px] uppercase tracking-wider block">
                                    {proj.location}
                                  </span>
                                  <span className="text-[8px] text-white/20 font-mono">•</span>
                                  <span className="text-[8px] font-mono text-amber-500/60 truncate max-w-[90px] block">
                                    {proj.material.split('&')[0].split(' ')[0]}
                                  </span>
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <button
                key={tab}
                onClick={() => onChangeTab(tab)}
                className="relative px-3 py-1.5 text-xs tracking-[0.16em] font-medium transition-colors duration-300 cursor-pointer focus:outline-none select-none text-white/70 hover:text-white"
              >
                <span className="relative z-10">{tab}</span>
                {isActive && (
                  <motion.div
                    layoutId="active-pill-bg"
                    className="absolute inset-0 bg-white/10 rounded-full"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                {/* Micro LED active status dot on active hover */}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-amber-500 rounded-full shadow-[0_0_4px_#f59e0b]" />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
