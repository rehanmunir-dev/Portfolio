"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/ProjectCard";
import { uiuxProjects, developmentProjects } from "@/components/projectData";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Merge all projects into a single array with a unified shape
type UnifiedProject = {
  id: string;
  title: string;
  category: string;
  type: "development" | "uiux";
  description: string;
  tags: string[];
  tools: string[];
  behanceUrl: string;
  liveUrl?: string;
  image: string;
};

const developmentProjectCards: UnifiedProject[] = developmentProjects.map((p) => ({
  id: p.id,
  title: p.title,
  category: p.category,
  type: "development" as const,
  description: p.description,
  tags: p.tags,
  tools: p.tools,
  behanceUrl: p.behanceUrl,
  liveUrl: p.liveUrl,
  image: p.image,
}));

const uiuxProjectCards: UnifiedProject[] = uiuxProjects.map((p) => ({
  id: p.id,
  title: p.title,
  category: p.category,
  type: "uiux" as const,
  description: p.description,
  tags: p.tags,
  tools: p.tools,
  behanceUrl: p.behanceUrl,
  liveUrl: p.liveUrl,
  image: p.image,
}));

const allProjects: UnifiedProject[] = [];
const maxProjectCount = Math.max(developmentProjectCards.length, uiuxProjectCards.length);

for (let index = 0; index < maxProjectCount; index += 1) {
  if (developmentProjectCards[index]) allProjects.push(developmentProjectCards[index]);
  if (uiuxProjectCards[index]) allProjects.push(uiuxProjectCards[index]);
}

const ITEMS_PER_PAGE = 5;

const filterTabs = ["All", "Development", "UI/UX Design"];

const fadeBlur = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export function AllProjects() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [direction, setDirection] = useState(0);

  // Filter projects
  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return allProjects;
    return allProjects.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);

  const currentProjects = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProjects.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProjects, currentPage]);

  const resultsLabel =
    activeFilter === "All"
      ? `Showing ${currentProjects.length} of ${filteredProjects.length} projects`
      : `Showing ${currentProjects.length} of ${filteredProjects.length} in ${activeFilter}`;

  const handleFilterChange = (tab: string) => {
    setActiveFilter(tab);
    setCurrentPage(1);
    setDirection(0);
  };

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    setDirection(page > currentPage ? 1 : -1);
    setCurrentPage(page);
    // Smooth scroll to top of section
    const section = document.getElementById("projects");
    if (section) {
      const navHeight = 80;
      const top = section.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const handlePrev = () => goToPage(currentPage - 1);
  const handleNext = () => goToPage(currentPage + 1);

  // Generate page numbers with ellipsis for large page counts
  const getPageNumbers = () => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-background px-4 py-14 text-foreground sm:px-8 sm:py-24 lg:px-12 font-[family-name:var(--font-sans)] transition-colors duration-500 border-t border-surface-border"
    >
      <AnimatedBackground className="opacity-70" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.2, once: true }}
          variants={fadeBlur}
        >
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#0AD1BC] text-glow-green">
            Portfolio
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground font-[family-name:var(--font-display)] sm:text-4xl md:text-5xl">
            My Projects
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-text sm:text-lg">
            A curated collection of development work and UI/UX design — from production websites to mobile app concepts.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          className="mt-8 flex flex-wrap justify-center gap-2 sm:mt-12 sm:gap-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.2, once: true }}
          variants={staggerContainer}
          aria-label="Project filters"
        >
          {filterTabs.map((tab) => {
            const count =
              tab === "All"
                ? allProjects.length
                : allProjects.filter((p) => p.category === tab).length;
            return (
              <motion.button
                key={tab}
                type="button"
                onClick={() => handleFilterChange(tab)}
                variants={fadeBlur}
                className={`rounded-full border px-3 py-2 text-[10px] font-bold uppercase tracking-[0.12em] transition-all duration-300 cursor-pointer flex items-center gap-1.5 sm:gap-2 sm:px-5 sm:py-2.5 sm:text-xs sm:tracking-[0.15em] ${
                  activeFilter === tab
                    ? "border-[#0AD1BC] bg-[#0AD1BC] text-slate-950 shadow-[0_0_15px_rgba(10,209,188,0.3)] font-extrabold"
                    : "border-surface-border bg-surface/40 text-muted-text hover:border-[#0AD1BC] hover:text-foreground"
                }`}
                aria-pressed={activeFilter === tab}
              >
                {tab}
                <span
                  className={`text-[9px] font-mono rounded-full px-1.5 py-0.5 sm:text-[10px] ${
                    activeFilter === tab
                      ? "bg-slate-950/20 text-slate-950"
                      : "bg-surface-secondary text-muted-text"
                  }`}
                >
                  {count}
                </span>
              </motion.button>
            );
          })}
        </motion.div>

        <div className="mt-6 flex items-center justify-center">
          <p
            className="text-[11px] font-bold uppercase tracking-widest text-muted-text/60"
            role="status"
            aria-live="polite"
          >
            {resultsLabel}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="mt-8 relative min-h-[300px] sm:mt-14 sm:min-h-[500px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`${activeFilter}-${currentPage}`}
              initial={{ opacity: 0, y: direction >= 0 ? 40 : -40, filter: "blur(8px)" }}
              animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
              }}
              exit={{
                opacity: 0,
                y: direction >= 0 ? -40 : 40,
                filter: "blur(8px)",
                transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
              }}
              className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
            >
              {currentProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  className={index === 0 && currentProjects.length >= 3
                    ? "sm:col-span-2 lg:col-span-2"
                    : "col-span-1"
                  }
                >
                  <ProjectCard
                    project={{
                      id: project.id,
                      title: project.title,
                      category: project.category,
                      type: project.type,
                      description: project.description,
                      image: project.image,
                      tags: project.tags,
                      tools: project.tools,
                      behanceUrl: project.behanceUrl,
                      liveUrl: project.liveUrl,
                    }}
                    featured={index === 0 && currentProjects.length >= 3}
                    variant={project.type === "uiux" ? "uiux" : "dev"}
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            className="mt-8 sm:mt-14 flex flex-col items-center gap-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex max-w-full flex-wrap items-center justify-center gap-1.5 sm:gap-2">
              {/* Prev Arrow */}
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className={`flex h-8 w-8 items-center justify-center rounded-xl border transition-all duration-300 cursor-pointer sm:h-10 sm:w-10 ${
                  currentPage === 1
                    ? "border-surface-border bg-surface/30 text-muted-text/30 cursor-not-allowed"
                    : "border-surface-border bg-surface/60 text-muted-text hover:border-[#0AD1BC] hover:text-foreground hover:shadow-[0_0_15px_rgba(10,209,188,0.2)]"
                }`}
                aria-label="Previous Page"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              {/* Page Numbers */}
              {getPageNumbers().map((page, idx) =>
                page === "..." ? (
                  <span
                    key={`ellipsis-${idx}`}
                    className="flex h-8 w-8 items-center justify-center text-sm text-muted-text/50 font-bold select-none sm:h-10 sm:w-10"
                  >
                    …
                  </span>
                ) : (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`flex h-8 w-8 items-center justify-center rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer sm:h-10 sm:w-10 sm:text-sm ${
                      currentPage === page
                        ? "bg-[#0AD1BC] text-slate-950 shadow-[0_0_20px_rgba(10,209,188,0.4)] scale-110 font-extrabold"
                        : "border border-surface-border bg-surface/40 text-muted-text hover:border-[#0AD1BC] hover:text-foreground hover:bg-surface/70"
                    }`}
                    aria-label={`Go to page ${page}`}
                    aria-current={currentPage === page ? "page" : undefined}
                  >
                    {page}
                  </button>
                )
              )}

              {/* Next Arrow */}
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`flex h-8 w-8 items-center justify-center rounded-xl border transition-all duration-300 cursor-pointer sm:h-10 sm:w-10 ${
                  currentPage === totalPages
                    ? "border-surface-border bg-surface/30 text-muted-text/30 cursor-not-allowed"
                    : "border-surface-border bg-surface/60 text-muted-text hover:border-[#0AD1BC] hover:text-foreground hover:shadow-[0_0_15px_rgba(10,209,188,0.2)]"
                }`}
                aria-label="Next Page"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {/* Page info text */}
            <p className="text-[11px] font-bold uppercase tracking-widest text-muted-text/50">
              Page {currentPage} of {totalPages} &middot;{" "}
              {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
