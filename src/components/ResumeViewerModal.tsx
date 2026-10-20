import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  Download,
  ExternalLink,
  FileText,
  CheckCircle2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Eye,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ResumeViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeViewerModal: React.FC<ResumeViewerModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'document' | 'summary' | 'rawPdf'>('document');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [zoomLevel, setZoomLevel] = useState<number>(100);

  const totalPages = PERSONAL_INFO.resumePageImages?.length || 2;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && currentPage < totalPages) {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
      }
      if (e.key === 'ArrowLeft' && currentPage > 1) {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, currentPage, totalPages]);

  if (!isOpen) return null;

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 15, 160));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 15, 75));
  };

  const handleResetZoom = () => {
    setZoomLevel(100);
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[100] overflow-y-auto bg-[#202321]/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-resume-title"
    >
      <div
        className="relative w-full max-w-5xl bg-white rounded-lg border border-[#E4E2DC] shadow-2xl overflow-hidden flex flex-col h-[92vh] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="flex flex-wrap items-center justify-between px-4 sm:px-6 py-3 border-b border-[#E4E2DC] bg-[#F7F6F2] gap-3">
          {/* Document Title */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#315C4B] text-[#F7F6F2] rounded-md shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h2 id="modal-resume-title" className="text-xs sm:text-sm font-bold text-[#202321]">
                Samip Shrestha — Senior Full-Stack Resume
              </h2>
              <div className="text-[10px] sm:text-[11px] text-[#6B716F]">
                10+ Years Experience · React · TypeScript · Node/NestJS · Python · PostgreSQL
              </div>
            </div>
          </div>

          {/* Action Tools */}
          <div className="flex items-center gap-2 sm:gap-3 ml-auto">
            {/* Direct PDF Download */}
            <a
              href={PERSONAL_INFO.resumePdfUrl}
              download="Samip_Shrestha_Senior_Full_Stack_Resume_5c5777cd.pdf"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#F7F6F2] bg-[#315C4B] hover:bg-[#26493B] rounded-md transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download PDF</span>
            </a>

            {/* Open in New Window */}
            <a
              href={PERSONAL_INFO.resumePdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-[#6B716F] hover:text-[#202321] hover:bg-[#E4E2DC]/60 rounded-md transition-colors"
              title="Open raw PDF file in new tab"
              aria-label="Open PDF in new tab"
            >
              <ExternalLink className="w-4 h-4" />
            </a>

            {/* Close Modal */}
            <button
              onClick={onClose}
              className="p-1.5 text-[#6B716F] hover:text-[#202321] hover:bg-[#E4E2DC]/60 rounded-md transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Secondary Navigation & View Switcher */}
        <div className="px-4 sm:px-6 py-2 bg-white border-b border-[#E4E2DC] flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Tabs */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setActiveTab('document')}
              className={`px-3 py-1 rounded-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'document'
                  ? 'bg-[#315C4B] text-[#F7F6F2]'
                  : 'text-[#6B716F] hover:text-[#202321] bg-[#F7F6F2]'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Document Viewer</span>
            </button>

            <button
              onClick={() => setActiveTab('summary')}
              className={`px-3 py-1 rounded-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'summary'
                  ? 'bg-[#315C4B] text-[#F7F6F2]'
                  : 'text-[#6B716F] hover:text-[#202321] bg-[#F7F6F2]'
              }`}
            >
              Executive Summary
            </button>

            <button
              onClick={() => setActiveTab('rawPdf')}
              className={`px-2.5 py-1 rounded-xs font-medium text-[11px] transition-colors cursor-pointer hidden md:block ${
                activeTab === 'rawPdf'
                  ? 'bg-[#315C4B] text-[#F7F6F2]'
                  : 'text-[#6B716F] hover:text-[#202321]'
              }`}
              title="View using browser native PDF plugin"
            >
              Browser Plugin View
            </button>
          </div>

          {/* Document Controls (Zoom & Page Switcher) */}
          {activeTab === 'document' && (
            <div className="flex items-center gap-3">
              {/* Page Navigator */}
              <div className="flex items-center gap-1 bg-[#F7F6F2] border border-[#E4E2DC] rounded-xs px-2 py-0.5">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage <= 1}
                  className="p-1 text-[#6B716F] hover:text-[#202321] disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Previous Page"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] font-mono-num text-[#202321] px-1">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  disabled={currentPage >= totalPages}
                  className="p-1 text-[#6B716F] hover:text-[#202321] disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Next Page"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Zoom Controls */}
              <div className="hidden sm:flex items-center gap-1 bg-[#F7F6F2] border border-[#E4E2DC] rounded-xs px-1.5 py-0.5">
                <button
                  onClick={handleZoomOut}
                  className="p-1 text-[#6B716F] hover:text-[#202321]"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="text-[10px] font-mono-num text-[#202321] px-1 w-10 text-center">
                  {zoomLevel}%
                </span>
                <button
                  onClick={handleZoomIn}
                  className="p-1 text-[#6B716F] hover:text-[#202321]"
                  title="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleResetZoom}
                  className="p-1 text-[#6B716F] hover:text-[#202321] border-l border-[#E4E2DC] pl-1.5 ml-0.5"
                  title="Reset Zoom"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto overflow-x-auto bg-[#313834] p-3 sm:p-6 flex flex-col items-center justify-start">
          {activeTab === 'document' && (
            <div
              className="transition-transform duration-150 origin-top flex flex-col items-center gap-6"
              style={{ width: `${zoomLevel}%`, maxWidth: '900px' }}
            >
              {/* Display Current Selected Page with Crisp Rendering */}
              <div className="w-full bg-white rounded-xs shadow-2xl border border-black/20 overflow-hidden relative">
                <img
                  src={PERSONAL_INFO.resumePageImages[currentPage - 1]}
                  alt={`Samip Shrestha Resume Page ${currentPage}`}
                  className="w-full h-auto block select-none"
                  loading="eager"
                />
              </div>

              {/* Bottom Quick Page Toggle */}
              <div className="flex items-center gap-2 pb-6">
                {PERSONAL_INFO.resumePageImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentPage(idx + 1)}
                    className={`px-3 py-1 rounded-xs text-xs font-semibold transition-all cursor-pointer ${
                      currentPage === idx + 1
                        ? 'bg-[#315C4B] text-white shadow-md'
                        : 'bg-white/80 hover:bg-white text-[#202321]'
                    }`}
                  >
                    Page {idx + 1}
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'rawPdf' && (
            <div className="w-full h-full bg-white flex flex-col">
              <iframe
                src={`${PERSONAL_INFO.resumePdfUrl}#toolbar=1&navpanes=0`}
                title="Samip Shrestha Resume PDF"
                className="w-full flex-1 border-none"
              />
            </div>
          )}

          {activeTab === 'summary' && (
            <div className="w-full max-w-3xl bg-white rounded-md shadow-lg p-6 sm:p-8 space-y-6 text-[#202321]">
              <div className="space-y-2 border-b border-[#E4E2DC] pb-4">
                <h3 className="text-xl font-bold text-[#202321]">Professional Summary</h3>
                <p className="text-xs sm:text-sm text-[#6B716F] leading-relaxed">
                  {PERSONAL_INFO.summary}
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#315C4B]">
                  Verified Resume Highlights
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

              <div className="pt-4 border-t border-[#E4E2DC] flex flex-wrap justify-between items-center gap-3">
                <span className="text-xs text-[#6B716F]">
                  Direct Contact: javasamip@gmail.com · +977-9845539425
                </span>
                <a
                  href={PERSONAL_INFO.resumePdfUrl}
                  download="Samip_Shrestha_Senior_Full_Stack_Resume_5c5777cd.pdf"
                  className="px-4 py-2 text-xs font-semibold text-[#F7F6F2] bg-[#315C4B] rounded-md hover:bg-[#26493B] transition-colors"
                >
                  Download PDF Copy
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};
