"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState, useEffect } from "react";
import { ProjectCard } from "@/components/ProjectCard";
import { developmentProjects, DevelopmentProject } from "@/components/projectData";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 120 : -120,
    opacity: 0,
    filter: "blur(8px)",
  }),
  center: {
    x: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -120 : 120,
    opacity: 0,
    filter: "blur(8px)",
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

const filterOrder = [
  "All",
  "Real Estate",
  "Fintech",
  "EdTech",
  "App Development",
  "Corporate Web",
];

export function DevelopmentProjects({ projects = developmentProjects }: { projects?: DevelopmentProject[] }) {
  const categories = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => {
      if (p.tags) {
        if (p.tags.includes("Real Estate")) {
          set.add("Real Estate");
        } else if (p.tags.includes("Fintech")) {
          set.add("Fintech");
        } else if (p.tags.includes("EdTech")) {
          set.add("EdTech");
        } else if (p.tags.includes("App Development") || p.tags.includes("Food Delivery")) {
          set.add("App Development");
        } else if (p.tags.includes("Corporate Web") || p.tags.includes("Industrial") || p.tags.includes("Agency")) {
          set.add("Corporate Web");
        }
      }
    });

    const available = filterOrder.filter((cat) => (cat === "All" ? true : set.has(cat)));
    return available.length > 1 ? available : ["All", ...Array.from(set)];
  }, [projects]);

  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter((project) => {
      if (!project.tags) return false;
      if (activeFilter === "Real Estate") {
        return project.tags.includes("Real Estate");
      }
      if (activeFilter === "Fintech") {
        return project.tags.includes("Fintech");
      }
      if (activeFilter === "EdTech") {
        return project.tags.includes("EdTech");
      }
      if (activeFilter === "App Development") {
        return project.tags.includes("App Development") || project.tags.includes("Food Delivery");
      }
      if (activeFilter === "Corporate Web") {
        return project.tags.includes("Corporate Web") || project.tags.includes("Industrial") || project.tags.includes("Agency");
      }
      return false;
    });
  }, [activeFilter, projects]);

  // Pagination and Auto-slide State
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  // Split into static first 5 and sliding remainder
  const staticProjects = useMemo(() => filteredProjects.slice(0, 5), [filteredProjects]);
  const slidingProjects = useMemo(() => filteredProjects.slice(5), [filteredProjects]);

  // Track responsive screen columns
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = useMemo(() => {
    return Math.ceil(slidingProjects.length / itemsPerPage);
  }, [slidingProjects, itemsPerPage]);

  const handleFilterChange = (category: string) => {
    setActiveFilter(category);
    setCurrentPage(0);
    setProgress(0);
  };

  // Auto-slide effect
  useEffect(() => {
    if (totalPages <= 1 || isHovered) return;

    const intervalTime = 70; // 70ms tick for progress smoothness
    const duration = 7000;   // 7 seconds
    const totalSteps = duration / intervalTime;
    let step = 0;

    const timer = setInterval(() => {
      step += 1;
      setProgress((step / totalSteps) * 100);

      if (step >= totalSteps) {
        setDirection(1);
        setCurrentPage((prev) => (prev + 1) % totalPages);
        step = 0;
        setProgress(0);
      }
    }, intervalTime);

    return () => {
      clearInterval(timer);
    };
  }, [totalPages, isHovered]);

  const handlePrev = () => {
    if (totalPages <= 1) return;
    setDirection(-1);
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    setProgress(0);
  };

  const handleNext = () => {
    if (totalPages <= 1) return;
    setDirection(1);
    setCurrentPage((prev) => (prev + 1) % totalPages);
    setProgress(0);
  };

  const handleDotClick = (pageIndex: number) => {
    if (pageIndex === currentPage) return;
    setDirection(pageIndex > currentPage ? 1 : -1);
    setCurrentPage(pageIndex);
    setProgress(0);
  };

  const visibleProjects = useMemo(() => {
    const startIndex = currentPage * itemsPerPage;
    return slidingProjects.slice(startIndex, startIndex + itemsPerPage);
  }, [slidingProjects, currentPage, itemsPerPage]);

  const getBentoSpan = (index: number, total: number) => {
    if (total >= 5) {
      if (index === 0) return "md:col-span-2 lg:col-span-2 aspect-[16/8.5] flex flex-col justify-end";
      return "col-span-1";
    }
    if (index === 0 && total >= 3) {
      return "md:col-span-2 lg:col-span-2 aspect-[16/8.5] flex flex-col justify-end";
    }
    return "col-span-1";
  };

  return (
    <section
      id="engineering"
      className="relative overflow-hidden bg-background px-6 py-24 text-foreground sm:px-8 lg:px-12 font-[family-name:var(--font-sans)] transition-colors duration-500"
    >
      <AnimatedBackground className="opacity-60" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.2, once: false }}
          variants={fadeBlur}
        >
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#0AD1BC] text-glow-green">
            Engineering Works
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl font-[family-name:var(--font-display)]">
            Engineering & Development Projects
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-text sm:text-lg">
            Production-ready websites, platforms, and digital products designed, developed, and delivered from concept to launch.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="mt-12 flex flex-wrap justify-center gap-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.2, once: false }}
          variants={staggerContainer}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              type="button"
              onClick={() => handleFilterChange(category)}
              variants={fadeBlur}
              className={`rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300 cursor-pointer ${
                activeFilter === category
                  ? "border-[#0AD1BC] bg-[#0AD1BC] text-slate-950 shadow-[0_0_15px_rgba(10,209,188,0.3)] font-extrabold"
                  : "border-surface-border bg-surface/40 text-muted-text hover:border-[#0AD1BC] hover:text-foreground"
              }`}
              aria-pressed={activeFilter === category}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* 1. Static Bento Grid (First 5 projects) */}
        {staticProjects.length > 0 && (
          <div className="mt-12">
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-[0.25em] text-[#0AD1BC]/80 font-mono">
              Featured Builds
            </h3>
            <motion.div
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.1, once: false }}
              variants={staggerContainer}
              layout
            >
              {staticProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  variants={fadeBlur}
                  layout
                  className={getBentoSpan(index, staticProjects.length)}
                >
                  <ProjectCard
                    project={{
                      id: project.id,
                      title: project.title,
                      category: project.category,
                      type: "development",
                      description: project.description,
                      image: project.image,
                      tags: project.tags,
                      tools: project.tools,
                      behanceUrl: project.behanceUrl,
                      liveUrl: project.liveUrl,
                    }}
                    featured={index === 0 && staticProjects.length >= 3}
                    variant="dev"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}

        {/* 2. Sliding Grid (Remaining projects) */}
        {slidingProjects.length > 0 && (
          <div className="mt-20 border-t border-surface-border pt-16">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-[#0AD1BC]/80 font-mono">
                  Extended Catalog
                </h3>
                <p className="text-sm text-muted-text mt-1 font-medium">
                  Discover more digital products & websites
                </p>
              </div>

              {/* Navigation Controls */}
              {totalPages > 1 && (
                <div className="flex items-center gap-3">
                  <button
                    onClick={handlePrev}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-surface-border bg-surface/60 text-muted-text transition-all hover:border-[#0AD1BC] hover:text-foreground hover:shadow-[0_0_15px_rgba(10,209,188,0.2)] cursor-pointer"
                    aria-label="Previous Page"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-surface-border bg-surface/60 text-muted-text transition-all hover:border-[#0AD1BC] hover:text-foreground hover:shadow-[0_0_15px_rgba(10,209,188,0.2)] cursor-pointer"
                    aria-label="Next Page"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>

            {/* Slider Container */}
            <div
              className="relative overflow-hidden min-h-[380px] pb-6"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <AnimatePresence mode="wait" initial={false} custom={direction}>
                <motion.div
                  key={currentPage}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                >
                  {visibleProjects.map((project) => (
                    <div key={project.id} className="col-span-1">
                      <ProjectCard
                        project={{
                          id: project.id,
                          title: project.title,
                          category: project.category,
                          type: "development",
                          description: project.description,
                          image: project.image,
                          tags: project.tags,
                          tools: project.tools,
                          behanceUrl: project.behanceUrl,
                          liveUrl: project.liveUrl,
                        }}
                        featured={false}
                        variant="dev"
                      />
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Pagination Indicators & Timer Progress */}
            {totalPages > 1 && (
              <div className="mt-12 flex flex-col items-center justify-center gap-4">
                {/* Dots */}
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleDotClick(idx)}
                      className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                        currentPage === idx
                          ? "w-8 bg-[#0AD1BC] shadow-[0_0_10px_rgba(10,209,188,0.5)]"
                          : "w-2.5 bg-muted-text/30 hover:bg-muted-text/60"
                      }`}
                      aria-label={`Go to page ${idx + 1}`}
                    />
                  ))}
                </div>

                {/* Progress bar timer */}
                <div className="relative w-48 h-[3px] rounded-full bg-surface-secondary overflow-hidden">
                  <div
                    className="absolute left-0 top-0 h-full bg-[#0AD1BC] transition-all duration-75"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="text-[10px] uppercase tracking-widest text-muted-text/60 font-bold">
                  {isHovered ? "Paused" : "Auto-sliding"}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
