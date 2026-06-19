import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Calculator, CheckCircle2 } from 'lucide-react';

interface ContactPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const MATERIAL_PRICES = {
  travertine: { name: 'Honed Roman Travertine', price: 290 },
  sandstone: { name: 'Split-face Sandstone', price: 180 },
  bluestone: { name: 'Volcanic Bluestone Slabs', price: 240 },
  fluted: { name: 'Grooved Ribbed Tile Backsplash', price: 155 },
};

export const ContactPanel: React.FC<ContactPanelProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [material, setMaterial] = useState<keyof typeof MATERIAL_PRICES>('travertine');
  const [sqm, setSqm] = useState<number>(30);
  const [isSent, setIsSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const totalEstimate = sqm * MATERIAL_PRICES[material].price;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      setTimeout(() => {
        setIsSent(false);
        setName('');
        setEmail('');
        setMessage('');
        onClose();
      }, 3500);
    }, 1200);
  };

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

        <div>
          <span className="text-amber-500 font-mono text-xs tracking-[0.25em] uppercase">
            GET IN TOUCH
          </span>
          <h2 className="text-4xl font-light tracking-tight text-white mt-4 mb-4">
            Begin the <span className="font-normal text-amber-500">Dialogue</span>
          </h2>
          <p className="text-white/50 text-sm mb-10 max-w-md">
            Whether you are drafting a private villa or specifying cladding for a commercial tower, our materials specialists are here to guide.
          </p>

          <AnimatePresence mode="wait">
            {!isSent ? (
              <motion.form
                key="contact-form"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {/* Inputs Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-xs font-mono text-white/50 tracking-wider">FULL NAME</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Liam Sterling"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 text-white placeholder-white/20 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs font-mono text-white/50 tracking-wider">EMAIL ADDRESS</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. liam@sterlingdesign.com"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 text-white placeholder-white/20 transition-colors"
                    />
                  </div>
                </div>

                {/* Interactive Dynamic Material Calculator Section */}
                <div className="p-6 rounded-2xl bg-amber-500/[0.02] border border-amber-500/10 space-y-4">
                  <div className="flex items-center gap-2 text-amber-500 text-xs font-mono tracking-wider">
                    <Calculator className="w-4 h-4" />
                    <span>BUDGET & VOLUME ESTIMATOR</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-[10px] font-mono text-white/40">PROMPTEDDEV DESIGN ELEMENTS</label>
                      <select
                        value={material}
                        onChange={(e) => setMaterial(e.target.value as keyof typeof MATERIAL_PRICES)}
                        className="w-full bg-[#1A1A1E] border border-white/5 rounded-lg px-3 py-2 text-xs focus:outline-none text-white transition-colors"
                      >
                        {Object.entries(MATERIAL_PRICES).map(([key, data]) => (
                          <option key={key} value={key}>
                            {data.name} (${data.price}/sqm)
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-mono text-white/40">SURFACE VOLUME (SQM): {sqm}</label>
                      <input
                        type="range"
                        min="5"
                        max="200"
                        step="5"
                        value={sqm}
                        onChange={(e) => setSqm(Number(e.target.value))}
                        className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-amber-500"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-3 border-t border-amber-500/5 text-xs">
                    <span className="text-white/50">Approximate Material-only Value:</span>
                    <span className="text-sm font-semibold text-amber-500 font-mono">
                      ${totalEstimate.toLocaleString()} USD
                    </span>
                  </div>
                </div>

                {/* Message text area */}
                <div className="space-y-2">
                  <label className="block text-xs font-mono text-white/50 tracking-wider">PROJECT NARRATIVE</label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about the kitchen slab layout, stone edge thickness, or bathroom wall dimensions..."
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 text-white placeholder-white/20 transition-colors resize-none"
                  />
                </div>

                {/* Send Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full relative flex items-center justify-center gap-2 py-4 px-6 bg-amber-500 hover:bg-amber-600 text-neutral-900 rounded-xl text-sm font-semibold transition-all duration-300 disabled:opacity-50 cursor-pointer focus:outline-none select-none"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>SUBMIT INQUIRY</span>
                      <Send className="w-4 h-4 ml-1" />
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="contact-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center justify-center text-center py-16 space-y-4"
              >
                <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center text-amber-500">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-light text-white">Inquiry Received</h3>
                <p className="text-sm text-white/50 max-w-sm">
                  Thank you, <span className="text-white font-medium">{name}</span>. A PromptedDev Design specialist has been notified. We will review your calculation for <span className="text-amber-500">{MATERIAL_PRICES[material].name}</span> and contact you shortly.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer specifications links */}
        <div className="text-xs text-white/30 pt-8 border-t border-white/5">
          For immediate assistance, schedule a viewing in our Melbourne studio: <a href="mailto:studio@prompteddev.com" className="text-amber-500/80 hover:underline">studio@prompteddev.com</a>
        </div>
      </motion.div>
    </div>
  );
};
