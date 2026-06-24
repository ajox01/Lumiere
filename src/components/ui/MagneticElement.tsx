"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface MagneticElementProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

export function MagneticElement({
  children,
  strength = 0.4,
  className,
}: MagneticElementProps) {
  const ref = useRef<HTMLDivElement>(null);
  const moveX = useRef<gsap.QuickToFunc | null>(null);
  const moveY = useRef<gsap.QuickToFunc | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    moveX.current = gsap.quickTo(ref.current, "x", {
      duration: 0.6,
      ease: "elastic.out(1, 0.4)",
    });
    moveY.current = gsap.quickTo(ref.current, "y", {
      duration: 0.6,
      ease: "elastic.out(1, 0.4)",
    });
  }, []);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = event.clientX - (rect.left + rect.width / 2);
    const relY = event.clientY - (rect.top + rect.height / 2);
    moveX.current?.(relX * strength);
    moveY.current?.(relY * strength);
  }

  function handleMouseLeave() {
    moveX.current?.(0);
    moveY.current?.(0);
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </div>
  );
}
