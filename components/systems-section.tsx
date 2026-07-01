"use client";

import Link from "next/link";
import { memo, useCallback, useRef, useState } from "react";
import { systems, type SystemProject } from "@/data/systems";
import { SplitText } from "@/components/split-text";

const marqueeSystems = [...systems, ...systems];

type SystemButtonProps = {
  index: number;
  isSelected: boolean;
  onSelect: (index: number) => void;
  realIndex: number;
  system: SystemProject;
};

const SystemButton = memo(function SystemButton({
  index,
  isSelected,
  onSelect,
  realIndex,
  system,
}: SystemButtonProps) {
  return (
    <button
      aria-hidden={index >= systems.length}
      aria-pressed={isSelected}
      className={`group flex h-[210px] w-full cursor-pointer items-center justify-between gap-8 border-b border-white/16 px-[18px] py-0 text-left transition-colors duration-200 hover:bg-white/[0.025] lg:px-5 ${
        isSelected ? "text-white" : "text-white/50"
      }`}
      onClick={() => onSelect(realIndex)}
      tabIndex={index >= systems.length ? -1 : 0}
      type="button"
    >
      <span className="flex items-baseline gap-5">
        <span className="font-display text-[clamp(3rem,3.35vw,4rem)] font-medium leading-none tracking-normal transition-opacity duration-200 group-hover:opacity-100">
          {realIndex + 1}.
        </span>
        <span className="font-display text-[clamp(3rem,3.35vw,4rem)] font-medium leading-none tracking-normal transition-opacity duration-200 group-hover:opacity-100">
          {system.title}
        </span>
      </span>
      <span
        className={`hidden shrink-0 font-sans text-[15px] font-normal leading-none [font-weight:400] lg:block ${
          isSelected ? "text-white/70" : "text-white/35"
        }`}
      >
        {system.year}
      </span>
    </button>
  );
});

export function SystemsSection() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [isPreviewVisible, setIsPreviewVisible] = useState(true);
  const transitionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const selectedSystem = systems[previewIndex];

  const handleSystemSelect = useCallback((index: number) => {
    if (index === selectedIndex) return;

    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
    }

    setSelectedIndex(index);
    setIsPreviewVisible(false);

    transitionTimeoutRef.current = setTimeout(() => {
      setPreviewIndex(index);
      setIsPreviewVisible(true);
    }, 180);
  }, [selectedIndex]);

  return (
    <section
      aria-labelledby="systems-title"
      className="h-auto min-h-[1080px] w-full overflow-hidden bg-[#050505] text-white lg:h-[1080px]"
      id="systems"
    >
      <div className="flex h-full max-w-none flex-col">
        <h2
          className="px-[50px] pt-[61px] text-center font-display text-[clamp(5rem,8.95vw,10.75rem)] font-medium leading-none tracking-normal text-white"
          id="systems-title"
        >
          <SplitText text="Systems" />
        </h2>

        <div className="mt-[72px] grid h-[700px] grid-cols-1 overflow-hidden border-y border-white/16 lg:grid-cols-[35%_65%]">
          <aside className="order-2 flex min-h-[560px] flex-col border-white/16 px-[50px] py-8 lg:order-1 lg:border-r">
            <div
              className={`flex items-start justify-between gap-6 pb-7 transition-[opacity,transform] duration-300 ease-out ${
                isPreviewVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-3 opacity-0"
              }`}
            >
              <div>
                <p className="font-display text-[32px] font-medium leading-[1.05] text-white">
                  {selectedSystem.title}
                </p>
                <p className="mt-4 max-w-[420px] font-sans text-[17px] font-normal leading-[1.45] text-white/60 [font-weight:400]">
                  {selectedSystem.subtitle}
                </p>
              </div>
              <p className="shrink-0 font-sans text-[15px] font-normal leading-none text-white/55 [font-weight:400]">
                {selectedSystem.year}
              </p>
            </div>

            <div className="group relative mt-8 aspect-video w-full overflow-hidden rounded-[18px] border border-white/14 bg-[#101010]">
              <div
                className={`absolute inset-0 transition-[opacity,transform] duration-300 ease-out ${
                  isPreviewVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                }`}
              >
                <img
                  alt={`${selectedSystem.title} preview`}
                  className="h-full w-full object-cover object-top opacity-65"
                  decoding="async"
                  loading="lazy"
                  src={selectedSystem.image}
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/35 to-black/70 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                />
                <Link
                  href={`/systems/${selectedSystem.slug}`}
                  className="absolute left-1/2 top-1/2 inline-flex h-[50px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white bg-black/35 px-6 font-sans text-[15px] font-normal leading-none text-white opacity-0 transition-[opacity,background-color,color] duration-200 [font-weight:400] hover:bg-white hover:text-[#050505] group-hover:opacity-100"
                >
                  {selectedSystem.buttonLabel}
                </Link>
              </div>
            </div>

            <div
              className={`mt-7 flex flex-wrap gap-x-8 gap-y-3 font-sans text-[16px] font-normal uppercase leading-none tracking-normal text-white/58 transition-[opacity,transform] duration-300 ease-out [font-weight:400] ${
                isPreviewVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-2 opacity-0"
              }`}
            >
              {selectedSystem.stack.map((item) => (
                <span className="inline-flex items-center" key={item}>
                  <span aria-hidden="true" className="mr-1.5">
                    &bull;
                  </span>
                  {item}
                </span>
              ))}
            </div>
          </aside>

          <div className="order-1 lg:order-2">
            <div className="systems-list-marquee border-t border-white/16 lg:border-t-0">
              {marqueeSystems.map((system, index) => {
                const realIndex = index % systems.length;
                const isSelected = realIndex === selectedIndex;

                return (
                  <SystemButton
                    index={index}
                    isSelected={isSelected}
                    key={`${system.title}-${index}`}
                    onSelect={handleSystemSelect}
                    realIndex={realIndex}
                    system={system}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
