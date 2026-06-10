"use client";

import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Download } from "lucide-react";
import { AnimatedBackground } from "@/components/AnimatedBackground";

const fadeUp = {
  hidden: { opacity: 0, y: 40, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  },
};

export function HeroSection() {
  const reduceMotion = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const enableMotion = !reduceMotion;

  const floatX = useSpring(useTransform(mouseX, [-500, 500], [-15, 15]), {
    stiffness: 50,
    damping: 30,
  });
  const floatY = useSpring(useTransform(mouseY, [-400, 400], [-15, 15]), {
    stiffness: 50,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (reduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-background px-4 pt-24 pb-16 text-foreground sm:min-h-[100dvh] sm:px-8 sm:pt-28 sm:pb-24 lg:px-12 lg:pt-32 lg:pb-32 font-[family-name:var(--font-sans)] transition-colors duration-500"
      onMouseMove={enableMotion ? handleMouseMove : undefined}
    >
      <AnimatedBackground className="opacity-90" />

      {/* Ambient glow orbs */}
      <motion.div
        className="pointer-events-none absolute h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(10,209,188,0.12)_0%,transparent_70%)] sm:h-[480px] sm:w-[480px] lg:h-[600px] lg:w-[600px]"
        style={enableMotion ? { x: floatX, y: floatY } : { transform: "none" }}
      />
      <div className="pointer-events-none absolute -top-32 -right-32 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(10,209,188,0.06)_0%,transparent_70%)] sm:-top-40 sm:-right-40 sm:h-[500px] sm:w-[500px]" />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center text-center">
        {/* Status badge */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-5 max-w-full inline-flex items-center justify-center gap-2 rounded-full border border-surface-border bg-surface/50 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#0AD1BC] shadow-sm backdrop-blur-md sm:mb-8 sm:px-4 sm:text-xs sm:tracking-[0.2em]"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0AD1BC] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#0AD1BC]" />
          </span>
          Open for new projects
        </motion.div>

        {/* Main headline — short and bold */}
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-[clamp(2.55rem,16vw,4.5rem)] font-extrabold tracking-tight md:text-7xl lg:text-8xl font-[family-name:var(--font-display)] leading-[1.05]"
        >
          <span className="text-foreground">Rehan</span>{" "}
          <span className="text-[#0AD1BC] text-glow-green">Munir</span>
        </motion.h1>

        {/* Role tagline */}
        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-5 text-base font-semibold tracking-wide text-muted-text sm:text-xl md:text-2xl"
        >
          Software Engineer{" "}
          <span className="text-[#0AD1BC] font-bold">&</span>{" "}
          UI/UX Designer
        </motion.p>

        {/* One-liner */}
        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-4 max-w-xl px-1 text-sm leading-relaxed text-muted-text/80 sm:px-0 sm:text-base"
        >
          I help teams ship premium web products with strong UX and clean engineering.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mt-8 flex w-full max-w-md flex-wrap items-center justify-center gap-3 sm:mt-10 sm:max-w-none sm:gap-4"
        >
          <a
            className="group flex w-full items-center justify-center gap-2.5 rounded-full bg-[#0AD1BC] px-5 text-[11px] font-bold uppercase tracking-[0.16em] text-background shadow-[0_10px_30px_rgba(10,209,188,0.3)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(10,209,188,0.5)] cursor-pointer sm:inline-flex sm:w-auto sm:px-8 sm:text-xs sm:tracking-widest h-12 sm:h-13"
            href="#contact"
          >
            Start a Project
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            className="flex w-full items-center justify-center gap-2.5 rounded-full border border-surface-border bg-surface/40 px-5 text-[11px] font-bold uppercase tracking-[0.16em] text-foreground shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#0AD1BC] hover:bg-surface/75 cursor-pointer backdrop-blur-md sm:inline-flex sm:w-auto sm:px-8 sm:text-xs sm:tracking-widest h-12 sm:h-13"
            href="#projects"
          >
            View Projects
            <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
          </a>
          <a
            className="flex w-full items-center justify-center gap-2.5 rounded-full border border-surface-border bg-surface/40 px-5 text-[11px] font-bold uppercase tracking-[0.16em] text-foreground shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#0AD1BC] hover:bg-surface/75 cursor-pointer backdrop-blur-md sm:inline-flex sm:w-auto sm:px-8 sm:text-xs sm:tracking-widest h-12 sm:h-13"
            href="/Rehan_Munir_Cv (1).pdf"
            download="Rehan_Munir_Cv.pdf"
          >
            <Download className="h-4 w-4 text-[#0AD1BC]" />
            Resume
          </a>
        </motion.div>

        {/* Tech stack pills — compact */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="mt-8 sm:mt-12 flex flex-wrap items-center justify-center gap-2"
        >
          {["React", "Next.js", "TypeScript", "Tailwind", "Figma", "Node.js"].map(
            (tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + i * 0.06 }}
                className="rounded-full border border-surface-border bg-surface/30 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-text/70 backdrop-blur-sm transition-all duration-300 hover:border-[#0AD1BC]/50 hover:text-[#0AD1BC]"
              >
                {tech}
              </motion.span>
            )
          )}
        </motion.div>

        {/* Stats row — inline & minimal */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mt-10 sm:mt-16 flex flex-wrap items-center justify-center gap-6 sm:gap-12 sm:flex-nowrap"
        >
          {[
            { value: "27+", label: "Projects" },
            { value: "3+", label: "Years" },
            { value: "100%", label: "Satisfaction" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold tracking-tight text-[#0AD1BC] font-mono sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.2em] text-muted-text">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 hidden flex-col items-center gap-2 sm:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div
            animate={reduceMotion ? undefined : { y: [0, 8, 0] }}
            transition={
              reduceMotion ? undefined : { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-muted-text/50">
            Scroll
          </span>
          <span className="flex h-8 w-5 items-start justify-center rounded-full border border-surface-border p-1">
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-[#0AD1BC]"
              animate={reduceMotion ? undefined : { y: [0, 12, 0] }}
              transition={
                reduceMotion ? undefined : { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }
            />
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
