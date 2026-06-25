Read `wagents.md` file and follow it strictly.

**Task:** Build the "VTO Hub" (Virtual Try-On product page) for the LUMIÈRE web application according to the provided design.
*(Context: This page is accessed via the "VTO HUB" link in the navigation bar.)*

**Design Constraints:**
- Replicate the provided design pixel-perfectly.
- Match all typography, colors, and layout exactly.
- **Spacing:** Apply generous, Apple-like macro whitespace. The layout should feel open, breathable, and highly editorial. Use substantial padding between the left viewer and right product details to create a calm, ultra-luxury pacing.
- Use the Silk Beige theme defined in `wagents.md` as the underlying aesthetic. Background should be pure white or the lightest Silk Beige (`#FDF8F4`).
- Implement responsive design (mobile-first). On mobile, the Interactive Viewer should stack above the product details.

**UI Breakdown:**

1. **Navigation Bar (Header):**
   - Same frosted glassmorphism pill shape as the landing page.
   - "VTO HUB" link should be visually highlighted (e.g., a subtle underline or darker text) to indicate active state.

2. **Main Content (Split Layout):**
   - **Left Panel (Interactive Viewer):**
     - Takes up roughly 50% of the screen width on desktop.
     - Background: A soft, light beige rounded card.
     - Top Left: "INTERACTIVE VIEWER" (Small, uppercase, grey).
     - Top Right: Expand/Fullscreen icon.
     - Center: A high-quality 3D render of "Aura Optic" gold wireframe aviator glasses hovering over a subtly lit floor plane with a soft cast shadow.
     - Bottom Center: A white, floating pill button with "360° ROTATE" and rotation arrow icons.
   - **Right Panel (Product Details):**
     - Takes up roughly 40-50% of the screen width, aligned cleanly to the left.
     - Eyebrow Text: "SERIES 01 - TITANIUM COLLECTION" (Small, uppercase, muted gray).
     - Primary Heading: "Aura Optic" (Massive, elegant Serif font).
     - **Details Box:**
       - A very subtle, ultra-thin border with faint corner accent marks (crosshairs).
       - Description: "Precision engineered from aerospace-grade brushed titanium. The Aura Optic represents the pinnacle of minimalist architecture applied to eyewear, balancing weightless comfort with enduring structural integrity." (Clean, readable sans-serif).
       - Specs (Bottom of box): "BRIDGE 22 mm" | "TEMPLE LENGTH 145 mm".
     - **Finishes:**
       - "SELECT FINISH" label.
       - Three circular color swatches (Silver, Black, Gold).
       - Active state: The selected swatch has a slightly larger thin outer ring.
     - **Primary Action:**
       - "EXPERIENCE AI TRY-ON" button (Solid black, fully rounded pill shape).
       - Include two sparkling star icons to the left of the text.
     - **Footer Text:** "REQUIRES CAMERA ACCESS" (Small, uppercase, grey, centered under the button).

3. **Footer:**
   - Same minimalist layout as the landing page.

**Technical Instructions & Premium Luxurious Animations:**
- Implement this page in `src/app/(shop)/vtohub/page.tsx`.
- **CRITICAL for V1:** For now, do NOT implement React Three Fiber (R3F) or Three.js. Instead, use the exact local mock image file `lunettevto.png` inside a standard `next/image` tag. Ensure the image is perfectly centered within the left panel. We will replace this image with the live 3D `.glb` canvas in a future step.
- **Luxurious Animations (Must Implement):** Use **Framer Motion** or **GSAP** to implement the following ultra-premium interactions:
  1. **Continuous Image Float:** Apply a gentle, continuous up-and-down floating animation to the static glasses image using Framer Motion (`animate={{ y: [0, -10, 0] }}` with `repeat: Infinity, duration: 4, ease: "easeInOut"`). If possible, create a separate subtle cast shadow `div` below it that scales and fades based on the floating motion to fake depth.
  3. **Staggered Editorial Reveal:** On page load, the right-side text elements (Eyebrow, Title, Details Box, Finishes, Button) should stagger-fade upwards into view (`y: 30` to `y: 0`, opacity 0 to 1) with an elegant, slow spring animation (`stiffness: 50, damping: 20`).
  4. **Active Swatch Morph:** When clicking a different color swatch, use Framer Motion's `layoutId` to animate the thin outer selection ring so it physically jumps and morphs around the newly selected color flawlessly.
  5. **AI Sparkle Shimmer:** The star icons inside the "EXPERIENCE AI TRY-ON" button should have an infinite, very subtle pulsing/shimmering CSS keyframe animation. On button hover, the black button should scale up infinitesimally (`scale: 1.02`) with a heavy drop-shadow, inviting the user to click.
  6. **Viewer Entrance:** The left Interactive Viewer card should fade in while slowly scaling down from `1.05` to `1.0` over 1.2 seconds, giving a deep cinematic entrance.

**Do not deviate from the layout shown in the attached image, but elevate it significantly with the premium Apple-like animations described above.**
