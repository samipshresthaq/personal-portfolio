import React, { useEffect, useState } from 'react';
import { X, Download, ExternalLink, FileText, CheckCircle2 } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ResumeViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeViewerModal: React.FC<ResumeViewerModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'summary'>('preview');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-[#202321]/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-resume-title"
    >
      <div
        className="relative w-full max-w-5xl bg-white rounded-lg border border-[#E4E2DC] shadow-2xl overflow-hidden flex flex-col h-[90vh] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E4E2DC] bg-[#F7F6F2]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#315C4B] text-[#F7F6F2] rounded-md">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h2 id="modal-resume-title" className="text-sm sm:text-base font-bold text-[#202321]">
                Samip Shrestha — Senior Full-Stack Resume
              </h2>
              <div className="text-[11px] text-[#6B716F]">
                10+ Years Experience · React · TypeScript · Node.js · NestJS · PostgreSQL · AI/LLM
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Download button */}
            <a
              href={PERSONAL_INFO.resumePdfUrl}
              download="Samip_Shrestha_Senior_Full_Stack_Resume.pdf"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#F7F6F2] bg-[#315C4B] hover:bg-[#26493B] rounded-md transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download PDF</span>
            </a>

            {/* Open in new window */}
            <a
              href={PERSONAL_INFO.resumePdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-[#6B716F] hover:text-[#202321] hover:bg-[#E4E2DC]/60 rounded-md transition-colors"
              title="Open PDF directly"
              aria-label="Open PDF in new tab"
            >
              <ExternalLink className="w-4 h-4" />
            </a>

            {/* Close button */}
            <button
              onClick={onClose}
              className="p-1.5 text-[#6B716F] hover:text-[#202321] hover:bg-[#E4E2DC]/60 rounded-md transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* View toggle (for small viewports / fallback) */}
        <div className="px-6 py-2 bg-white border-b border-[#E4E2DC] flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-3 py-1 rounded-sm font-medium transition-colors cursor-pointer ${
                activeTab === 'preview'
                  ? 'bg-[#315C4B] text-[#F7F6F2]'
                  : 'text-[#6B716F] hover:text-[#202321]'
              }`}
            >
              PDF Document Viewer
            </button>
            <button
              onClick={() => setActiveTab('summary')}
              className={`px-3 py-1 rounded-sm font-medium transition-colors cursor-pointer ${
                activeTab === 'summary'
                  ? 'bg-[#315C4B] text-[#F7F6F2]'
                  : 'text-[#6B716F] hover:text-[#202321]'
              }`}
            >
              Executive Summary
            </button>
          </div>

          <div className="text-[11px] text-[#6B716F] hidden sm:block">
            Verified Document · Direct PDF Asset
          </div>
        </div>

        {/* Main content container */}
        <div className="flex-1 overflow-hidden bg-[#202321]/5">
          {activeTab === 'preview' ? (
            <iframe
              src={PERSONAL_INFO.resumePdfUrl}
              title="Samip Shrestha Resume PDF"
              className="w-full h-full border-none"
            />
          ) : (
            <div className="h-full overflow-y-auto p-6 sm:p-8 space-y-6 bg-white max-w-3xl mx-auto">
              <div className="space-y-2 border-b border-[#E4E2DC] pb-4">
                <h3 className="text-xl font-bold text-[#202321]">Professional Summary</h3>
                <p className="text-xs sm:text-sm text-[#6B716F] leading-relaxed">
                  {PERSONAL_INFO.summary}
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#315C4B]">
                  Key Career Highlights
                </h4>
                <div className="space-y-3 text-xs sm:text-sm text-[#202321]">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#315C4B] shrink-0 mt-0.5" />
                    <span>
                      <strong>Turing Inc. (Lead Full-Stack Developer):</strong> Led 5 developers on AI-driven LLM evaluation platform, reduced latency by 60% with WebSockets, resolved PostgreSQL transaction leaks, contributed to $1.8M revenue.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#315C4B] shrink-0 mt-0.5" />
                    <span>
                      <strong>Seva Development (Senior Full-Stack Developer):</strong> Led frontend engineering for Qualiti microservices SaaS, generated $6M US-market revenue, built automated TDD pipeline with Playwright and Cypress.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#315C4B] shrink-0 mt-0.5" />
                    <span>
                      <strong>ITONICS Nepal (Senior / Lead Frontend Developer):</strong> Engineered interactive D3.js and HTML5 Canvas trend radars, increased client onboarding by 20%, mentored engineering squads.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#315C4B] shrink-0 mt-0.5" />
                    <span>
                      <strong>Education:</strong> Bachelor&apos;s in Computer Engineering from Kantipur Engineering College (2010 – 2014).
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E4E2DC] flex justify-between items-center">
                <span className="text-xs text-[#6B716F]">
                  Contact: javasamip@gmail.com · +977-9845539425
                </span>
                <a
                  href={PERSONAL_INFO.resumePdfUrl}
                  download="Samip_Shrestha_Senior_Full_Stack_Resume.pdf"
                  className="px-4 py-2 text-xs font-semibold text-[#F7F6F2] bg-[#315C4B] rounded-md"
                >
                  Download PDF Copy
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
