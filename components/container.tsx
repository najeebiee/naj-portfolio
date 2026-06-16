import type { ComponentPropsWithoutRef } from "react";

type ContainerProps = {
  className?: string;
} & ComponentPropsWithoutRef<"div">;

export function Container({
  children,
  className = "",
  ...props
}: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full max-w-none px-[50px] ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
