"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { type KeyboardEvent, useState } from "react";

export type Project = {
  id: string;
  title: string;
  category: string;
  type?: "development" | "uiux";
  description: string;
  image: string;
  tags?: string[];
  tools?: string[];
  behanceUrl: string;
  liveUrl?: string;
};

function getInitials(value: string) {
  return value
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function ProjectCard({
  project,
  featured = false,
  variant = "dev",
}: {
  project: Project;
  featured?: boolean;
  variant?: "uiux" | "dev";
}) {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isUiux = variant === "uiux" || project.type === "uiux";
  const cardHref = isUiux ? project.behanceUrl : project.liveUrl || project.behanceUrl;
  const fallbackImage = isUiux
    ? "/ui%20ux/cafe%20farhan.jpg"
    : "/projects%20development/Develoscape-05-31-2026_06_03_PM.png";
  const safeImage = project.image.startsWith("/projects/")
    ? fallbackImage
    : project.image;

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const openProject = () => {
    if (!cardHref) return;
    window.open(cardHref, "_blank", "noopener,noreferrer");
  };

  const handleCardKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    openProject();
  };

  const combinedChips = Array.from(
    new Set([...(project.tags || []), ...(project.tools || [])])
  ).slice(0, 5);

  const imageSizes = featured
    ? "(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 66vw"
    : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw";

  return (
    <motion.article
      role={cardHref ? "link" : undefined}
      tabIndex={cardHref ? 0 : undefined}
      aria-label={`Open ${project.title}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={openProject}
      onKeyDown={handleCardKeyDown}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl sm:rounded-[2rem] border p-3.5 transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(10,209,188,0.18)] font-[family-name:var(--font-sans)] sm:p-5 ${
        isHovered
          ? "border-[#0AD1BC] shadow-[0_0_30px_rgba(10,209,188,0.25)] bg-card-bg"
          : "border-surface-border bg-surface/50"
      } ${cardHref ? "cursor-pointer" : ""} backdrop-blur-md h-full`}
    >
      {/* Dynamic ambient background glow on hover */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0AD1BC]/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ transform: "translateZ(-20px)" }}
      />

      <div className="relative z-10 flex flex-col h-full justify-between">
        {/* Project Image Container */}
        <div>
          <div className="relative aspect-[16/11] w-full overflow-hidden rounded-xl border border-surface-border bg-surface-secondary sm:aspect-[16/10] sm:rounded-[1.5rem]">
            {!imageError ? (
              <Image
                src={safeImage}
                alt={project.title}
                fill
                sizes={imageSizes}
                quality={featured ? 82 : 72}
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-surface to-surface-secondary">
                <span className="text-3xl font-bold tracking-wider text-muted-text opacity-40">
                  {getInitials(project.title)}
                </span>
              </div>
            )}

            {/* Premium Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Category Badge */}
            <div className="absolute left-3 top-3 max-w-[calc(100%-1.5rem)] rounded-full border border-[#0AD1BC]/30 bg-background/90 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-[#0AD1BC] sm:left-4 sm:top-4 sm:px-3 sm:text-[10px]">
              {project.category}
            </div>
          </div>

          {/* Project Details */}
          <div className="mt-4 sm:mt-5">
            <h3 className="line-clamp-2 text-lg font-bold tracking-tight text-foreground transition-colors duration-300 ease-out group-hover:text-[#0AD1BC] sm:text-xl">
              {project.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-text line-clamp-3 sm:mt-2.5">
              {project.description}
            </p>

            {/* Tag/Tool Chips */}
            {combinedChips.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {combinedChips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-surface-border bg-surface-secondary/40 px-2 py-0.5 text-[10px] font-semibold text-muted-text transition-colors duration-300 group-hover:border-[#0AD1BC]/20 group-hover:text-foreground sm:px-2.5 sm:text-[11px]"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Buttons / CTAs */}
        <div className="mt-5 flex flex-wrap items-center gap-2.5 border-t border-surface-border pt-4 sm:mt-6 sm:gap-3">
          {/* Behance Button */}
          <a
            href={project.behanceUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex min-h-10 w-full items-center justify-center gap-2 rounded-full px-4 py-2 text-[11px] font-bold tracking-wider uppercase transition-all duration-300 shadow-md cursor-pointer sm:inline-flex sm:w-auto sm:text-xs ${
              isUiux
                ? "bg-[#0AD1BC] text-slate-950 hover:bg-[#0AD1BC]/90 hover:shadow-[0_0_15px_rgba(10,209,188,0.4)]"
                : "border border-surface-border bg-surface text-foreground hover:border-[#0AD1BC] hover:text-[#0AD1BC]"
            }`}
            aria-label={`Open ${project.title} on Behance`}
            onClick={(event) => event.stopPropagation()}
          >
            <span>Behance</span>
            <ExternalLink className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          {/* Live Site Button */}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-10 w-full items-center justify-center gap-2 rounded-full bg-[#0AD1BC] px-4 py-2 text-[11px] font-bold tracking-wider uppercase text-slate-950 transition-all duration-300 shadow-md hover:bg-[#0AD1BC]/90 hover:shadow-[0_0_15px_rgba(10,209,188,0.4)] cursor-pointer sm:inline-flex sm:w-auto sm:text-xs"
              aria-label={`Open ${project.title} Live`}
              onClick={(event) => event.stopPropagation()}
            >
              <span>Live Site</span>
              <motion.div
                animate={isHovered ? { x: [0, 4, 0] } : {}}
                transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
              >
                <ArrowUpRight className="h-3.5 w-3.5" />
              </motion.div>
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
