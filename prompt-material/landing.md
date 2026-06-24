Read `wagents.md` file and follow it strictly.

**Task:** Build the Landing Page for the LUMIÈRE web application according to the provided design.

**Design Constraints:**
- Replicate the provided design pixel-perfectly.
- Match all typography, colors, and layout exactly.
- **Spacing:** Apply generous, Apple-like macro whitespace. Elements should have plenty of room to breathe. Use large padding/margins between sections to create a calm, ultra-luxury pacing as the user scrolls.
- Use the Silk Beige theme defined in `wagents.md` as the underlying aesthetic.
- Preserve the ultra-luxury, Apple-style vibe.
- Implement responsive design (mobile-first) while ensuring the desktop layout matches the design exactly.
- **Animations:** Implement Apple-style, buttery-smooth micro-animations and scroll effects (using Framer Motion or GSAP). Elements should fade in and slide up gracefully with spring physics as they enter the viewport.

**UI Breakdown:**

1. **Navigation Bar (Header):**
   - Floating, rounded pill shape with a frosted glassmorphism effect (semi-transparent white/beige background with blur).
   - Left: "LUMIÈRE" logo (Serif font).
   - Center Links: "Catalog", "VTO Hub", "Editorial", "About", "Client Access" (small, clean sans-serif font, uppercase/small-caps style).
   - Right: Shopping bag icon.
   - Keep the navigation sticky or floating over the hero section.

2. **Hero Section:**
   - Full-width hero image featuring a large, high-quality grayscale portrait of a model wearing glasses.
   - The primary heading text is "See The Unseen", overlaid directly across the center of the face/glasses. 
   - The text should use a sophisticated Serif font and have a metallic, gradient, or glassmorphism effect, making it pop against the background.
   - Add a subtle parallax effect to the hero background image on scroll.

3. **Features Grid (Below Hero):**
   - Background: Clean white or very light Silk Beige.
   - Layout: Asymmetric grid (1 large card on the left, 2 smaller stacked cards on the right) with precise, consistent gaps.
   - **Left Large Card:**
     - Background: Metallic brushed texture or dark gradient.
     - Content aligned to the bottom-left.
     - Eyebrow text: "Material Innovation" (small, accent color).
     - Title: "Aerospace Titanium" (large Serif font, white).
     - Body: "Featherweight durability engineered for unparalleled comfort. The structural integrity of our frames is matched only by their minimalist elegance." (sans-serif, light gray/white).
   - **Right Top Card:**
     - Background: Clean white/light card with soft shadows.
     - Centered content.
     - Icon: Minimalist architectural caliper/compass icon.
     - Title: "Architectural Precision" (Serif).
     - Body: "Every angle calculated." (sans-serif).
   - **Right Bottom Card:**
     - Background image: Swirling metallic/glass texture (abstract).
     - Content aligned top-right.
     - Eyebrow text: "Heritage Craft".
     - Title: "Hand-Polished Acetate" (Serif, dark/translucent text).

4. **Footer:**
   - Minimalist layout.
   - Left: "LUMIÈRE" logo.
   - Center: "© 2024 Lumière Optical. Architectural Precision in Vision." (small, muted text).
   - Right: Horizontal list of links: "Privacy", "Terms", "Stockists", "Atelier".

**Technical Instructions & Premium Animations:**
- **CRITICAL Structure:** An exact HTML/Tailwind mockup is provided in `code.html`. You MUST use this file as the structural and styling reference. Carefully translate this HTML structure, Tailwind config, and layout into your Next.js React components.
- **Luxurious Animations (Must Implement):** Since the provided `code.html` lacks advanced animations, you must implement the following ultra-premium interactions using **Framer Motion** or **GSAP**:
  1. **Text Reveal:** Use a staggered, word-by-word or character-by-character mask reveal for the hero heading ("See The Unseen") as the page loads. 
  2. **Subtle Parallax:** Tie the `y` position of the hero background image to the user's scroll position, moving it at a slightly different speed than the foreground to create a deep cinematic parallax effect.
  3. **Magnetic Elements:** Add a subtle "magnetic" effect to the navigation links and the shopping bag icon. When the user's cursor approaches, the element should smoothly pull towards the cursor and snap back with spring physics when they leave.
  4. **Smooth Reveal on Scroll:** As the user scrolls down, the bento grid items should not just fade in—they should slide up smoothly from an offset, staggered with a slight delay between each card. Use spring physics (`stiffness: 70, damping: 20`) for an elegant, fluid settling motion.
  5. **Image Scale on Hover:** For image-based cards, implement a slow, luxurious scale-up effect (`scale-105`) over a long duration (e.g., 700ms–1000ms) with a custom cubic-bezier easing (`ease-[cubic-bezier(0.25,1,0.5,1)]`) when hovered.
  6. **Backdrop Blurs:** Ensure all glassmorphism elements (like the navbar and card overlays) smoothly animate their backdrop blur and background opacity on scroll or hover.
- Use Next.js App Router (`src/app/page.tsx`).
- Use `next/image` for the heavy imagery, extracting the image URLs directly from `code.html`.

**Do not deviate from the layout shown in the attached image and `code.html`, but elevate it significantly with the premium animations described above.**
