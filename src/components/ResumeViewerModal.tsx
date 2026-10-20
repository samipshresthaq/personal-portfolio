import React, { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
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
} from "lucide-react";
import * as pdfjsLib from "pdfjs-dist";
import { PERSONAL_INFO } from "../data/portfolioData";

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

interface ResumeViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeViewerModal: React.FC<ResumeViewerModalProps> = ({
  isOpen,
  onClose,
}) => {
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
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && currentPage < numPages) {
        setCurrentPage((p) => p + 1);
      }
      if (e.key === "ArrowLeft" && currentPage > 1) {
        setCurrentPage((p) => p - 1);
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
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
        const loadingTask = pdfjsLib.getDocument({
          url: PERSONAL_INFO.resumePdfUrl,
        });
        const pdf = await loadingTask.promise;

        if (isCancelled) return;
        pdfDocRef.current = pdf;
        setNumPages(pdf.numPages);
        setPdfLoading(false);
      } catch (err: any) {
        if (!isCancelled) {
          console.error("Error loading PDF via PDF.js:", err);
          setPdfError(
            "Failed to load PDF engine. Download the file directly.",
          );
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
    let renderTask: any = null;

    const renderPage = async () => {
      try {
        const page = await pdfDocRef.current!.getPage(currentPage);
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext("2d");
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
        if (err?.name !== "RenderingCancelledException") {
          console.error("PDF rendering error:", err);
        }
      }
    };

    renderPage();

    return () => {
      if (renderTask) {
        renderTask.cancel();
      }
    };
  }, [currentPage, scale, pdfLoading]);

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
              <h2
                id="modal-resume-title"
                className="text-xs sm:text-sm font-bold text-[#202321]"
              >
                Samip Shrestha — Senior Full-Stack Engineer Resume
              </h2>
              <div className="text-[10px] sm:text-[11px] text-[#6B716F]">
                Direct PDF Viewer · React · TypeScript · Node/NestJS · Python ·
                PostgreSQL
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
          {/* Controls for PDF Engine */}
          {!pdfError && (
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
                  onClick={() =>
                    setCurrentPage((p) => Math.min(p + 1, numPages))
                  }
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
          <div className="flex flex-col items-center gap-4">
            {pdfLoading && (
              <div className="flex flex-col items-center justify-center p-12 text-[#F7F6F2] space-y-3">
                <Loader2 className="w-8 h-8 animate-spin text-[#DCE5DC]" />
                <span className="text-xs">
                  Rendering PDF via Mozilla PDF.js...
                </span>
              </div>
            )}

            {pdfError ? (
              <div className="bg-white rounded-md p-6 max-w-md text-center space-y-3 border border-red-200 shadow-md">
                <AlertCircle className="w-8 h-8 text-amber-600 mx-auto" />
                <h4 className="text-sm font-bold text-[#202321]">
                  PDF Preview Notice
                </h4>
                <p className="text-xs text-[#6B716F] leading-relaxed">
                  {pdfError}
                </p>
                <div className="flex items-center justify-center gap-2 pt-2">
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
                <canvas
                  ref={canvasRef}
                  className="block max-w-full h-auto select-none"
                />
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
                        ? "bg-[#315C4B] text-white shadow-md"
                        : "bg-white/80 hover:bg-white text-[#202321]"
                    }`}
                  >
                    Page {i + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};
