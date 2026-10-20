// ── CV Data ─────────────────────────────────────────────────────────────────
// Single source of truth consumed by both the profile page and the PDF generator.
// Every section/subsection has an `id` so the selective-download modal can
// reference it in its checkbox tree.

export interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  phone: string;
  email: string;
  linkedin: string;
  linkedinLabel: string;
  website?: string;
  websiteLabel?: string;
}

export interface ExperienceBullet {
  id: string;
  label: string;
  text: string;
  team?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  dates: string;
  bullets: ExperienceBullet[];
  achievements: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  cgpa: string;
  year: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  items: string;
  tier?: "primary" | "secondary" | "cloud" | "ai" | "domain";
  badge?: string;
}

export interface Project {
  id: string;
  name: string;
  link?: string;
  linkLabel?: string;
  bullets: { id: string; label?: string; text: string }[];
}

export interface Certification {
  id: string;
  icon: string;
  title: string;
  desc: string;
}

export interface CVData {
  personalInfo: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education;
  skills: SkillCategory[];
  projects: Project[];
  certifications: Certification[];
}

// ── Data ────────────────────────────────────────────────────────────────────

export const cvData: CVData = {
  personalInfo: {
    name: "Rohit Rambansh Yadav",
    title: "Senior Software Engineer",
    location: "Kolkata, West Bengal, India",
    phone: "+91-9831808979",
    email: "rohitrambansh@gmail.com",
    linkedin: "https://linkedin.com/in/imrohit2611/",
    linkedinLabel: "linkedin.com/in/imrohit2611",
  },

  summary:
    "Senior Software Engineer with 6+ years of experience architecting and operating high-throughput telecom billing platforms and cloud automation engines for leading UK telecom operators. Core expertise in Java, Spring Boot, microservices, multithreading, and distributed systems, complemented by practical delivery in Python, AWS serverless (Lambda), and GenAI integration (Amazon Bedrock). Proven track record of engineering mission-critical pipelines processing 100M+ daily CDRs (£10M+ monthly revenue), cutting processing latency by 50%, spearheading client UAT delivery for tier-1 MVNOs, and mentoring 50+ engineers.",

  experience: [
    {
      id: "exp-tcs",
      role: "IT Analyst",
      company: "TATA Consultancy Services (Client: British Telecom, UK)",
      dates: "Aug 2020 – Present",
      bullets: [
        {
          id: "exp-tcs-mediation",
          label: "Mediation Engine & Ingestion (OCOMC)",
          team: "Wholesale Billing",
          text: "Designed and developed high-availability mediation pipelines using Java, Spring Boot, and Oracle OCOMC, ingesting and processing 100M+ Call Detail Records (CDRs) daily across 20+ MVNOs, supporting revenue streams exceeding ~£10M monthly.",
        },
        {
          id: "exp-tcs-perf",
          label: "Performance Engineering & Concurrency",
          team: "Wholesale Billing",
          text: "Architected and implemented a multithreaded CDR processing framework that reduced critical processing latency by 50%, enabling near real-time billing operations and significantly improving data throughput.",
        },
        {
          id: "exp-tcs-billing",
          label: "MVNO Rating & Subscriber Lifecycle Core",
          team: "Wholesale Billing",
          text: "Owned critical billing, rating, and provisioning microservices covering subscriber lifecycle management, interconnect billing, usage charging workflows, and dynamic product catalog configurations.",
        },
        {
          id: "exp-tcs-client",
          label: "Client Leadership & UAT Delivery",
          team: "Wholesale Billing",
          text: "Spearheaded the User Acceptance Testing (UAT) phase for an end-to-end billing application for a UK-based MVNO, collaborating directly with client stakeholders to achieve zero-defect delivery and formal client appreciation.",
        },
        {
          id: "exp-tcs-ownership",
          label: "Platform Reliability & Incident RCA",
          team: "Wholesale Billing",
          text: "Led root cause analysis (RCA) and mitigation for critical production incidents, maintaining 99.99%+ SLA compliance; partnered with solution architects on system design reviews, performance optimization, and platform modernization.",
        },
        {
          id: "exp-tcs-automation",
          label: "Enterprise Billing Automation",
          team: "International Billing",
          text: "Contributed to the development of a serverless billing automation platform using Python, AWS Lambda, and React/TypeScript to replace manual Excel workflows for enterprise accounts; implemented Python processing modules for automated Excel pivot generation, OCR-based PDF data extraction, and invoice assembly, while supporting integration with an Amazon Bedrock LLM deterministic intent layer and deployed on AWS via Gitlab CI/CD pipelines.",
        },
        {
          id: "exp-tcs-mentor",
          label: "Technical Mentorship & Capability Building",
          team: "TCS",
          text: "Conducted Java and backend engineering training programs for 50+ associates across internal and external learning initiatives, supporting onboarding, upskilling, and technical capability development; actively served as Technical SME for TCS campus recruitment.",
        },
        {
          id: "exp-tcs-promo",
          label: "Career Progression & Digital Cadre",
          team: "TCS",
          text: "Promoted to the highly competitive TCS Digital cadre within just 1.5 years of joining after successfully clearing rigorous internal technical assessments.",
        },
      ],
      achievements: [
        "Bronze Guru Award for talent development initiatives (2026)",
        "Completed TCS NextGen Mentorship Program (2025)",
        "Top 50 rank in TCS CMI Code Masters (2025 -2026)",
        "Contextual Master Award for system optimization (2023)",
      ],
    },
  ],

  education: {
    id: "edu-btech",
    degree: "B.Tech – ECE",
    institution: "Netaji Subhash Engineering College",
    cgpa: "9.17/10",
    year: "2020",
  },

  skills: [
    {
      id: "skill-primary",
      title: "Primary / Advanced",
      items: "Core Java, Java 8/11, Spring Boot, Microservices, REST API, Oracle OCOMC, JUnit, Multithreading, Distributed Systems, Oracle SQL, Performance Tuning",
      tier: "primary",
      badge: "Core Production",
    },
    {
      id: "skill-secondary",
      title: "Secondary / Familiar",
      items: "Python, React/TypeScript, PL/SQL, Shell Scripting",
      tier: "secondary",
      badge: "Working Knowledge",
    },
    {
      id: "skill-cloud",
      title: "Cloud & DevOps",
      items: "AWS, Microsoft Azure, Linux, Docker, Git, GitLab CI/CD, Jenkins",
      tier: "cloud",
      badge: "Cloud & Infra",
    },
    {
      id: "skill-ai",
      title: "AI & Automation",
      items: "LangChain, Model Context Protocol (MCP), Groq/Gemini APIs, Claude AI, Amazon Q Developer, AWS Bedrock",
      tier: "ai",
      badge: "GenAI & Automation",
    },
    {
      id: "skill-domain",
      title: "Domain & Core Architecture",
      items: "Telecom Billing (BSS/OSS), CDR Mediation, High-Throughput Pipelines, MVNO Integration, SLA Incident RCA",
      tier: "domain",
      badge: "Domain Expertise",
    },
  ],

  projects: [
    {
      id: "proj-wfh",
      name: "Should I WFH? — Commute Decision Engine",
      link: "https://wfh.imrohit2611.co.in/",
      linkLabel: "wfh.imrohit2611.co.in",
      bullets: [
        {
          id: "proj-wfh-purpose",
          text: 'A real-time decision engine that computes a "Commute Friction Score" to advise users on whether to work from home based on current weather and travel conditions.',
        },
        {
          id: "proj-wfh-feat",
          text: "Features a mobile-first responsive UI, interactive map visualizations, dynamic scoring thresholds, and automated local alert overrides via web scraping.",
        },
        {
          id: "proj-wfh-tech",
          text: "Built with React, Python, FastAPI, and Selenium, integrated with Mapbox (Routing), TomTom (Traffic Incidents), and Open-Meteo APIs.",
        },
      ],
    },
    {
      id: "proj-trading",
      name: "LLM-Based Algorithmic Trading Platform",
      bullets: [
        {
          id: "proj-trading-1",
          text: "Architected a hybrid, Human-in-the-Loop (HITL) trading platform in Python leveraging Groq (LLaMA) and LangChain to ingest unstructured natural language trade inputs and autonomously convert them into validated, executable GTT orders.",
        },
        {
          id: "proj-trading-2",
          text: "Engineered a multi-broker execution layer integrating automated headless 2FA authentication, multi-gate quantitative risk filters (EMA trend, liquidity spreads, slippage guards), and CI/CD pipelines backed by 270+ unit tests and deployed on AWS EC2 instance.",
        },
      ],
    },
    {
      id: "proj-ariel",
      name: "Ariel Droplets - Smart India Hackathon Runner-Up",
      bullets: [
        {
          id: "proj-ariel-1",
          text: "Engineered a prototype system capable of condensing and generating potable drinking water directly from atmospheric moisture.",
        },
        {
          id: "proj-ariel-2",
          text: "Presented the working prototype at the Smart India Hackathon 2019, securing the runner-up position on a national stage.",
        },
      ],
    },
  ],

  certifications: [
    {
      id: "cert-ai",
      icon: "🤖",
      title: "AI & Agents",
      desc: "Claude Certified Developer - Foundations (CCDV-F) (2026)",
    },
    {
      id: "cert-aws",
      icon: "☁️",
      title: "Cloud & Architecture",
      desc: "AWS Certified Solutions Architect - Associate (2025)",
    },
    {
      id: "cert-azure",
      icon: "☁️",
      title: "Cloud & AI",
      desc: "Microsoft Certified: Azure Fundamentals (AZ-900) and Azure AI Fundamentals (AI-900) (2024)",
    },
    {
      id: "cert-data",
      icon: "📊",
      title: "Data & Process",
      desc: "Certification in Data Analytics by LinkedIn and Microsoft (2024); CSSC Six Sigma White Belt (2023)",
    },
    {
      id: "cert-honors",
      icon: "🏆",
      title: "Academic Honors",
      desc: "Achieved State-level ranks of 56 and 60 in the Science and Mathematics Olympiad, respectively (2015).",
    },
    {
      id: "cert-training",
      icon: "🎓",
      title: "Additional Training",
      desc: "Udemy certification in Core Java, DevOps, Shell scripting, Spring Boot (2021); NPTEL certification in Python Data Structures/Algorithms (2019).",
    },
    {
      id: "leader-sih",
      icon: "🚀",
      title: "Pre-Screening Evaluator",
      desc: "Smart India Hackathon (2024 – 2025): Volunteered to rigorously review and evaluate technical solutions submitted by engineering teams nationwide.",
    },
    {
      id: "leader-placement",
      icon: "👥",
      title: "Placement Representative",
      desc: "NSEC ECE Department (2019 – 2020): Managed corporate communications and oversaw the placement process for a batch of 120+ students.",
    },
    {
      id: "leader-intern",
      icon: "✍️",
      title: "Content Writing Intern",
      desc: "Connect My Edu (2018): Completed a virtual internship focused on researching, writing, and proofreading articles.",
    },
  ],
};

// ── Section metadata for the download modal ─────────────────────────────────

export interface SectionMeta {
  id: string;
  label: string;
  children?: { id: string; label: string }[];
}

export function getSectionTree(): SectionMeta[] {
  return [
    { id: "summary", label: "Summary" },
    {
      id: "experience",
      label: "Work Experience",
      children: [
        ...cvData.experience[0].bullets.map((b) => ({
          id: b.id,
          label: b.label,
        })),
        { id: "exp-achievements", label: "Key Achievements" },
      ],
    },
    { id: "education", label: "Education" },
    {
      id: "skills",
      label: "Technical Skills",
      children: cvData.skills.map((s) => ({ id: s.id, label: s.title })),
    },
    {
      id: "projects",
      label: "Projects",
      children: cvData.projects.map((p) => ({ id: p.id, label: p.name })),
    },
    {
      id: "certifications",
      label: "Certifications & Leadership",
      children: cvData.certifications.map((c) => ({
        id: c.id,
        label: c.title,
      })),
    },
  ];
}
