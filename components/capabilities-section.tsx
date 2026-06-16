"use client";

import { motion } from "framer-motion";
import { SplitText } from "@/components/split-text";

const capabilities = [
  {
    title: "Systems Development",
    description:
      "Custom dashboards, business platforms, automation systems, and scalable web applications designed for modern workflows.",
    className: "left-0 top-[367px] h-[346px] w-[680px]",
    copyWidth: "max-w-[414px]",
    icon: "systems",
  },
  {
    title: "Frontend Experiences",
    description:
      "Interactive interfaces with cinematic motion, smooth transitions, responsive layouts, and immersive user interaction.",
    className: "left-[700px] right-0 top-[367px] h-[255px]",
    copyWidth: "max-w-[503px]",
    icon: "frontend",
  },
  {
    title: "Visual Design",
    description:
      "Brand systems, digital visuals, social creatives, and high-impact layouts crafted with strong visual direction.",
    className: "left-0 top-[733px] h-[257px] w-[680px]",
    copyWidth: "max-w-[528px]",
    icon: "visual",
  },
  {
    title: "Creative Direction",
    description:
      "Combining strategy, design, and development into cohesive digital experiences that feel modern and intentional.",
    className: "left-[1024px] right-0 top-[641px] h-[347px]",
    copyWidth: "max-w-[347px]",
    icon: "direction",
  },
];

type CapabilityIconProps = {
  type: string;
};

function CapabilityIcon({ type }: CapabilityIconProps) {
  const iconClass = "h-[18px] w-[18px]";

  return (
    <span className="flex size-[34px] shrink-0 items-center justify-center rounded-full border border-white/85 text-white transition-colors duration-300 group-hover:border-white">
      {type === "systems" && (
        <svg
          aria-hidden="true"
          className={iconClass}
          fill="none"
          viewBox="0 0 18 18"
        >
          <path
            d="M3.25 4.25h11.5v9.5H3.25zM3.25 7.25h11.5M7 7.25v6.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </svg>
      )}

      {type === "frontend" && (
        <svg
          aria-hidden="true"
          className={iconClass}
          fill="none"
          viewBox="0 0 18 18"
        >
          <path
            d="M3 4.5h12v8.25H3zM3 7h12M10.25 9.25l3.25 1.4-1.55.78 1.1 2.12-1.35.7-1.1-2.1-1.35 1.1z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </svg>
      )}

      {type === "visual" && (
        <svg
          aria-hidden="true"
          className={iconClass}
          fill="none"
          viewBox="0 0 18 18"
        >
          <path
            d="M9 3.5l4.25 4.25L9 14.5 4.75 7.75zM9 3.5v4.25M7.5 9.75h3"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </svg>
      )}

      {type === "direction" && (
        <svg
          aria-hidden="true"
          className={iconClass}
          fill="none"
          viewBox="0 0 18 18"
        >
          <path
            d="M9 3.25v2M9 12.75v2M3.25 9h2M12.75 9h2M11.75 6.25l-1.35 4.15-4.15 1.35L7.6 7.6z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </svg>
      )}
    </span>
  );
}

export function CapabilitiesSection() {
  return (
    <section
      aria-labelledby="capabilities-title"
      className="relative h-[1080px] w-full overflow-hidden bg-[#050505] px-[50px] text-white"
      id="capabilities"
    >
      <div className="relative h-full">
        <h2
          className="absolute left-0 top-[61px] font-display text-[clamp(5rem,8.95vw,10.75rem)] font-medium leading-none tracking-normal text-white"
          id="capabilities-title"
        >
          <SplitText text="Capabilities" />
        </h2>

        <p className="absolute right-0 top-[88px] max-w-[506px] text-right font-sans text-2xl font-normal leading-[1.35] text-white [font-weight:400]">
          <SplitText
            mode="words"
            stagger={0.032}
            text="Where development, branding, and interaction come together into one experience."
          />
        </p>

        {capabilities.map((capability, index) => (
          <motion.article
            className={`group absolute flex flex-col justify-between overflow-hidden rounded-[32px] bg-white/[0.001] px-[30px] pb-[38px] pt-[30px] transition-colors duration-300 hover:bg-white/[0.025] ${capability.className}`}
            initial="hidden"
            key={capability.title}
            transition={{
              delay: 0.12 + index * 0.1,
              duration: 0.75,
              ease: [0.22, 1, 0.36, 1],
            }}
            variants={{
              hidden: { opacity: 0, y: 36, filter: "blur(8px)" },
              visible: { opacity: 1, y: 0, filter: "blur(0px)" },
            }}
            viewport={{ amount: 0.42, once: true }}
            whileHover={{ y: -4 }}
            whileInView="visible"
          >
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-[32px] border border-white"
              initial={{ opacity: 0 }}
              transition={{
                delay: 0.42 + index * 0.1,
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ amount: 0.42, once: true }}
              whileInView={{ opacity: 1 }}
            />

            <motion.div
              className="relative z-10 w-fit"
              initial={{ opacity: 0, scale: 0.86 }}
              transition={{
                delay: 0.28 + index * 0.1,
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ amount: 0.42, once: true }}
              whileInView={{ opacity: 1, scale: 1 }}
            >
              <CapabilityIcon type={capability.icon} />
            </motion.div>

            <div className="relative z-10 flex flex-col gap-[18px]">
              <h3 className="font-display text-[32px] font-medium leading-none tracking-normal text-white">
                {capability.title}
              </h3>
              <p
                className={`font-sans text-[17px] font-normal leading-[1.65] text-white [font-weight:400] ${capability.copyWidth}`}
              >
                <SplitText
                  mode="words"
                  stagger={0.018}
                  text={capability.description}
                />
              </p>
            </div>
          </motion.article>
        ))}

        <aside className="absolute left-[700px] top-[641px] h-[347px] w-[304px] overflow-hidden rounded-[32px] bg-[#151515]">
          <div className="absolute left-8 top-[21px] flex items-center gap-2.5">
            <img
              alt=""
              aria-hidden="true"
              className="h-6 w-10 object-contain"
              src="/logo/naj-logo.svg.svg"
            />
            <span className="font-display text-[26px] font-bold leading-none text-white">
              naj
            </span>
          </div>
          <div className="absolute -left-[28px] top-10 flex h-[339px] w-[366px] items-center justify-center">
            <img
              alt=""
              aria-hidden="true"
              className="h-auto w-[300px] opacity-90"
              src="/logo/glass-cloud-logo.png.png"
            />
          </div>
        </aside>
      </div>
    </section>
  );
}
