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
    title: "Senior Software Engineer",
    location: "Kolkata, West Bengal, India",
    phone: "+91-9831808979",
    email: "rohitrambansh@gmail.com",
    linkedin: "https://linkedin.com/in/imrohit2611/",
    linkedinLabel: "linkedin.com/in/imrohit2611",
  },

  summary:
    "Senior Software Engineer with 6+ years of experience designing, developing, and operating large-scale telecom billing and subscriber management platforms for leading UK telecom operators. Expertise in Java, Spring Boot, microservices, distributed systems, performance engineering, cloud technologies and full stack development. Delivered high-availability solutions processing 100M+ daily CDRs supporting £10M+ revenue streams, reduced critical processing latency by 50%, led UAT initiatives for MVNO billing programs, and contributed to technical mentoring and engineering excellence initiatives.",

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
          text: "Designed and developed high-availability telecom billing and subscriber management platforms using Java, Spring Boot, Oracle OCOMC technologies, supporting 20+ MVNOs and processing 100M+ Call Detail Records (CDRs) daily, contributing to revenue streams exceeding ~£10M monthly.",
        },
        {
          id: "exp-tcs-domain",
          label: "Domain Expertise",
          text: "Owned critical billing and provisioning modules covering subscriber lifecycle management, MVNO billing, interconnect billing, product catalog configuration, and telecom charging workflows.",
        },
        {
          id: "exp-tcs-perf",
          label: "Performance Engineering",
          text: "Designed and implemented a multithreaded CDR processing framework that reduced processing latency by 50%, enabling near real-time billing operations while improving throughput and operational efficiency.",
        },
        {
          id: "exp-tcs-ownership",
          label: "Ownership",
          text: "Led root cause analysis and resolution of critical production incidents, ensuring platform stability, minimizing customer impact, and maintaining strict SLA commitments. Collaborated with solution architects and cross-functional teams on application design reviews, performance optimization initiatives, deployment strategies, and platform modernization efforts.",
        },
        {
          id: "exp-tcs-client",
          label: "Client Leadership",
          text: "Spearheaded the User Acceptance Testing (UAT) phase for an E2E billing application catering to a UK-based MVNO, resulting in formal client appreciation.",
        },
        {
          id: "exp-tcs-frontend",
          label: "Frontend & UI Troubleshooting",
          text: "Acquired basic working knowledge of React and frontend development, actively participating in UI troubleshooting and ensuring seamless frontend-backend integration.",
        },
        {
          id: "exp-tcs-mentor",
          label: "Mentorship & Leadership",
          text: "Conducted Java and backend engineering training programs for 50+ associates across internal and external learning initiatives, supporting onboarding, upskilling, and technical capability development. Actively volunteered in project-level and team-building activities. Participated in TCS fresher hiring process as a Technical SME.",
        },
        {
          id: "exp-tcs-promo",
          label: "Career Progression",
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
      id: "skill-lang",
      title: "Programming",
      items: "Core Java, Java 8, Python, Oracle SQL, Shell Scripting, PL/SQL",
    },
    {
      id: "skill-fw",
      title: "Frameworks & Libraries",
      items: "Oracle OCOMC/ONM, Spring Boot, Spring MVC, Spring Security, Microservices, Junit, React",
    },
    {
      id: "skill-cloud",
      title: "Cloud & DevOps",
      items: "AWS, Microsoft Azure, Jenkins, Git, Gitlab CI/CD, Linux",
    },
    {
      id: "skill-ai",
      title: "AI & Automation",
      items: "LangChain, MCP, Groq/Gemini API, Claude AI, Amazon Q Developer",
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
      name: "LLM-Based Trade Execution Platform",
      bullets: [
        {
          id: "proj-trading-1",
          text: "Developed a Python-based automated trading platform leveraging Groq APIs (LLaMA), LangChain, Selenium, and AWS EC2 to convert Telegram trading signals into executable Upstox orders.",
        },
        {
          id: "proj-trading-2",
          text: "Implemented automated authentication, risk management controls, EMA-based trend filtering, liquidity validation, and CI/CD deployment pipelines using GitHub Actions.",
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
