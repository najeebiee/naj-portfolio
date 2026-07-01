"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useMemo, useRef } from "react";
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

  const bgYOutput = useMemo(
    () => (shouldReduceMotion ? ["0px", "0px", "0px"] : ["0px", "0px", "-960px"]),
    [shouldReduceMotion],
  );
  const bgYInput = useMemo(() => [0, 0.56, 1], []);

  const aboutScaleInput = useMemo(() => [0, 0.46, 0.58, 0.70, 0.84, 0.94, 1], []);
  const aboutScaleOutput = useMemo(
    () => (shouldReduceMotion ? [1, 1, 1, 1, 1, 1, 1] : [1, 1, 1, 0.72, 0.4, 0.2, 0.17]),
    [shouldReduceMotion],
  );

  const aboutYInput = useMemo(() => [0, 0.64, 0.76, 0.88, 0.96], []);
  const aboutYOutput = useMemo(
    () => (shouldReduceMotion ? ["0px", "0px", "0px", "0px", "0px"] : ["0px", "0px", "120px", "300px", "340px"]),
    [shouldReduceMotion],
  );

  const aboutOpacityInput = useMemo(() => [0, 0.72, 0.82, 0.90], []);
  const aboutOpacityOutput = useMemo(
    () => (shouldReduceMotion ? [1, 1, 1, 1] : [1, 1, 0, 0]),
    [shouldReduceMotion],
  );

  const contactOpacityInput = useMemo(() => [0.72, 0.90, 1], []);
  const contactOpacityOutput = useMemo(
    () => (shouldReduceMotion ? [1, 1, 1] : [0, 0.72, 1]),
    [shouldReduceMotion],
  );

  const contactYInput = useMemo(() => [0.72, 1], []);
  const contactYOutput = useMemo(
    () => (shouldReduceMotion ? ["0px", "0px"] : ["46px", "0px"]),
    [shouldReduceMotion],
  );

  const watermarkInput = useMemo(() => [0.88, 0.98, 1], []);
  const watermarkOutput = useMemo(
    () => (shouldReduceMotion ? [0.05, 0.05, 0.05] : [0, 0.04, 0.05]),
    [shouldReduceMotion],
  );

  const cloudOpacityInput = useMemo(() => [0.62, 0.70, 1], []);
  const cloudOpacityOutput = useMemo(
    () => (shouldReduceMotion ? [0, 0, 0] : [0, 1, 1]),
    [shouldReduceMotion],
  );

  const cloudYInput = useMemo(() => [0.62, 0.88, 1], []);
  const cloudYOutput = useMemo(
    () => (shouldReduceMotion ? ["0px", "0px", "0px"] : ["260px", "-54px", "-86px"]),
    [shouldReduceMotion],
  );

  const cloudScaleInput = useMemo(() => [0.66, 1], []);
  const cloudScaleOutput = useMemo(
    () => (shouldReduceMotion ? [1, 1] : [1, 1.08]),
    [shouldReduceMotion],
  );

  const contactFilterInput = useMemo(() => [0.72, 0.90, 1], []);
  const contactFilterOutput = useMemo(() => ["blur(0px)", "blur(0px)", "blur(0px)"], []);
  const contactPointerInput = useMemo(() => [0, 0.70, 0.72], []);
  const contactPointerOutput = useMemo(() => ["none", "none", "auto"], []);

  const entryYInput = useMemo(() => [0, 0.12], []);
  const entryYOutput = useMemo(
    () => (shouldReduceMotion ? ["0px", "0px"] : ["100vh", "0px"]),
    [shouldReduceMotion],
  );

  const backgroundY = useTransform(progress, bgYInput, bgYOutput);
  const aboutScale = useTransform(progress, aboutScaleInput, aboutScaleOutput);
  const aboutY = useTransform(progress, aboutYInput, aboutYOutput);
  const aboutOpacity = useTransform(progress, aboutOpacityInput, aboutOpacityOutput);
  const contactOpacity = useTransform(progress, contactOpacityInput, contactOpacityOutput);
  const contactY = useTransform(progress, contactYInput, contactYOutput);
  const contactFilter = useTransform(progress, contactFilterInput, contactFilterOutput);
  const contactPointerEvents = useTransform(progress, contactPointerInput, contactPointerOutput);
  const watermarkOpacity = useTransform(progress, watermarkInput, watermarkOutput);
  const foregroundCloudOpacity = useTransform(progress, cloudOpacityInput, cloudOpacityOutput);
  const foregroundCloudY = useTransform(progress, cloudYInput, cloudYOutput);
  const foregroundCloudScale = useTransform(progress, cloudScaleInput, cloudScaleOutput);
  const entryY = useTransform(progress, entryYInput, entryYOutput);

  return (
    <section className="relative h-[2040px]" ref={transitionRef}>
      <div aria-hidden="true" className="absolute top-[1470px]" id="contact-scroll-target" />
      <motion.div className="sticky top-0 h-screen overflow-hidden" style={{ y: entryY }}>
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0 bg-[#b3a17d]"
        >
          <motion.div
            className="absolute left-0 top-0 h-[2040px] w-full will-change-transform"
            style={{ y: backgroundY }}
          >
            <img
              alt=""
              className="h-full w-full object-cover object-top opacity-95"
              decoding="async"
              loading="lazy"
              src="/images/contact/cloud-bg-extended.png"
            />
          </motion.div>
        </div>

        <div className="absolute inset-0 z-10">
          <div className="absolute left-1/2 top-1/2 h-[1080px] w-screen -translate-x-1/2 -translate-y-1/2">
            <motion.div
              className="h-full w-full origin-center overflow-hidden"
              style={{
                opacity: aboutOpacity,
                scale: aboutScale,
                willChange: "transform, opacity",
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
              willChange: "transform, opacity",
              y: foregroundCloudY,
            }}
          >
            <img
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-contain object-center"
              decoding="async"
              loading="lazy"
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
            willChange: "transform, opacity",
            y: contactY,
          }}
        >
          <ContactSection atmosphere={false} watermark={false} />
        </motion.div>
      </motion.div>
    </section>
  );
}
