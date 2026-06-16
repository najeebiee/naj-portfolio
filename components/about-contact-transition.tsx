"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";

export function AboutContactTransition() {
  const transitionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end end"],
    target: transitionRef,
  });

  const progress = useSpring(scrollYProgress, {
    damping: 50,
    mass: 0.55,
    stiffness: 68,
  });

  const backgroundY = useTransform(
    progress,
    [0, 0.44, 1],
    shouldReduceMotion ? ["0px", "0px", "0px"] : ["0px", "0px", "-960px"],
  );
  const aboutScale = useTransform(
    progress,
    [0, 0.32, 0.44, 0.64, 0.82, 0.94, 1],
    shouldReduceMotion
      ? [1, 1, 1, 1, 1, 1, 1]
      : [1, 1, 1, 0.72, 0.4, 0.2, 0.17],
  );
  const aboutY = useTransform(
    progress,
    [0, 0.58, 0.74, 0.9, 1],
    shouldReduceMotion
      ? ["0px", "0px", "0px", "0px", "0px"]
      : ["0px", "0px", "120px", "300px", "340px"],
  );
  const aboutOpacity = useTransform(
    progress,
    [0, 0.9, 0.96, 1],
    shouldReduceMotion ? [1, 1, 1, 1] : [1, 1, 0, 0],
  );

  const contactOpacity = useTransform(
    progress,
    [0.965, 0.99, 1],
    shouldReduceMotion ? [1, 1, 1] : [0, 0.72, 1],
  );
  const contactY = useTransform(
    progress,
    [0.965, 1],
    shouldReduceMotion ? ["0px", "0px"] : ["46px", "0px"],
  );
  const contactFilter = useTransform(
    progress,
    [0.965, 0.99, 1],
    shouldReduceMotion
      ? ["blur(0px)", "blur(0px)", "blur(0px)"]
      : ["blur(8px)", "blur(3px)", "blur(0px)"],
  );
  const contactPointerEvents = useTransform(
    progress,
    [0, 0.96, 0.965],
    ["none", "none", "auto"],
  );
  const watermarkOpacity = useTransform(
    progress,
    [0.88, 0.98, 1],
    shouldReduceMotion ? [0.05, 0.05, 0.05] : [0, 0.04, 0.05],
  );

  const foregroundCloudOpacity = useTransform(
    progress,
    [0.5, 0.58, 1],
    shouldReduceMotion ? [0, 0, 0] : [0, 1, 1],
  );
  const foregroundCloudY = useTransform(
    progress,
    [0.5, 0.86, 1],
    shouldReduceMotion ? ["0px", "0px", "0px"] : ["260px", "-54px", "-86px"],
  );
  const foregroundCloudScale = useTransform(
    progress,
    [0.54, 1],
    shouldReduceMotion ? [1, 1] : [1, 1.08],
  );

  return (
    <section className="relative h-[2040px] bg-[#b3a17d]" ref={transitionRef}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0 bg-[#b3a17d]"
        >
          <motion.img
            alt=""
            className="absolute left-0 top-0 h-[2040px] w-full object-cover object-top opacity-95"
            src="/images/contact/cloud-bg-extended.png"
            style={{ y: backgroundY }}
          />
        </div>

        <div className="absolute inset-0 z-10">
          <div className="absolute left-1/2 top-1/2 h-[1080px] w-screen -translate-x-1/2 -translate-y-1/2">
            <motion.div
              className="h-full w-full origin-center overflow-hidden"
              style={{
                opacity: aboutOpacity,
                scale: aboutScale,
                y: aboutY,
              }}
            >
              <AboutSection />
            </motion.div>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[-8vh] left-1/2 z-[60] aspect-[1919/1080] w-[max(1180px,118vw)] max-w-none -translate-x-1/2"
        >
          <motion.div
            className="relative h-full w-full"
            style={{
              opacity: foregroundCloudOpacity,
              scale: foregroundCloudScale,
              y: foregroundCloudY,
            }}
          >
            <img
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-contain object-center"
              src="/images/contact/cloud-no-bg.png"
            />
          </motion.div>
        </div>

        <motion.p
          aria-hidden="true"
          className="pointer-events-none absolute right-[4.1%] top-[10px] z-[55] bg-[linear-gradient(268deg,#000_1%,rgba(102,102,102,0.9)_99%)] bg-clip-text font-display text-[600px] font-bold leading-none text-transparent"
          style={{ opacity: watermarkOpacity }}
        >
          naj
        </motion.p>

        <motion.div
          className="absolute inset-0 z-[70]"
          style={{
            filter: contactFilter,
            opacity: contactOpacity,
            pointerEvents: contactPointerEvents,
            y: contactY,
          }}
        >
          <ContactSection atmosphere={false} watermark={false} />
        </motion.div>
      </div>
    </section>
  );
}
