"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { MagneticElement } from "@/components/ui/MagneticElement";
import { cn } from "@/lib/cn";

const navLinks = ["Catalog", "VTO Hub", "Editorial", "About"];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-6 z-50 flex justify-center px-6">
      <div
        className={cn(
          "flex w-fit items-center gap-12 rounded-full border border-neutral-200/60 px-8 py-3 backdrop-blur-md transition-all duration-500 ease-out",
          scrolled
            ? "bg-white/85 shadow-md backdrop-blur-xl"
            : "bg-white/60 shadow-none backdrop-blur-md",
        )}
      >
        <Link
          href="/"
          className="font-display text-h3 tracking-tight text-primary-black"
        >
          LUMIÈRE
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((label) => (
            <MagneticElement key={label} strength={0.35}>
              <a
                href="#"
                className="text-caption font-medium uppercase tracking-[0.15em] text-neutral-600 transition-colors duration-300 hover:text-accent-gold"
              >
                {label}
              </a>
            </MagneticElement>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <MagneticElement strength={0.35} className="hidden md:block">
            <Link
              href="/login"
              className="text-caption font-medium uppercase tracking-[0.15em] text-neutral-600 transition-colors duration-300 hover:text-accent-gold"
            >
              Client Access
            </Link>
          </MagneticElement>
          <MagneticElement strength={0.45}>
            <button
              type="button"
              aria-label="Shopping bag"
              className="flex h-9 w-9 items-center justify-center text-primary-black transition-colors duration-300 hover:text-accent-gold"
            >
              <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </MagneticElement>
        </div>
      </div>
    </header>
  );
}
