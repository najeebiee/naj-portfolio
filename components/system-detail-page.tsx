"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { systems, type SystemProject } from "@/data/systems";
import { Navbar } from "@/components/navbar";
import { SplitText } from "@/components/split-text";

type Props = {
  system: SystemProject;
};

export function SystemDetailPage({ system }: Props) {
  const shouldReduceMotion = useReducedMotion();
  const otherSystems = systems.filter((s) => s.slug !== system.slug);

  useLayoutEffect(() => {
    window.scrollTo({ left: 0, top: 0 });
  }, [system.slug]);

  return (
    <main className="min-h-svh bg-[#080808] text-white">
      <Navbar />

      {/* Fixed right nav with mix-blend-mode: difference */}
      <div
        className="fixed right-[50px] top-[120px] z-40 flex flex-col items-end"
        style={{ mixBlendMode: "difference" }}
      >
        {/* Active system — always visible above the scroll area */}
        <span
          className="font-sans text-white text-right leading-tight mb-3"
          style={{ fontSize: "20px" }}
        >
          {system.title.split(":")[0].trim()}
        </span>

        {/* Scrollable list — hidden scrollbar */}
        <div className="relative">
          <nav
            aria-label="Other systems"
            className="scrollbar-none flex flex-col items-end gap-2 overflow-y-auto"
            style={{
              maxHeight: "160px",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {otherSystems.map((s) => (
              <Link
                key={s.slug}
                href={`/systems/${s.slug}`}
                className="font-sans text-right leading-tight transition-opacity duration-300 hover:opacity-100 shrink-0"
                style={{ fontSize: "16px", color: "rgba(255,255,255,0.35)" }}
              >
                {s.title.split(":")[0].trim()}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <HeroSection system={system} shouldReduceMotion={!!shouldReduceMotion} />
      <VideoRevealSection system={system} shouldReduceMotion={!!shouldReduceMotion} />
      <PagesSection system={system} shouldReduceMotion={!!shouldReduceMotion} />
      <NextProjectStrip system={system} />
    </main>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────

function HeroSection({
  system,
  shouldReduceMotion,
}: {
  system: SystemProject;
  shouldReduceMotion: boolean;
}) {
  const dur = shouldReduceMotion ? 0 : 0.85;
  const ease = [0.22, 1, 0.36, 1] as const;
  const lineDur = shouldReduceMotion ? 0 : 0.91;
  const lineEase = [0.22, 1, 0.36, 1] as const;

  return (
    <section className="relative pt-[88px]">
      <div className="mx-auto w-full max-w-none px-[50px]">

        {/* ── Title ── */}
        <div className="pt-10 pb-12" style={{ mixBlendMode: "difference" }}>
          <h1
            className="font-display font-medium leading-tight tracking-tight text-white"
            style={{ fontFamily: "var(--font-clash-display)", fontSize: "60px", maxWidth: "calc(100% - 320px)" }}
          >
            <SplitText text={system.title} delay={0.05} stagger={0.022} />
          </h1>
        </div>

        {/* ── Info card with animated architectural lines ── */}
        <motion.div
          animate={{ opacity: 1 }}
          initial={{ opacity: shouldReduceMotion ? 1 : 0 }}
          transition={{ duration: 0.01, delay: 0.3 }}
          className="relative"
        >
          {/* Top horizontal line — draws from center outward */}
          <motion.div
            animate={{ scaleX: 1 }}
            initial={{ scaleX: shouldReduceMotion ? 1 : 0 }}
            transition={{ duration: lineDur, ease: lineEase, delay: 0.35 }}
            style={{ originX: "50%" }}
            className="absolute top-0 left-0 right-0 h-px bg-white/20"
          />

          {/* Left corner tick — drops down after top line */}
          <motion.div
            animate={{ scaleY: 1 }}
            initial={{ scaleY: shouldReduceMotion ? 1 : 0 }}
            transition={{ duration: lineDur * 0.7, ease: lineEase, delay: 0.35 + lineDur * 0.85 }}
            style={{ originY: "0%", height: "52px" }}
            className="absolute top-0 left-0 w-px bg-white/20"
          />

          {/* Right corner tick — drops down after top line */}
          <motion.div
            animate={{ scaleY: 1 }}
            initial={{ scaleY: shouldReduceMotion ? 1 : 0 }}
            transition={{ duration: lineDur * 0.7, ease: lineEase, delay: 0.35 + lineDur * 0.85 }}
            style={{ originY: "0%", height: "52px" }}
            className="absolute top-0 right-0 w-px bg-white/20"
          />

          {/* Center vertical divider — draws down after top line */}
          <motion.div
            animate={{ scaleY: 1 }}
            initial={{ scaleY: shouldReduceMotion ? 1 : 0 }}
            transition={{ duration: lineDur, ease: lineEase, delay: 0.35 + lineDur * 0.85 }}
            style={{ originY: "0%" }}
            className="absolute top-0 bottom-0 left-1/2 w-px bg-white/20 hidden lg:block"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left — description */}
            <div className="px-8 py-8">
              <motion.p
                animate={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
                transition={{ duration: dur, ease, delay: 0.55 }}
                className="leading-relaxed text-white/55 font-sans max-w-[480px]"
                style={{ fontFamily: "var(--font-satoshi)", fontSize: "18px" }}
              >
                {system.description}
              </motion.p>
            </div>

            {/* Right — role + stack */}
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
              transition={{ duration: dur, ease, delay: 0.62 }}
              className="px-8 py-8 flex flex-col gap-6 lg:flex-row lg:gap-0"
            >
              <div className="lg:w-1/2">
                <p className="text-[11px] uppercase tracking-[0.12em] text-white/30 font-sans mb-3">
                  Role:
                </p>
                <p className="text-white/65 font-sans leading-snug" style={{ fontSize: "18px" }}>
                  {system.role}
                </p>
              </div>
              <div className="lg:w-1/2">
                <p className="text-[11px] uppercase tracking-[0.12em] text-white/30 font-sans mb-3">
                  Stack:
                </p>
                <p className="text-white/65 font-sans leading-relaxed" style={{ fontSize: "18px" }}>
                  {system.stack.join(" / ")}
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

// ─── Video reveal + pin ───────────────────────────────────────────────────────

function VideoRevealSection({
  system,
  shouldReduceMotion,
}: {
  system: SystemProject;
  shouldReduceMotion: boolean;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const spring = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 40,
    mass: 0.3,
  });

  // Expand over first 15% of 200vh = ~30vh of scroll
  const scale = useTransform(
    spring,
    [0, 0.15],
    shouldReduceMotion ? [1, 1] : [0.55, 1],
  );

  return (
    // 200vh: ~30vh expand, ~170vh pinned full-screen
    <div ref={sectionRef} className="relative" style={{ height: "200vh" }}>
      <div className="sticky top-0 h-[100svh] w-full flex items-center justify-center">
        <motion.div style={{ scale }} className="w-full h-full">
          <div className="relative w-full h-full overflow-hidden rounded-2xl bg-[#0d0d0d]">
            <VideoPlayer src={system.video} poster={system.image} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function VideoPlayer({ src, poster }: { src: string; poster: string }) {
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      poster={poster}
      className="absolute inset-0 h-full w-full object-cover"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}

// ─── Pages section ────────────────────────────────────────────────────────────

function PagesSection({
  system,
  shouldReduceMotion,
}: {
  system: SystemProject;
  shouldReduceMotion: boolean;
}) {
  return (
    <section className="bg-[#080808] py-32">
      <div className="mx-auto w-full max-w-none px-[50px]">
        <div className="mb-20 flex items-end justify-between border-b border-white/8 pb-8">
          <FadeUp shouldReduceMotion={shouldReduceMotion} delay={0}>
            <h2 className="text-[11px] uppercase tracking-[0.16em] text-white/30 font-sans">
              Pages
            </h2>
          </FadeUp>
          <FadeUp shouldReduceMotion={shouldReduceMotion} delay={0.1}>
            <span className="text-[11px] text-white/20 font-sans tabular-nums">
              {String(system.pages.length).padStart(2, "0")}
            </span>
          </FadeUp>
        </div>

        <div className="flex flex-col gap-32">
          {system.pages.map((page, i) => (
            <PageEntry
              key={i}
              index={i}
              page={page}
              reversed={i % 2 !== 0}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function PageEntry({
  index,
  page,
  reversed,
  shouldReduceMotion,
}: {
  index: number;
  page: { description: string; image?: string };
  reversed: boolean;
  shouldReduceMotion: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.35"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ["0px", "0px"] : ["48px", "0px"],
  );
  const opacity = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [1, 1] : [0, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      className={`flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16 ${
        reversed ? "lg:flex-row-reverse" : ""
      }`}
    >
      <div className="w-full lg:w-[60%] aspect-video rounded-xl overflow-hidden bg-white/[0.04] border border-white/8 flex items-center justify-center shrink-0">
        {page.image ? (
          <img src={page.image} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="flex flex-col items-center gap-3 text-white/20">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <rect x="4" y="4" width="24" height="24" rx="3" stroke="currentColor" strokeWidth="1.2" />
              <circle cx="11" cy="13" r="2.5" stroke="currentColor" strokeWidth="1.2" />
              <path d="M4 22l7-5 5 4 4-3 8 5" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
            </svg>
            <span className="text-[12px] font-sans tracking-wide">Image placeholder</span>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-5">
        <span className="text-[11px] uppercase tracking-[0.14em] text-white/25 font-sans tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </span>
        <p
          className="text-[15px] leading-relaxed text-white/55 font-sans max-w-[380px]"
          style={{ fontFamily: "var(--font-satoshi)" }}
        >
          {page.description}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Next project strip ───────────────────────────────────────────────────────

function NextProjectStrip({ system }: { system: SystemProject }) {
  const currentIndex = systems.findIndex((s) => s.slug === system.slug);
  const next = systems[(currentIndex + 1) % systems.length];

  return (
    <div className="border-t border-white/8">
      <Link
        href={`/systems/${next.slug}`}
        className="group flex items-center justify-between px-[50px] py-14 hover:bg-white/[0.02] transition-colors duration-300"
      >
        <div>
          <p className="text-[11px] uppercase tracking-[0.14em] text-white/25 font-sans mb-3">
            Next Project
          </p>
          <p
            className="font-display font-medium text-white/70 group-hover:text-white transition-colors duration-300 leading-tight"
            style={{ fontFamily: "var(--font-clash-display)", fontSize: "clamp(1.25rem, 2.5vw, 2rem)" }}
          >
            {next.title}
          </p>
        </div>
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          aria-hidden="true"
          className="text-white/20 group-hover:text-white/60 transition-colors duration-300 shrink-0"
        >
          <path
            d="M10 20h20M22 12l8 8-8 8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function FadeUp({
  children,
  delay = 0,
  shouldReduceMotion,
}: {
  children: React.ReactNode;
  delay?: number;
  shouldReduceMotion: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.5"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ["0px", "0px"] : ["24px", "0px"],
  );
  const opacity = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [1, 1] : [0, 1]);

  return (
    <motion.div ref={ref} style={{ y, opacity, transitionDelay: `${delay}s` }}>
      {children}
    </motion.div>
  );
}
