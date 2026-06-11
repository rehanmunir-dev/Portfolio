"use client";

import Image from "next/image";
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { ArrowUp, Menu, X, Briefcase, GraduationCap, ExternalLink, Mail, Phone, MapPin, Sparkles, Send, Sun, Moon } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { HeroSection } from "@/components/HeroSection";
import { AllProjects } from "@/components/AllProjects";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Design", href: "#design" },
  { label: "Contact", href: "#contact" },
];

const skills = {
  Languages: ["JavaScript ES6+", "TypeScript", "HTML5", "CSS3"],
  "Frameworks & Tools": [
    "React.js",
    "Next.js",
    "Tailwind CSS",
    "Node.js",
    "Firebase",
    "Supabase",
    "REST APIs",
    "Figma",
    "Git",
    "GitHub",
    "Vite",
  ],
  Methods: [
    "Agile/Scrum",
    "Component-Driven Development",
    "Design-to-Code",
    "RBAC",
    "System Design",
    "UI/UX Design",
    "Responsive Design",
    "Frontend Architecture",
  ],
};

const experiences = [
  {
    company: "Beacon Techh",
    role: "Software Engineer & UI/UX Designer",
    dates: "Aug 2025 - Present",
    place: "Islamabad",
    points: [
      "I build web products end-to-end — from wireframe to production — using React, TypeScript, Tailwind CSS, and Figma.",
      "I designed and built shared frontend component libraries that the whole team uses for consistent, scalable delivery.",
      "I own the design-to-code workflow here, making sure what ships actually looks and feels like what was designed.",
      "I contribute to architecture decisions, state management patterns, and long-term frontend planning.",
    ],
    tags: ["React", "TypeScript", "Tailwind CSS", "Figma", "GitHub", "System Design"],
  },
  {
    company: "Fiverr",
    role: "Freelance Software Engineer & UI/UX Designer",
    dates: "Mar 2024 - Present",
    place: "Remote",
    points: [
      "I've delivered 20+ projects for international clients — SaaS apps, e-commerce stores, portfolios, dashboards, and service sites.",
      "I handle everything myself: scoping, Figma design, development, testing, and handoff. No middlemen.",
      "My clients keep coming back because I communicate clearly, care about UX details, and actually hit deadlines.",
    ],
    tags: ["Next.js", "Figma", "Tailwind CSS", "Node.js", "Firebase", "Supabase", "REST APIs"],
  },
  {
    company: "Human Appeal Pakistan",
    role: "Web Developer Intern",
    dates: "Feb 2023 - Apr 2023",
    place: "Islamabad",
    points: [
      "I built and maintained web interfaces using HTML, CSS, and JavaScript.",
      "I got hands-on with production workflows, code reviews, and real deployment practices alongside senior developers.",
    ],
    tags: ["HTML5", "CSS3", "JavaScript", "Git", "UI Design"],
  },
];

const education = [
  {
    school: "Capital University of Science & Technology",
    degree: "BSc Computer Science",
    dates: "Feb 2022 - Jul 2026",
  },
  {
    school: "Army Public School APSACS",
    degree: "FSc Pre-Engineering",
    dates: "Jan 2020 - Jan 2022",
  },
];

const contactEmail = "rehanmunir034455@gmail.com";

const socialLinks = [
  { label: "LinkedIn", href: "https://linkedin.com/in/rehanmunir343" },
  { label: "GitHub", href: "https://github.com/rehanmunir-dev" },
  { label: "Behance", href: "https://www.behance.net/rehanmunir2" },
  { label: "Email", href: `mailto:${contactEmail}` },
];

const contactLinks = [
  { label: "Email", href: `mailto:${contactEmail}` },
  { label: "LinkedIn", href: "https://linkedin.com/in/rehanmunir343" },
  { label: "GitHub", href: "https://github.com/rehanmunir-dev" },
  { label: "Behance", href: "https://www.behance.net/rehanmunir2" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

function SectionHeader({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className="relative mx-auto mb-10 max-w-3xl px-1 text-center sm:mb-16 sm:px-0"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
      variants={fadeUp}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Visual cyber decoration */}
      <div className="absolute left-1/2 -top-6 -translate-x-1/2 flex items-center gap-1.5 opacity-50">
        <span className="h-1 w-1 bg-[#0AD1BC] rounded-full animate-pulse" />
        <span className="h-1.5 w-1.5 bg-[#0AD1BC]" />
        <span className="text-[9px] font-mono text-[#0AD1BC] uppercase tracking-widest">[ console.log ]</span>
        <span className="h-1.5 w-1.5 bg-[#0AD1BC]" />
        <span className="h-1 w-1 bg-[#0AD1BC] rounded-full animate-pulse" />
      </div>

      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#0AD1BC] text-glow-green sm:text-xs sm:tracking-[0.3em]">
        {eyebrow}
      </p>
      <h2
        className="mt-3 text-2xl font-extrabold tracking-tight text-foreground font-[family-name:var(--font-display)] sm:text-4xl"
      >
        {title}
      </h2>
      <p className="mt-4 text-sm sm:text-base leading-relaxed text-muted-text font-medium">
        {children}
      </p>
    </motion.div>
  );
}

export function Portfolio() {
  const [active, setActive] = useState("about");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [contactStatus, setContactStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [contactMessage, setContactMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });
  const navY = useSpring(useTransform(scrollY, [0, 120], [6, 0]), {
    stiffness: 160,
    damping: 25,
  });
  const navShadow = useTransform(
    scrollY,
    [0, 120],
    [
      "0 0 0 rgba(0, 0, 0, 0)",
      "0 18px 40px rgba(0, 0, 0, 0.22)",
    ],
  );

  // Theme Sync Side-Effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    const updateActive = () => {
      const viewportMid = window.scrollY + window.innerHeight * 0.4;

      let closest = "";
      let closestDist = Infinity;

      for (const item of navItems) {
        const el = document.querySelector(item.href) as HTMLElement | null;
        if (!el) continue;
        const mid = el.offsetTop + el.offsetHeight / 2;
        const dist = Math.abs(mid - viewportMid);
        if (dist < closestDist) {
          closestDist = dist;
          closest = item.href.slice(1);
        }
      }

      if (closest) setActive(closest);
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    return () => window.removeEventListener("scroll", updateActive);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 600);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const year = useMemo(() => new Date().getFullYear(), []);

  async function handleContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!formRef.current) return;

    setContactStatus("sending");
    setContactMessage("");

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

    try {
      await emailjs.sendForm(serviceId, templateId, formRef.current, { publicKey });
      formRef.current.reset();
      setContactStatus("success");
      setContactMessage("Message sent! I'll get back to you soon.");
    } catch (error) {
      console.error("EmailJS error:", error);
      setContactStatus("error");
      setContactMessage("Something went wrong. Please email me directly at rehanmunir034455@gmail.com");
    }
  }

  function handleBackToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-[#0AD1BC] focus:px-4 focus:py-2 focus:text-xs focus:font-bold focus:uppercase focus:tracking-widest focus:text-slate-950"
      >
        Skip to main content
      </a>
      <main
        id="content"
        className="min-h-screen overflow-hidden bg-background text-foreground font-[family-name:var(--font-sans)] transition-colors duration-500"
      >
      {/* Scroll Progress Line */}
      <motion.div
        className="fixed left-0 right-0 top-0 z-[60] h-1 origin-left bg-gradient-to-r from-[#0AD1BC] via-[#0AD1BC]/60 to-[#8B5CF6]/50"
        style={{ scaleX }}
      />

      {/* Floating Glassmorphic Capsule Navbar */}
      <motion.nav
        className="fixed left-0 right-0 top-2 z-50 mx-auto w-[min(1200px,calc(100%-16px))] rounded-full border border-surface-border bg-card-bg px-3 py-2.5 backdrop-blur-xl transition-colors duration-300 sm:top-4 sm:w-[min(1200px,calc(100%-32px))] sm:px-4 sm:py-3"
        style={{ y: navY, boxShadow: navShadow }}
        aria-label="Primary"
      >
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          <a className="flex items-center gap-2.5 group" href="#top" aria-label="Rehan Munir home">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[#0AD1BC] text-xs font-extrabold text-background shadow-[0_0_15px_rgba(10,209,188,0.3)] transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(10,209,188,0.6)] sm:h-10 sm:w-10 sm:text-sm">
              RM
            </span>
            <span className="hidden text-sm font-bold uppercase tracking-wider text-foreground sm:block">
              Rehan Munir
            </span>
          </a>

          {/* Desktop Navigation Link Pills with sliding bubble */}
          <div className="relative hidden items-center gap-1 rounded-full bg-surface-secondary/40 p-1 lg:flex border border-surface-border">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                aria-current={active === item.href.slice(1) ? "page" : undefined}
                className={`relative rounded-full px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors duration-300 z-10 ${
                  active === item.href.slice(1)
                    ? "text-slate-950 font-extrabold"
                    : "text-muted-text hover:text-foreground"
                }`}
              >
                {active === item.href.slice(1) && (
                  <motion.span
                    layoutId="activeNavBubble"
                    className="absolute inset-0 -z-10 rounded-full bg-[#0AD1BC] shadow-[0_0_15px_rgba(10,209,188,0.4)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {item.label}
              </a>
            ))}
          </div>

          {/* Action Button, Dark/Light Toggle & Mobile Nav Trigger */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Dark & Light mode toggle button styled exactly to requirements */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              type="button"
              aria-pressed={darkMode}
              className={`relative flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300 shadow-sm cursor-pointer hover:scale-105 active:scale-95 z-50 sm:h-10 sm:w-10 ${
                darkMode
                  ? "bg-black border-[#0AD1BC]/30 text-[#0AD1BC] hover:border-[#0AD1BC] hover:shadow-[0_0_15px_rgba(10,209,188,0.35)]"
                  : "bg-white border-[#0AD1BC]/30 text-[#0AD1BC] hover:border-[#0AD1BC] hover:shadow-[0_0_15px_rgba(10,209,188,0.2)]"
              }`}
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            <a
              className="hidden rounded-full bg-[#0AD1BC] px-5 py-2.5 text-xs font-extrabold uppercase tracking-widest text-slate-950 shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(10,209,188,0.4)] sm:inline-flex"
              href="#contact"
            >
              Hire Me
            </a>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-surface-border bg-surface text-foreground hover:bg-surface-secondary transition-colors lg:hidden"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              id="mobile-nav"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 right-0 top-14 z-40 mx-auto max-h-[calc(100svh-5rem)] w-full overflow-y-auto rounded-3xl border border-surface-border bg-surface/95 p-4 shadow-2xl backdrop-blur-2xl flex flex-col gap-2.5 sm:top-16 sm:p-6 sm:gap-3 lg:hidden"
            >
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-current={active === item.href.slice(1) ? "page" : undefined}
                  className={`rounded-2xl px-4 py-3 text-sm font-bold uppercase tracking-widest transition-all ${
                    active === item.href.slice(1)
                      ? "bg-[#0AD1BC] text-slate-950"
                      : "text-muted-text hover:bg-surface-secondary hover:text-foreground"
                  }`}
                >
                  {item.label}
                </a>
              ))}
              <a
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-2 text-center rounded-2xl bg-[#0AD1BC] py-3.5 text-sm font-bold uppercase tracking-widest text-slate-950"
                href="#contact"
              >
                Hire Me
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <section id="about" className="relative bg-background px-4 py-14 sm:py-24 sm:px-8 lg:px-12 border-t border-surface-border transition-colors duration-500">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            className="rounded-3xl border border-surface-border bg-surface/30 p-4 text-foreground shadow-2xl backdrop-blur-xl flex flex-col justify-between sm:rounded-[2.25rem] sm:p-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            <div>
              <div className="flex items-center gap-3 border-b border-surface-border pb-5 sm:gap-4 sm:pb-6">
                <div className="relative h-16 w-16 flex-none overflow-hidden rounded-2xl border border-[#0AD1BC]/30 shadow-[0_10px_30px_rgba(10,209,188,0.2)] sm:h-20 sm:w-20 sm:rounded-3xl">
                  <Image
                    src="/profile pic.webp"
                    alt="Rehan Munir"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#0AD1BC] text-glow-green sm:text-xs sm:tracking-[0.3em]">
                    About Me
                  </p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-muted-text sm:text-xs">
                    Software Engineer & UI/UX Designer
                  </p>
                </div>
              </div>
              <h2 className="mt-6 text-2xl font-extrabold tracking-tight text-foreground sm:text-4xl leading-tight">
                I build interfaces that have both engineering depth and real design taste.
              </h2>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              {[
                ["20+", "Projects Delivered", "SaaS, web apps & systems"],
                ["3+", "Years Experience", "UI/UX & software craft"],
                ["End-to-End", "Digital Delivery", "Design, code & deploy"],
                ["Islamabad", "Based In", "Working with clients worldwide"],
              ].map(([value, label, desc]) => (
                <motion.div
                  key={label}
                  className="relative rounded-2xl border border-surface-border bg-background/65 p-3.5 sm:p-5 shadow-inner transition-all hover:border-[#0AD1BC]/30"
                  whileHover={{ y: -3 }}
                >
                  <div className="absolute right-3.5 top-3.5 h-1.5 w-1.5 rounded-full bg-[#0AD1BC] opacity-35 animate-pulse" />
                  <p className="text-2xl font-bold font-mono tracking-tight text-[#0AD1BC] text-glow-green">{value}</p>
                  <p className="mt-1.5 text-[11px] font-extrabold uppercase tracking-wider text-foreground">{label}</p>
                  <p className="mt-1 text-[9px] font-bold text-muted-text leading-tight">{desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="relative flex flex-col justify-center rounded-3xl border border-surface-border bg-surface/15 p-4 shadow-xl backdrop-blur-sm sm:rounded-[2.25rem] sm:p-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            transition={{ delay: 0.1 }}
          >
            {/* Coordinate Crosshairs Decoration */}
            <div className="absolute left-4 top-4 text-[9px] font-mono text-[#0AD1BC]/30 font-bold select-none sm:left-6 sm:top-6 sm:text-[10px]">[ X: 142 // Y: 980 ]</div>
            <div className="absolute right-4 bottom-4 text-[9px] font-mono text-[#0AD1BC]/30 font-bold select-none sm:right-6 sm:bottom-6 sm:text-[10px]">[ Coder-Designer ]</div>

            <p className="text-base sm:text-lg leading-relaxed text-foreground/80 font-semibold">
              I'm a software engineer and UI/UX designer based in Islamabad. I
              build web products end-to-end — starting from wireframes and user
              flows all the way through component architecture, responsive
              interfaces, and production deployment.
            </p>
            <p className="mt-6 text-base sm:text-lg leading-relaxed text-foreground/80 font-semibold">
              I care about clean systems, solid engineering, and sharp visual
              detail. The goal every time is software that feels easy to use,
              holds up at scale, and actually represents the brand well.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative overflow-hidden bg-background px-4 py-14 sm:py-24 sm:px-8 lg:px-12 border-t border-surface-border transition-colors duration-500">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(10,209,188,0.1),transparent_50%)] pointer-events-none" />

        <div className="relative z-10">
          <SectionHeader eyebrow="Technical Skills" title="Tools I actually use on real projects.">
            From typed frontend code to design systems and production workflows —
            this is what I reach for when building things that ship.
          </SectionHeader>

          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">
            {Object.entries(skills).map(([group, items], groupIndex) => (
              <motion.div
                key={group}
                className="relative rounded-3xl border border-surface-border bg-surface/30 p-4 shadow-md backdrop-blur-md transition-all duration-300 hover:border-[#0AD1BC]/45 sm:p-6 md:p-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={fadeUp}
                transition={{ delay: groupIndex * 0.08 }}
              >
                {/* Console card indicator */}
                <div className="mb-5 flex items-center justify-between gap-3 border-b border-surface-border pb-3">
                  <h3 className="text-xs font-extrabold uppercase tracking-widest text-foreground">{group}</h3>
                  <span className="text-[10px] font-mono text-[#0AD1BC]/40 font-bold">[ 0{groupIndex + 1} ]</span>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {items.map((skill, index) => (
                    <motion.span
                      key={skill}
                      className="skill-pill rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all"
                      initial={{ opacity: 0, scale: 0.92 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.02 * index }}
                      whileHover={{ y: -3 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="relative overflow-hidden bg-background px-4 py-14 sm:py-24 sm:px-8 lg:px-12 border-t border-surface-border transition-colors duration-500">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_35%,rgba(10,209,188,0.08),transparent_50%)] pointer-events-none" />

        <div className="relative z-10">
          <SectionHeader eyebrow="Experience" title="Where I've worked and what I've shipped.">
            I've worked across a product company, freelance clients worldwide, and a nonprofit —
            always focused on getting the work done well.
          </SectionHeader>

          <div className="relative mx-auto max-w-4xl pl-6 sm:pl-10">
            {/* Glowing pathway track */}
            <div className="absolute left-[9px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-[#0AD1BC] via-[#0AD1BC]/40 to-transparent shadow-[0_0_10px_rgba(10,209,188,0.25)] sm:left-[17px]" />

            <div className="space-y-12">
              {experiences.map((experience, index) => (
                <motion.article
                  key={experience.company}
                  className="relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {/* Waypoint glowing marker */}
                  <motion.span
                    className="absolute -left-[25px] top-1.5 h-5 w-5 rounded-full border-4 border-background bg-surface sm:-left-[34px] sm:h-6 sm:w-6"
                    whileInView={{
                      backgroundColor: "#0AD1BC",
                      borderColor: "var(--background)",
                      boxShadow: "0 0 20px #0AD1BC",
                      scale: 1.15,
                    }}
                    viewport={{ once: false, amount: "all" }}
                    transition={{ duration: 0.4 }}
                  />

                  {/* Card content */}
                  <div className="rounded-3xl border border-surface-border bg-surface/30 p-4 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-[#0AD1BC]/30 hover:shadow-xl hover:shadow-[#0AD1BC]/5 sm:p-6 md:p-8">
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                      <div>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0AD1BC]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#0AD1BC] mb-2">
                          <Briefcase className="h-3 w-3" />
                          {experience.dates}
                        </span>
                        <h3 className="text-lg font-extrabold tracking-tight text-foreground sm:text-2xl">{experience.company}</h3>
                        <p className="mt-1 text-sm font-semibold text-[#0AD1BC]">{experience.role}</p>
                      </div>

                      <div className="flex w-fit items-center gap-1 rounded-xl border border-surface-border bg-surface-secondary px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-text sm:text-xs">
                        <MapPin className="h-3.5 w-3.5 text-[#0AD1BC]" />
                        {experience.place}
                      </div>
                    </div>

                    {/* Timeline Job Points */}
                    <ul className="mt-6 space-y-3.5 text-sm leading-relaxed text-muted-text font-semibold border-t border-surface-border pt-5">
                      {experience.points.map((point) => (
                        <li key={point} className="flex items-start gap-3">
                          <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[#0AD1BC]" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Timeline Job Tags */}
                    {experience.tags && (
                      <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-surface-border">
                        {experience.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-lg border border-surface-border bg-background/85 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-text"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Unified Projects Section */}
      <AllProjects />

      {/* Education Section */}
      <section id="education" className="relative overflow-hidden bg-background px-4 py-14 sm:py-24 sm:px-8 lg:px-12 border-t border-surface-border transition-colors duration-500">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_75%,rgba(10,209,188,0.08),transparent_50%)] pointer-events-none" />

        <div className="relative z-10">
          <SectionHeader eyebrow="Education" title="Where I studied and how I applied it.">
            I studied Computer Science at CUST while building real projects on the side —
            so the theory and the practice happened at the same time.
          </SectionHeader>

          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
            {education.map((item, index) => (
              <motion.div
                key={item.school}
                className="relative rounded-3xl border border-surface-border bg-surface/30 p-4 shadow-md backdrop-blur-md transition-all duration-300 hover:border-[#0AD1BC]/35 sm:p-7 md:p-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
                transition={{ delay: index * 0.1 }}
              >
                <div className="mb-5 flex flex-col gap-3 border-b border-surface-border pb-4 sm:flex-row sm:items-center sm:justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0AD1BC]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#0AD1BC]">
                    <GraduationCap className="h-3.5 w-3.5" />
                    {item.dates}
                  </span>
                  <span className="text-[10px] font-mono text-[#0AD1BC]/30 font-bold">[ BSC / EDU ]</span>
                </div>

                <h3 className="text-xl font-extrabold text-foreground tracking-tight">{item.school}</h3>
                <p className="mt-2.5 text-sm font-semibold text-[#0AD1BC]">{item.degree}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Design Section */}
      <section id="design" className="relative overflow-hidden bg-background px-4 py-14 sm:py-24 sm:px-8 lg:px-12 border-t border-surface-border transition-colors duration-500">
        <div className="relative z-10">
          <SectionHeader eyebrow="Design / Portfolio Links" title="My work lives across a few places.">
            You can find my development and design work on the platforms
            clients already use to evaluate builders like me.
          </SectionHeader>

          <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                className="relative flex flex-col items-center justify-center rounded-[1.5rem] border border-surface-border bg-surface/35 p-6 text-center font-bold text-foreground shadow-md backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-[#0AD1BC] hover:shadow-[0_15px_30px_rgba(10,209,188,0.2)]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
              >
                <span className="text-xs uppercase tracking-widest text-muted-text mb-1">Explore</span>
                <span className="text-lg font-extrabold text-foreground flex items-center gap-1.5 group">
                  {link.label}
                  <ExternalLink className="h-4 w-4 text-[#0AD1BC] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative overflow-hidden bg-background px-4 py-14 sm:py-24 sm:px-8 lg:px-12 border-t border-surface-border transition-colors duration-500">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(10,209,188,0.06),transparent_50%)] pointer-events-none" />

        <div className="relative z-10 mx-auto grid max-w-7xl gap-8 rounded-3xl border border-surface-border bg-surface/30 p-4 shadow-2xl backdrop-blur-xl sm:p-6 md:p-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#0AD1BC] text-glow-green">
                Get In Touch
              </p>
              <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-foreground sm:text-4xl leading-tight">
                Got a product, website, or interface you want to get right?
              </h2>
              <p className="mt-5 text-sm sm:text-base leading-relaxed text-muted-text font-semibold">
                Drop me a message and I'll help take it from rough idea to
                something sharp, clean, and ready to ship.
              </p>

              <div className="mt-8 flex flex-wrap gap-2.5">
                {contactLinks.map((link) => (
                  <a
                    key={link.label}
                    className="rounded-xl border border-surface-border bg-background/80 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-muted-text shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:border-[#0AD1BC] hover:text-foreground"
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-8 sm:mt-12 space-y-4 border-t border-surface-border pt-8 text-sm font-semibold text-muted-text">
              <div className="flex items-center gap-3">
                <MapPin className="h-4.5 w-4.5 text-[#0AD1BC]" />
                <span>Islamabad, Pakistan</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4.5 w-4.5 text-[#0AD1BC]" />
                <a href={`mailto:${contactEmail}`} className="break-all transition-colors hover:text-foreground">
                  {contactEmail}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4.5 w-4.5 text-[#0AD1BC]" />
                <a href="tel:+923245482428" className="hover:text-foreground transition-colors">
                  +92 324 5482428
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Sparkles className="h-4.5 w-4.5 text-[#0AD1BC]" />
                <a href="https://rehanmunirportfolio.vercel.app" target="_blank" rel="noreferrer" className="break-all transition-colors hover:text-foreground">
                  rehanmunirportfolio.vercel.app
                </a>
              </div>
            </div>
          </div>

          <form ref={formRef} className="flex flex-col gap-4.5" onSubmit={handleContact}>
            <div className="relative">
              <label className="sr-only" htmlFor="contact-name">
                Name
              </label>
              <input
                id="contact-name"
                name="from_name"
                autoComplete="name"
                className="form-field"
                placeholder="Your name"
                required
              />
            </div>

            <div className="relative">
              <label className="sr-only" htmlFor="contact-email">
                Email address
              </label>
              <input
                id="contact-email"
                name="from_email"
                autoComplete="email"
                className="form-field"
                placeholder="Email address"
                type="email"
                required
              />
            </div>

            <div className="relative">
              <label className="sr-only" htmlFor="contact-project-type">
                Project type
              </label>
              <input
                id="contact-project-type"
                name="project_type"
                autoComplete="organization"
                className="form-field"
                placeholder="Project type (e.g., SaaS, Mobile App, Web Design)"
              />
            </div>

            <div className="relative">
              <label className="sr-only" htmlFor="contact-message">
                Project details
              </label>
              <textarea
                id="contact-message"
                name="message"
                autoComplete="off"
                className="form-field min-h-36 resize-none"
                placeholder="Tell me about the project, timelines, & scope"
                required
              />
            </div>

            <button
              className="group flex h-12 items-center justify-center gap-2.5 rounded-full bg-[#0AD1BC] text-[11px] font-bold uppercase tracking-[0.16em] text-slate-950 shadow-[0_12px_30px_rgba(10,209,188,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(10,209,188,0.45)] cursor-pointer disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 sm:h-13 sm:text-xs sm:tracking-widest"
              type="submit"
              disabled={contactStatus === "sending"}
            >
              {contactStatus === "sending" ? "Sending..." : "Send Inquiry"}
              <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            {contactMessage && (
              <p
                className={`rounded-2xl border px-4 py-3 text-sm font-semibold ${
                  contactStatus === "success"
                    ? "border-[#0AD1BC]/35 bg-[#0AD1BC]/10 text-[#0AD1BC]"
                    : "border-red-500/35 bg-red-500/10 text-red-300"
                }`}
                role="status"
                aria-live="polite"
              >
                {contactMessage}
              </p>
            )}
          </form>
        </div>
      </section>

      {/* Floating Action Button Bar */}
      <div className="fixed bottom-3 right-3 z-50 flex flex-col gap-2 sm:bottom-6 sm:right-6 sm:gap-3">
        <a
          className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#0AD1BC] text-slate-950 shadow-[0_12px_30px_rgba(10,209,188,0.35)] transition-all duration-300 hover:-translate-y-1 sm:h-12 sm:w-12"
          href="https://wa.me/923245482428"
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
        >
          <FaWhatsapp className="h-5 w-5" />
        </a>
        {showBackToTop && (
          <motion.button
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-surface-border/70 bg-surface-secondary/90 text-foreground shadow-[0_10px_25px_rgba(15,23,42,0.18)] backdrop-blur-md cursor-pointer transition-all duration-300 hover:border-[#0AD1BC] hover:text-[#0AD1BC] hover:shadow-[0_14px_30px_rgba(15,23,42,0.22)] sm:h-12 sm:w-12"
            type="button"
            onClick={handleBackToTop}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            aria-label="Back to top"
          >
            <ArrowUp className="h-5 w-5 animate-pulse" />
          </motion.button>
        )}
      </div>

      {/* Footer */}
      <footer className="relative overflow-hidden border-t border-surface-border bg-background px-4 py-8 transition-colors duration-500 sm:px-8 sm:py-12 lg:px-12">
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-[#0AD1BC] via-[#0AD1BC]/60 to-[#8B5CF6]/50" />

        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 text-[10px] font-bold uppercase tracking-[0.16em] text-muted-text sm:text-xs sm:tracking-widest md:flex-row md:items-center">
          <p>© {year} Rehan Munir. Designed & built by me.</p>
          <div className="flex flex-wrap gap-3 sm:gap-5">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                className="transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
      </main>
    </>
  );
}
