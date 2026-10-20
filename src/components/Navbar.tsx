import React, { useState, useEffect } from 'react';
import { CloudDownload, ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  onOpenResume: () => void;
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume, onOpenContact }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBrandClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#F7F6F2]/95 backdrop-blur-md border-b border-[#E4E2DC] py-3 shadow-xs'
          : 'bg-[#F7F6F2] border-b border-[#E4E2DC]/60 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between gap-4">
        {/* Brand Zone */}
        <a
          href="#hero"
          onClick={handleBrandClick}
          className="flex items-center gap-3 group text-[#202321] whitespace-nowrap shrink-0"
        >
          <span className="w-8 h-8 rounded-sm bg-[#315C4B] text-[#F7F6F2] font-semibold text-xs flex items-center justify-center tracking-wider transition-transform duration-200 group-hover:scale-105">
            {PERSONAL_INFO.initials}
          </span>
          <div className="flex flex-col">
            <span className="font-semibold text-sm sm:text-base tracking-tight text-[#202321]">
              {PERSONAL_INFO.name}
            </span>
            <span className="text-[10px] tracking-wider text-[#6B716F] font-medium uppercase hidden sm:block">
              Senior Full-Stack Engineer
            </span>
          </div>
        </a>

        {/* Action Controls & Availability */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <button
            onClick={onOpenResume}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#315C4B] bg-[#DCE5DC]/50 hover:bg-[#DCE5DC] border border-[#315C4B]/20 rounded-md transition-colors duration-200 whitespace-nowrap cursor-pointer"
          >
            <CloudDownload className="w-3.5 h-3.5" />
            <span>Resume</span>
          </button>

          <button
            onClick={onOpenContact}
            className="inline-flex items-center gap-1 px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs font-medium text-[#F7F6F2] bg-[#315C4B] hover:bg-[#26493B] rounded-md transition-colors duration-200 shadow-xs whitespace-nowrap cursor-pointer"
          >
            <span>Get in Touch</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
