"use client";

import {
  memo,
  useMemo,
} from "react";
import {
  motion,
  type MotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { visuals, type VisualProject } from "@/data/visuals";
import { SplitText } from "@/components/split-text";

const cardRotations = [8, -6, 7, -8, 6, -7, 8, -6];

// Precompute per-card scroll range constants — deterministic from index, never change
const cardRanges = visuals.map((_, index) => {
  const start = 0.22 + index * 0.075;
  const center = start + 0.075;
  const end = start + 0.17;
  return { center, end, start };
});

type VisualCardProps = {
  index: number;
  progress: MotionValue<number>;
  reduceMotion: boolean;
  visual: VisualProject;
};

const VisualCard = memo(function VisualCard({
  index,
  progress,
  reduceMotion,
  visual,
}: VisualCardProps) {
  const rotation = cardRotations[index % cardRotations.length];
  const { center, end, start } = cardRanges[index];

  // Stable array references — only recomputed if index changes (never in practice)
  const xInput = useMemo(() => [start, center, end], [start, center, end]);
  const xOutput = useMemo(() => ["55vw", "0vw", "-55vw"], []);
  const yOutput = useMemo(() => ["35vh", "0vh", "-35vh"], []);
  const rotateOutput = useMemo(() => [rotation, 0, -rotation], [rotation]);
  const scaleOutput = useMemo(() => [0.85, 1, 0.9], []);
  const opacityInput = useMemo(
    () => [start, center - 0.035, center + 0.05, end],
    [start, center, end],
  );
  const opacityOutput = useMemo(() => [0, 1, 1, 0], []);

  const x = useTransform(progress, xInput, xOutput);
  const y = useTransform(progress, xInput, yOutput);
  const rotate = useTransform(progress, xInput, rotateOutput);
  const scale = useTransform(progress, xInput, scaleOutput);
  const opacity = useTransform(progress, opacityInput, opacityOutput);

  return (
    <motion.div
      className="absolute left-1/2 top-1/2"
      style={
        reduceMotion
          ? {
              opacity: index < 3 ? 1 : 0,
              rotate: index === 1 ? 0 : rotation,
              scale: index === 1 ? 1 : 0.9,
              transformOrigin: "50% 50%",
              x: index === 0 ? "-34vw" : index === 1 ? "0vw" : "34vw",
              y: index === 0 ? "18vh" : index === 1 ? "0vh" : "-18vh",
            }
          : {
              opacity,
              rotate,
              scale,
              transformOrigin: "50% 50%",
              x,
              y,
            }
      }
    >
      <article className="group relative w-[430px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[34px] bg-[#111] shadow-[0_28px_80px_rgba(0,0,0,0.42)] [backface-visibility:hidden] lg:w-[560px]">
        <img
          alt={visual.alt}
          className="block aspect-[0.78] h-auto w-full object-cover"
          decoding="async"
          draggable={false}
          fetchPriority={index === 0 ? "high" : "auto"}
          loading={index === 0 ? "eager" : "lazy"}
          src={visual.image}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/0 via-black/0 to-black/16"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-black/0 transition-[background-color] duration-500 ease-out group-hover:bg-black/30 group-focus-within:bg-black/30"
        />
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-[linear-gradient(180deg,rgba(5,5,5,0.08)_0%,rgba(5,5,5,0.34)_45%,rgba(5,5,5,0.86)_100%)] p-7 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 group-focus-within:opacity-100">
          <div className="translate-y-5 transition-transform duration-500 ease-out group-hover:translate-y-0 group-focus-within:translate-y-0">
            <div className="mb-4 flex items-center justify-between gap-4 font-sans text-[12px] font-normal uppercase tracking-[0.16em] text-white/64 [font-weight:400]">
              <span>{visual.category}</span>
              <span>{visual.year}</span>
            </div>

            <h3 className="max-w-[24rem] font-display text-[34px] font-medium leading-[0.98] tracking-normal text-white lg:text-[42px]">
              {visual.title}
            </h3>

            <p className="mt-4 max-w-[28rem] font-sans text-[15px] font-normal leading-[1.55] text-white/78 [font-weight:400]">
              {visual.description}
            </p>

            <div className="mt-5 flex items-center justify-between gap-5 border-t border-white/16 pt-4">
              <span className="font-sans text-[13px] font-normal uppercase tracking-[0.14em] text-white/56 [font-weight:400]">
                {visual.role}
              </span>

              <div className="flex max-w-[18rem] flex-wrap justify-end gap-x-3 gap-y-1 font-sans text-[13px] font-normal leading-[1.4] text-white/72 [font-weight:400]">
                {visual.tags.map((tag) => (
                  <span className="before:mr-1 before:content-['•']" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <button
          aria-label={`Open ${visual.title}`}
          className="absolute bottom-5 right-5 z-10 flex size-12 items-center justify-center rounded-full border border-white/12 bg-[#1c1c1c]/92 font-sans text-[30px] font-normal leading-none text-white transition-[transform,background-color,border-color,color] duration-500 ease-out [font-weight:400] hover:bg-white hover:text-[#050505] group-hover:rotate-45 group-hover:border-white/28 group-focus-within:rotate-45 group-focus-within:border-white/28"
          type="button"
        >
          +
        </button>
      </article>
    </motion.div>
  );
});

export function VisualsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = Boolean(useReducedMotion());
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end end"],
    target: sectionRef,
  });
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 50,
    mass: 0.3,
    stiffness: 120,
  });

  const titleInputRange = useMemo(() => [0, 0.055, 0.12, 0.2, 0.88, 1], []);
  const titleOpacityOutput = useMemo(() => [0, 1, 1, 0.075, 0.075, 0.015], []);
  const titleScaleInput = useMemo(() => [0, 0.12, 0.2], []);
  const titleScaleOutput = useMemo(() => [0.72, 1, 1.04], []);
  const titleYOutput = useMemo(() => [70, 0, -18], []);
  const calmInput = useMemo(() => [0.88, 0.96, 1], []);
  const calmOutput = useMemo(() => [0, 0.3, 0.56], []);
  const grayInput = useMemo(() => [0.76, 0.9, 1], []);
  const grayOutput = useMemo(() => [0, 0.58, 0.42], []);
  const stageYInput = useMemo(() => [0.9, 1], []);
  const stageYOutput = useMemo(() => ["0px", "-58px"], []);
  const stageOpacityOutput = useMemo(() => [1, 0.62], []);

  const titleOpacity = useTransform(smoothProgress, titleInputRange, titleOpacityOutput);
  const titleScale = useTransform(smoothProgress, titleScaleInput, titleScaleOutput);
  const titleY = useTransform(smoothProgress, titleScaleInput, titleYOutput);
  const calmOverlayOpacity = useTransform(smoothProgress, calmInput, calmOutput);
  const grayWashOpacity = useTransform(smoothProgress, grayInput, grayOutput);
  const stageY = useTransform(smoothProgress, stageYInput, stageYOutput);
  const stageOpacity = useTransform(smoothProgress, stageYInput, stageOpacityOutput);

  return (
    <section
      aria-labelledby="visuals-title"
      className="relative h-[5900px] bg-[#050505] text-white"
      id="visuals"
      ref={sectionRef}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
          <motion.h2
            className="max-w-[1320px] text-center font-display text-[clamp(5rem,8.95vw,10.75rem)] font-medium leading-[0.92] tracking-normal text-white"
            id="visuals-title"
            style={
              reduceMotion
                ? { opacity: 0.075 }
                : { opacity: titleOpacity, scale: titleScale, y: titleY }
            }
          >
            <SplitText stagger={0.06} text="Visual Experiences" />
          </motion.h2>
        </div>

        <motion.div className="absolute inset-0 z-10" style={reduceMotion ? undefined : { opacity: stageOpacity, willChange: "transform, opacity", y: stageY }}>
          {visuals.map((visual, index) => (
            <VisualCard
              index={index}
              key={visual.title}
              progress={smoothProgress}
              reduceMotion={reduceMotion}
              visual={visual}
            />
          ))}
        </motion.div>

        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[15] bg-[radial-gradient(circle_at_48%_72%,rgba(230,230,230,0.34),rgba(150,150,150,0.18)_42%,transparent_70%),linear-gradient(180deg,transparent_0%,rgba(180,180,180,0.08)_48%,rgba(180,180,180,0.2)_76%,rgba(105,105,105,0.28)_100%)]"
          style={reduceMotion ? { opacity: 0 } : { opacity: grayWashOpacity }}
        />

        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(180deg,rgba(5,5,5,0)_0%,rgba(5,5,5,0.22)_42%,#050505_100%)]"
          style={reduceMotion ? { opacity: 0 } : { opacity: calmOverlayOpacity }}
        />
      </div>
    </section>
  );
}
