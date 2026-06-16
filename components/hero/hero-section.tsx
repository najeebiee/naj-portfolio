"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Naj3D } from "@/components/hero/naj-3d";
import { SplitText } from "@/components/split-text";

const ease = [0.22, 1, 0.36, 1] as const;

const lineReveal = {
  hidden: { opacity: 0, y: 86, filter: "blur(12px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const softReveal = {
  hidden: { opacity: 0, y: 26, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();
  const transition = {
    duration: shouldReduceMotion ? 0 : 1.05,
    ease,
  };

  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate h-[1080px] w-full overflow-hidden px-[50px] pb-[91px] pt-[176px]"
      id="hero"
    >
      <motion.div
        className="relative h-full"
        initial="hidden"
        transition={{ delayChildren: 0.18, staggerChildren: 0.16 }}
        animate="visible"
      >
        <motion.h1
          className="relative z-10 overflow-hidden font-display text-[clamp(5rem,8.95vw,10.75rem)] font-medium leading-none tracking-normal text-white"
          id="hero-title"
          variants={lineReveal}
          transition={transition}
        >
          <SplitText text="Smart Systems." />
        </motion.h1>

        <div
          aria-hidden="true"
          className="absolute left-1/2 top-[43.5%] z-0 h-[408px] w-[680px] -translate-x-1/2 -translate-y-1/2 overflow-visible"
          data-hero-3d-stage
        >
          <motion.div
            className="h-full w-full"
            variants={{
              hidden: { opacity: 0, filter: "blur(14px)" },
              visible: { opacity: 1, filter: "blur(0px)" },
            }}
            transition={{
              duration: shouldReduceMotion ? 0 : 1.25,
              ease,
              delay: shouldReduceMotion ? 0 : 0.34,
            }}
          >
            <Naj3D />
          </motion.div>
        </div>

        <motion.p
          className="relative z-10 mt-[300px] overflow-hidden text-right font-display text-[clamp(4.5rem,8.95vw,10.75rem)] font-medium leading-none tracking-normal text-white"
          variants={lineReveal}
          transition={{ ...transition, delay: shouldReduceMotion ? 0 : 0.08 }}
        >
          <SplitText delay={0.08} text="Bold Visuals." />
        </motion.p>

        <motion.div
          className="absolute bottom-0 left-0 flex items-center gap-12"
          variants={softReveal}
          transition={{ duration: shouldReduceMotion ? 0 : 0.95, ease, delay: shouldReduceMotion ? 0 : 0.25 }}
        >
          <p className="max-w-[29rem] font-sans text-[1.35rem] font-normal leading-[1.35] text-white [font-weight:400] sm:text-2xl">
            <SplitText
              delay={0.46}
              mode="words"
              stagger={0.035}
              text="Helping businesses stand out through smart systems and bold visual design."
            />
          </p>

          <a
            className="group relative inline-flex h-[50px] w-fit items-center justify-center overflow-hidden rounded-full border border-white px-5 font-sans text-[15px] font-normal leading-none text-white transition-colors duration-500 [font-weight:400] hover:text-[#050505]"
            href="#contact"
          >
            <span className="absolute inset-0 translate-y-full rounded-full bg-white transition-transform duration-500 ease-out group-hover:translate-y-0" />
            <span className="relative">Enter the Studio</span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
