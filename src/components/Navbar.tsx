import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Moon } from 'lucide-react';
import { cn } from '../lib/utils';

export const BullIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" />
    <path d="M12 12v4" />
    <path d="M8 16h8" />
    <path d="M4 10c0-3.31 2.69-6 6-6h4c3.31 0 6 2.69 6 6" />
    <path d="M2 8c0 0 2-2 4-2s4 2 4 2" />
    <path d="M22 8c0 0-2-2-4-2s-4 2-4 2" />
  </svg>
);

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Our Farm', href: '#farm' },
    { name: 'Packages', href: '#packages' },
    { name: 'Process', href: '#process' },
    { name: 'Reviews', href: '#testimonials' },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-700",
        isScrolled 
          ? "bg-primary/80 backdrop-blur-2xl border-b border-gold/10 py-4 shadow-2xl" 
          : "bg-transparent py-8"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.a
            href="#"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3 group"
          >
            <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(201,168,76,0.3)] group-hover:scale-110 transition-transform duration-500">
              <BullIcon className="text-primary w-7 h-7" />
            </div>
            <div className="flex flex-col">
              <span className="display-text text-2xl text-white leading-none tracking-tighter">Mushtaq</span>
              <span className="micro-label text-gold text-[10px] tracking-[0.4em]">Cattle Farm</span>
            </div>
          </motion.a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-12">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="micro-label text-cream/70 hover:text-gold transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            <a
              href="#booking"
              className="bg-gold text-primary px-8 py-3 micro-label text-[10px] hover:bg-white transition-all duration-300 shadow-xl"
            >
              Book Now
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden text-gold p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-primary-dark border-b border-gold/10 overflow-hidden"
          >
            <div className="px-4 py-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="micro-label text-cream/70 text-lg hover:text-gold transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#booking"
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-gold text-primary py-4 text-center micro-label tracking-[0.3em]"
              >
                Book Your Qurbani
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
