"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { images } from "@/constants/images";
import { cn } from "@/lib/cn";
import { MagneticElement } from "@/components/ui/MagneticElement";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Flip, ScrollTrigger);
}

const CATEGORIES = [
  "All Frames",
  "Titanium Series",
  "Acetate Core",
  "Sun Protection",
  "Limited Edition",
  "Optical",
] as const;

type Category = (typeof CATEGORIES)[number];

const CATEGORY_COLORS: Record<Category, string> = {
  "All Frames": "#111111",
  "Titanium Series": "#71757c",
  "Acetate Core": "#7c4a2d",
  "Sun Protection": "#3d2b1a",
  "Limited Edition": "#c8761e",
  Optical: "#38597a",
};

interface Product {
  id: string;
  name: string;
  detail: string;
  price: string;
  category: Category;
  image: typeof images.catalogFrame1;
  isNew?: boolean;
  cardHeightClass: string;
  offsetClass?: string;
}

const PRODUCTS: Product[] = [
  {
    id: "aero-titanium",
    name: "Aero Titanium",
    detail: "Brushed Gold / Clear",
    price: "$450",
    category: "Titanium Series",
    image: images.catalogFrame1,
    isNew: true,
    cardHeightClass: "h-[500px]",
  },
  {
    id: "monolith-sun",
    name: "Monolith Sun",
    detail: "Matte Black / Obsidian Lens",
    price: "$380",
    category: "Sun Protection",
    image: images.catalogFrame2,
    cardHeightClass: "h-[400px]",
    offsetClass: "mt-12 md:mt-24",
  },
  {
    id: "orbit-optical",
    name: "Orbit Optical",
    detail: "Brushed Silver / Clear",
    price: "$420",
    category: "Optical",
    image: images.catalogFrame3,
    cardHeightClass: "h-[550px]",
  },
  {
    id: "lucid-frame",
    name: "Lucid Frame",
    detail: "Champagne Acetate / Clear",
    price: "$350",
    category: "Acetate Core",
    image: images.catalogFrame4,
    isNew: true,
    cardHeightClass: "h-[420px]",
    offsetClass: "md:mt-16",
  },
  {
    id: "apex-sun",
    name: "Apex Sun",
    detail: "Dark Tortoise / Brown Gradient",
    price: "$410",
    category: "Sun Protection",
    image: images.catalogFrame5,
    cardHeightClass: "h-[480px]",
  },
  {
    id: "strato-aviator",
    name: "Strato Aviator",
    detail: "Gunmetal / Clear",
    price: "$480",
    category: "Limited Edition",
    image: images.catalogFrame6,
    cardHeightClass: "h-[380px]",
    offsetClass: "md:mt-32",
  },
];

export function CatalogView() {
  const [activeCategory, setActiveCategory] = useState<Category>("All Frames");

  const heroRefs = useRef<HTMLElement[]>([]);
  const registerHero = useCallback((el: HTMLElement | null) => {
    if (el && !heroRefs.current.includes(el)) heroRefs.current.push(el);
  }, []);

  const trackRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Partial<Record<Category, HTMLButtonElement | null>>>(
    {},
  );

  const gridSectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLElement[]>([]);
  const glassesRefs = useRef<HTMLDivElement[]>([]);
  const shadowRefs = useRef<HTMLDivElement[]>([]);
  const hasMountedGrid = useRef(false);

  const registerCard = useCallback((el: HTMLElement | null) => {
    if (el && !cardRefs.current.includes(el)) cardRefs.current.push(el);
  }, []);
  const registerGlasses = useCallback((el: HTMLDivElement | null) => {
    if (el && !glassesRefs.current.includes(el)) glassesRefs.current.push(el);
  }, []);
  const registerShadow = useCallback((el: HTMLDivElement | null) => {
    if (el && !shadowRefs.current.includes(el)) shadowRefs.current.push(el);
  }, []);

  const visibleProducts =
    activeCategory === "All Frames"
      ? PRODUCTS
      : PRODUCTS.filter((product) => product.category === activeCategory);

  const positionPill = useCallback((category: Category) => {
    const target = buttonRefs.current[category];
    const track = trackRef.current;
    const pill = pillRef.current;
    if (!target || !track || !pill) return;
    const trackRect = track.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    pill.style.width = `${targetRect.width}px`;
    pill.style.height = `${targetRect.height}px`;
    pill.style.left = `${targetRect.left - trackRect.left}px`;
    pill.style.top = `${targetRect.top - trackRect.top}px`;
    pill.style.backgroundColor = CATEGORY_COLORS[category];
  }, []);

  useLayoutEffect(() => {
    positionPill(activeCategory);
  }, [activeCategory, positionPill]);

  useEffect(() => {
    const handleResize = () => positionPill(activeCategory);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeCategory, positionPill]);

  function selectCategory(category: Category) {
    if (category === activeCategory || !pillRef.current) return;
    const state = Flip.getState(pillRef.current, { props: "backgroundColor" });
    positionPill(category);
    setActiveCategory(category);
    Flip.from(state, { duration: 0.4, ease: "power2.out" });
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroRefs.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          delay: 0.1,
        },
      );
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    cardRefs.current = [];
    glassesRefs.current = [];
    shadowRefs.current = [];
  }, [activeCategory]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (cardRefs.current.length > 0) {
        gsap.fromTo(
          cardRefs.current,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.12,
            // back.out approximates spring physics (stiffness ~70 / damping ~20):
            // GSAP has no native spring model, so this is the closest elegant settle.
            ease: "back.out(1.1)",
            ...(hasMountedGrid.current
              ? {}
              : {
                  scrollTrigger: {
                    trigger: gridSectionRef.current,
                    start: "top 85%",
                  },
                }),
          },
        );
      }
      hasMountedGrid.current = true;

      glassesRefs.current.forEach((glasses, index) => {
        const shadow = shadowRefs.current[index];
        if (!glasses || !shadow) return;
        const floatTl = gsap.timeline({
          repeat: -1,
          yoyo: true,
          defaults: { duration: 4, ease: "sine.inOut" },
        });
        floatTl.to(glasses, { y: -5 }, 0);
        floatTl.to(shadow, { scale: 0.85, opacity: 0.35 }, 0);
      });
    });

    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <div className="bg-silk-50">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-16 px-6 pb-16 pt-40 md:gap-32 md:px-20 md:pb-32 md:pt-48">
        {/* Header */}
        <section className="flex flex-col items-center gap-8 text-center">
          <h1
            ref={registerHero}
            className="font-display max-w-3xl text-[40px] leading-[1.15] tracking-[-0.01em] text-primary-black md:text-[64px]"
          >
            The Architectural Collection
          </h1>
          <p
            ref={registerHero}
            className="max-w-2xl text-body-lg text-neutral-600"
          >
            Precision crafted eyewear engineered for clarity. A study in
            minimal form and maximum substance.
          </p>
        </section>

        {/* Filter Bar */}
        <section ref={registerHero} className="relative w-full">
          <div
            ref={trackRef}
            className="scrollbar-hide relative flex gap-4 overflow-x-auto border-b border-neutral-200/60 pb-4 md:justify-center"
          >
            <div
              ref={pillRef}
              className="pointer-events-none absolute z-10 rounded-full"
            />
            {CATEGORIES.map((category) => {
              const isActive = category === activeCategory;
              return (
                <button
                  key={category}
                  ref={(el) => {
                    buttonRefs.current[category] = el;
                  }}
                  type="button"
                  onClick={() => selectCategory(category)}
                  className="group relative shrink-0 whitespace-nowrap rounded-full px-6 py-2 text-caption font-medium uppercase tracking-[0.1em]"
                >
                  {/* Fill sits below the sliding pill so the pill stays visible
                      while it sweeps across an inactive button's background. */}
                  <span
                    className={cn(
                      "absolute inset-0 z-0 rounded-full border transition-colors duration-300",
                      isActive
                        ? "border-transparent"
                        : "border-neutral-200 bg-white group-hover:border-neutral-400",
                    )}
                  />
                  <span
                    className={cn(
                      "relative z-20 transition-colors duration-300",
                      isActive
                        ? "text-white"
                        : "text-neutral-700 group-hover:text-primary-black",
                    )}
                  >
                    {category}
                  </span>
                </button>
              );
            })}
          </div>
          <div className="pointer-events-none absolute right-0 top-0 h-[calc(100%-1rem)] w-12 bg-gradient-to-l from-silk-50 to-transparent md:hidden" />
        </section>

        {/* Masonry Product Grid */}
        <section ref={gridSectionRef} className="columns-1 gap-x-8 md:columns-2 lg:columns-3">
          {visibleProducts.map((product) => (
            <article
              key={product.id}
              ref={registerCard}
              className={cn(
                "group mb-8 cursor-pointer break-inside-avoid",
                product.offsetClass,
              )}
            >
              <div
                className={cn(
                  "relative flex items-center justify-center overflow-hidden rounded-2xl border border-neutral-200/60 bg-silk-100 p-8 transition-transform duration-500 hover:scale-[1.02]",
                  product.cardHeightClass,
                )}
              >
                {product.isNew ? (
                  <span className="absolute left-4 top-4 z-20 rounded-full bg-primary-black px-3 py-1 text-[10px] uppercase tracking-widest text-white">
                    New
                  </span>
                ) : null}
                <div className="pointer-events-none absolute inset-0 z-0 bg-silk-200/60 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative z-10 flex h-full w-full flex-col items-center justify-center transition-transform duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-2 group-hover:scale-105">
                  <div ref={registerGlasses} className="relative w-full max-w-[260px]">
                    <Image
                      src={product.image}
                      alt={`${product.name} — ${product.detail}`}
                      className="h-auto w-full object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.08)]"
                    />
                  </div>
                  <div
                    ref={registerShadow}
                    className="mt-5 h-3 w-28 rounded-full bg-black/15 blur-md"
                  />
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-2 px-2">
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-body-sm font-bold uppercase tracking-widest text-primary-black">
                    {product.name}
                  </h2>
                  <span className="whitespace-nowrap text-body-sm text-neutral-500">
                    {product.price}
                  </span>
                </div>
                <p className="text-body-sm text-neutral-500">{product.detail}</p>
              </div>
            </article>
          ))}
        </section>

        {/* Load More */}
        <div className="flex justify-center">
          <MagneticElement strength={0.3}>
            <button
              type="button"
              className="rounded-full border border-neutral-300 bg-white px-8 py-4 text-button uppercase tracking-[0.1em] text-primary-black transition-colors duration-300 hover:border-primary-black"
            >
              Load More Pieces
            </button>
          </MagneticElement>
        </div>
      </div>
    </div>
  );
}
