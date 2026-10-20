import React from 'react';
import { Compass, CheckCircle2, UserCheck, ShieldCheck, Cpu, Database, Zap } from 'lucide-react';
import { PERSONAL_INFO, PRINCIPLES, EDUCATION } from '../data/portfolioData';

export const AboutPhilosophy: React.FC = () => {
  return (
    <section id="about" className="py-16 md:py-24 border-t border-[#E4E2DC]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
        {/* Section Header */}
        <div className="space-y-2 max-w-2xl pb-6 border-b border-[#E4E2DC]">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#315C4B]">
            <span>04. Engineering Focus</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#202321]">
            Engineering Leadership & Core Pillars
          </h2>
          <p className="text-xs sm:text-sm text-[#6B716F]">
            High-level overview of technical philosophy, working standards, and team execution.
          </p>
        </div>

        {/* 2-Column High-Impact Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: 4 Sharp Takeaway Cards */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-[#202321]">
              Full-Stack Architecture at a Glance
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
              <div className="p-4 bg-white rounded-md border border-[#E4E2DC] space-y-1.5 shadow-2xs">
                <div className="flex items-center gap-2 font-bold text-[#315C4B]">
                  <Cpu className="w-4 h-4" />
                  <span>Multimodal AI Platforms</span>
                </div>
                <p className="text-xs text-[#6B716F] leading-snug">
                  Led 5 engineers evaluating LLM response failures and building real-time audio/video inference routing ($1.8M revenue).
                </p>
              </div>

              <div className="p-4 bg-white rounded-md border border-[#E4E2DC] space-y-1.5 shadow-2xs">
                <div className="flex items-center gap-2 font-bold text-[#315C4B]">
                  <Zap className="w-4 h-4" />
                  <span>Zero-Polling Architecture</span>
                </div>
                <p className="text-xs text-[#6B716F] leading-snug">
                  Slashed latency by 60% by replacing HTTP polling with FastAPI WebSockets & NestJS background workers.
                </p>
              </div>

              <div className="p-4 bg-white rounded-md border border-[#E4E2DC] space-y-1.5 shadow-2xs">
                <div className="flex items-center gap-2 font-bold text-[#315C4B]">
                  <Database className="w-4 h-4" />
                  <span>PostgreSQL & Connection Tuning</span>
                </div>
                <p className="text-xs text-[#6B716F] leading-snug">
                  Isolated and eliminated database connection pool leaks; tuned Prisma schemas and indexing for 3x query throughput.
                </p>
              </div>

              <div className="p-4 bg-white rounded-md border border-[#E4E2DC] space-y-1.5 shadow-2xs">
                <div className="flex items-center gap-2 font-bold text-[#315C4B]">
                  <ShieldCheck className="w-4 h-4" />
                  <span>TDD & Automated Quality</span>
                </div>
                <p className="text-xs text-[#6B716F] leading-snug">
                  Instituted company-wide Playwright and Cypress end-to-end automation, reducing regression test cycles by 45%.
                </p>
              </div>
            </div>

            <div className="p-4 bg-white rounded-md border border-[#E4E2DC] flex items-center justify-between text-xs">
              <span className="text-[#6B716F]">Engineering Baseline:</span>
              <span className="font-semibold text-[#202321]">
                TypeScript · Python · NestJS · FastAPI · React · PostgreSQL · AWS/GCP
              </span>
            </div>
          </div>

          {/* Right: Compact Profile Snapshot */}
          <div className="lg:col-span-5 bg-white rounded-lg border border-[#E4E2DC] p-5 sm:p-6 space-y-4 shadow-xs">
            <div className="flex items-center gap-3 pb-3 border-b border-[#E4E2DC]">
              <div className="w-11 h-11 rounded-xs bg-[#315C4B] text-[#F7F6F2] font-bold text-sm flex items-center justify-center relative overflow-hidden shrink-0">
                {PERSONAL_INFO.initials}
                <img
                  src={PERSONAL_INFO.imageUrl}
                  alt={PERSONAL_INFO.name}
                  className="w-full h-full object-cover absolute inset-0 rounded-xs"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#202321]">
                  {PERSONAL_INFO.name}
                </h4>
                <div className="text-[11px] text-[#6B716F]">
                  {PERSONAL_INFO.role} · {PERSONAL_INFO.location}
                </div>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-[#E4E2DC]/50">
                <span className="text-[#6B716F]">Experience</span>
                <span className="font-semibold text-[#202321]">10+ Years (2014 – Present)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#E4E2DC]/50">
                <span className="text-[#6B716F]">Education</span>
                <span className="font-semibold text-[#202321]">{EDUCATION.degree}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#E4E2DC]/50">
                <span className="text-[#6B716F]">Attributed Revenue</span>
                <span className="font-semibold text-[#315C4B]">$7.8M ($1.8M AI + $6M SaaS)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#E4E2DC]/50">
                <span className="text-[#6B716F]">Leadership</span>
                <span className="font-semibold text-[#202321]">Led 5-Engineer Squad at Turing</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#E4E2DC]/50">
                <span className="text-[#6B716F]">Availability</span>
                <span className="font-semibold text-[#315C4B]">Open for select roles</span>
              </div>
            </div>

            <div className="p-3 bg-[#F7F6F2] rounded-xs border border-[#E4E2DC] text-[11px] text-[#6B716F] leading-snug">
              &quot;I focus on architectural fundamentals: deterministic data contracts, zero connection leaks, and sub-millisecond real-time communication.&quot;
            </div>
          </div>
        </div>

        {/* 4 Core Principles in Clean Grid */}
        <div className="space-y-4 pt-6 border-t border-[#E4E2DC]">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#315C4B]">
            Guiding Engineering Standards
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PRINCIPLES.map((principle) => (
              <div
                key={principle.number}
                className="bg-white rounded-md border border-[#E4E2DC] p-4 space-y-2 hover:border-[#315C4B]/40 transition-colors shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-[#315C4B] bg-[#DCE5DC] px-1.5 py-0.2 rounded-xs">
                    {principle.number}
                  </span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-[#202321] tracking-tight">
                  {principle.title}
                </h4>
                <p className="text-[11px] text-[#6B716F] leading-snug">
                  {principle.summary}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
