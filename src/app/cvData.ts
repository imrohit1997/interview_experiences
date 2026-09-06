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
}

export interface ExperienceBullet {
  id: string;
  label: string;
  text: string;
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
    title: "Senior Backend Engineer",
    location: "Kolkata, West Bengal, India",
    phone: "+91-9831808979",
    email: "rohitrambansh@gmail.com",
    linkedin: "https://linkedin.com/in/imrohit2611/",
    linkedinLabel: "linkedin.com/in/imrohit2611",
  },

  summary:
    "Senior Backend Engineer with 5+ years of enterprise experience building large-scale, high-availability telecom billing platforms for UK based telecom operators. Specialized in Core Java, Spring Boot, microservices, telecom rating systems, AI/LLM automation pipelines and cloud technologies. Delivered performance improvements across CDR processing systems, led UAT for MVNO billing programs, and mentored 50+ engineers.",

  experience: [
    {
      id: "exp-tcs",
      role: "IT Analyst",
      company: "TATA Consultancy Services (Client: British Telecom, UK)",
      dates: "Aug 2020 – Present",
      bullets: [
        {
          id: "exp-tcs-arch",
          label: "System Architecture & Development",
          text: "Designed and delivered high-availability E2E telecom billing solutions processing 100M+ daily CDRs, driving ~£20M in revenue.",
        },
        {
          id: "exp-tcs-domain",
          label: "Domain Expertise",
          text: "Managed and optimized MVNO billing, interconnect billing, and complex subscriber provisioning systems.",
        },
        {
          id: "exp-tcs-perf",
          label: "Performance Engineering",
          text: "Engineered real-time CDR processing utilizing multithreading, reducing processing latency by 50%.",
        },
        {
          id: "exp-tcs-client",
          label: "Client Leadership",
          text: "Spearheaded UAT for an E2E billing application catering to a UK-based MVNO.",
        },
        {
          id: "exp-tcs-mentor",
          label: "Mentorship & Leadership",
          text: "Served as technical mentor for Java, upskilling over 50 associates. Technical SME for fresher hiring.",
        },
        {
          id: "exp-tcs-promo",
          label: "Career Progression",
          text: "Promoted to highly competitive TCS Digital cadre within 1.5 years.",
        },
      ],
      achievements: [
        "Bronze Guru Award (2026)",
        "NextGen Mentorship Program (2025)",
        "Top 50 in CMI Code Masters (2025 & 2026)",
        "Contextual Master Award (2023)",
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
      id: "skill-lang",
      title: "Programming Languages",
      items: "Core Java, Java 8, Python, Oracle SQL, Shell Scripting, PL/SQL",
    },
    {
      id: "skill-fw",
      title: "Frameworks & Libraries",
      items:
        "Oracle OCOMC/ONM, Spring Boot, Spring MVC, Spring Security (JWT), Microservices, Junit, LangChain",
    },
    {
      id: "skill-cloud",
      title: "Cloud & DevOps",
      items: "AWS, Microsoft Azure, Jenkins, Git, Gitlab, Linux VMs, Jira, Maven",
    },
    {
      id: "skill-method",
      title: "Methodologies & Tools",
      items: "Agile, Scrum, RESTful API Integration, Amazon Q Developer",
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
          label: "Purpose",
          text: 'A real-time decision engine that computes a "Commute Friction Score" to advise users on whether to work from home based on current weather and travel conditions.',
        },
        {
          id: "proj-wfh-feat",
          label: "Features",
          text: "Features a mobile-first responsive UI, interactive map visualizations, dynamic scoring thresholds, and automated local alert overrides via web scraping.",
        },
        {
          id: "proj-wfh-tech",
          label: "Tech Stack & APIs",
          text: "Built with React, Python, FastAPI, and Selenium, integrated with Mapbox (Routing), TomTom (Traffic Incidents), and Open-Meteo APIs.",
        },
      ],
    },
    {
      id: "proj-trading",
      name: "LLM-Based Trade Execution Bot for algorithmic trading",
      bullets: [
        {
          id: "proj-trading-1",
          text: "Built an AI-powered Python-based algorithmic trading platform utilizing Groq (LLaMA 3.1), Selenium, and AWS EC2 to autonomously parse Telegram trading signals and execute risk-managed multi-leg GTT orders on the Upstox platform.",
        },
        {
          id: "proj-trading-2",
          text: "Engineered a robust system with automated daily OAuth login via TOTP, a 6-gate risk filter, and a GitHub Actions CI/CD pipeline for zero-touch deployment.",
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
      id: "cert-aws",
      icon: "📜",
      title: "Cloud & Architecture",
      desc: "AWS Certified Solutions Architect - Associate (2025)",
    },
    {
      id: "cert-azure",
      icon: "📜",
      title: "Cloud & AI",
      desc: "Microsoft Certified: Azure Fundamentals (AZ-900) and Azure AI Fundamentals (AI-900) (2024)",
    },
    {
      id: "cert-data",
      icon: "📜",
      title: "Data & Process",
      desc: "Certification in Data Analytics by LinkedIn and Microsoft (2024); CSSC Six Sigma White Belt (2023)",
    },
    {
      id: "cert-sih",
      icon: "🚀",
      title: "Pre-Screening Evaluator",
      desc: "Smart India Hackathon (2024 – 2025): Volunteered to rigorously review and evaluate technical solutions.",
    },
    {
      id: "cert-placement",
      icon: "🚀",
      title: "Placement Representative",
      desc: "NSEC ECE Department (2019 – 2020): Managed corporate communications and oversaw placement for 120+ students.",
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
      children: cvData.experience[0].bullets.map((b) => ({
        id: b.id,
        label: b.label,
      })),
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
