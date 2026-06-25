Read `wagents.md` file and follow it strictly.

**Task:** Build the "Catalog" Page for the LUMIÈRE web application according to the provided design. 
*(Context: This page is linked to and accessed via the "Catalog" button in the navigation bar.)*

**Design Constraints:**
- Replicate the provided `catalog.png` design pixel-perfectly.
- Match all typography, colors, and layout exactly.
- **Spacing:** Apply generous, Apple-like macro whitespace. Elements should have plenty of room to breathe. Use large padding and margins between the header, filter bar, and product grid to create a calm, ultra-luxury pacing.
- Use the Silk Beige theme defined in `wagents.md` as the underlying aesthetic. The background should be a very soft off-white/beige (`#FDF8F4` or similar).
- Implement responsive design (mobile-first). The grid should stack to 1 column on mobile, 2 on tablet, and exactly 3 on desktop.

**UI Breakdown:**

1. **Navigation Bar (Header):**
   - Same frosted glassmorphism pill shape as the landing page.
   - The "Catalog" link should be visually highlighted (e.g., subtle underline) to indicate the active state.

2. **Hero Header:**
   - Centered alignment.
   - Primary Heading: "The Architectural Collection" (Massive, elegant Serif font).
   - Subheading: "Precision crafted eyewear engineered for clarity. A study in minimal form and maximum substance." (Clean sans-serif, muted gray color).

3. **Filter Bar:**
   - A horizontally scrolling (on mobile) or centered (on desktop) list of pill-shaped buttons.
   - Active state ("All Frames"): Solid black pill with white text.
   - Inactive states ("Titanium Series", "Acetate Core", "Sun Protection", "Limited Edition", "Optical"): White pills with thin subtle borders and dark text.
   - Add a subtle bottom border line under the filter bar spanning the container width.

4. **Product Grid:**
   - 3-column layout on desktop.
   - **Product Card:**
     - **Image Container:** A tall, softly rounded rectangle with a very subtle background color. The glasses inside should look like they are floating with a cast shadow underneath.
     - **Badges:** Support an optional "New" badge in the top-left of the image container (small pill shape).
     - **Product Info:** Below the image.
       - Left side: Product Name (e.g., "AERO TITANIUM", small uppercase bold) and Material/Color (e.g., "Brushed Gold / Clear", small muted grey).
       - Right side: Price (e.g., "$450", small, aligned right).
   - *Data:* Use a mock array of 6 products to fill out the grid as shown in the design.

5. **Load More Button:**
   - Centered below the grid.
   - "LOAD MORE PIECES" (White pill, thin border, small uppercase text).

6. **Footer:**
   - Same minimalist layout as the previous pages.

**Technical Instructions & Luxurious Premium Animations:**
- **CRITICAL:** Do NOT modify any existing code, layout, or components that do not need to be modified for this specific feature. Keep your changes tightly scoped to the Catalog page.
- Implement this page in `src/app/(shop)/catalog/page.tsx`.
- **CRITICAL Structure:** Use the exact HTML/Tailwind structural styling patterns from the reference file `catalog.html` (or `code.html`). You MUST carefully translate its custom CSS classes (like `.cinematic-whitespace`, `.glass-overlay`) and **all existing premium CSS-based animations** (e.g., `group-hover:scale-105`, `transition-transform duration-700`, smooth opacity fades) into your Next.js React components. Do not skip any animation present in the HTML reference.
- **Luxurious Animations (Must Implement):** On top of the base HTML animations, use **Framer Motion** or **GSAP** to add the following ultra-premium Apple-like interactions:
  1. **Staggered Text Reveal:** On page load, the header text ("The Architectural Collection") should slide up and fade in smoothly. 
  2. **Active Filter Morph:** When clicking a different category in the filter bar, use Framer Motion's `layoutId` to animate the solid black background pill so it physically glides to the newly selected category.
  3. **Staggered Grid Reveal on Scroll:** As the user scrolls down, the 3-column grid items should slide up from an offset, staggered with a slight delay between each card. Use spring physics (`stiffness: 70, damping: 20`) for an elegant, fluid settling motion.
  4. **Luxurious Hover States:** Extend the HTML image scale effect. On hover, the entire product image should slowly and luxuriously scale up (`scale: 1.05` over 800ms with a custom cubic-bezier easing). 
  5. **Continuous Image Float:** For the glasses inside the product cards, apply a gentle, continuous up-and-down floating animation (`animate={{ y: [0, -5, 0] }}` with `repeat: Infinity, duration: 4, ease: "easeInOut"`). The cast shadow underneath should softly pulse in size/opacity to match the float, creating a faux-3D depth effect.
  6. **Magnetic Load More Button:** Add a subtle "magnetic" pull-and-snap effect to the "LOAD MORE PIECES" button.

- Use `next/image` for the heavy imagery. If you don't have the specific glasses images, use placeholders, but they MUST match the aesthetic (floating glasses with cast shadows on soft backgrounds).

**Do not deviate from the layout shown in the attached image, but elevate it significantly with the premium animations described above.**
