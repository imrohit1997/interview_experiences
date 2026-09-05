"use client";

import { motion } from "framer-motion";
import { Download, MapPin, Phone, Mail, Link2, Briefcase, GraduationCap, Code2, Award, Zap } from "lucide-react";

export default function Home() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-blue-500/30">
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/20 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12 md:py-24">
        {/* Header Section */}
        <motion.header 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="mb-20"
        >
          <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 tracking-tight mb-6">
            ROHIT RAMBANSH YADAV
          </motion.h1>
          
          <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 text-sm md:text-base text-slate-400 mb-8">
            <span className="flex items-center gap-2"><MapPin size={16} /> Kolkata, West Bengal, India</span>
            <span className="flex items-center gap-2"><Phone size={16} /> +91-9831808979</span>
            <a href="mailto:rohitrambansh@gmail.com" className="flex items-center gap-2 hover:text-blue-400 transition-colors"><Mail size={16} /> rohitrambansh@gmail.com</a>
            <a href="https://linkedin.com/in/imrohit2611/" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-blue-400 transition-colors"><Link2 size={16} /> linkedin.com/in/imrohit2611/</a>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <a href="/CV/Resume_Rohit_Yadav.pdf" download className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-full font-medium transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5">
              <Download size={18} />
              Download PDF
            </a>
          </motion.div>
        </motion.header>

        {/* Summary */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="mb-20 bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 shadow-xl"
        >
          <h2 className="text-2xl font-bold flex items-center gap-3 mb-6 text-white">
            <Zap className="text-blue-400" /> Summary
          </h2>
          <p className="text-slate-300 leading-relaxed text-lg">
            Senior Backend Engineer with 5+ years of enterprise experience building large-scale, high-availability telecom billing platforms for UK based telecom operators. Specialized in Core Java, Spring Boot, microservices, telecom rating systems, AI/LLM automation pipelines and cloud technologies. Delivered performance improvements across CDR processing systems, led UAT for MVNO billing programs, and mentored 50+ engineers.
          </p>
        </motion.section>

        {/* Work Experience */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="mb-20"
        >
          <h2 className="text-2xl font-bold flex items-center gap-3 mb-8 text-white">
            <Briefcase className="text-blue-400" /> Work Experience
          </h2>
          
          <div className="relative pl-8 md:pl-0">
            {/* Timeline Line */}
            <div className="hidden md:block absolute left-[120px] top-0 bottom-0 w-px bg-slate-800" />
            
            {/* Experience Item */}
            <div className="relative md:flex gap-12 mb-12">
              <div className="md:w-[120px] shrink-0 text-slate-400 font-medium mb-2 md:mb-0 pt-1">
                Aug 2020 – Present
              </div>
              
              {/* Timeline Dot */}
              <div className="hidden md:block absolute left-[116px] top-2.5 w-2.5 h-2.5 rounded-full bg-blue-500 ring-4 ring-slate-950" />
              
              <div className="flex-1 bg-slate-900/40 border border-slate-800/60 rounded-2xl p-6 hover:border-slate-700 transition-colors">
                <h3 className="text-xl font-bold text-white mb-1">IT Analyst</h3>
                <h4 className="text-blue-400 font-medium mb-4">TATA Consultancy Services (Client: British Telecom, UK)</h4>
                
                <ul className="space-y-3 text-slate-300 text-sm md:text-base">
                  <li className="flex items-start gap-3"><span className="text-blue-500 mt-1">•</span> <span><strong>System Architecture & Development:</strong> Designed and delivered high-availability E2E telecom billing solutions processing 100M+ daily CDRs, driving ~£20M in revenue.</span></li>
                  <li className="flex items-start gap-3"><span className="text-blue-500 mt-1">•</span> <span><strong>Domain Expertise:</strong> Managed and optimized MVNO billing, interconnect billing, and complex subscriber provisioning systems.</span></li>
                  <li className="flex items-start gap-3"><span className="text-blue-500 mt-1">•</span> <span><strong>Performance Engineering:</strong> Engineered real-time CDR processing utilizing multithreading, reducing processing latency by 50%.</span></li>
                  <li className="flex items-start gap-3"><span className="text-blue-500 mt-1">•</span> <span><strong>Client Leadership:</strong> Spearheaded UAT for an E2E billing application catering to a UK-based MVNO.</span></li>
                  <li className="flex items-start gap-3"><span className="text-blue-500 mt-1">•</span> <span><strong>Mentorship & Leadership:</strong> Served as technical mentor for Java, upskilling over 50 associates. Technical SME for fresher hiring.</span></li>
                  <li className="flex items-start gap-3"><span className="text-blue-500 mt-1">•</span> <span><strong>Career Progression:</strong> Promoted to highly competitive TCS Digital cadre within 1.5 years.</span></li>
                </ul>

                <div className="mt-6 pt-6 border-t border-slate-800">
                  <h5 className="font-semibold text-slate-200 mb-3 text-sm uppercase tracking-wider">Key Achievements</h5>
                  <div className="flex flex-wrap gap-2">
                    {["Bronze Guru Award (2026)", "NextGen Mentorship Program (2025)", "Top 50 in CMI Code Masters (2025 & 2026)", "Contextual Master Award (2023)"].map((ach, i) => (
                      <span key={i} className="px-3 py-1 rounded-full bg-slate-800 text-xs font-medium text-slate-300">{ach}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Education */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="mb-20"
        >
          <h2 className="text-2xl font-bold flex items-center gap-3 mb-6 text-white">
            <GraduationCap className="text-blue-400" /> Education
          </h2>
          <div className="bg-gradient-to-r from-slate-900 to-slate-900/50 border border-slate-800 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="text-xl font-bold text-white">B.Tech – ECE</h3>
              <p className="text-slate-400 mt-1">Netaji Subhash Engineering College</p>
            </div>
            <div className="text-left md:text-right">
              <div className="text-blue-400 font-semibold text-lg">CGPA - 9.17/10</div>
              <div className="text-slate-500 text-sm mt-1">2020</div>
            </div>
          </div>
        </motion.section>

        {/* Technical Skills */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="mb-20"
        >
          <h2 className="text-2xl font-bold flex items-center gap-3 mb-6 text-white">
            <Code2 className="text-blue-400" /> Technical Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: "Programming Languages", desc: "Core Java, Java 8, Python, Oracle SQL, Shell Scripting, PL/SQL" },
              { title: "Frameworks & Libraries", desc: "Oracle OCOMC/ONM, Spring Boot, Spring MVC, Spring Security (JWT), Microservices, Junit, LangChain" },
              { title: "Cloud & DevOps", desc: "AWS, Microsoft Azure, Jenkins, Git, Gitlab, Linux VMs, Jira, Maven" },
              { title: "Methodologies & Tools", desc: "Agile, Scrum, RESTful API Integration, Amazon Q Developer" }
            ].map((skill, idx) => (
              <div key={idx} className="bg-slate-900/40 border border-slate-800 p-6 rounded-xl hover:bg-slate-800/50 transition-colors">
                <h3 className="text-white font-semibold mb-2">{skill.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{skill.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Projects */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="mb-20"
        >
          <h2 className="text-2xl font-bold flex items-center gap-3 mb-6 text-white">
            <Zap className="text-blue-400" /> Projects
          </h2>
          <div className="space-y-6">
            <div className="bg-slate-900/40 border border-slate-800 p-6 md:p-8 rounded-2xl group hover:border-slate-700 transition-colors">
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-2">
                <span>Should I WFH? — Commute Decision Engine</span>
                <a href="https://wfh.imrohit2611.co.in/" target="_blank" rel="noreferrer" className="text-sm font-normal text-blue-400 hover:text-blue-300 flex items-center gap-1"><Link2 size={14}/> wfh.imrohit2611.co.in</a>
              </h3>
              <ul className="space-y-2 text-slate-300 text-sm md:text-base">
                <li className="flex items-start gap-3"><span className="text-blue-500 mt-1">•</span> <span><strong>Purpose:</strong> A real-time decision engine that computes a "Commute Friction Score" to advise users on whether to work from home based on current weather and travel conditions.</span></li>
                <li className="flex items-start gap-3"><span className="text-blue-500 mt-1">•</span> <span><strong>Features:</strong> Features a mobile-first responsive UI, interactive map visualizations, dynamic scoring thresholds, and automated local alert overrides via web scraping.</span></li>
                <li className="flex items-start gap-3"><span className="text-blue-500 mt-1">•</span> <span><strong>Tech Stack & APIs:</strong> Built with React, Python, FastAPI, and Selenium, integrated with Mapbox (Routing), TomTom (Traffic Incidents), and Open-Meteo APIs.</span></li>
              </ul>
            </div>

            <div className="bg-slate-900/40 border border-slate-800 p-6 md:p-8 rounded-2xl group hover:border-slate-700 transition-colors">
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">LLM-Based Trade Execution Bot for algorithmic trading</h3>
              <ul className="space-y-2 text-slate-300 text-sm md:text-base">
                <li className="flex items-start gap-3"><span className="text-blue-500 mt-1">•</span> <span>Built an AI-powered Python-based algorithmic trading platform utilizing <strong>Groq (LLaMA 3.1)</strong>, Selenium, and AWS EC2 to autonomously parse Telegram trading signals and execute risk-managed multi-leg GTT orders on the Upstox platform.</span></li>
                <li className="flex items-start gap-3"><span className="text-blue-500 mt-1">•</span> <span>Engineered a robust system with automated daily OAuth login via TOTP, a 6-gate risk filter, and a GitHub Actions CI/CD pipeline for zero-touch deployment.</span></li>
              </ul>
            </div>
            
            <div className="bg-slate-900/40 border border-slate-800 p-6 md:p-8 rounded-2xl group hover:border-slate-700 transition-colors">
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">Ariel Droplets - Smart India Hackathon Runner-Up</h3>
              <ul className="space-y-2 text-slate-300 text-sm md:text-base">
                <li className="flex items-start gap-3"><span className="text-blue-500 mt-1">•</span> <span>Engineered a prototype system capable of condensing and generating potable drinking water directly from atmospheric moisture.</span></li>
                <li className="flex items-start gap-3"><span className="text-blue-500 mt-1">•</span> <span>Presented the working prototype at the Smart India Hackathon 2019, securing the runner-up position on a national stage.</span></li>
              </ul>
            </div>
          </div>
        </motion.section>

        {/* Certifications & Leadership */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <h2 className="text-2xl font-bold flex items-center gap-3 mb-6 text-white">
            <Award className="text-blue-400" /> Certifications & Leadership
          </h2>
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 md:p-8">
            <div className="space-y-6">
              {[
                { icon: "📜", title: "Cloud & Architecture", desc: "AWS Certified Solutions Architect - Associate (2025)" },
                { icon: "📜", title: "Cloud & AI", desc: "Microsoft Certified: Azure Fundamentals (AZ-900) and Azure AI Fundamentals (AI-900) (2024)" },
                { icon: "📜", title: "Data & Process", desc: "Certification in Data Analytics by LinkedIn and Microsoft (2024); CSSC Six Sigma White Belt (2023)" },
                { icon: "🚀", title: "Pre-Screening Evaluator", desc: "Smart India Hackathon (2024 – 2025): Volunteered to rigorously review and evaluate technical solutions." },
                { icon: "🚀", title: "Placement Representative", desc: "NSEC ECE Department (2019 – 2020): Managed corporate communications and oversaw placement for 120+ students." }
              ].map((cert, idx) => (
                <div key={idx} className="flex items-start gap-4 pb-6 border-b border-slate-800/60 last:border-0 last:pb-0">
                  <span className="text-2xl mt-1 opacity-80">{cert.icon}</span>
                  <div>
                    <h4 className="font-semibold text-slate-200">{cert.title}</h4>
                    <p className="text-slate-400 text-sm mt-1">{cert.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>
        
        {/* Footer */}
        <footer className="mt-24 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} Rohit Rambansh Yadav. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
