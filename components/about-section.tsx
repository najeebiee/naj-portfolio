"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";
import { SplitText } from "@/components/split-text";

const tabs = [
  {
    label: "Experience",
    copy:
      "Junior web developer and visual designer with experience building business systems, modern interfaces, and immersive digital experiences.",
  },
  {
    label: "Philosophy",
    copy:
      "I believe the strongest digital work blends clarity with atmosphere, making useful systems feel thoughtful, memorable, and intentional.",
  },
  {
    label: "Focus",
    copy:
      "I focus on systems, visual direction, and interaction design for brands and businesses that need their digital presence to feel sharper.",
  },
];

const labels = [
  { text: "Builder", className: "left-[8.3%] top-[16.1%]" },
  { text: "Visionary", className: "left-[16.8%] top-[19.9%]" },
  { text: "Creative", className: "left-[25.2%] top-[24%]" },
];

const reveal = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const { scrollYProgress } = useScroll({
    offset: ["start end", "end start"],
    target: sectionRef,
  });

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 44,
    mass: 0.52,
    stiffness: 86,
  });

  const portraitY = useTransform(
    smoothProgress,
    [0, 0.36, 1],
    ["0px", "0px", "0px"],
  );
  const portraitScale = useTransform(
    smoothProgress,
    [0, 0.38, 1],
    [1, 1, 1],
  );
  const portraitOpacity = useTransform(
    smoothProgress,
    [0, 0.18, 0.42],
    [1, 1, 1],
  );
  const portraitFilter = useTransform(
    smoothProgress,
    [0, 0.36],
    ["blur(0px)", "blur(0px)"],
  );
  const nameY = useTransform(
    smoothProgress,
    [0, 1],
    shouldReduceMotion ? ["0px", "0px"] : ["20px", "-20px"],
  );
  const leftCopyY = useTransform(
    smoothProgress,
    [0, 1],
    shouldReduceMotion ? ["0px", "0px"] : ["34px", "-18px"],
  );
  return (
    <section
      aria-labelledby="about-title"
      className="relative h-[1080px] overflow-hidden bg-[#3f3f3f] text-white"
      id="about"
      ref={sectionRef}
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          filter: portraitFilter,
          opacity: portraitOpacity,
          scale: portraitScale,
          y: portraitY,
        }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#6d6d6d_0%,#303030_51%,#171717_100%)]" />
        <img
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-center"
          src="/images/about/portrait.png"
        />
      </motion.div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.08)_0%,transparent_28%,rgba(0,0,0,0.08)_54%,rgba(0,0,0,0.42)_100%)]"
      />

      <motion.div
        className="relative z-10 h-full px-[50px]"
        initial="hidden"
        transition={{ delayChildren: 0.38, staggerChildren: 0.12 }}
        viewport={{ amount: 0.34, once: true }}
        whileInView="visible"
      >
        {labels.map((label, index) => (
          <motion.span
            className={`absolute font-sans text-[20px] font-normal leading-none tracking-[2px] text-white/60 [font-weight:400] ${label.className}`}
            key={label.text}
            variants={reveal}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.span
              animate={
                shouldReduceMotion
                  ? undefined
                  : { y: [0, -5, 0], opacity: [0.52, 0.68, 0.52] }
              }
              transition={{
                delay: index * 0.4,
                duration: 8 + index,
                ease: "easeInOut",
                repeat: Infinity,
              }}
            >
              {label.text}
            </motion.span>
          </motion.span>
        ))}

        <motion.div
          className="absolute right-[8.1%] top-[34px] text-right"
          style={{ y: nameY }}
          variants={reveal}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2
            className="font-display text-[128px] font-medium leading-[0.94] tracking-normal text-white"
            id="about-title"
          >
            <span className="block whitespace-nowrap">
              <SplitText text="Najeeb  C." />
            </span>
            <span className="block">
              <SplitText delay={0.08} text="Mapantas" />
            </span>
          </h2>
        </motion.div>

        <motion.p
          className="absolute left-[8.3%] top-[69.4%] w-[465px] font-sans text-[32px] font-normal leading-[1.28] text-white [font-weight:400]"
          style={{ y: leftCopyY }}
          variants={reveal}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <SplitText
            mode="words"
            stagger={0.032}
            text="Blending logic and creativity through systems, visuals, and interaction."
          />
        </motion.p>

        <motion.div
          className="absolute left-[58.95%] top-[50%] flex -translate-y-1/2 flex-col gap-[86px]"
          variants={reveal}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          {tabs.map((tab) => {
            const isActive = tab.label === activeTab.label;

            return (
              <button
                className={`w-fit font-display text-[24px] font-medium leading-none tracking-[2.4px] underline-offset-[5px] transition-colors duration-300 ${
                  isActive
                    ? "text-white underline"
                    : "text-[#c2c0c0] hover:text-white"
                }`}
                key={tab.label}
                onClick={() => setActiveTab(tab)}
                type="button"
              >
                {tab.label}
              </button>
            );
          })}
        </motion.div>

        <motion.div
          className="absolute left-[75.8%] top-[50%] min-h-[172px] w-[303px] -translate-y-1/2"
          variants={reveal}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <AnimatePresence mode="wait">
            <motion.p
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              className="whitespace-pre-wrap font-sans text-[20px] font-normal leading-[1.36] tracking-[2px] text-[#c2c0c0] [font-weight:400]"
              exit={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: -8, filter: "blur(4px)" }
              }
              initial={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 12, filter: "blur(4px)" }
              }
              key={activeTab.label}
              transition={{
                duration: shouldReduceMotion ? 0.1 : 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {activeTab.copy}
            </motion.p>
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </section>
  );
}
