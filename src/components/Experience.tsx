import React, { useState } from 'react';
import { Briefcase, Calendar, ChevronDown, ChevronUp, GraduationCap, Check } from 'lucide-react';
import { EXPERIENCES, EDUCATION } from '../data/portfolioData';

export const Experience: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>('turing');

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="experience" className="py-16 md:py-24 border-t border-[#E4E2DC]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-10">
        {/* Section Header */}
        <div className="space-y-2 max-w-2xl pb-6 border-b border-[#E4E2DC]">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#315C4B]">
            <span>02. Verified Track Record</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#202321]">
            Professional Engineering Timeline
          </h2>
          <p className="text-xs sm:text-sm text-[#6B716F]">
            10+ years of technical leadership, SaaS revenue delivery, and measurable performance optimizations.
          </p>
        </div>

        {/* Timeline Cards */}
        <div className="space-y-4">
          {EXPERIENCES.map((exp) => {
            const isExpanded = expandedId === exp.id;

            return (
              <div
                key={exp.id}
                className={`bg-white rounded-lg border transition-all duration-200 overflow-hidden ${
                  isExpanded ? 'border-[#315C4B] shadow-2xs' : 'border-[#E4E2DC] hover:border-[#315C4B]/40'
                }`}
              >
                {/* Header row: Tech Stack & Role caught immediately */}
                <div
                  onClick={() => toggleExpand(exp.id)}
                  className="p-5 sm:p-6 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-2 max-w-3xl">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#6B716F]">
                      <span className="font-bold text-[#315C4B] flex items-center gap-1.5">
                        <Briefcase className="w-3.5 h-3.5" />
                        {exp.company}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono-num flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {exp.period}
                      </span>
                      {exp.location && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span>{exp.location}</span>
                        </>
                      )}
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-[#202321] tracking-tight">
                      {exp.role}
                    </h3>

                    {/* Immediate Metric Tag */}
                    <div className="text-xs font-semibold text-[#315C4B]">
                      {exp.highlightMetric}
                    </div>

                    {/* Tech Stack badges immediately visible without expanding */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      {exp.technologies.slice(0, 6).map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] font-medium bg-[#F7F6F2] border border-[#E4E2DC] px-2 py-0.5 rounded-xs text-[#202321]"
                        >
                          {tech}
                        </span>
                      ))}
                      {exp.technologies.length > 6 && (
                        <span className="text-[10px] text-[#6B716F]">
                          +{exp.technologies.length - 6} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end md:self-auto shrink-0">
                    <span className="text-xs font-medium text-[#6B716F] hidden sm:block">
                      {isExpanded ? 'Collapse' : 'View Impact Points'}
                    </span>
                    <button
                      className="p-1.5 rounded-full bg-[#F7F6F2] border border-[#E4E2DC] text-[#202321]"
                      aria-label="Toggle details"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Expanded Bullet Points (Short, Punchy) */}
                {isExpanded && (
                  <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-[#E4E2DC] bg-[#F7F6F2]/30 space-y-4 animate-in fade-in duration-150">
                    <div className="space-y-2 text-xs sm:text-sm text-[#202321]">
                      {exp.achievements.map((item, i) => (
                        <div key={i} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-[#315C4B] shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{item}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 flex flex-wrap items-center gap-1.5 text-xs">
                      <span className="text-[11px] font-semibold text-[#6B716F] mr-1">Full Environment:</span>
                      {exp.technologies.map((t) => (
                        <span key={t} className="bg-white border border-[#E4E2DC] px-2 py-0.5 rounded-xs text-[11px] text-[#202321]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Education Quick Card */}
        <div className="bg-[#DCE5DC]/30 rounded-lg border border-[#315C4B]/20 p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#315C4B] text-[#F7F6F2] rounded-md shrink-0">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#315C4B]">
                Academic Engineering Degree
              </div>
              <h4 className="text-sm sm:text-base font-bold text-[#202321]">
                {EDUCATION.degree} — {EDUCATION.institution}
              </h4>
              <div className="text-xs text-[#6B716F]">
                {EDUCATION.period} · {EDUCATION.location}
              </div>
            </div>
          </div>
          <span className="text-xs font-semibold text-[#315C4B] bg-white px-3 py-1 rounded-xs border border-[#E4E2DC] self-start md:self-auto">
            4-Year Bachelor of Engineering
          </span>
        </div>
      </div>
    </section>
  );
};
