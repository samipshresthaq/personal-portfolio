import React from 'react';
import { Layers, CheckCircle2, ShieldCheck, Zap, Database } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

export const SkillsArchitecture: React.FC = () => {
  const architecturalCases = [
    {
      title: 'Zero-Polling Multimodal Pipeline',
      context: 'Turing Inc. · AI Evaluation Platform',
      metrics: '60% Latency Reduction · 0 Polling Requests',
      problem:
        'Client HTTP polling every 500ms for heavy multimodal inference saturated API gateways and created state lag during burst model generation.',
      solution:
        'Replaced polling with a bi-directional FastAPI WebSocket event bus and NestJS background queues for real-time token streaming.',
      stack: ['FastAPI WebSockets', 'NestJS Workers', 'Redis Pub/Sub', 'React Virtualization'],
      icon: Zap,
    },
    {
      title: 'PostgreSQL Connection Leak Isolation',
      context: 'Turing Inc. & Seva Development',
      metrics: 'Zero Connection Starvation · 3x Query Throughput',
      problem:
        'High-concurrency background jobs opened unpooled Prisma clients, causing orphaned connections that exhausted pool limits and stalled queries.',
      solution:
        'Configured a singleton PrismaClient with tuned connection limits, scoped transaction timeouts, and worker connection lifecycle hooks.',
      stack: ['PostgreSQL 16', 'Prisma ORM', 'Connection Pooling', 'Query Indexing'],
      icon: Database,
    },
    {
      title: 'Enterprise TDD & Automated Quality Pipeline',
      context: 'Seva Development · Qualiti SaaS',
      metrics: '45% Faster Releases · Zero Regressions in Staging',
      problem:
        'Manual regression sweeps before monthly deployments delayed release velocity and allowed subtle UI regressions into production.',
      solution:
        'Instituted mandatory Playwright end-to-end tests and Cypress component validation integrated into GitHub Actions CI/CD.',
      stack: ['Playwright', 'Cypress', 'GitHub Actions', 'Docker'],
      icon: ShieldCheck,
    },
  ];

  return (
    <section id="skills" className="py-16 md:py-24 border-t border-[#E4E2DC]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
        {/* Section Header */}
        <div className="space-y-2 max-w-2xl pb-6 border-b border-[#E4E2DC]">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#315C4B]">
            <span>03. Core Expertise & Architecture</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#202321]">
            Technical Competencies & Systems
          </h2>
          <p className="text-xs sm:text-sm text-[#6B716F]">
            Categorized technical capabilities and real production problem-solving patterns.
          </p>
        </div>

        {/* 6 Clean Competency Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SKILL_CATEGORIES.map((category) => (
            <div
              key={category.title}
              className="bg-white rounded-lg border border-[#E4E2DC] p-5 space-y-3 hover:border-[#315C4B]/40 transition-colors shadow-2xs"
            >
              <div className="flex items-center justify-between pb-1 border-b border-[#E4E2DC]">
                <h3 className="text-sm font-bold text-[#202321] tracking-tight">
                  {category.title}
                </h3>
                <span className="text-[10px] text-[#6B716F]">
                  {category.description}
                </span>
              </div>

              <div className="space-y-2 pt-1">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="p-2 bg-[#F7F6F2] rounded-xs border border-[#E4E2DC]/50 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-semibold text-[#202321] text-[11px] sm:text-xs">
                        {skill.name}
                      </div>
                      {skill.context && (
                        <div className="text-[10px] text-[#6B716F] truncate max-w-[180px] sm:max-w-[210px]">
                          {skill.context}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Architecture Case Studies (No Code Demo, Clean High-Impact Cards) */}
        <div className="space-y-6 pt-4">
          <div className="space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-[#315C4B] flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              <span>Production Architectural Case Studies</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-[#202321]">
              Real Engineering Bottlenecks & Architectural Resolutions
            </h3>
            <p className="text-xs text-[#6B716F]">
              How complex concurrency, database connection leaks, and quality bottlenecks were diagnosed and resolved.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {architecturalCases.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-lg border border-[#E4E2DC] p-5 sm:p-6 space-y-4 hover:border-[#315C4B]/40 transition-colors shadow-2xs flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="p-2 bg-[#DCE5DC]/60 text-[#315C4B] rounded-md">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-mono-num font-semibold text-[#315C4B] bg-[#DCE5DC] px-2 py-0.5 rounded-xs">
                        {item.metrics}
                      </span>
                    </div>

                    <div>
                      <div className="text-[11px] font-semibold text-[#315C4B]">
                        {item.context}
                      </div>
                      <h4 className="text-sm sm:text-base font-bold text-[#202321] tracking-tight mt-0.5">
                        {item.title}
                      </h4>
                    </div>

                    {/* Bottleneck block */}
                    <div className="p-2.5 bg-[#F7F6F2] rounded-xs border border-[#E4E2DC] space-y-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-[#6B716F]">
                        The Bottleneck
                      </div>
                      <p className="text-xs text-[#202321] leading-relaxed">
                        {item.problem}
                      </p>
                    </div>

                    {/* Resolution block */}
                    <div className="space-y-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-[#6B716F]">
                        Architectural Resolution
                      </div>
                      <p className="text-xs text-[#202321] leading-relaxed">
                        {item.solution}
                      </p>
                    </div>
                  </div>

                  {/* Stack */}
                  <div className="pt-3 border-t border-[#E4E2DC] flex flex-wrap gap-1">
                    {item.stack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-medium bg-[#F7F6F2] border border-[#E4E2DC] px-2 py-0.5 rounded-xs text-[#202321]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
