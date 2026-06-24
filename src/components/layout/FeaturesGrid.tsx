"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Compass } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function FeaturesGrid() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-card]");
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: i * 0.15,
            // back.out approximates spring physics (~stiffness 70 / damping 20):
            // a gentle overshoot that settles, since GSAP has no native spring model.
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      });
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="mx-auto max-w-[1440px] px-6 py-20 md:px-20 md:py-32">
      <div
        ref={gridRef}
        className="grid auto-rows-[minmax(280px,auto)] grid-cols-1 gap-8 md:grid-cols-12"
      >
        {/* Aerospace Titanium */}
        <div
          data-card
          className="group relative col-span-1 overflow-hidden rounded-lg border border-neutral-200 md:col-span-8 md:row-span-2"
        >
          <div className="absolute inset-0 bg-gradient-metallic-graphite transition-transform duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8 md:p-10">
            <span className="text-caption mb-3 block uppercase tracking-[0.15em] text-white/70">
              Material Innovation
            </span>
            <h2 className="font-display text-h1 text-white">
              Aerospace Titanium
            </h2>
            <p className="text-body-md mt-4 max-w-md text-white/85">
              Featherweight durability engineered for unparalleled comfort.
              The structural integrity of our frames is matched only by
              their minimalist elegance.
            </p>
          </div>
        </div>

        {/* Architectural Precision */}
        <div
          data-card
          className="group relative col-span-1 flex items-center justify-center overflow-hidden rounded-lg border border-neutral-200 bg-white p-8 md:col-span-4 md:row-span-1"
        >
          <div className="text-center">
            <Compass
              className="mx-auto mb-4 h-9 w-9 text-primary-black"
              strokeWidth={1.25}
            />
            <h3 className="font-display text-h3 text-primary-black">
              Architectural Precision
            </h3>
            <p className="text-body-md mt-2 text-neutral-600">
              Every angle calculated.
            </p>
          </div>
        </div>

        {/* Hand-Polished Acetate */}
        <div
          data-card
          className="group relative col-span-1 overflow-hidden rounded-lg border border-neutral-200 md:col-span-4 md:row-span-1"
        >
          <div className="absolute inset-0 bg-gradient-pearl transition-transform duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105" />
          <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px]" />
          <div className="absolute top-0 right-0 p-6 text-right">
            <span className="text-caption mb-2 block uppercase tracking-[0.15em] text-primary-black/60">
              Heritage Craft
            </span>
            <h3 className="font-display text-h3 text-primary-black">
              Hand-Polished
              <br />
              Acetate
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}
