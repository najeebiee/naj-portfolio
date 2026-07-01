"use client";

import { motion, useReducedMotion } from "framer-motion";

type SplitTextProps = {
  className?: string;
  delay?: number;
  mode?: "characters" | "words";
  stagger?: number;
  text: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

const wordVariants = {
  hidden: { opacity: 0, y: "0.82em" },
  visible: { opacity: 1, y: "0em" },
};

const charVariants = {
  hidden: { opacity: 0, y: "0.82em" },
  visible: { opacity: 1, y: "0em" },
};

export function SplitText({
  className,
  delay = 0,
  mode = "characters",
  stagger = 0.018,
  text,
}: SplitTextProps) {
  const shouldReduceMotion = useReducedMotion();
  const words = text.split(" ");

  if (shouldReduceMotion) {
    return <span className={className}>{text}</span>;
  }

  return (
    <motion.span
      aria-label={text}
      className={className}
      initial="hidden"
      viewport={{ amount: 0.55, once: true }}
      whileInView="visible"
    >
      {mode === "words" ? (
        words.map((word, index) => (
          <span
            className="inline-block overflow-hidden align-baseline"
            key={`${word}-${index}`}
          >
            <motion.span
              aria-hidden="true"
              className="inline-block will-change-transform"
              variants={wordVariants}
              transition={{ delay: delay + index * stagger, duration: 0.78, ease }}
            >
              {word}
            </motion.span>
            {index < words.length - 1 && (
              <span aria-hidden="true" className="inline-block">
                &nbsp;
              </span>
            )}
          </span>
        ))
      ) : (
        words.map((word, wordIndex) => (
          <span
            className="inline-block whitespace-nowrap align-baseline"
            key={`${word}-${wordIndex}`}
          >
            {Array.from(word).map((character, characterIndex) => {
              const absoluteIndex =
                words
                  .slice(0, wordIndex)
                  .reduce((count, currentWord) => count + currentWord.length, 0) +
                wordIndex +
                characterIndex;

              return (
                <span
                  className="inline-block overflow-hidden align-baseline"
                  key={`${character}-${wordIndex}-${characterIndex}`}
                >
                  <motion.span
                    aria-hidden="true"
                    className="inline-block will-change-transform"
                    custom={absoluteIndex}
                    variants={charVariants}
                    transition={{
                      delay: delay + absoluteIndex * stagger,
                      duration: 0.82,
                      ease,
                    }}
                  >
                    {character}
                  </motion.span>
                </span>
              );
            })}
            {wordIndex < words.length - 1 && (
              <span aria-hidden="true" className="inline-block">
                &nbsp;
              </span>
            )}
          </span>
        ))
      )}
    </motion.span>
  );
}
