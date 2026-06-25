"use client";

import Link from "next/link";
import { Show, useClerk } from "@clerk/nextjs";
import { ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { MagneticElement } from "@/components/ui/MagneticElement";
import { cn } from "@/lib/cn";

const navLinks = ["Catalog", "VTO Hub", "Editorial", "About"];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const { signOut } = useClerk();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  async function handleSignOut() {
    // Freeze the button as-is until the hard reload lands — once `signOut()`
    // clears the session, Clerk's `<Show>` would otherwise flip it to
    // "Client Access" on this page for a moment before navigation completes.
    setIsSigningOut(true);
    await signOut();
    window.location.href = "/";
  }

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
        <a
          href="/"
          className="font-display text-h3 tracking-tight text-primary-black"
        >
          LUMIÈRE
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((label) => {
            const href =
              label === "Catalog"
                ? "/catalog"
                : label === "VTO Hub"
                  ? "/vtohub"
                  : "#";
            return (
              <MagneticElement key={label} strength={0.35}>
                <Link
                  href={href}
                  className="text-caption font-medium uppercase tracking-[0.15em] text-neutral-600 transition-colors duration-300 hover:text-accent-gold"
                >
                  {label}
                </Link>
              </MagneticElement>
            );
          })}
        </nav>

        <div className="flex items-center gap-6">
          {isSigningOut ? (
            <MagneticElement strength={0.35} className="hidden md:block">
              <button
                type="button"
                disabled
                className="cursor-not-allowed text-caption font-medium uppercase tracking-[0.15em] text-neutral-600"
              >
                Sign Out
              </button>
            </MagneticElement>
          ) : (
            <>
              <Show when="signed-out">
                <MagneticElement strength={0.35} className="hidden md:block">
                  <Link
                    href="/login"
                    className="text-caption font-medium uppercase tracking-[0.15em] text-neutral-600 transition-colors duration-300 hover:text-accent-gold"
                  >
                    Client Access
                  </Link>
                </MagneticElement>
              </Show>
              <Show when="signed-in">
                <MagneticElement strength={0.35} className="hidden md:block">
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="cursor-pointer text-caption font-medium uppercase tracking-[0.15em] text-neutral-600 transition-colors duration-300 hover:text-accent-gold"
                  >
                    Sign Out
                  </button>
                </MagneticElement>
              </Show>
            </>
          )}
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
