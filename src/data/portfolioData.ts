import { Project, ExperienceItem, SkillCategory, EngineeringPrinciple } from '../types/portfolio';

export const PERSONAL_INFO = {
  name: 'Samip Shrestha',
  initials: 'SS',
  role: 'Senior Full-Stack Engineer & Tech Lead',
  location: 'Hetauda, Nepal',
  timezone: 'Asia/Kathmandu (UTC+5:45)',
  email: 'javasamip@gmail.com',
  phone: '+977-9845539425',
  linkedinUrl: 'https://linkedin.com/in/er-samip-shrestha',
  githubUrl: 'https://github.com/samipshresthaq',
  resumePdfUrl: '/assets/aistudio/Samip_Shrestha_Senior_Full_Stack_Resume_5c5777cd.pdf',
  summary:
    'Senior Full-Stack Engineer and Tech Lead with 10+ years architecting scalable SaaS, multimodal AI evaluation systems, and high-throughput backends across React, TypeScript, NestJS, FastAPI, and PostgreSQL.',
  availability: 'Available for select engineering leadership & contract roles',
};

export const CORE_STACK = [
  { category: 'Frontend', items: ['React', 'TypeScript', 'Angular', 'React Native', 'D3.js'] },
  { category: 'Backend & APIs', items: ['NestJS', 'FastAPI', 'Node.js', 'WebSockets', 'GraphQL'] },
  { category: 'Database & Cloud', items: ['PostgreSQL', 'Prisma', 'MongoDB', 'AWS', 'Google Cloud'] },
  { category: 'AI & Testing', items: ['LLM Evaluation', 'Multimodal Pipelines', 'Playwright', 'Cypress'] },
];

export const METRICS = [
  {
    value: '10+',
    label: 'Years Experience',
    detail: 'Full-stack systems & technical leadership.',
  },
  {
    value: '$7.8M',
    label: 'Attributed Revenue',
    detail: '$1.8M multimodal AI + $6M SaaS platform.',
  },
  {
    value: '60%',
    label: 'Latency Cut',
    detail: 'Zero-polling WebSockets & background workers.',
  },
  {
    value: '5-Dev',
    label: 'Squad Lead',
    detail: 'Architecture, code reviews & TDD enforcement.',
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'ai-eval-platform',
    title: 'AI Multimodal Evaluation & Diagnostic Platform',
    category: 'AI & Systems',
    tagline: 'Automated diagnostic pipeline detecting LLM hallucinations and multimodal inference bottlenecks.',
    role: 'Lead Full-Stack Developer',
    organization: 'Turing Inc.',
    period: '2024 – 2026',
    impactHighlight: 'Generated $1.8M platform revenue; boosted throughput by 60% with zero polling.',
    technologies: [
      'React',
      'TypeScript',
      'FastAPI',
      'WebSockets',
      'NestJS',
      'PostgreSQL',
      'Prisma',
      'Google Cloud',
    ],
    description:
      'Engineered an AI diagnostic platform evaluating complex LLM response failures—isolating hallucinations, robotic over-narration, and flawed contextual reasoning.',
    challenge:
      'Client HTTP polling saturated API gateways and caused connection starvation when handling heavy multimodal audio/video payloads.',
    architectureSolution: [
      'Event-Driven WebSockets: Built FastAPI duplex WebSocket streams with NestJS async workers, eradicating polling overhead.',
      'PostgreSQL Optimization: Refactored schema & Prisma migrations, fixing connection pool leaks during burst evaluations.',
      'Microsecond Virtualization: Built React virtualized timeline inspectors to scrub high-frequency audio/video inference logs.',
    ],
    results: [
      '60% reduction in end-to-end evaluation latency.',
      '$1.8M in enterprise revenue generated for AI training clients.',
      '99.9% uptime on heavy multimodal audio/video ingestion streams.',
    ],
    architectureDiagramSnippet: {
      type: 'pipeline',
      nodes: [
        'React UI',
        'FastAPI WebSockets',
        'NestJS Async Workers',
        'LLM Diagnostic Engine',
        'PostgreSQL + Prisma',
      ],
    },
    featured: true,
  },
  {
    id: 'qualiti-saas',
    title: 'Qualiti — SaaS Intelligent Test Automation',
    category: 'Enterprise SaaS',
    tagline: 'Microservices automated testing and test-intelligence platform for enterprise web applications.',
    role: 'Senior Full-Stack Developer (Frontend Heavy)',
    organization: 'Seva Development',
    period: '2022 – 2024',
    impactHighlight: 'Drove $6M in US-market revenue; instituted company-wide TDD culture.',
    technologies: [
      'Angular',
      'NestJS',
      'PostgreSQL',
      'Playwright',
      'Cypress',
      'AWS',
      'GitHub CI/CD',
    ],
    description:
      'Directed frontend engineering for an enterprise test-intelligence SaaS built on microservices, automating complex QA suites and log analytics.',
    challenge:
      'Large test runs generated gigabytes of telemetry logs, slowing dashboard rendering and locking PostgreSQL tables.',
    architectureSolution: [
      'Query Tuning: Optimized PostgreSQL indexes and queries, speeding telemetry metric aggregation by 3x.',
      'Automated Quality: Established TDD with Playwright and Cypress end-to-end integration test suites in CI/CD.',
      'Reactive State: Architected Angular reactive streams to smoothly render thousands of concurrent test logs.',
    ],
    results: [
      'Contributed directly to $6M in US-market enterprise revenue.',
      '45% reduction in regression test turnaround time.',
      'Mentored dedicated UI engineering squad across architecture and code reviews.',
    ],
    architectureDiagramSnippet: {
      type: 'flow',
      nodes: [
        'Angular UI',
        'NestJS Gateway',
        'PostgreSQL Query Engine',
        'Playwright/Cypress CI',
        'AWS Cloud',
      ],
    },
    featured: true,
  },
  {
    id: 'instasewa',
    title: 'Instasewa — On-Demand Services Marketplace',
    category: 'Mobile & Web',
    tagline: 'Cross-platform mobile and web application with real-time dispatch, booking, and Stripe billing.',
    role: 'Project Lead & System Architect',
    organization: 'Instasewa',
    period: 'Production Project',
    impactHighlight: 'Engineered complete product architecture from initial design through multi-platform launch.',
    technologies: [
      'React',
      'React Native',
      'Express.js',
      'MongoDB',
      'Firebase',
      'AWS',
      'Stripe',
    ],
    description:
      'Owned complete architecture and development of an on-demand marketplace coordinating service professionals, live tracking, and multi-currency billing.',
    challenge:
      'Synchronizing booking states between mobile service providers and desktop customers across flaky cellular connections.',
    architectureSolution: [
      'Shared Models: Built React Native mobile and React web app sharing unified TypeScript domain contracts.',
      'Live Dispatch: Integrated Firebase real-time listeners and Express.js Socket channels for sub-200ms dispatch.',
      'Stripe Idempotency: Implemented strict webhook idempotency keys to eliminate duplicate transaction charges.',
    ],
    results: [
      'Cross-platform deployment across iOS, Android, and web within schedule.',
      'Sub-200ms dispatch notifications between clients and technicians.',
      'Zero payment discrepancies with idempotent transaction architecture.',
    ],
    architectureDiagramSnippet: {
      type: 'schema',
      nodes: [
        'React Native (iOS/Android)',
        'React Web',
        'Express.js API',
        'Firebase / Stripe',
        'MongoDB on AWS',
      ],
    },
    featured: true,
  },
  {
    id: 'itonics-radar',
    title: 'ITONICS Innovation OS & Trend Radar Visualizer',
    category: 'Data Visualization',
    tagline: 'High-performance interactive radar rendering hundreds of corporate innovation signals.',
    role: 'Senior / Lead Frontend Developer',
    organization: 'ITONICS Nepal Pvt. Ltd.',
    period: '2017 – 2022',
    impactHighlight: 'Accelerated client onboarding by 20% through 60fps Canvas & D3 radar visualizers.',
    technologies: [
      'Angular',
      'Ionic',
      'D3.js',
      'HTML5 Canvas',
      'JavaScript (ES6)',
      'Webpack',
    ],
    description:
      'Led frontend team developing the flagship Innovation Radar, allowing Fortune 500 executives to visually map tech trends and portfolio roadmaps.',
    challenge:
      'Plotting hundreds of dynamic polar radar nodes caused frame drops and laggy pan/zoom in standard SVG renderers.',
    architectureSolution: [
      'Hybrid Canvas + D3: Combined HTML5 Canvas for 60fps rendering with D3.js for polar mathematical projections.',
      'Shared Libraries: Standardized reusable chart modules across web and hybrid mobile (Ionic) apps.',
      'Sprint Leadership: Ran sprint planning, technical delivery, and weekly code reviews across frontend engineers.',
    ],
    results: [
      '20% increase in enterprise client onboarding from smooth visualizer UX.',
      'Maintained stable 60fps performance across complex multi-node radar screens.',
      'Zero regression across quarterly enterprise software release cycles.',
    ],
    architectureDiagramSnippet: {
      type: 'pipeline',
      nodes: [
        'D3 Polar Projections',
        'HTML5 Canvas 60fps',
        'Angular UI',
        'Enterprise Datasets',
      ],
    },
    featured: false,
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'turing',
    company: 'Turing Inc.',
    role: 'Lead Full-Stack Developer',
    period: 'Apr 2024 – Jan 2026',
    location: 'Remote',
    highlightMetric: 'Led 5-dev squad · 60% latency cut · $1.8M revenue',
    technologies: [
      'React',
      'TypeScript',
      'NestJS',
      'FastAPI',
      'WebSockets',
      'PostgreSQL',
      'Prisma',
      'Python',
      'Google Cloud',
    ],
    achievements: [
      'Led 5 developers building an AI platform diagnosing LLM hallucinations, inference flaws, and robotic over-narration ($1.8M platform revenue).',
      'Reduced latency by 60% and eliminated polling overhead by implementing FastAPI WebSockets with NestJS background workers.',
      'Authored PostgreSQL schemas and Prisma migrations; diagnosed and resolved critical transaction leaks caused by unclosed connection pools.',
    ],
  },
  {
    id: 'seva',
    company: 'Seva Development',
    role: 'Senior Full-Stack Developer (Frontend Heavy)',
    period: 'Jul 2022 – Apr 2024',
    location: 'Remote / Hybrid',
    highlightMetric: 'US SaaS Product · $6M revenue · TDD Lead',
    technologies: [
      'Angular',
      'NestJS',
      'PostgreSQL',
      'Playwright',
      'Cypress',
      'AWS',
      'Docker',
      'CI/CD',
    ],
    achievements: [
      'Led frontend engineering for Qualiti SaaS microservices, driving $6M in US-market revenue.',
      'Tuned PostgreSQL queries and API payloads, accelerating dashboard telemetry rendering by 3x.',
      'Established company-wide TDD workflow with automated unit and end-to-end testing using Playwright and Cypress.',
    ],
  },
  {
    id: 'itonics',
    company: 'ITONICS Nepal Pvt. Ltd.',
    role: 'Senior / Lead Frontend Developer',
    period: 'Sep 2017 – Jun 2022',
    location: 'Kathmandu, Nepal',
    highlightMetric: '5-year tenure · +20% client onboarding · D3/Canvas',
    technologies: [
      'Angular',
      'Ionic',
      'D3.js',
      'HTML5 Canvas',
      'JavaScript (ES6)',
      'SCSS',
      'Webpack',
    ],
    achievements: [
      'Architected SaaS and hybrid mobile apps (iOS & Android) with Angular/Ionic, contributing to 20% newer client onboarding.',
      'Engineered 60fps data visualizations and polar trend radars using HTML5 Canvas and D3.js.',
      'Mentored frontend developers, established shared coding standards, and led sprint planning and delivery.',
    ],
  },
  {
    id: 'earlier',
    company: 'Earlier Engineering Foundation',
    role: 'Frontend & Software Engineer',
    period: 'Dec 2014 – Aug 2017',
    earlier: true,
    highlightMetric: 'Core web standards, DOM internals & modular ES6',
    technologies: ['JavaScript', 'HTML5/CSS3', 'jQuery', 'Bootstrap', 'SVG'],
    achievements: [
      'Digital Terai (2016 – 2017): Developed responsive web applications and modular UI components.',
      'Leapfrog Technology (2015): Engineered interactive UI modules and SVG animations.',
      'Uber Opus (2014 – 2015): Software engineering internship in full-lifecycle web development.',
    ],
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Languages & Core',
    description: 'Strongly-typed systems & async concurrency.',
    skills: [
      { name: 'TypeScript', level: 'Expert', context: '10+ yrs across full-stack mono-repos' },
      { name: 'JavaScript (ES6+)', level: 'Expert', context: 'V8 internals, event loops, DOM performance' },
      { name: 'Python', level: 'Advanced', context: 'FastAPI, async workers, AI pipelines' },
      { name: 'SQL', level: 'Expert', context: 'Query tuning, schema design, index strategy' },
    ],
  },
  {
    title: 'Frontend Engineering',
    description: 'Component architecture, reactive state, 60fps UI.',
    skills: [
      { name: 'React', level: 'Expert', context: 'Custom hooks, virtualization, Next.js patterns' },
      { name: 'Angular', level: 'Expert', context: 'Enterprise microservices, RxJS, modular architecture' },
      { name: 'React Native & Ionic', level: 'Advanced', context: 'Hybrid mobile iOS & Android applications' },
      { name: 'D3.js & HTML5 Canvas', level: 'Advanced', context: '60fps mathematical radars & data viz' },
      { name: 'Tailwind CSS', level: 'Expert', context: 'Design token systems, responsive layouts' },
    ],
  },
  {
    title: 'Backend & Real-Time',
    description: 'High-concurrency APIs & zero-polling queues.',
    skills: [
      { name: 'Node.js & Express.js', level: 'Expert', context: 'RESTful architectures, auth, middleware' },
      { name: 'NestJS', level: 'Expert', context: 'Dependency injection, background tasks, microservices' },
      { name: 'FastAPI', level: 'Advanced', context: 'Async WebSocket feeds, Python AI integrations' },
      { name: 'WebSockets', level: 'Advanced', context: 'Zero-polling real-time duplex pipelines' },
    ],
  },
  {
    title: 'Databases & Storage',
    description: 'Relational integrity & connection pool tuning.',
    skills: [
      { name: 'PostgreSQL', level: 'Expert', context: 'Query optimization, connection pool tuning' },
      { name: 'Prisma ORM', level: 'Advanced', context: 'Type-safe schema migrations & transactional safety' },
      { name: 'MongoDB', level: 'Advanced', context: 'Document modeling, indexing, aggregation' },
    ],
  },
  {
    title: 'AI / LLM & Multimodal',
    description: 'Evaluating & routing large language models.',
    skills: [
      { name: 'LLM Response Evaluation', level: 'Expert', context: 'Hallucination detection, inference scoring' },
      { name: 'Multimodal Audio/Video', level: 'Advanced', context: 'Asynchronous streaming to AI endpoints' },
      { name: 'Prompt Optimization', level: 'Advanced', context: 'Eliminating robotic over-narration' },
    ],
  },
  {
    title: 'Cloud & Quality',
    description: 'Continuous delivery & automated test suites.',
    skills: [
      { name: 'Playwright & Cypress', level: 'Expert', context: 'Full E2E automation & TDD enforcement' },
      { name: 'AWS & Google Cloud', level: 'Advanced', context: 'EC2, S3, Cloud Run, compute workloads' },
      { name: 'Jenkins & GitHub CI/CD', level: 'Advanced', context: 'Multi-stage build & deployment pipelines' },
    ],
  },
];

export const EDUCATION = {
  institution: 'Kantipur Engineering College',
  degree: "Bachelor's in Computer Engineering",
  period: '2010 – 2014',
  location: 'Lalitpur, Nepal',
  details:
    'Comprehensive 4-year engineering curriculum covering distributed systems, database internals, and algorithms.',
};

export const PRINCIPLES: EngineeringPrinciple[] = [
  {
    number: '01',
    title: 'System Correctness Over Superficial Speed',
    summary: 'A fast prototype that leaks database connections or fails under load costs 10x more.',
    description:
      'Prioritize transactional safety, connection pool limits, and idempotent API contracts before cosmetic code.',
  },
  {
    number: '02',
    title: 'Performance Is an Engineering Metric',
    summary: 'Shaving latency from 800ms to 80ms directly improves trust and platform retention.',
    description:
      'Measure and resolve bottlenecks at root: replace polling with WebSockets and tune database queries.',
  },
  {
    number: '03',
    title: 'Pragmatic AI With Grounded Evaluation',
    summary: 'AI products succeed through diagnostic evaluation, not blind API wrapping.',
    description:
      'Rigorous audio/video pipelines, hallucination scoring, and real-time streaming feedback.',
  },
  {
    number: '04',
    title: 'Empowering Squads Through High Standards',
    summary: 'Code quality scales when teams share clear architectural standards and TDD.',
    description:
      'Mentoring squads of 5+ developers, establishing Playwright/Cypress suites, and thorough code reviews.',
  },
];
