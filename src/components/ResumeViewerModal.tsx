import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  Download,
  ExternalLink,
  FileText,
  Printer,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Code2,
  FileCheck2,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';
import { PERSONAL_INFO } from '../data/portfolioData';

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

interface ResumeViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeViewerModal: React.FC<ResumeViewerModalProps> = ({ isOpen, onClose }) => {
  const [viewMode, setViewMode] = useState<'pdfEngine' | 'htmlDocument'>('pdfEngine');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [numPages, setNumPages] = useState<number>(2);
  const [scale, setScale] = useState<number>(1.25);
  const [pdfLoading, setPdfLoading] = useState<boolean>(true);
  const [pdfError, setPdfError] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pdfDocRef = useRef<pdfjsLib.PDFDocumentProxy | null>(null);

  // Keyboard navigation & ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && currentPage < numPages) {
        setCurrentPage((p) => p + 1);
      }
      if (e.key === 'ArrowLeft' && currentPage > 1) {
        setCurrentPage((p) => p - 1);
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
  }, [isOpen, onClose, currentPage, numPages]);

  // Load PDF document using PDF.js
  useEffect(() => {
    if (!isOpen) return;

    let isCancelled = false;
    setPdfLoading(true);
    setPdfError(null);

    const loadPdf = async () => {
      try {
        const loadingTask = pdfjsLib.getDocument({ url: PERSONAL_INFO.resumePdfUrl });
        const pdf = await loadingTask.promise;

        if (isCancelled) return;
        pdfDocRef.current = pdf;
        setNumPages(pdf.numPages);
        setPdfLoading(false);
      } catch (err: any) {
        if (!isCancelled) {
          console.error('Error loading PDF via PDF.js:', err);
          setPdfError('Failed to load PDF engine. You can view the HTML document or download the file directly.');
          setPdfLoading(false);
        }
      }
    };

    loadPdf();

    return () => {
      isCancelled = true;
    };
  }, [isOpen]);

  // Render current page to Canvas
  useEffect(() => {
    if (!pdfDocRef.current || viewMode !== 'pdfEngine' || pdfLoading) return;

    let renderTask: any = null;

    const renderPage = async () => {
      try {
        const page = await pdfDocRef.current!.getPage(currentPage);
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext('2d');
        if (!context) return;

        const viewport = page.getViewport({ scale });
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        renderTask = page.render(renderContext as any);
        await renderTask.promise;
      } catch (err: any) {
        if (err?.name !== 'RenderingCancelledException') {
          console.error('PDF rendering error:', err);
        }
      }
    };

    renderPage();

    return () => {
      if (renderTask) {
        renderTask.cancel();
      }
    };
  }, [currentPage, scale, viewMode, pdfLoading]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
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
                Samip Shrestha — Senior Full-Stack Engineer Resume
              </h2>
              <div className="text-[10px] sm:text-[11px] text-[#6B716F]">
                Direct PDF Viewer · React · TypeScript · Node/NestJS · Python · PostgreSQL
              </div>
            </div>
          </div>

          {/* Action Tools */}
          <div className="flex items-center gap-2 sm:gap-3 ml-auto">
            {/* Print Button */}
            <button
              onClick={handlePrint}
              className="p-1.5 text-[#6B716F] hover:text-[#202321] hover:bg-[#E4E2DC]/60 rounded-md transition-colors cursor-pointer hidden sm:flex items-center gap-1 text-xs"
              title="Print Resume"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>

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
              className="p-1.5 text-[#6B716F] hover:text-[#202321] hover:bg-[#E4E2DC]/60 rounded-md transition-colors cursor-pointer"
              title="Open raw PDF in new browser tab"
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

        {/* Secondary Toolbar: Mode Switcher & Controls */}
        <div className="px-4 sm:px-6 py-2 bg-white border-b border-[#E4E2DC] flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Renderer Mode Switcher */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setViewMode('pdfEngine')}
              className={`px-3 py-1 rounded-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'pdfEngine'
                  ? 'bg-[#315C4B] text-[#F7F6F2]'
                  : 'text-[#6B716F] hover:text-[#202321] bg-[#F7F6F2]'
              }`}
            >
              <FileCheck2 className="w-3.5 h-3.5" />
              <span>PDF Engine</span>
            </button>

            <button
              onClick={() => setViewMode('htmlDocument')}
              className={`px-3 py-1 rounded-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'htmlDocument'
                  ? 'bg-[#315C4B] text-[#F7F6F2]'
                  : 'text-[#6B716F] hover:text-[#202321] bg-[#F7F6F2]'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>HTML Document View</span>
            </button>
          </div>

          {/* Controls for PDF Engine */}
          {viewMode === 'pdfEngine' && !pdfError && (
            <div className="flex items-center gap-3">
              {/* Page Navigator */}
              <div className="flex items-center gap-1 bg-[#F7F6F2] border border-[#E4E2DC] rounded-xs px-2 py-0.5">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage <= 1}
                  className="p-1 text-[#6B716F] hover:text-[#202321] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  title="Previous Page"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] font-mono-num text-[#202321] px-1">
                  Page {currentPage} of {numPages}
                </span>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, numPages))}
                  disabled={currentPage >= numPages}
                  className="p-1 text-[#6B716F] hover:text-[#202321] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  title="Next Page"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Zoom Controls */}
              <div className="hidden sm:flex items-center gap-1 bg-[#F7F6F2] border border-[#E4E2DC] rounded-xs px-1.5 py-0.5">
                <button
                  onClick={() => setScale((s) => Math.max(s - 0.2, 0.75))}
                  className="p-1 text-[#6B716F] hover:text-[#202321] cursor-pointer"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="text-[10px] font-mono-num text-[#202321] px-1 w-10 text-center">
                  {Math.round(scale * 100)}%
                </span>
                <button
                  onClick={() => setScale((s) => Math.min(s + 0.2, 2.0))}
                  className="p-1 text-[#6B716F] hover:text-[#202321] cursor-pointer"
                  title="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setScale(1.25)}
                  className="p-1 text-[#6B716F] hover:text-[#202321] border-l border-[#E4E2DC] pl-1.5 ml-0.5 cursor-pointer"
                  title="Reset Zoom"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto overflow-x-auto bg-[#313834] p-3 sm:p-6 flex flex-col items-center justify-start">
          {/* 1. PDF.js Direct PDF File Engine */}
          {viewMode === 'pdfEngine' && (
            <div className="flex flex-col items-center gap-4">
              {pdfLoading && (
                <div className="flex flex-col items-center justify-center p-12 text-[#F7F6F2] space-y-3">
                  <Loader2 className="w-8 h-8 animate-spin text-[#DCE5DC]" />
                  <span className="text-xs">Rendering PDF via Mozilla PDF.js...</span>
                </div>
              )}

              {pdfError ? (
                <div className="bg-white rounded-md p-6 max-w-md text-center space-y-3 border border-red-200 shadow-md">
                  <AlertCircle className="w-8 h-8 text-amber-600 mx-auto" />
                  <h4 className="text-sm font-bold text-[#202321]">PDF Preview Notice</h4>
                  <p className="text-xs text-[#6B716F] leading-relaxed">{pdfError}</p>
                  <div className="flex items-center justify-center gap-2 pt-2">
                    <button
                      onClick={() => setViewMode('htmlDocument')}
                      className="px-3 py-1.5 text-xs font-semibold bg-[#315C4B] text-white rounded-md"
                    >
                      Switch to HTML Document View
                    </button>
                    <a
                      href={PERSONAL_INFO.resumePdfUrl}
                      download
                      className="px-3 py-1.5 text-xs font-semibold border border-[#E4E2DC] rounded-md text-[#202321]"
                    >
                      Download PDF
                    </a>
                  </div>
                </div>
              ) : (
                <div className="bg-white shadow-2xl rounded-xs border border-black/20 overflow-hidden">
                  <canvas ref={canvasRef} className="block max-w-full h-auto select-none" />
                </div>
              )}

              {!pdfLoading && !pdfError && (
                <div className="flex items-center gap-2 pb-6">
                  {Array.from({ length: numPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-3 py-1 rounded-xs text-xs font-semibold transition-all cursor-pointer ${
                        currentPage === i + 1
                          ? 'bg-[#315C4B] text-white shadow-md'
                          : 'bg-white/80 hover:bg-white text-[#202321]'
                      }`}
                    >
                      Page {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 2. HTML-Only Renderer (Pixel-Accurate 2-Page Document) */}
          {viewMode === 'htmlDocument' && (
            <div className="w-full max-w-[850px] flex flex-col gap-8 pb-10">
              {/* PAGE 1 */}
              <div className="bg-white shadow-2xl rounded-xs p-8 sm:p-12 text-[#202321] text-xs font-sans border border-[#E4E2DC] space-y-5 leading-normal select-text">
                {/* Header */}
                <div className="text-center space-y-1 pb-3 border-b border-[#202321]">
                  <h1 className="text-2xl font-bold tracking-tight text-[#202321] uppercase">
                    SAMIP SHRESTHA
                  </h1>
                  <div className="text-[11px] font-semibold text-[#202321] tracking-wide">
                    SENIOR FULL-STACK ENGINEER | React | TypeScript | Node.js | NestJS | PostgreSQL | AI / LLM
                  </div>
                  <div className="text-[10px] text-[#6B716F] flex flex-wrap justify-center gap-2 pt-0.5">
                    <span>Hetauda, Nepal</span>
                    <span>•</span>
                    <a href="mailto:javasamip@gmail.com" className="text-[#315C4B] hover:underline font-medium">
                      javasamip@gmail.com
                    </a>
                    <span>•</span>
                    <span>+977-9845539425</span>
                    <span>•</span>
                    <a
                      href="https://linkedin.com/in/er-samip-shrestha"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#315C4B] hover:underline"
                    >
                      linkedin.com/in/er-samip-shrestha
                    </a>
                    <span>•</span>
                    <a
                      href="https://github.com/samipshresthaq"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#315C4B] hover:underline"
                    >
                      github.com/samipshresthaq
                    </a>
                  </div>
                </div>

                {/* Professional Summary */}
                <div className="space-y-1">
                  <h2 className="text-[11px] font-bold uppercase tracking-wider text-[#202321] border-b border-[#E4E2DC] pb-0.5">
                    PROFESSIONAL SUMMARY
                  </h2>
                  <p className="text-[10.5px] text-[#202321] text-justify leading-relaxed">
                    Senior Full-Stack Engineer and technical lead with 10+ years of software development experience, with deep expertise in JavaScript/TypeScript, React, Angular, React Native, Node.js/NestJS and PostgreSQL. Experienced in building SaaS and AI-powered products, designing backend services and APIs, optimizing application and database performance, implementing automated testing and CI/CD, and leading engineering teams. Recent work includes LLM evaluation, multimodal audio/video workflows, background processing, WebSockets and cloud-based product development.
                  </p>
                </div>

                {/* Core Technical Skills */}
                <div className="space-y-1">
                  <h2 className="text-[11px] font-bold uppercase tracking-wider text-[#202321] border-b border-[#E4E2DC] pb-0.5">
                    CORE TECHNICAL SKILLS
                  </h2>
                  <div className="space-y-0.5 text-[10.5px] leading-relaxed">
                    <p>
                      <strong>Languages:</strong> JavaScript, TypeScript, Python, SQL
                    </p>
                    <p>
                      <strong>Frontend:</strong> React, Angular, React Native, Ionic, HTML5, CSS/SCSS, D3.js
                    </p>
                    <p>
                      <strong>Backend:</strong> Node.js, NestJS, Express.js, FastAPI, REST APIs, GraphQL, WebSockets
                    </p>
                    <p>
                      <strong>Databases:</strong> PostgreSQL, MongoDB
                    </p>
                    <p>
                      <strong>Cloud / DevOps:</strong> AWS, Google Cloud, Jenkins, GitHub CI/CD, GitLab
                    </p>
                    <p>
                      <strong>Testing:</strong> Playwright, Cypress
                    </p>
                    <p>
                      <strong>Architecture:</strong> System Design, Microservices, API Design, Background Workers, Real-Time Communication
                    </p>
                    <p>
                      <strong>AI / LLM:</strong> LLM Evaluation, Multimodal AI Workflows, LLM Integrations, AI Training Platforms
                    </p>
                  </div>
                </div>

                {/* Professional Experience */}
                <div className="space-y-3">
                  <h2 className="text-[11px] font-bold uppercase tracking-wider text-[#202321] border-b border-[#E4E2DC] pb-0.5">
                    PROFESSIONAL EXPERIENCE
                  </h2>

                  {/* Turing Inc. */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-baseline font-bold text-[11px]">
                      <span>TURING INC. — Lead Full-Stack Developer</span>
                      <span className="font-mono-num font-normal text-[10.5px]">Apr 2024 – Jan 2026</span>
                    </div>
                    <div className="text-[10px] text-[#6B716F]">
                      Tech: React + TypeScript, Node/NestJS/Express, PostgreSQL, GraphQL, Prisma, Python/FastAPI, Google Cloud, Jenkins
                    </div>
                    <ul className="list-disc list-outside pl-4 space-y-0.5 text-[10.5px] text-[#202321] leading-relaxed">
                      <li>
                        Led team of five developers for the development of an AI-driven platform for evaluating complex LLM response failures, including hallucinations, flawed inferences and robotic over-narration, and turning findings into actionable optimization feedback.
                      </li>
                      <li>
                        Built and improved full-stack workflows for multimodal applications that upload, process and route audio/video data to LLM-powered services and contributing to $1.8M revenue.
                      </li>
                      <li>
                        Improved application performance by 60% and eliminated polling overhead by introducing NestJS background workers, FastAPI WebSocket communication and React component optimization.
                      </li>
                      <li>
                        Designed and maintained PostgreSQL schema changes and Prisma migrations; diagnosed and resolved transaction leaks caused by unclosed database connections.
                      </li>
                      <li>
                        Owned end-to-end engineering responsibilities including feature development, code reviews, deployments, debugging, system monitoring and production support.
                      </li>
                      <li>
                        Collaborated with product managers on roadmap planning and technical priorities while leading delivery under tight deadlines.
                      </li>
                    </ul>
                  </div>

                  {/* Seva Development */}
                  <div className="space-y-1 pt-1">
                    <div className="flex justify-between items-baseline font-bold text-[11px]">
                      <span>SEVA DEVELOPMENT — Senior Full-Stack Developer (Frontend Heavy)</span>
                      <span className="font-mono-num font-normal text-[10.5px]">Jul 2022 – Apr 2024</span>
                    </div>
                    <div className="text-[10px] text-[#6B716F]">
                      Product: Qualiti | Tech: Angular, NestJS, PostgreSQL, Playwright, Cypress, AWS, GitHub CI/CD
                    </div>
                    <ul className="list-disc list-outside pl-4 space-y-0.5 text-[10.5px] text-[#202321] leading-relaxed">
                      <li>
                        Led frontend engineering for a SaaS product built within a microservices architecture, owning frontend repositories and contributing to $6M in US-market revenue.
                      </li>
                      <li>
                        Improved application performance through PostgreSQL query tuning, API optimization, Angular component optimization and JavaScript performance improvements.
                      </li>
                      <li>
                        Established a TDD-oriented development workflow with unit and end-to-end testing using Playwright and Cypress.
                      </li>
                      <li>
                        Led and mentored the UI engineering team, supported technical decisions, code reviews and delivery quality.
                      </li>
                      <li>
                        Collaborated with product owners on roadmap planning, feature priorities and UI/UX improvements.
                      </li>
                      <li>
                        Supported CI/CD pipeline debugging and cross-team production issue resolution.
                      </li>
                    </ul>
                  </div>

                  {/* ITONICS Nepal */}
                  <div className="space-y-1 pt-1">
                    <div className="flex justify-between items-baseline font-bold text-[11px]">
                      <span>ITONICS NEPAL PVT. LTD. — Senior / Lead Frontend Developer</span>
                      <span className="font-mono-num font-normal text-[10.5px]">Sep 2017 – Jun 2022</span>
                    </div>
                    <div className="text-[10px] text-[#6B716F]">
                      Tech: Angular, Ionic, jQuery, ES6, D3.js, HTML5 Canvas, Webpack, GitLab
                    </div>
                    <ul className="list-disc list-outside pl-4 space-y-0.5 text-[10.5px] text-[#202321] leading-relaxed">
                      <li>
                        Developed and maintained SaaS and hybrid mobile applications for web, iOS and Android using Angular and Ionic contributing to onboarding 20% increment in newer clients.
                      </li>
                      <li>
                        Led and mentored frontend developers, established coding standards and supported technical growth across the team.
                      </li>
                      <li>
                        Designed data-visualization experiences using Canvas and D3.js.
                      </li>
                      <li>
                        Collaborated with product managers on sprint planning, architecture, feature scoping and technical delivery.
                      </li>
                    </ul>
                  </div>

                  {/* Earlier Experience */}
                  <div className="space-y-0.5 pt-1">
                    <div className="font-bold text-[11px]">EARLIER EXPERIENCE</div>
                    <p className="text-[10.5px]">
                      <strong>Digital Terai</strong> — Front End Developer | Jan 2016 – Aug 2017 | jQuery, ES6, Bootstrap, HTML/CSS, SCSS
                    </p>
                    <p className="text-[10.5px]">
                      <strong>Leapfrog Technology</strong> — Associate Software Engineer | Jun 2015 – Dec 2015 | ES6, jQuery, HTML/CSS, SVG
                    </p>
                    <p className="text-[10.5px]">
                      <strong>Uber Opus Pvt. Ltd</strong> — Software Engineering Intern | Dec 2014 – May 2015
                    </p>
                  </div>
                </div>

                <div className="text-right text-[10px] text-[#6B716F] pt-2 border-t border-[#E4E2DC]">
                  Page 1 of 2
                </div>
              </div>

              {/* PAGE 2 */}
              <div className="bg-white shadow-2xl rounded-xs p-8 sm:p-12 text-[#202321] text-xs font-sans border border-[#E4E2DC] space-y-6 leading-normal select-text min-h-[500px] flex flex-col justify-between">
                <div className="space-y-6">
                  {/* Selected Project */}
                  <div className="space-y-2">
                    <h2 className="text-[11px] font-bold uppercase tracking-wider text-[#202321] border-b border-[#E4E2DC] pb-0.5">
                      SELECTED PROJECT
                    </h2>
                    <div className="space-y-1">
                      <div className="font-bold text-[11px]">
                        Instasewa — Project Lead
                      </div>
                      <div className="text-[10px] text-[#6B716F]">
                        React, React Native, Express.js, MongoDB, Firebase, AWS, Stripe
                      </div>
                      <p className="text-[10.5px] text-[#202321] leading-relaxed pt-1">
                        Owned product architecture and system design; led development of the hybrid mobile and web applications and coordinated feature planning, prioritization and delivery with stakeholders.
                      </p>
                    </div>
                  </div>

                  {/* Education */}
                  <div className="space-y-2">
                    <h2 className="text-[11px] font-bold uppercase tracking-wider text-[#202321] border-b border-[#E4E2DC] pb-0.5">
                      EDUCATION
                    </h2>
                    <div className="flex justify-between items-baseline font-bold text-[11px]">
                      <span>Kantipur Engineering College — Bachelor&apos;s in Computer Engineering</span>
                      <span className="font-mono-num font-normal text-[10.5px]">2010 – 2014</span>
                    </div>
                  </div>
                </div>

                <div className="text-right text-[10px] text-[#6B716F] pt-2 border-t border-[#E4E2DC]">
                  Page 2 of 2
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};
