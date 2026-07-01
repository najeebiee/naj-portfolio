"use client";

import { motion, useReducedMotion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Container } from "@/components/container";

const navigation = [
  { href: "/#systems", label: "Systems" },
  { href: "/visuals", label: "Visuals" },
  { href: "/#about", label: "About" },
  { href: "/#contact-scroll-target", label: "Contact" },
];

export function Navbar() {
  const { scrollY } = useScroll();
  const shouldReduceMotion = useReducedMotion();
  const [isHidden, setIsHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    const scrollingDown = latest > previous;

    setIsScrolled(latest > 24);
    setIsHidden(scrollingDown && latest > 140);
  });

  return (
    <motion.header
      animate={isHidden ? "hidden" : "visible"}
      className="fixed left-0 top-0 z-50 w-full text-white"
      initial={false}
      transition={{ duration: shouldReduceMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
      variants={{
        hidden: { y: "-110%" },
        visible: { y: 0 },
      }}
    >
      <div
        className={`absolute inset-0 transition-colors duration-500 ${
          isScrolled ? "bg-[#050505]/72 backdrop-blur-md" : "bg-transparent"
        }`}
      />
      <Container className="flex h-20 items-center justify-between gap-8">
        <Link
          className="group relative z-10 flex items-center gap-2.5 font-display text-[1.625rem] font-bold leading-none tracking-normal"
          href="/"
          aria-label="Naj home"
        >
          <img
            alt=""
            aria-hidden="true"
            className="h-6 w-10 object-contain"
            src="/logo/naj-logo.svg.svg"
          />
          <span className="transition-opacity duration-300 group-hover:opacity-70">naj</span>
        </Link>

        <nav aria-label="Primary navigation" className="relative z-10">
          <ul className="hidden items-center gap-[120px] lg:flex">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  className="group relative block h-[15px] overflow-hidden font-sans text-[15px] font-normal leading-none tracking-normal text-white/88 [font-weight:400]"
                  href={item.href}
                >
                  <span className="block transition-transform duration-500 ease-out group-hover:-translate-y-full">
                    {item.label}
                  </span>
                  <span className="absolute left-0 top-0 block translate-y-full text-white transition-transform duration-500 ease-out group-hover:translate-y-0">
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link
          className="group relative z-10 inline-flex h-[50px] items-center justify-center overflow-hidden rounded-full border border-white px-8 font-sans text-[15px] font-normal leading-none tracking-normal text-white transition-colors duration-500 [font-weight:400] hover:text-[#050505]"
          href="/#contact-scroll-target"
        >
          <span className="absolute inset-0 translate-y-full rounded-full bg-white transition-transform duration-500 ease-out group-hover:translate-y-0" />
          <span className="relative">Let&apos;s talk</span>
        </Link>
      </Container>
    </motion.header>
  );
}
