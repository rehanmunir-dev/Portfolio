"use client";

import { motion, useReducedMotion } from "framer-motion";

export function AnimatedBackground({
  className = "",
}: {
  className?: string;
  tone?: "light" | "dark";
}) {
  const reduceMotion = useReducedMotion();
  const baseGradient = "radial-gradient(circle at 18% 18%, rgba(10, 209, 188, 0.07), transparent 45%), radial-gradient(circle at 82% 12%, rgba(10, 209, 188, 0.05), transparent 50%), linear-gradient(180deg, var(--background) 0%, var(--surface) 100%)";

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* Mesh gradient base */}
      <div className="absolute inset-0 transition-all duration-500" style={{ backgroundImage: baseGradient }} />

      {/* Modern fine grid lines (adaptive to light/dark via borders variable) */}
      <div
        className="absolute inset-0 bg-[size:60px_60px] opacity-40 transition-all duration-500"
        style={{
          backgroundImage: `linear-gradient(to right, var(--surface-border) 1px, transparent 1px), linear-gradient(to bottom, var(--surface-border) 1px, transparent 1px)`,
        }}
      />

      {/* Cybernetic Coordinate Plus Symbols at Grid Intersections (adaptive) */}
      <div className="absolute inset-0 opacity-12 bg-[size:120px_120px] bg-[position:-2px_-2px]"
           style={{
             backgroundImage: `radial-gradient(circle, #0AD1BC 1.5px, transparent 1.5px)`
           }}
      />

      {/* Ambient glowing fluid mesh light spheres (Framer motion) */}
      <motion.div
        className="absolute -left-36 -top-24 h-96 w-96 rounded-full bg-gradient-to-br from-[#0AD1BC]/12 via-[#0AD1BC]/6 to-transparent blur-[120px]"
        animate={reduceMotion ? undefined : { x: [0, 50, 0], y: [0, 30, 0] }}
        transition={
          reduceMotion ? undefined : { duration: 15, repeat: Infinity, ease: "easeInOut" }
        }
      />
      
      <motion.div
        className="absolute -right-36 top-1/4 h-[450px] w-[450px] rounded-full bg-gradient-to-br from-[#0AD1BC]/8 via-[#0AD1BC]/4 to-transparent blur-[130px]"
        animate={reduceMotion ? undefined : { x: [0, -40, 0], y: [0, 45, 0] }}
        transition={
          reduceMotion ? undefined : { duration: 18, repeat: Infinity, ease: "easeInOut" }
        }
      />

      <motion.div
        className="absolute left-1/3 bottom-10 h-80 w-80 rounded-full bg-gradient-to-br from-[#0AD1BC]/10 via-[#0AD1BC]/5 to-transparent blur-[100px]"
        animate={reduceMotion ? undefined : { x: [0, 35, 0], y: [0, -35, 0] }}
        transition={
          reduceMotion ? undefined : { duration: 13, repeat: Infinity, ease: "easeInOut" }
        }
      />
    </div>
  );
}
