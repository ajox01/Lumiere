"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { Maximize2, Minimize2, RotateCw, Sparkles } from "lucide-react";
import { images } from "@/constants/images";
import { cn } from "@/lib/cn";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Flip);
}

const FINISHES = [
  { id: "silver", label: "Silver", hex: "#C9CDD2" },
  { id: "black", label: "Black", hex: "#161616" },
  { id: "gold", label: "Gold", hex: "#C9A24C" },
] as const;

type FinishId = (typeof FINISHES)[number]["id"];

function CrosshairCorner({
  position,
}: {
  position: "tl" | "tr" | "bl" | "br";
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "absolute h-3 w-3",
        position.startsWith("t") ? "top-0" : "bottom-0",
        position.endsWith("l") ? "left-0" : "right-0",
      )}
    >
      <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-neutral-300" />
      <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-neutral-300" />
    </span>
  );
}

export function VtoHubView() {
  const router = useRouter();
  const { isSignedIn } = useUser();
  const [activeFinish, setActiveFinish] = useState<FinishId>("gold");
  const [isExpanded, setIsExpanded] = useState(false);

  const viewerCardRef = useRef<HTMLDivElement>(null);
  const flipStateRef = useRef<Flip.FlipState | null>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const glassesRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const swatchTrackRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const swatchRefs = useRef<Partial<Record<FinishId, HTMLButtonElement | null>>>(
    {},
  );
  const staggerRefs = useRef<HTMLElement[]>([]);

  const registerStagger = useCallback((el: HTMLElement | null) => {
    if (el && !staggerRefs.current.includes(el)) staggerRefs.current.push(el);
  }, []);

  const positionRing = useCallback((id: FinishId) => {
    const target = swatchRefs.current[id];
    const track = swatchTrackRef.current;
    const ring = ringRef.current;
    if (!target || !track || !ring) return;
    const trackRect = track.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const pad = 6;
    ring.style.width = `${targetRect.width + pad * 2}px`;
    ring.style.height = `${targetRect.height + pad * 2}px`;
    ring.style.left = `${targetRect.left - trackRect.left - pad}px`;
    ring.style.top = `${targetRect.top - trackRect.top - pad}px`;
  }, []);

  const toggleExpand = useCallback(() => {
    if (viewerCardRef.current) {
      flipStateRef.current = Flip.getState(viewerCardRef.current, {
        props: "borderRadius",
      });
    }
    setIsExpanded((value) => !value);
  }, []);

  useLayoutEffect(() => {
    if (!flipStateRef.current) return;
    Flip.from(flipStateRef.current, {
      duration: 0.6,
      ease: "power3.inOut",
      absolute: true,
    });
    flipStateRef.current = null;
  }, [isExpanded]);

  useEffect(() => {
    if (!detailsRef.current) return;
    // Hidden the instant the viewer expands, so it never shows through the
    // backdrop; revealed gradually only once the viewer has mostly collapsed.
    if (isExpanded) {
      gsap.to(detailsRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: "power1.out",
        pointerEvents: "none",
      });
    } else {
      gsap.to(detailsRef.current, {
        opacity: 1,
        duration: 0.9,
        delay: 0.3,
        ease: "power2.out",
        pointerEvents: "auto",
      });
    }
  }, [isExpanded]);

  useEffect(() => {
    if (!isExpanded) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") toggleExpand();
    }
    window.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isExpanded, toggleExpand]);

  useLayoutEffect(() => {
    positionRing(activeFinish);
  }, [activeFinish, positionRing]);

  useEffect(() => {
    const handleResize = () => positionRing(activeFinish);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeFinish, positionRing]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (viewerCardRef.current) {
        gsap.fromTo(
          viewerCardRef.current,
          { opacity: 0, scale: 1.05 },
          { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" },
        );
      }

      gsap.fromTo(
        staggerRefs.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.12,
          delay: 0.3,
          // back.out approximates spring physics (~stiffness 50 / damping 20):
          // a slow, elegant settle, since GSAP has no native spring model.
          ease: "back.out(1.1)",
        },
      );

      if (glassesRef.current && shadowRef.current) {
        const floatTl = gsap.timeline({
          repeat: -1,
          yoyo: true,
          defaults: { duration: 2, ease: "sine.inOut" },
        });
        floatTl.to(glassesRef.current, { y: -10 }, 0);
        floatTl.to(shadowRef.current, { scale: 0.85, opacity: 0.35 }, 0);
      }
    });

    return () => ctx.revert();
  }, []);

  function selectFinish(id: FinishId) {
    if (id === activeFinish || !ringRef.current) return;
    const state = Flip.getState(ringRef.current);
    positionRing(id);
    setActiveFinish(id);
    Flip.from(state, { duration: 0.5, ease: "power3.inOut" });
  }

  function handleRotate() {
    if (!glassesRef.current) return;
    gsap.to(glassesRef.current, {
      rotationY: "+=360",
      duration: 1.1,
      ease: "power2.inOut",
    });
  }

  function handleTryOn() {
    if (!isSignedIn) {
      router.push("/login");
    }
  }

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1440px] px-6 pt-32 pb-20 md:px-20 md:pt-44 md:pb-28">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center lg:gap-28">
          {/* Interactive Viewer */}
          {isExpanded && (
            <div
              aria-hidden
              onClick={toggleExpand}
              className="fixed inset-0 z-[90] bg-primary-black/70 backdrop-blur-sm"
            />
          )}
          <div
            ref={viewerCardRef}
            className={cn(
              "overflow-hidden rounded-[2.5rem] bg-silk-100 lg:col-start-1",
              isExpanded
                ? "fixed inset-6 z-[100] md:inset-12 lg:inset-20"
                : "relative aspect-[4/5] w-full lg:aspect-[6/7]",
            )}
          >
            <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between p-7 md:p-9">
              <span className="text-caption uppercase tracking-[0.2em] text-neutral-600">
                Interactive Viewer
              </span>
              <button
                type="button"
                onClick={toggleExpand}
                aria-label={isExpanded ? "Collapse viewer" : "Expand viewer"}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/70 text-primary-black transition-colors duration-300 hover:bg-white"
              >
                {isExpanded ? (
                  <Minimize2 className="h-4 w-4" strokeWidth={1.5} />
                ) : (
                  <Maximize2 className="h-4 w-4" strokeWidth={1.5} />
                )}
              </button>
            </div>

            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ perspective: "1200px" }}
            >
              <div className="flex flex-col items-center">
                <div
                  ref={glassesRef}
                  style={{ transformStyle: "preserve-3d" }}
                  className="relative"
                >
                  <Image
                    src={images.vtoAuraOptic}
                    alt="Aura Optic gold wireframe aviator glasses"
                    className={cn(
                      "mx-auto h-auto object-contain drop-shadow-[0_25px_40px_rgba(0,0,0,0.15)] transition-[width] duration-500",
                      isExpanded ? "w-[60%] max-w-xl" : "w-[78%] max-w-sm",
                    )}
                    priority
                  />
                </div>
                <div
                  ref={shadowRef}
                  className="mt-6 h-4 w-40 rounded-full bg-black/25 blur-md"
                />
              </div>
            </div>

            <div className="absolute inset-x-0 bottom-7 z-10 flex justify-center md:bottom-9">
              <button
                type="button"
                onClick={handleRotate}
                className="flex items-center gap-2 rounded-full bg-white px-6 py-3 text-button uppercase text-primary-black shadow-md transition-shadow duration-300 hover:shadow-lg"
              >
                360&deg; Rotate
                <RotateCw className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </div>
          </div>

          {/* Product Details */}
          <div
            ref={detailsRef}
            className="flex flex-col items-start lg:col-start-2"
          >
            <span
              ref={registerStagger}
              className="text-caption uppercase tracking-[0.2em] text-neutral-600"
            >
              Series 01 — Titanium Collection
            </span>

            <h1
              ref={registerStagger}
              className="font-display mt-5 text-[clamp(3rem,6vw,5.5rem)] leading-[0.95] text-primary-black"
            >
              Aura Optic
            </h1>

            <div
              ref={registerStagger}
              className="relative mt-10 w-full border border-neutral-200/80 p-8 md:p-10"
            >
              <CrosshairCorner position="tl" />
              <CrosshairCorner position="tr" />
              <CrosshairCorner position="bl" />
              <CrosshairCorner position="br" />

              <p className="text-body-lg text-neutral-700">
                Precision engineered from aerospace-grade brushed titanium.
                The Aura Optic represents the pinnacle of minimalist
                architecture applied to eyewear, balancing weightless
                comfort with enduring structural integrity.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-neutral-200/80 pt-6 text-caption uppercase tracking-[0.15em] text-neutral-600">
                <span className="whitespace-nowrap">Bridge 22 mm</span>
                <span className="h-3 w-px bg-neutral-300" />
                <span className="whitespace-nowrap">Temple Length 145 mm</span>
              </div>
            </div>

            <div ref={registerStagger} className="mt-10 w-full">
              <span className="text-caption uppercase tracking-[0.2em] text-neutral-600">
                Select Finish
              </span>
              <div
                ref={swatchTrackRef}
                className="relative mt-4 flex items-center gap-5"
              >
                <div
                  ref={ringRef}
                  className="pointer-events-none absolute rounded-full border border-primary-black/70"
                />
                {FINISHES.map((finish) => (
                  <button
                    key={finish.id}
                    ref={(el) => {
                      swatchRefs.current[finish.id] = el;
                    }}
                    type="button"
                    aria-label={finish.label}
                    aria-pressed={activeFinish === finish.id}
                    onClick={() => selectFinish(finish.id)}
                    style={{ backgroundColor: finish.hex }}
                    className="h-9 w-9 rounded-full border border-black/10"
                  />
                ))}
              </div>
            </div>

            <div
              ref={registerStagger}
              className="mt-12 flex flex-col items-center gap-4"
            >
              <button
                type="button"
                onClick={handleTryOn}
                className="inline-flex items-center gap-3 rounded-full bg-primary-black px-8 py-4 text-button uppercase text-white transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-[0_20px_45px_rgba(0,0,0,0.35)]"
              >
                <Sparkles
                  className="h-4 w-4 animate-sparkle-shimmer"
                  style={{ animationDelay: "0s" }}
                  fill="currentColor"
                  strokeWidth={1}
                />
                <Sparkles
                  className="h-4 w-4 animate-sparkle-shimmer"
                  style={{ animationDelay: "0.6s" }}
                  fill="currentColor"
                  strokeWidth={1}
                />
                Experience AI Try-On
              </button>
              <span className="text-caption uppercase tracking-[0.15em] text-neutral-500">
                Requires Camera Access
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
