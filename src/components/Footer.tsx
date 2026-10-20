import React from 'react';
import { ArrowUp, Github, Linkedin, FileText } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface FooterProps {
  onOpenResume: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenResume }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#19201C] text-[#F7F6F2] border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-white/10">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-xs bg-[#315C4B] text-[#F7F6F2] font-semibold text-xs flex items-center justify-center">
                {PERSONAL_INFO.initials}
              </span>
              <span className="font-bold text-sm tracking-tight text-[#F7F6F2]">
                {PERSONAL_INFO.name}
              </span>
            </div>
            <p className="text-xs text-[#DCE5DC]/70">
              Senior Full-Stack Engineer & Technical Lead · 10+ Years Building High-Performance Systems
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-[#DCE5DC]/80">
            <a href="#work" className="hover:text-white transition-colors">
              Work
            </a>
            <a href="#experience" className="hover:text-white transition-colors">
              Experience
            </a>
            <a href="#skills" className="hover:text-white transition-colors">
              Architecture & Skills
            </a>
            <a href="#about" className="hover:text-white transition-colors">
              About
            </a>
            <button
              onClick={onOpenResume}
              className="hover:text-white transition-colors inline-flex items-center gap-1 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </button>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-[#DCE5DC] hover:text-white transition-colors cursor-pointer"
              aria-label="Scroll back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#DCE5DC]/50">
          <div>
            &copy; {new Date().getFullYear()} {PERSONAL_INFO.name}. Built with React, TypeScript & Tailwind CSS.
          </div>
          <div className="flex items-center gap-4">
            <a
              href={PERSONAL_INFO.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
            <span>·</span>
            <a
              href={PERSONAL_INFO.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <span>·</span>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="hover:text-white transition-colors"
            >
              {PERSONAL_INFO.email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
