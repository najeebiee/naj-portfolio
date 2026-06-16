"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { SplitText } from "@/components/split-text";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "Systems", href: "#systems" },
  { label: "Visuals", href: "#visuals" },
  { label: "About", href: "#about" },
];

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/", icon: "linkedin" },
  { label: "Github", href: "https://github.com/", icon: "github" },
  { label: "Facebook", href: "https://www.facebook.com/", icon: "facebook" },
  { label: "Instagram", href: "https://www.instagram.com/", icon: "instagram" },
];

type SocialIconProps = {
  icon: string;
};

function SocialIcon({ icon }: SocialIconProps) {
  const className = "size-[20px] shrink-0 text-white";

  if (icon === "linkedin") {
    return (
      <svg aria-hidden="true" className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.45 20.45h-3.56v-5.58c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.67H9.34V8.98h3.42v1.57h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46zM5.32 7.41a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14Zm1.78 13.04H3.54V8.98H7.1zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
      </svg>
    );
  }

  if (icon === "github") {
    return (
      <svg aria-hidden="true" className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.04c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.08 1.85 1.24 1.85 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.31-5.47-1.34-5.47-5.94 0-1.31.47-2.38 1.24-3.22-.12-.31-.54-1.53.12-3.18 0 0 1.01-.32 3.3 1.23a11.4 11.4 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.62-2.81 5.63-5.49 5.93.43.37.82 1.1.82 2.22v3.29c0 .32.21.69.83.57A12 12 0 0 0 12 .5Z" />
      </svg>
    );
  }

  if (icon === "facebook") {
    return (
      <svg aria-hidden="true" className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.07C24 5.73 18.63.58 12 .58S0 5.73 0 12.07c0 5.73 4.39 10.48 10.13 11.34v-8.02H7.08v-3.32h3.05V9.55c0-2.87 1.8-4.46 4.53-4.46 1.31 0 2.68.22 2.68.22v2.81h-1.51c-1.49 0-1.96.89-1.96 1.8v2.15h3.33l-.53 3.32h-2.8v8.02C19.61 22.55 24 17.8 24 12.07Z" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
      <rect height="18" rx="5" stroke="currentColor" strokeWidth="2.2" width="18" x="3" y="3" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="2.2" />
      <circle cx="17.4" cy="6.7" fill="currentColor" r="1.35" />
    </svg>
  );
}

type ContactSectionProps = {
  atmosphere?: boolean;
  watermark?: boolean;
};

export function ContactSection({
  atmosphere = true,
  watermark = true,
}: ContactSectionProps = {}) {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    offset: ["start end", "end start"],
    target: sectionRef,
  });

  const progress = useSpring(scrollYProgress, {
    damping: 44,
    mass: 0.55,
    stiffness: 82,
  });

  const bgY = useTransform(
    progress,
    [0, 1],
    shouldReduceMotion ? ["0px", "0px"] : ["24px", "-24px"],
  );
  const cloudY = useTransform(
    progress,
    [0, 1],
    shouldReduceMotion ? ["0px", "0px"] : ["36px", "-48px"],
  );
  const markY = useTransform(
    progress,
    [0, 1],
    shouldReduceMotion ? ["0px", "0px"] : ["34px", "-18px"],
  );
  const contentY = useTransform(
    progress,
    [0, 1],
    shouldReduceMotion ? ["0px", "0px"] : ["26px", "-10px"],
  );
  const contentOpacity = useTransform(
    progress,
    [0, 0.22, 0.42],
    shouldReduceMotion ? [1, 1, 1] : [0, 0.72, 1],
  );

  return (
    <section
      aria-labelledby="contact-title"
      className={`relative h-[1080px] overflow-hidden text-white ${
        atmosphere ? "bg-[#6d6d6d]" : "bg-transparent"
      }`}
      id="contact"
      ref={sectionRef}
    >
      {atmosphere && (
        <div aria-hidden="true" className="absolute -inset-x-[12%] -inset-y-[14%]">
          <motion.img
            alt=""
            className="h-full w-full object-cover object-center"
            src="/images/contact/cloud-bg.png"
            style={{ y: bgY }}
          />
        </div>
      )}

      {watermark && (
        <motion.p
          aria-hidden="true"
          className="pointer-events-none absolute right-[4.1%] top-[10px] z-10 bg-[linear-gradient(268deg,#000_1%,rgba(102,102,102,0.9)_99%)] bg-clip-text font-display text-[600px] font-bold leading-none text-transparent opacity-[0.05]"
          style={{ y: markY }}
        >
          naj
        </motion.p>
      )}

      {atmosphere && (
        <div
          aria-hidden="true"
          className="absolute -inset-x-[12%] -inset-y-[14%] z-20"
        >
          <motion.img
            alt=""
            className="h-full w-full object-cover object-center"
            src="/images/contact/cloud-no-bg.png"
            style={{ y: cloudY }}
          />
        </div>
      )}

      {atmosphere && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-[381px] bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.35)_100%)]"
        />
      )}

      <motion.div
        className="relative z-40 h-full px-[50px]"
        initial={atmosphere && !shouldReduceMotion ? { opacity: 0 } : false}
        style={
          atmosphere
            ? { opacity: contentOpacity, y: contentY }
            : undefined
        }
      >
        <div className="absolute left-[8.33%] top-[75px]">
          <h2
            className="font-display text-[96px] font-medium leading-none tracking-normal text-white"
            id="contact-title"
          >
            <SplitText text="Built With Intention." />
          </h2>
          <p className="mt-4 font-sans text-[20px] font-normal leading-none text-white [font-weight:400]">
            <SplitText
              delay={0.24}
              mode="words"
              stagger={0.03}
              text="Designing clarity through systems, motion, and visual storytelling."
            />
          </p>
        </div>

        <div className="absolute left-[8.33%] top-[66.2%]">
          <div className="mb-3 size-[35px] overflow-hidden rounded-full border border-white/18 bg-white/12">
            <img
              alt=""
              aria-hidden="true"
              className="h-full w-full object-cover"
              src="/images/about/portrait.png"
            />
          </div>
          <p className="font-display text-[16px] font-semibold leading-normal text-white/85">
            Najeeb C. Mapantas
          </p>
          <a
            className="mt-1 block font-sans text-[14px] font-normal leading-normal text-white [font-weight:400]"
            href="mailto:najeebmapantas21@gmail.com"
          >
            najeebmapantas21@gmail.com
          </a>
        </div>

        <nav
          aria-label="Footer navigation"
          className="absolute left-[33.7%] top-[66.2%]"
        >
          <p className="mb-9 font-display text-[16px] font-semibold leading-normal text-white/85">
            Navigate
          </p>
          <ul className="flex flex-col gap-[24px]">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  className="font-sans text-[14px] font-normal leading-normal text-white transition-opacity duration-200 hover:opacity-70 [font-weight:400]"
                  href={link.href}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute left-[58.95%] top-[66.2%]">
          <p className="mb-9 font-display text-[16px] font-semibold leading-normal text-white/85">
            Socials
          </p>
          <ul className="flex flex-col gap-[24px]">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  className="group flex items-center gap-3.5 font-sans text-[14px] font-normal leading-normal text-white transition-opacity duration-200 hover:opacity-70 [font-weight:400]"
                  href={social.href}
                  rel="noreferrer"
                  target="_blank"
                >
                  <SocialIcon icon={social.icon} />
                  <span>{social.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  );
}
