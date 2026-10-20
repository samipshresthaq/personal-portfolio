import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, CheckCircle, ArrowRight, Layers, Cpu, Award, Zap } from 'lucide-react';
import { Project } from '../types/portfolio';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] overflow-y-auto bg-[#202321]/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      <div
        className="relative w-full max-w-4xl bg-white rounded-lg border border-[#E4E2DC] shadow-2xl p-6 sm:p-8 md:p-10 my-8 text-[#202321] transition-all h-[92vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-md text-[#6B716F] hover:text-[#202321] hover:bg-[#F7F6F2] transition-colors cursor-pointer"
          aria-label="Close case study"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-3 pb-6 border-b border-[#E4E2DC]">
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#6B716F]">
            <span className="font-semibold text-[#315C4B]">{project.category}</span>
            <span aria-hidden="true">·</span>
            <span>{project.organization}</span>
            <span aria-hidden="true">·</span>
            <span>{project.period}</span>
            <span aria-hidden="true">·</span>
            <span className="font-medium text-[#202321]">{project.role}</span>
          </div>

          <h2
            id="modal-project-title"
            className="text-2xl sm:text-3xl font-bold tracking-tight text-[#202321]"
          >
            {project.title}
          </h2>

          <p className="text-sm sm:text-base text-[#6B716F] leading-relaxed max-w-3xl">
            {project.tagline}
          </p>

          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#315C4B] bg-[#DCE5DC]/60 px-3 py-1.5 rounded-sm">
            <Award className="w-4 h-4 shrink-0" />
            <span>{project.impactHighlight}</span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="py-6 space-y-8 max-h-[65vh] overflow-y-auto pr-2">
          {/* Overview & Challenge */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#6B716F] flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#315C4B]" />
                <span>Executive Overview</span>
              </h3>
              <p className="text-xs sm:text-sm text-[#202321] leading-relaxed">
                {project.description}
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#6B716F] flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-[#315C4B]" />
                <span>Engineering Challenge</span>
              </h3>
              <p className="text-xs sm:text-sm text-[#202321] leading-relaxed bg-[#F7F6F2] p-3 rounded-md border border-[#E4E2DC]">
                {project.challenge}
              </p>
            </div>
          </div>

          {/* Architecture Pipeline / Topology */}
          {project.architectureDiagramSnippet && (
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#6B716F]">
                Architectural Flow & Topology
              </h3>
              <div className="p-4 bg-[#F7F6F2] border border-[#E4E2DC] rounded-lg">
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono-num">
                  {project.architectureDiagramSnippet.nodes.map((node, index, arr) => (
                    <React.Fragment key={index}>
                      <div className="bg-white px-3 py-2 rounded-sm border border-[#E4E2DC] text-[#202321] font-medium shadow-2xs">
                        {node}
                      </div>
                      {index < arr.length - 1 && (
                        <ArrowRight className="w-4 h-4 text-[#315C4B] shrink-0 hidden sm:block" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Architectural Solutions */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#6B716F]">
              Key Architectural Decisions & Implementation
            </h3>
            <ul className="space-y-2.5">
              {project.architectureSolution.map((solution, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#202321] leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#315C4B] mt-2 shrink-0"></span>
                  <span>{solution}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Measurable Results */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#6B716F]">
              Measurable Business & Technical Outcomes
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {project.results.map((result, i) => (
                <div key={i} className="p-3.5 bg-white border border-[#E4E2DC] rounded-md space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#315C4B]">
                    <Zap className="w-3.5 h-3.5" />
                    <span>Impact {i + 1}</span>
                  </div>
                  <p className="text-xs text-[#202321] leading-snug">
                    {result}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies Used */}
          <div className="space-y-2 pt-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#6B716F]">
              Technologies & System Stack
            </h3>
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#202321]">
              {project.technologies.map((tech, i) => (
                <span
                  key={tech}
                  className="bg-[#F7F6F2] border border-[#E4E2DC] px-2.5 py-1 rounded-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
