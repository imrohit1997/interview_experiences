"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, ChevronDown, ChevronRight, CheckSquare, Square, MinusSquare, FileText } from "lucide-react";
import { pdf } from "@react-pdf/renderer";
import { cvData, getSectionTree } from "../cvData";
import { PdfTemplate } from "./PdfTemplate";

export type SelectedSections = Record<string, boolean>;

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DownloadModal({ isOpen, onClose }: DownloadModalProps) {
  const sectionTree = getSectionTree();

  // Selection state — default all selected
  const [selected, setSelected] = useState<SelectedSections>(() => {
    const initial: SelectedSections = {};
    for (const section of sectionTree) {
      initial[section.id] = true;
      if (section.children) {
        for (const child of section.children) {
          initial[child.id] = true;
        }
      }
    }
    return initial;
  });

  // Track expanded sections
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    for (const section of sectionTree) {
      if (section.children) init[section.id] = false;
    }
    return init;
  });

  // Mode: 'full' or 'custom'
  const [mode, setMode] = useState<"full" | "custom">("full");

  // Reset when modal opens
  useEffect(() => {
    if (isOpen) {
      const initial: SelectedSections = {};
      for (const section of sectionTree) {
        initial[section.id] = true;
        if (section.children) {
          for (const child of section.children) {
            initial[child.id] = true;
          }
        }
      }
      setSelected(initial);
      setMode("full");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  // Toggle a section — if parent, also toggle all children
  const toggleSection = useCallback(
    (id: string) => {
      setSelected((prev) => {
        const next = { ...prev };
        const newVal = !prev[id];
        next[id] = newVal;

        // If this is a parent section, toggle children too
        const section = sectionTree.find((s) => s.id === id);
        if (section?.children) {
          for (const child of section.children) {
            next[child.id] = newVal;
          }
        }

        // If this is a child, update parent state
        for (const sec of sectionTree) {
          if (sec.children?.some((c) => c.id === id)) {
            const allChildrenSelected = sec.children.every(
              (c) => (c.id === id ? newVal : next[c.id])
            );
            const anyChildSelected = sec.children.some(
              (c) => (c.id === id ? newVal : next[c.id])
            );
            next[sec.id] = allChildrenSelected ? true : anyChildSelected ? true : false;
          }
        }

        return next;
      });
    },
    [sectionTree]
  );

  // Toggle expand/collapse
  const toggleExpand = useCallback((id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  // Select / deselect all
  const selectAll = useCallback(
    (val: boolean) => {
      const next: SelectedSections = {};
      for (const section of sectionTree) {
        next[section.id] = val;
        if (section.children) {
          for (const child of section.children) {
            next[child.id] = val;
          }
        }
      }
      setSelected(next);
    },
    [sectionTree]
  );

  // Count selected
  const selectedCount = Object.values(selected).filter(Boolean).length;
  const totalCount = Object.keys(selected).length;

  // Get parent checkbox state (all, some, none)
  function getParentState(sectionId: string): "all" | "some" | "none" {
    const section = sectionTree.find((s) => s.id === sectionId);
    if (!section?.children) return selected[sectionId] ? "all" : "none";
    const childStates = section.children.map((c) => selected[c.id]);
    if (childStates.every(Boolean)) return "all";
    if (childStates.some(Boolean)) return "some";
    return "none";
  }

  // Handle download
  async function handleDownload() {
    let finalSelection = selected;
    if (mode === "full") {
      // Select all and generate
      const allSelected: SelectedSections = {};
      for (const section of sectionTree) {
        allSelected[section.id] = true;
        if (section.children) {
          for (const child of section.children) {
            allSelected[child.id] = true;
          }
        }
      }
      finalSelection = allSelected;
    }

    // Generate PDF Blob using @react-pdf/renderer
    try {
      const blob = await pdf(<PdfTemplate data={cvData} selected={finalSelection} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      const fileName = cvData.personalInfo.name.replace(/\s+/g, "_") + "_CV.pdf";
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error generating PDF:", err);
      alert("Failed to generate PDF. Please try again.");
    }
    
    onClose();
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, type: "spring", damping: 25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="download-modal pointer-events-auto w-full max-w-lg max-h-[85vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 pb-4 border-b border-black/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2563eb] to-[#60a5fa] flex items-center justify-center">
                    <FileText size={20} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-800">Download CV</h2>
                    <p className="text-xs text-slate-500">ATS-compliant PDF format</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-lg bg-black/5 hover:bg-black/10 flex items-center justify-center transition-colors text-slate-500 hover:text-slate-800"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Mode tabs */}
              <div className="flex gap-2 p-6 pb-4">
                <button
                  onClick={() => setMode("full")}
                  className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-medium transition-all ${
                    mode === "full"
                      ? "bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] text-white shadow-lg shadow-[#2563eb]/25"
                      : "bg-black/5 text-slate-500 hover:text-slate-800 hover:bg-black/10"
                  }`}
                >
                  Full CV
                </button>
                <button
                  onClick={() => setMode("custom")}
                  className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-medium transition-all ${
                    mode === "custom"
                      ? "bg-gradient-to-r from-[#60a5fa] to-[#2563eb] text-white shadow-lg shadow-[#60a5fa]/25"
                      : "bg-black/5 text-slate-500 hover:text-slate-800 hover:bg-black/10"
                  }`}
                >
                  Customize Sections
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto px-6 pb-2 custom-scrollbar">
                {mode === "full" ? (
                  <div className="py-8 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2563eb]/20 to-[#60a5fa]/20 flex items-center justify-center mx-auto mb-4">
                      <Download size={28} className="text-[#2563eb]" />
                    </div>
                    <h3 className="text-slate-800 font-semibold mb-2">Download Complete CV</h3>
                    <p className="text-sm text-slate-500 max-w-xs mx-auto">
                      Generate a complete, ATS-optimized PDF with all sections included. Text is fully selectable and machine-readable.
                    </p>
                  </div>
                ) : (
                  <div>
                    {/* Select all / none */}
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-black/5">
                      <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">
                        {selectedCount} / {totalCount} selected
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => selectAll(true)}
                          className="text-xs text-[#2563eb] hover:text-[#1d4ed8] transition-colors"
                        >
                          Select All
                        </button>
                        <span className="text-slate-700">|</span>
                        <button
                          onClick={() => selectAll(false)}
                          className="text-xs text-slate-500 hover:text-slate-400 transition-colors"
                        >
                          Clear All
                        </button>
                      </div>
                    </div>

                    {/* Section tree */}
                    <div className="space-y-1">
                      {sectionTree.map((section) => {
                        const hasChildren = section.children && section.children.length > 0;
                        const isExpanded = expanded[section.id];
                        const parentState = getParentState(section.id);

                        return (
                          <div key={section.id}>
                            {/* Parent row */}
                            <div className="flex items-center gap-2 py-2 px-2 rounded-lg hover:bg-black/5 transition-colors group">
                              {/* Expand toggle */}
                              {hasChildren ? (
                                <button
                                  onClick={() => toggleExpand(section.id)}
                                  className="w-5 h-5 flex items-center justify-center text-slate-500 hover:text-slate-300 transition-colors"
                                >
                                  {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                                </button>
                              ) : (
                                <div className="w-5" />
                              )}

                              {/* Checkbox */}
                              <button
                                onClick={() => toggleSection(section.id)}
                                className="text-[#2563eb] hover:text-[#1d4ed8] transition-colors"
                              >
                                {parentState === "all" ? (
                                  <CheckSquare size={18} />
                                ) : parentState === "some" ? (
                                  <MinusSquare size={18} className="text-amber-400" />
                                ) : (
                                  <Square size={18} className="text-slate-600" />
                                )}
                              </button>

                              {/* Label */}
                              <span
                                className={`text-sm font-medium cursor-pointer transition-colors ${
                                  parentState !== "none" ? "text-slate-800" : "text-slate-500"
                                }`}
                                onClick={() => toggleSection(section.id)}
                              >
                                {section.label}
                              </span>
                            </div>

                            {/* Children */}
                            <AnimatePresence>
                              {hasChildren && isExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden"
                                >
                                  <div className="pl-10 space-y-0.5 pb-1">
                                    {section.children!.map((child) => (
                                      <div
                                        key={child.id}
                                        className="flex items-center gap-2 py-1.5 px-2 rounded-lg hover:bg-black/5 transition-colors"
                                      >
                                        <button
                                          onClick={() => toggleSection(child.id)}
                                          className="text-[#2563eb] hover:text-[#1d4ed8] transition-colors"
                                        >
                                          {selected[child.id] ? (
                                            <CheckSquare size={16} />
                                          ) : (
                                            <Square size={16} className="text-slate-600" />
                                          )}
                                        </button>
                                        <span
                                          className={`text-sm cursor-pointer transition-colors ${
                                            selected[child.id] ? "text-slate-700" : "text-slate-500"
                                          }`}
                                          onClick={() => toggleSection(child.id)}
                                        >
                                          {child.label}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-6 pt-4 border-t border-black/5">
                <button
                  onClick={handleDownload}
                  disabled={mode === "custom" && selectedCount === 0}
                  className="w-full py-3 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] hover:from-[#1d4ed8] hover:to-[#2563eb] shadow-lg shadow-[#2563eb]/20 hover:shadow-[#2563eb]/30 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Download size={18} />
                  {mode === "full" ? "Download Full CV" : `Download (${selectedCount} items selected)`}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
