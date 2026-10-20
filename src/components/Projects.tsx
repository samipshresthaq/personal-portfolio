import React, { useState } from 'react';
import { ArrowUpRight, Cpu, Layers, Activity, Smartphone, BarChart3, Check } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types/portfolio';
import { ProjectModal } from './ProjectModal';

export const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories = [
    'All',
    'AI & Systems',
    'Enterprise SaaS',
    'Mobile & Web',
    'Data Visualization',
  ];

  const filteredProjects =
    selectedCategory === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'AI & Systems':
        return <Cpu className="w-3.5 h-3.5 text-[#315C4B]" />;
      case 'Enterprise SaaS':
        return <Layers className="w-3.5 h-3.5 text-[#315C4B]" />;
      case 'Mobile & Web':
        return <Smartphone className="w-3.5 h-3.5 text-[#315C4B]" />;
      case 'Data Visualization':
        return <BarChart3 className="w-3.5 h-3.5 text-[#315C4B]" />;
      default:
        return <Activity className="w-3.5 h-3.5 text-[#315C4B]" />;
    }
  };

  return (
    <section id="work" className="py-16 md:py-24 border-t border-[#E4E2DC]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E4E2DC]">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#315C4B]">
              <span>01. Featured Systems & Projects</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#202321]">
              Architectural Systems & Shipped Platforms
            </h2>
            <p className="text-xs sm:text-sm text-[#6B716F]">
              Click any project for technical breakdown, architecture topology, and code snippets.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#E4E2DC]/50 rounded-md self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-sm transition-all duration-150 whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-white text-[#202321] shadow-2xs font-semibold'
                    : 'text-[#6B716F] hover:text-[#202321]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid: Instant Scan Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {filteredProjects.map((project, idx) => {
            const isFeatured = project.featured && idx === 0;

            if (isFeatured) {
              // Full-width Showcase Hero Card for Flagship Project
              return (
                <div
                  key={project.id}
                  onClick={() => setActiveModalProject(project)}
                  className="lg:col-span-12 group bg-white rounded-lg border border-[#E4E2DC] hover:border-[#315C4B]/60 transition-all duration-200 shadow-xs hover:shadow-md cursor-pointer p-6 sm:p-8"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    {/* Left: Quick-Read Details */}
                    <div className="lg:col-span-7 space-y-4">
                      {/* Unboxed Metadata */}
                      <div className="flex flex-wrap items-center gap-2 text-xs text-[#6B716F]">
                        <span className="flex items-center gap-1 font-semibold text-[#315C4B]">
                          {getCategoryIcon(project.category)}
                          {project.category}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{project.organization}</span>
                        <span aria-hidden="true">·</span>
                        <span>{project.period}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-medium text-[#202321]">{project.role}</span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#202321] group-hover:text-[#315C4B] transition-colors">
                        {project.title}
                      </h3>

                      {/* Impact Highlight Banner */}
                      <div className="p-2.5 bg-[#DCE5DC]/60 rounded-xs border border-[#315C4B]/20 text-xs font-bold text-[#315C4B]">
                        {project.impactHighlight}
                      </div>

                      {/* 2 Punchy Bullet Takeaways */}
                      <div className="space-y-1.5 text-xs text-[#202321]">
                        <div className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-[#315C4B] shrink-0 mt-0.5" />
                          <span>
                            <strong>Architecture:</strong> FastAPI WebSockets + NestJS background queues eliminated polling lag.
                          </span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-[#315C4B] shrink-0 mt-0.5" />
                          <span>
                            <strong>Database:</strong> Resolved critical Prisma connection pool leaks under heavy LLM evaluation bursts.
                          </span>
                        </div>
                      </div>

                      {/* Tech Stack Badges */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="text-[11px] font-medium bg-[#F7F6F2] border border-[#E4E2DC] px-2 py-0.5 rounded-xs text-[#202321]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="pt-2">
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#315C4B] group-hover:underline underline-offset-4">
                          <span>View Case Study & Architecture Blueprint</span>
                          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </span>
                      </div>
                    </div>

                    {/* Right: Architecture Flow preview */}
                    <div className="lg:col-span-5 bg-[#F7F6F2] rounded-md border border-[#E4E2DC] p-4 space-y-2.5 text-xs font-mono-num">
                      <div className="flex items-center justify-between pb-2 border-b border-[#E4E2DC] text-[11px] font-semibold text-[#202321]">
                        <span>Pipeline Topology</span>
                        <span className="text-[#315C4B]">Zero Polling</span>
                      </div>
                      <div className="p-2 bg-white rounded-xs border border-[#E4E2DC] flex justify-between">
                        <span>1. Audio/Video Stream</span>
                        <span className="text-[#6B716F]">Client S3</span>
                      </div>
                      <div className="p-2 bg-white rounded-xs border border-[#315C4B]/40 flex justify-between font-semibold text-[#315C4B]">
                        <span>2. FastAPI WebSockets</span>
                        <span>Bi-directional</span>
                      </div>
                      <div className="p-2 bg-white rounded-xs border border-[#E4E2DC] flex justify-between">
                        <span>3. NestJS Async Queue</span>
                        <span className="text-[#6B716F]">Background</span>
                      </div>
                      <div className="p-2 bg-white rounded-xs border border-[#E4E2DC] flex justify-between">
                        <span>4. LLM Diagnostic Engine</span>
                        <span className="text-[#6B716F]">Token Audit</span>
                      </div>
                      <div className="p-2 bg-white rounded-xs border border-[#315C4B]/40 flex justify-between font-semibold text-[#315C4B]">
                        <span>5. PostgreSQL + Prisma</span>
                        <span>Pool-Tuned</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            // Secondary Project Cards
            return (
              <div
                key={project.id}
                onClick={() => setActiveModalProject(project)}
                className="lg:col-span-6 group bg-white rounded-lg border border-[#E4E2DC] hover:border-[#315C4B]/60 transition-all duration-200 shadow-xs hover:shadow-md cursor-pointer flex flex-col justify-between p-6 space-y-4"
              >
                <div className="space-y-3">
                  {/* Unboxed Metadata */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#6B716F]">
                    <span className="flex items-center gap-1 font-semibold text-[#315C4B]">
                      {getCategoryIcon(project.category)}
                      {project.category}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{project.organization}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.period}</span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold tracking-tight text-[#202321] group-hover:text-[#315C4B] transition-colors">
                    {project.title}
                  </h3>

                  {/* Impact Highlight */}
                  <div className="p-2 bg-[#F7F6F2] rounded-xs border border-[#E4E2DC] text-xs font-bold text-[#315C4B]">
                    {project.impactHighlight}
                  </div>

                  {/* 1-sentence summary */}
                  <p className="text-xs text-[#6B716F] leading-snug">
                    {project.tagline}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {project.technologies.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-medium bg-[#F7F6F2] border border-[#E4E2DC] px-2 py-0.5 rounded-xs text-[#202321]"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 5 && (
                      <span className="text-[10px] text-[#6B716F]">
                        +{project.technologies.length - 5}
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E4E2DC] flex items-center justify-between text-xs">
                  <span className="text-[#6B716F] font-medium">{project.role}</span>
                  <span className="font-semibold text-[#315C4B] group-hover:underline inline-flex items-center gap-1">
                    <span>Deep Dive</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Case Study Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
};
