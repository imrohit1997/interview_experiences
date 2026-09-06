// ── ATS-Compliant PDF Generator ─────────────────────────────────────────────
// Client-side only — uses jsPDF to produce text-based, ATS-parseable PDFs.
// No html2canvas, no rasterisation, no server dependency.

import { jsPDF } from "jspdf";
import type { CVData } from "../cvData";

// ── Config ──────────────────────────────────────────────────────────────────

const PAGE_W = 210; // A4 mm
const PAGE_H = 297;
const MARGIN_L = 15;
const MARGIN_R = 15;
const MARGIN_T = 15;
const MARGIN_B = 20;
const CONTENT_W = PAGE_W - MARGIN_L - MARGIN_R;
const LINE_H = 5.5; // line height in mm
const SECTION_GAP = 6;
const BULLET = "\u2022"; // •

// ── Helpers ─────────────────────────────────────────────────────────────────

function cleanText(text: string): string {
  // Replace smart quotes, em-dashes etc. with ASCII equivalents
  return text
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/\u2013/g, "-")
    .replace(/\u2014/g, "--")
    .replace(/\u00A3/g, "GBP ")
    .replace(/\u2026/g, "...")
    .replace(/[^\x00-\x7F]/g, (ch) => {
      // Keep basic latin-1 supplement characters
      if (ch.charCodeAt(0) <= 255) return ch;
      return "";
    });
}

export interface SelectedSections {
  [sectionOrSubsectionId: string]: boolean;
}

// ── Generator ───────────────────────────────────────────────────────────────

export function generateCV(data: CVData, selected: SelectedSections): void {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  let y = MARGIN_T;

  // ── Utility: check if a section or subsection is selected ──
  function isSelected(id: string): boolean {
    return selected[id] !== false; // default true if not in map
  }

  // ── Utility: add page if needed ──
  function ensureSpace(needed: number) {
    if (y + needed > PAGE_H - MARGIN_B) {
      doc.addPage();
      y = MARGIN_T;
    }
  }

  // ── Utility: draw a section divider line ──
  function drawDivider() {
    ensureSpace(SECTION_GAP);
    y += 2;
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.3);
    doc.line(MARGIN_L, y, PAGE_W - MARGIN_R, y);
    y += 4;
  }

  // ── Utility: write wrapped text, returns new y ──
  function writeText(
    text: string,
    x: number,
    maxW: number,
    fontSize: number,
    fontStyle: string = "normal",
    color: [number, number, number] = [50, 50, 50]
  ): void {
    doc.setFont("helvetica", fontStyle);
    doc.setFontSize(fontSize);
    doc.setTextColor(...color);
    const lines = doc.splitTextToSize(cleanText(text), maxW);
    for (const line of lines) {
      ensureSpace(LINE_H);
      doc.text(line, x, y);
      y += LINE_H;
    }
  }

  // ── Utility: write a bullet point ──
  function writeBullet(text: string, x: number, maxW: number, fontSize: number = 10): void {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(fontSize);
    doc.setTextColor(50, 50, 50);
    const bulletX = x;
    const textX = x + 4;
    const textW = maxW - 4;
    const lines = doc.splitTextToSize(cleanText(text), textW);
    for (let i = 0; i < lines.length; i++) {
      ensureSpace(LINE_H);
      if (i === 0) {
        doc.text(BULLET, bulletX, y);
      }
      doc.text(lines[i], textX, y);
      y += LINE_H;
    }
  }

  // ── Header (always included) ──────────────────────────────────────────────

  const info = data.personalInfo;

  // Name
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(30, 30, 30);
  doc.text(cleanText(info.name.toUpperCase()), MARGIN_L, y);
  y += 8;

  // Title
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.setTextColor(80, 80, 80);
  doc.text(cleanText(info.title), MARGIN_L, y);
  y += 7;

  // Contact line
  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  const contactLine = `${info.location}  |  ${info.phone}  |  ${info.email}  |  ${info.linkedinLabel}`;
  doc.text(cleanText(contactLine), MARGIN_L, y);
  y += 4;

  // ── Summary ───────────────────────────────────────────────────────────────

  if (isSelected("summary")) {
    drawDivider();
    writeText("PROFESSIONAL SUMMARY", MARGIN_L, CONTENT_W, 12, "bold", [30, 30, 30]);
    y += 1;
    writeText(data.summary, MARGIN_L, CONTENT_W, 10, "normal", [50, 50, 50]);
  }

  // ── Experience ────────────────────────────────────────────────────────────

  if (isSelected("experience")) {
    drawDivider();
    writeText("WORK EXPERIENCE", MARGIN_L, CONTENT_W, 12, "bold", [30, 30, 30]);
    y += 1;

    for (const exp of data.experience) {
      // Role + Company
      writeText(exp.role, MARGIN_L, CONTENT_W, 11, "bold", [30, 30, 30]);
      writeText(`${exp.company}  |  ${exp.dates}`, MARGIN_L, CONTENT_W, 9.5, "italic", [90, 90, 90]);
      y += 1;

      for (const bullet of exp.bullets) {
        if (!isSelected(bullet.id)) continue;
        const text = bullet.label ? `${bullet.label}: ${bullet.text}` : bullet.text;
        writeBullet(text, MARGIN_L + 2, CONTENT_W - 2);
      }

      // Achievements
      if (exp.achievements.length > 0) {
        y += 2;
        writeText("Key Achievements:", MARGIN_L + 2, CONTENT_W - 2, 9.5, "bold", [60, 60, 60]);
        for (const ach of exp.achievements) {
          writeBullet(ach, MARGIN_L + 4, CONTENT_W - 4, 9.5);
        }
      }
    }
  }

  // ── Education ─────────────────────────────────────────────────────────────

  if (isSelected("education")) {
    drawDivider();
    writeText("EDUCATION", MARGIN_L, CONTENT_W, 12, "bold", [30, 30, 30]);
    y += 1;

    const edu = data.education;
    writeText(edu.degree, MARGIN_L, CONTENT_W, 11, "bold", [30, 30, 30]);
    writeText(
      `${edu.institution}  |  CGPA: ${edu.cgpa}  |  ${edu.year}`,
      MARGIN_L,
      CONTENT_W,
      9.5,
      "italic",
      [90, 90, 90]
    );
  }

  // ── Skills ────────────────────────────────────────────────────────────────

  if (isSelected("skills")) {
    drawDivider();
    writeText("TECHNICAL SKILLS", MARGIN_L, CONTENT_W, 12, "bold", [30, 30, 30]);
    y += 1;

    for (const cat of data.skills) {
      if (!isSelected(cat.id)) continue;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(40, 40, 40);
      ensureSpace(LINE_H);
      const labelW = doc.getTextWidth(cleanText(cat.title + ": "));
      doc.text(cleanText(cat.title + ": "), MARGIN_L, y);

      doc.setFont("helvetica", "normal");
      doc.setTextColor(60, 60, 60);
      const remaining = CONTENT_W - labelW;
      const valLines = doc.splitTextToSize(cleanText(cat.items), remaining);
      doc.text(valLines[0], MARGIN_L + labelW, y);
      y += LINE_H;

      // Continuation lines
      for (let i = 1; i < valLines.length; i++) {
        ensureSpace(LINE_H);
        doc.text(valLines[i], MARGIN_L + labelW, y);
        y += LINE_H;
      }
    }
  }

  // ── Projects ──────────────────────────────────────────────────────────────

  if (isSelected("projects")) {
    drawDivider();
    writeText("PROJECTS", MARGIN_L, CONTENT_W, 12, "bold", [30, 30, 30]);
    y += 1;

    for (const proj of data.projects) {
      if (!isSelected(proj.id)) continue;

      const projTitle = proj.link
        ? `${proj.name}  (${proj.linkLabel})`
        : proj.name;
      writeText(projTitle, MARGIN_L, CONTENT_W, 11, "bold", [30, 30, 30]);
      y += 0.5;

      for (const bullet of proj.bullets) {
        const text = bullet.label ? `${bullet.label}: ${bullet.text}` : bullet.text;
        writeBullet(text, MARGIN_L + 2, CONTENT_W - 2);
      }
      y += 2;
    }
  }

  // ── Certifications ────────────────────────────────────────────────────────

  if (isSelected("certifications")) {
    drawDivider();
    writeText("CERTIFICATIONS & LEADERSHIP", MARGIN_L, CONTENT_W, 12, "bold", [30, 30, 30]);
    y += 1;

    for (const cert of data.certifications) {
      if (!isSelected(cert.id)) continue;
      writeBullet(`${cert.title}: ${cert.desc}`, MARGIN_L + 2, CONTENT_W - 2);
    }
  }

  // ── Save ──────────────────────────────────────────────────────────────────

  const pdfBlob = doc.output("blob");
  const url = URL.createObjectURL(pdfBlob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Rohit_Yadav.pdf";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
