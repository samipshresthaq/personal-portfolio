import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, FileText, CheckCircle2, Cpu } from 'lucide-react';
import gsap from 'gsap';
import { METRICS, CORE_STACK } from '../data/portfolioData';

interface HeroProps {
  onOpenResume: () => void;
  onOpenContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume, onOpenContact }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const stackStripRef = useRef<HTMLDivElement>(null);
  const pointsRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const blueprintRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);

  // Interactive architecture layer state
  const [activePipelineStage, setActivePipelineStage] = useState<'ai' | 'backend' | 'database' | 'frontend'>('ai');

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.7 } });

      tl.from(headlineRef.current, { y: 24, opacity: 0, delay: 0.1 })
        .from(stackStripRef.current, { y: 18, opacity: 0, duration: 0.5 }, '-=0.4')
        .from(pointsRef.current, { y: 16, opacity: 0, duration: 0.5 }, '-=0.3')
        .from(actionsRef.current, { y: 14, opacity: 0, duration: 0.5 }, '-=0.3')
        .from(blueprintRef.current, { y: 24, opacity: 0, duration: 0.7 }, '-=0.5')
        .from(metricsRef.current?.children || [], { y: 14, opacity: 0, stagger: 0.08, duration: 0.5 }, '-=0.3');
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const pipelineStages = [
    {
      id: 'ai' as const,
      label: 'Multimodal AI Evaluation',
      badge: 'Turing Core',
      metric: '60% Latency Cut',
      desc: 'Real-time audio/video inference routing, hallucination detection, and prompt diagnostic streams.',
      tech: 'FastAPI · WebSockets · Google Cloud',
    },
    {
      id: 'backend' as const,
      label: 'Zero-Polling Architecture',
      badge: 'NestJS Queues',
      metric: '0ms Polling Lag',
      desc: 'Asynchronous workers replacing HTTP polling with duplex event subscriptions.',
      tech: 'NestJS · Redis · Background Workers',
    },
    {
      id: 'database' as const,
      label: 'PostgreSQL & Prisma Engine',
      badge: 'Data Tier',
      metric: 'Zero Leaks',
      desc: 'Connection pool lifecycle isolation, tuned indexes, and transactional integrity.',
      tech: 'PostgreSQL · Prisma · Query Tuning',
    },
    {
      id: 'frontend' as const,
      label: 'Reactive Client Systems',
      badge: 'High Performance',
      metric: '60fps Canvas / D3',
      desc: 'Enterprise UI virtualization, reactive state management, and Canvas/D3 data visualizations.',
      tech: 'React · Angular · TypeScript · D3.js',
    },
  ];

  return (
    <section id="hero" ref={heroRef} className="pt-24 sm:pt-28 md:pt-32 pb-14 md:pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
        {/* Split Hero: 2-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          {/* Left Column: Typographic Hierarchy & Immediate Core Stack */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Role Kicker */}
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#315C4B]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#315C4B]"></span>
                <span>Senior Full-Stack Engineer & Technical Lead · 10+ Years</span>
              </div>

              {/* Main Headline */}
              <h1
                ref={headlineRef}
                className="text-3xl sm:text-4xl md:text-[2.65rem] font-bold text-[#202321] tracking-tight leading-[1.15]"
                style={{ textWrap: 'balance' }}
              >
                Building <span className="bg-gradient-to-r from-[#315C4B] via-[#26493B] to-[#4D826F] bg-clip-text text-transparent">Multimodal AI Systems</span>, High-Throughput Backends, and Scalable Web Platforms.
              </h1>

              {/* Immediate Tech Stack at a Glance Strip */}
              <div
                ref={stackStripRef}
                className="p-3.5 bg-white rounded-md border border-[#E4E2DC] shadow-2xs space-y-2"
              >
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#6B716F]">
                  Primary Tech Stack At A Glance
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {CORE_STACK.map((group) => (
                    <div key={group.category} className="space-y-0.5">
                      <div className="text-[10px] font-semibold text-[#315C4B]">
                        {group.category}
                      </div>
                      <div className="text-[#202321] font-medium truncate text-[11px]">
                        {group.items.slice(0, 2).join(' · ')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Instant Key Points (No Long Paragraphs) */}
              <div ref={pointsRef} className="pt-1 space-y-2 text-xs sm:text-sm text-[#202321]">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#315C4B] shrink-0 mt-0.5" />
                  <span>
                    <strong>AI & Real-Time:</strong> Led 5-dev team building LLM evaluation pipelines; cut latency by 60% with FastAPI WebSockets and NestJS workers.
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#315C4B] shrink-0 mt-0.5" />
                  <span>
                    <strong>Systems & Scale:</strong> Drove $7.8M in enterprise revenue; diagnosed and eliminated PostgreSQL connection pool leaks.
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#315C4B] shrink-0 mt-0.5" />
                  <span>
                    <strong>Quality & Frontend:</strong> Established TDD (Playwright & Cypress) and engineered 60fps Canvas/D3 data visualizations.
                  </span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div
              ref={actionsRef}
              className="pt-4 flex flex-wrap items-center gap-3 sm:gap-4 border-t border-[#E4E2DC] mt-4"
            >
              <a
                href="#work"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#F7F6F2] bg-[#315C4B] hover:bg-[#26493B] rounded-md transition-all duration-200 shadow-xs group"
              >
                <span>Explore Work</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </a>

              <button
                onClick={onOpenContact}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#202321] bg-[#F7F6F2] hover:bg-[#DCE5DC]/40 border border-[#E4E2DC] rounded-md transition-colors cursor-pointer"
              >
                <span>Get in Touch</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#315C4B]" />
              </button>

              <button
                onClick={onOpenResume}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs sm:text-sm font-medium text-[#315C4B] hover:underline underline-offset-4 transition-colors cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>View Resume</span>
              </button>
            </div>
          </div>

          {/* Right Column: Architectural Topology Explorer */}
          <div ref={blueprintRef} className="lg:col-span-5 flex flex-col">
            <div className="h-full bg-white rounded-lg border border-[#E4E2DC] shadow-xs p-5 sm:p-6 flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#E4E2DC]">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-[#315C4B]" />
                  <span className="text-xs font-semibold tracking-wider uppercase text-[#202321]">
                    Core Expertise Topology
                  </span>
                </div>
              </div>

              {/* Stage Selector Tabs */}
              <div className="grid grid-cols-2 gap-2">
                {pipelineStages.map((stage) => {
                  const isSelected = activePipelineStage === stage.id;
                  return (
                    <button
                      key={stage.id}
                      onClick={() => setActivePipelineStage(stage.id)}
                      className={`text-left p-2.5 rounded-md border text-xs transition-all duration-150 cursor-pointer ${
                        isSelected
                          ? 'bg-[#315C4B] text-[#F7F6F2] border-[#315C4B] shadow-2xs font-semibold'
                          : 'bg-[#F7F6F2]/70 text-[#202321] border-[#E4E2DC] hover:border-[#315C4B]/40'
                      }`}
                    >
                      <div className="truncate text-[11px]">{stage.badge}</div>
                      <div
                        className={`text-[10px] mt-0.5 truncate ${
                          isSelected ? 'text-[#DCE5DC]' : 'text-[#6B716F]'
                        }`}
                      >
                        {stage.metric}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Selected Layer Info */}
              {(() => {
                const current = pipelineStages.find((s) => s.id === activePipelineStage)!;
                return (
                  <div className="p-3.5 rounded-md bg-[#F7F6F2] border border-[#E4E2DC] space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#202321]">{current.label}</span>
                      <span className="text-[10px] font-mono-num font-medium text-[#315C4B]">
                        {current.metric}
                      </span>
                    </div>
                    <p className="text-xs text-[#6B716F] leading-snug">
                      {current.desc}
                    </p>
                    <div className="text-[11px] font-semibold text-[#315C4B] pt-0.5">
                      {current.tech}
                    </div>
                  </div>
                );
              })()}

              <div className="pt-2 border-t border-[#E4E2DC] grid grid-cols-3 gap-2 text-center text-[10px]">
                <div className="p-1.5 bg-[#F7F6F2] rounded-xs font-medium text-[#202321]">
                  Microservices
                </div>
                <div className="p-1.5 bg-[#F7F6F2] rounded-xs font-medium text-[#202321]">
                  TDD Quality
                </div>
                <div className="p-1.5 bg-[#F7F6F2] rounded-xs font-medium text-[#202321]">
                  PostgreSQL
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Quantitative Proof Metrics Strip */}
        <div
          ref={metricsRef}
          className="pt-6 border-t border-[#E4E2DC] grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {METRICS.map((metric, idx) => (
            <div key={idx} className="space-y-0.5">
              <div className="text-2xl sm:text-3xl font-bold text-[#315C4B] tracking-tight font-mono-num">
                {metric.value}
              </div>
              <div className="text-xs font-semibold text-[#202321]">
                {metric.label}
              </div>
              <p className="text-[11px] text-[#6B716F] leading-tight">
                {metric.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
