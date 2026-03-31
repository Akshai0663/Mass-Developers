'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Projects', href: '#projects' },
  { name: 'Blogs', href: '#blogs' },
];

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center mt-6 px-4 pointer-events-none"
    >
      <motion.nav 
        layout
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`pointer-events-auto flex items-center justify-between px-6 py-3 rounded-full border border-black/10 dark:border-white/10 bg-white/70 dark:bg-black/40 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] max-w-5xl w-full transition-all duration-500`}
      >
        <Link 
          href="/" 
          onClick={() => setActiveTab('Home')}
          className="text-xl font-bold tracking-tighter shrink-0 flex items-center gap-1 group"
        >
          <span className="bg-gradient-to-r from-neutral-900 to-neutral-500 dark:from-white dark:to-neutral-400 bg-clip-text text-transparent transition-all group-hover:opacity-80">
            MASS
          </span>
          <span className="text-gray-400 dark:text-gray-600 font-black">.</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setActiveTab(link.name)}
              className="relative px-2 py-2 text-sm font-semibold tracking-widest transition-colors hover:text-foreground text-foreground/70"
            >
              <span className="relative z-10">{link.name.toUpperCase()}</span>
              {activeTab === link.name && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute inset-0 bg-black/5 dark:bg-white/10 rounded-md"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-4 pl-4 border-l border-black/10 dark:border-white/10 shrink-0">
          <ThemeToggle />
          
          <Link 
            href="#contact" 
            className="hidden md:inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition-all rounded-full bg-foreground text-background hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(0,0,0,0.1)] hover:shadow-[0_0_20px_rgba(0,0,0,0.2)] dark:shadow-[0_0_15px_rgba(255,255,255,0.3)] dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.5)]"
          >
            Get a Quote
          </Link>
          
          <button className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none focus:ring-2 focus:ring-foreground rounded-md p-1">
            <span className="w-6 h-0.5 bg-foreground block transform transition-all duration-300"></span>
            <span className="w-6 h-0.5 bg-foreground block transform transition-all duration-300"></span>
          </button>
        </div>
      </motion.nav>
    </motion.div>
  );
};

export default Navbar;
