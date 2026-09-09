"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Download,
  MapPin,
  Phone,
  Mail,
  Link2,
  Briefcase,
  GraduationCap,
  Code2,
  Award,
  Zap,
  ChevronDown,
  ExternalLink,
} from "lucide-react";
import { cvData } from "./cvData";
import ProfileAvatar from "./components/ProfileAvatar";
import DownloadModal from "./components/DownloadModal";

// ── Section IDs for navigation ──────────────────────────────────────────────

const SECTIONS = [
  { id: "summary", label: "Summary", icon: Zap },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "skills", label: "Skills", icon: Code2 },
  { id: "projects", label: "Projects", icon: Zap },
  { id: "certifications", label: "Certifications", icon: Award },
] as const;



// ── Animations ──────────────────────────────────────────────────────────────

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" as const } },
};

// ── Page ────────────────────────────────────────────────────────────────────

export default function Home() {
  const [activeSection, setActiveSection] = useState("summary");
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const navRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.95]);

  // Track scroll for sticky nav shadow
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 400);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Intersection observer for active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );

    for (const section of SECTIONS) {
      const el = sectionRefs.current[section.id];
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  // Scroll to section
  const scrollToSection = useCallback((id: string) => {
    const el = sectionRefs.current[id];
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, []);

  const info = cvData.personalInfo;

  return (
    <div className="min-h-screen">
      {/* Background effects removed; handled in CSS with radial-gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none" />

      {/* ── Hero Section ─────────────────────────────────────────────────── */}
      <motion.div
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative z-10 pt-12 md:pt-20 pb-8"
      >
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="hero-card"
          >
            {/* Gradient border glow */}
            <div className="hero-card-glow" />
            <div className="hero-card-inner">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                {/* Avatar */}
                <motion.div variants={scaleIn} className="shrink-0">
                  <ProfileAvatar size={140} />
                </motion.div>

                {/* Info */}
                <div className="flex-1 text-center md:text-left">
                  <motion.h1
                    variants={fadeInUp}
                    className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#e27d60] via-[#e8a87c] to-[#c38d9e] tracking-tight mb-2"
                  >
                    {info.name}
                  </motion.h1>

                  <motion.p
                    variants={fadeInUp}
                    className="text-lg md:text-xl text-[#4a5568] font-medium mb-6"
                  >
                    {info.title}
                  </motion.p>

                  {/* Contact pills */}
                  <motion.div
                    variants={fadeInUp}
                    className="flex flex-wrap justify-center md:justify-start gap-2 mb-6"
                  >
                    <span className="contact-pill">
                      <MapPin size={14} /> {info.location}
                    </span>
                    <span className="contact-pill">
                      <Phone size={14} /> {info.phone}
                    </span>
                    <a href={`mailto:${info.email}`} className="contact-pill contact-pill-link">
                      <Mail size={14} /> {info.email}
                    </a>
                    <a href={info.linkedin} target="_blank" rel="noreferrer" className="contact-pill contact-pill-link">
                      <Link2 size={14} /> {info.linkedinLabel}
                    </a>
                    {info.website && (
                      <a href={info.website} target="_blank" rel="noreferrer" className="contact-pill contact-pill-link">
                        <ExternalLink size={14} /> {info.websiteLabel}
                      </a>
                    )}
                  </motion.div>

                  {/* CTA buttons */}
                  <motion.div variants={fadeInUp} className="flex flex-wrap justify-center md:justify-start gap-3">
                    <button
                      onClick={() => setIsDownloadOpen(true)}
                      className="btn-primary"
                    >
                      <Download size={18} />
                      Download CV
                    </button>
                    <button
                      onClick={() => scrollToSection("experience")}
                      className="btn-secondary"
                    >
                      View Profile
                      <ChevronDown size={16} />
                    </button>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Sticky section nav ───────────────────────────────────────────── */}
      <div
        ref={navRef}
        className={`sticky top-0 z-30 transition-all duration-300 ${
          scrolled ? "section-nav-scrolled" : "section-nav"
        }`}
      >
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto custom-scrollbar py-3">
            {SECTIONS.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`nav-tab ${isActive ? "nav-tab-active" : ""}`}
                >
                  <Icon size={14} />
                  <span className="hidden sm:inline">{section.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Content sections ─────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 pb-24">
        {/* Summary */}
        <motion.section
          id="summary"
          ref={(el) => { sectionRefs.current.summary = el; }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInUp}
          className="section-card mt-8"
        >
          <h2 className="section-title">
            <Zap className="text-blue-400" size={22} />
            Summary
          </h2>
          <p className="text-slate-600 leading-relaxed text-base md:text-lg">
            {cvData.summary}
          </p>
        </motion.section>

        {/* Experience */}
        <motion.section
          id="experience"
          ref={(el) => { sectionRefs.current.experience = el; }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInUp}
          className="mt-8"
        >
          <h2 className="section-title mb-8">
            <Briefcase className="text-blue-400" size={22} />
            Work Experience
          </h2>

          {cvData.experience.map((exp) => (
            <div key={exp.id} className="section-card">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-800">{exp.role}</h3>
                  <h4 className="text-[#e27d60] font-medium">{exp.company}</h4>
                </div>
                <span className="text-sm text-slate-600 font-medium bg-black/5 px-3 py-1 rounded-full whitespace-nowrap">
                  {exp.dates}
                </span>
              </div>

              <ul className="space-y-3">
                {exp.bullets.map((bullet) => (
                  <li key={bullet.id} className="exp-bullet">
                    <span className="exp-bullet-dot" />
                    <span>
                      <strong className="text-slate-700">{bullet.label}:</strong>{" "}
                      <span className="text-slate-600">{bullet.text}</span>
                    </span>
                  </li>
                ))}
              </ul>

              {/* Achievements */}
              <div className="mt-6 pt-6 border-t border-black/5">
                <h5 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">
                  Key Achievements
                </h5>
                <div className="flex flex-wrap gap-2">
                  {exp.achievements.map((ach, i) => (
                    <span key={i} className="achievement-tag">{ach}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </motion.section>

        {/* Education */}
        <motion.section
          id="education"
          ref={(el) => { sectionRefs.current.education = el; }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInUp}
          className="mt-8"
        >
          <h2 className="section-title mb-6">
            <GraduationCap className="text-blue-400" size={22} />
            Education
          </h2>
          <div className="section-card flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="text-xl font-bold text-slate-800">{cvData.education.degree}</h3>
              <p className="text-slate-600 mt-1">{cvData.education.institution}</p>
            </div>
            <div className="text-left md:text-right">
              <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#e27d60] to-[#e8a87c]">
                {cvData.education.cgpa}
              </div>
              <div className="text-sm text-slate-500 mt-1">{cvData.education.year}</div>
            </div>
          </div>
        </motion.section>

        {/* Skills */}
        <motion.section
          id="skills"
          ref={(el) => { sectionRefs.current.skills = el; }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="mt-8"
        >
          <motion.h2 variants={fadeInUp} className="section-title mb-6">
            <Code2 className="text-blue-400" size={22} />
            Technical Skills
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cvData.skills.map((skill) => (
              <motion.div key={skill.id} variants={scaleIn} className="skill-card">
                <h3 className="text-slate-800 font-semibold mb-2 text-sm uppercase tracking-wider">{skill.title}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {skill.items.split(", ").map((item, i) => (
                    <span key={i} className="skill-tag">{item}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Projects */}
        <motion.section
          id="projects"
          ref={(el) => { sectionRefs.current.projects = el; }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="mt-8"
        >
          <motion.h2 variants={fadeInUp} className="section-title mb-6">
            <Zap className="text-blue-400" size={22} />
            Projects
          </motion.h2>
          <div className="space-y-4">
            {cvData.projects.map((proj) => (
              <motion.div key={proj.id} variants={fadeInUp} className="section-card group">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                  <h3 className="text-lg font-bold text-slate-800 group-hover:text-[#e27d60] transition-colors">
                    {proj.name}
                  </h3>
                  {proj.link && (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-[#e27d60] hover:text-[#d56a4c] flex items-center gap-1 transition-colors"
                    >
                      <ExternalLink size={14} />
                      {proj.linkLabel}
                    </a>
                  )}
                </div>
                <ul className="space-y-2">
                  {proj.bullets.map((bullet) => (
                    <li key={bullet.id} className="exp-bullet text-sm">
                      <span className="exp-bullet-dot" />
                      <span>
                        {bullet.label && <strong className="text-slate-700">{bullet.label}: </strong>}
                        <span className="text-slate-600">{bullet.text}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Certifications */}
        <motion.section
          id="certifications"
          ref={(el) => { sectionRefs.current.certifications = el; }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInUp}
          className="mt-8"
        >
          <h2 className="section-title mb-6">
            <Award className="text-blue-400" size={22} />
            Certifications & Leadership
          </h2>
          <div className="section-card">
            <div className="space-y-5">
              {cvData.certifications.map((cert, idx) => (
                <div
                  key={cert.id}
                  className={`flex items-start gap-4 ${
                    idx < cvData.certifications.length - 1 ? "pb-5 border-b border-black/5" : ""
                  }`}
                >
                  <span className="text-2xl mt-0.5">{cert.icon}</span>
                  <div>
                    <h4 className="font-semibold text-slate-800">{cert.title}</h4>
                    <p className="text-slate-600 text-sm mt-1">{cert.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-black/5 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} {cvData.personalInfo.name}. All rights reserved.</p>
        </footer>
      </div>

      {/* ── Floating download button (mobile) ────────────────────────────── */}
      <motion.button
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, type: "spring", damping: 20 }}
        onClick={() => setIsDownloadOpen(true)}
        className="fab-download md:hidden"
      >
        <Download size={22} />
      </motion.button>

      {/* Download modal */}
      <DownloadModal isOpen={isDownloadOpen} onClose={() => setIsDownloadOpen(false)} />
    </div>
  );
}
