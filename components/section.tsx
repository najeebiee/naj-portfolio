import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Container } from "@/components/container";

type SectionProps = {
  children?: ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
} & Omit<ComponentPropsWithoutRef<"section">, "children" | "className" | "id">;

export function Section({
  children,
  className = "",
  containerClassName = "",
  id,
  ...props
}: SectionProps) {
  return (
    <section
      className={`h-[1080px] border-t border-line py-24 sm:py-32 lg:py-40 ${className}`}
      id={id}
      {...props}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
