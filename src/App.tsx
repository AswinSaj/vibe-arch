import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, animate } from 'motion/react';
import { PROJECTS } from './data';
import { Project, ViewTab } from './types';
import { Navbar } from './components/Navbar';
import { BackgroundGrid } from './components/BackgroundGrid';
import { ProfilePanel } from './components/ProfilePanel';
import { ContactPanel } from './components/ContactPanel';
import { ProjectShowcase } from './components/ProjectShowcase';
import { Loader } from './components/Loader';
import { Move, Info, Flame, Eye } from 'lucide-react';

export default function App() {
  // Loader state
  const [loading, setLoading] = useState(true);

  // Navigation tab states
  const [activeTab, setActiveTab] = useState<ViewTab>('PROJECTS');
  
  // Showcase overlay state
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Responsive state
  const [isMobile, setIsMobile] = useState(false);

  // Canvas coordinate offsets
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [hasDragged, setHasDragged] = useState(false);

  // Motion values to drive hardware-accelerated grid parallax
  const xValue = useMotionValue(0);
  const yValue = useMotionValue(0);

  // Detect window resizing for layouts
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Set grid offsets on manual drag updates using actual transform coordinates
  const handleDrag = (_event: any, info: any) => {
    setPan({ x: xValue.get(), y: yValue.get() });
    if (!hasDragged && (Math.abs(info.offset.x) > 10 || Math.abs(info.offset.y) > 10)) {
      setHasDragged(true);
    }
  };

  const handleTabChange = (tab: ViewTab) => {
    setActiveTab(tab);
  };

  const handleSelectProject = (proj: Project) => {
    setActiveTab('PROJECTS');
    setSelectedProject(proj);
    setHasDragged(true); // Hide basic guide prompt as user is using dropdown
    
    // Smooth luxury camera panning animation to center project on viewport
    if (!isMobile) {
      animate(xValue, -proj.x, { type: 'spring', stiffness: 90, damping: 22 });
      animate(yValue, -proj.y, { type: 'spring', stiffness: 90, damping: 22 });
      setPan({ x: -proj.x, y: -proj.y });
    }
  };

  const closeShowcase = () => {
    setSelectedProject(null);
  };

  const handleNextProject = () => {
    if (!selectedProject) return;
    const currentIndex = PROJECTS.findIndex((p) => p.id === selectedProject.id);
    const nextIndex = (currentIndex + 1) % PROJECTS.length;
    setSelectedProject(PROJECTS[nextIndex]);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden font-sans select-none text-neutral-900 bg-[#F5F5F3] flex flex-col items-center justify-center">
      
      {/* Cinematic Loader screen */}
      <AnimatePresence>
        {loading && (
          <Loader onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {/* Dynamic Grid Background - linked to coordinates */}
      <BackgroundGrid panX={pan.x} panY={pan.y} />

      {/* Center Fixed Main Brand Typography */}
      <motion.div 
        id="hero-bg-text"
        initial={{ opacity: 0 }}
        animate={!loading ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none text-center z-15 transition-all duration-300"
        style={{
          // Fluid spacing and responsive scales
          transform: `translate(calc(-50% + ${pan.x * 0.15}px), calc(-50% + ${pan.y * 0.15}px))`,
        }}
      >
        <span 
          style={{ letterSpacing: '-0.04em' }}
          className="block font-sans font-light text-white text-[12vw] sm:text-[9vw] uppercase select-none leading-[0.8] drop-shadow-[0_2px_15px_rgba(0,0,0,0.02)]"
        >
          PromptedDev
        </span>
        <span 
          style={{ letterSpacing: '-0.03em' }}
          className="block font-sans font-normal text-white text-[10vw] sm:text-[8vw] select-none leading-[0.9] mt-2 drop-shadow-[0_2px_15px_rgba(0,0,0,0.02)]"
        >
          Designs
        </span>
      </motion.div>

      {/* Navbar Floating Element */}
      <Navbar 
        activeTab={activeTab} 
        onChangeTab={handleTabChange} 
        onSelectProject={handleSelectProject} 
      />

      {/* Main Draggable Workspace Board (Only for non-mobile) */}
      {!isMobile ? (
        <div className="absolute inset-0 z-20 overflow-hidden flex items-center justify-center">
          <motion.div
            drag
            dragConstraints={{ left: -850, right: 850, top: -450, bottom: 450 }}
            dragElastic={0.2}
            dragTransition={{ bounceStiffness: 400, bounceDamping: 32 }}
            onDrag={handleDrag}
            style={{ x: xValue, y: yValue }}
            className="absolute w-[2400px] h-[1600px] flex items-center justify-center cursor-grab active:cursor-grabbing"
          >
            {/* Inner Project Coordinate mapping with sophisticated entry animations */}
            {PROJECTS.map((proj, idx) => (
              <motion.div
                key={proj.id}
                initial={{ opacity: 0, scale: 0.85, y: 15 }}
                animate={!loading ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.85, y: 15 }}
                transition={{
                  duration: 0.9,
                  delay: 0.3 + idx * 0.06,
                  ease: [0.16, 1, 0.3, 1], // High-fidelity cinematic ease
                }}
                onClick={(e) => {
                  setSelectedProject(proj);
                }}
                whileHover={{ scale: 1.03 }}
                className="absolute shadow-xl bg-white p-3 rounded-2xl group flex flex-col overflow-hidden transition-shadow hover:shadow-2xl cursor-pointer select-none"
                style={{
                  width: `${proj.width}px`,
                  height: `${proj.height}px`,
                  left: `calc(50% + ${proj.x - proj.width / 2}px)`,
                  top: `calc(50% + ${proj.y - proj.height / 2}px)`,
                  zIndex: proj.zIndex,
                }}
              >
                {/* Image Frame */}
                <div className="w-full h-full overflow-hidden rounded-xl relative bg-neutral-100">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
                  />
                  {/* Subtle stone texture ambient drop overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Floating hovering quickspecs */}
                  <div className="absolute bottom-4 left-4 right-4 text-white p-3 flex flex-col opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <span className="text-[10px] font-mono tracking-widest text-amber-500 uppercase">{proj.location}</span>
                    <h4 className="text-sm font-semibold tracking-wide leading-tight mt-0.5">{proj.title}</h4>
                    <span className="text-[10px] font-mono text-white/50 mt-1">{proj.material}</span>
                  </div>

                  {/* Absolute Click to Expand visual indicator */}
                  <div className="absolute top-4 right-4 bg-[#111]/80 rounded-full p-2.5 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 border border-white/10 text-white">
                    <Eye className="w-3.5 h-3.5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      ) : (
        /* Mobile Dynamic Structured Feed */
        <motion.div 
          initial={{ opacity: 0 }}
          animate={!loading ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="w-full h-full overflow-y-auto px-6 pt-32 pb-24 z-20 space-y-12"
        >
          <div className="text-center pt-4 pb-6 border-b border-black/5">
            <span className="text-amber-600 font-mono text-xs tracking-widest uppercase">OUR HARVEST PORTFOLIO</span>
            <p className="text-xs text-neutral-500 mt-1">Tap a project to inspect materials details</p>
          </div>
          <div className="grid grid-cols-1 gap-8">
            {PROJECTS.map((proj) => (
              <div
                key={proj.id}
                onClick={() => setSelectedProject(proj)}
                className="bg-white p-4 rounded-3xl shadow-md cursor-pointer border border-neutral-100"
              >
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-100 relative">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-3 left-3 bg-[#111]/80 text-white font-mono text-[9px] px-2.5 py-1 tracking-wider rounded-md">
                    {proj.year}
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-start">
                  <div>
                    <h3 className="text-base font-semibold text-neutral-900 leading-tight">{proj.title}</h3>
                    <p className="text-xs text-amber-600 font-mono mt-1">{proj.material}</p>
                    <p className="text-xs text-neutral-400 mt-0.5">{proj.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Floating Instructions Banner on bottom-center (Desktop only) */}
      {!isMobile && !hasDragged && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
          <div className="bg-[#1C1C1E] text-white/80 border border-white/5 rounded-full px-5 py-2.5 flex items-center gap-3 shadow-xl animate-bounce">
            <Move className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-mono tracking-wider">DRAG CANVAS TO REACH SCATTERED PROJECTS</span>
          </div>
        </div>
      )}

      {/* Dynamic Slide-Over Modals & Overlays */}
      <AnimatePresence mode="wait">
        
        {/* PROFILE SHEET */}
        {activeTab === 'PROFILE' && (
          <ProfilePanel
            isOpen={activeTab === 'PROFILE'}
            onClose={() => setActiveTab('PROJECTS')}
          />
        )}

        {/* CONTACT SHEET */}
        {activeTab === 'CONTACT' && (
          <ContactPanel
            isOpen={activeTab === 'CONTACT'}
            onClose={() => setActiveTab('PROJECTS')}
          />
        )}
      </AnimatePresence>

      {/* PROJECT DETAILS FULL-SCREEN SHOWCASE */}
      <ProjectShowcase
        project={selectedProject}
        onClose={closeShowcase}
        onNext={handleNextProject}
      />
    </div>
  );
}
