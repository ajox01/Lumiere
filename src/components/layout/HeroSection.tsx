"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { images } from "@/constants/images";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const words = ["See", "The", "Unseen"];

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        wordRefs.current.filter(Boolean),
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1.2,
          stagger: 0.12,
          ease: "power4.out",
          delay: 0.3,
        },
      );

      if (imageRef.current && sectionRef.current) {
        gsap.to(imageRef.current, {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen min-h-[700px] w-full items-center justify-center overflow-hidden"
    >
      <div
        ref={imageRef}
        className="absolute inset-x-0 -top-[10%] h-[120%] w-full"
      >
        <Image
          src={images.heroPortrait}
          alt="Model wearing minimalist LUMIÈRE optical frames"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center grayscale"
        />
        {/* Tints the grayscale photo with a light, skin-toned Silk Beige wash */}
        <div className="absolute inset-0 bg-gradient-to-b from-silk-100/90 via-silk-200/85 to-silk-300/90 mix-blend-color" />
      </div>

      {/* mix-blend-overlay lets the dark glasses frame show through the text at
          the points where they intersect, while staying light over the skin */}
      <div className="relative z-10 mix-blend-overlay">
        <h1 className="flex flex-wrap justify-center gap-x-4 px-6 text-center font-display font-bold leading-none tracking-tighter text-[clamp(3rem,12.5vw,8.5rem)] drop-shadow-[0_8px_30px_rgba(0,0,0,0.7)]">
          {words.map((word, i) => (
            <span key={word} className="overflow-hidden py-2">
              <span
                ref={(el) => {
                  wordRefs.current[i] = el;
                }}
                className="inline-block bg-gradient-to-b from-white via-white to-silk-100 bg-clip-text text-transparent"
              >
                {word}
              </span>
            </span>
          ))}
        </h1>
      </div>
    </section>
  );
}
