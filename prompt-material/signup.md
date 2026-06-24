Read `wagents.md` file and follow it strictly.

**Task:** Build the "Join the Atelier" Authentication Page (`signup`) for the LUMIÈRE web application according to the provided design. 
*(Context: This page is accessed via the "Request Access" link on the login page.)*

**Design Constraints:**
- Replicate the provided design pixel-perfectly.
- Match all typography, colors, and layout exactly.
- **Spacing:** Apply generous, Apple-like macro whitespace. The form elements should have plenty of room to breathe. Use large padding and margins to create a calm, ultra-luxury pacing.
- Use the Silk Beige theme defined in `wagents.md` as the underlying aesthetic.
- Preserve the ultra-luxury, Apple-style vibe.
- Implement responsive design (mobile-first). On mobile, the image should likely be hidden or stacked above the form, while the desktop layout must match the 50/50 split shown in the design exactly.

**UI Breakdown (50/50 Split Layout):**

1. **Left Panel (Imagery):**
   - Takes up exactly 50% of the screen width on desktop.
   - **CRITICAL:** You must directly use the local image `lunsignup.jpeg` for this left half. Ensure it covers the entire height of the viewport (`h-screen`) using `object-cover`.
   - "LUMIÈRE" logo (white, Serif font) positioned in the top-left corner of this image panel.

2. **Right Panel (Auth Form):**
   - Background: Clean white or very light Silk Beige.
   - Takes up 50% of the screen width on desktop, centered vertically and horizontally within its container.
   - **Header:**
     - Eyebrow Text: "ESTABLISH YOUR DIGITAL IDENTITY" (Small, uppercase, wide letter-spacing, muted gray color).
     - Primary Heading: "Join the Atelier" (Large, sophisticated Serif font).
   - **Form Fields (Minimalist Apple-style):**
     - "FULL NAME" input (Placeholder: "Full Name").
     - "EMAIL ADDRESS" input (Placeholder: "Email Address").
     - "PASSWORD" input (Placeholder: "Password").
     - Styling: Use clean, minimalist bottom-border inputs (no full bounding boxes), with elegant micro-interactions on focus. Keep the labels small, uppercase, and grey.
   - **Primary Action:**
     - "CREATE ACCOUNT" button (Solid black, fully rounded pill shape).
   - **Divider:**
     - "OR CONTINUE WITH" text centered with thin, elegant horizontal lines extending on both sides.
   - **Social Providers (Stacked):**
     - "CONTINUE WITH APPLE" button (White pill, thin border, Apple logo).
     - "CONTINUE WITH GOOGLE" button (White pill, thin border, Google logo).
   - **Footer Text:**
     - Center text: "Already have an account? **Log in**"
     - Fine print: "BY ESTABLISHING AN IDENTITY, YOU AGREE TO THE TERMS OF SERVICE & PRIVACY POLICY." (Very small, uppercase, muted grey).
     - Copyright: "© 2024 LUMIÈRE" (Positioned at the absolute bottom right of the panel, very small).

**Technical Instructions & Premium Animations:**
- Implement this page in `src/app/(auth)/signup/page.tsx` (using Clerk custom UI if bypassing Clerk's pre-built components, or style Clerk's `<SignUp />` component via their `appearance` prop to match this design exactly).
- **Luxurious Animations (Must Implement):** Use **Framer Motion** or **GSAP** to implement the following ultra-premium interactions:
  1. **Split-Screen Reveal:** On page load, the left image panel should slide/fade in elegantly, while the right form panel smoothly slides in from the opposite direction or fades up with staggered spring physics.
  2. **Staggered Form Entry:** The form elements (Heading, Inputs, Buttons) should stagger-fade upwards into view (`y: 20` to `y: 0`, opacity 0 to 1) with a soft spring animation (`stiffness: 70, damping: 20`).
  3. **Input Focus Polish:** When clicking an input field, the bottom border should elegantly expand its width or color with a smooth, 300ms cubic-bezier transition.
  4. **Magnetic Buttons:** Add a subtle "magnetic" hover effect to the primary "CREATE ACCOUNT" button and the social login buttons.
  5. **Image Parallax/Scale:** Add a very subtle, extremely slow scaling effect (`scale 1.0` to `1.05` over 10-15 seconds) to the left background image to make it feel alive without being distracting.
- Use `next/image` for the heavy imagery, specifically referencing `lunsignup.jpeg` for the left panel. Do not use placeholders; use this exact file.

**Clerk Implementation Rules (CRITICAL):**
- **Authentication Setup:** Use `@clerk/nextjs` for authentication.
- **Middleware:** Ensure `src/proxy.ts` uses `clerkMiddleware()` and matches `'/__clerk/:path*'`.
- **UI Components:** Use the new `<Show>` component instead of the deprecated `<SignedIn>`/`<SignedOut>`. Use `<SignUpButton>` and `<SignInButton>`.
- **App Router:** Use App Router strictly (`app/page.tsx`, `app/layout.tsx`). NEVER reference `_app.tsx` or `pages/` router.
- **Auth API:** Use async/await with `auth()` from `@clerk/nextjs/server`. 
- **Design Alignment:** Since the design is custom, you may need to use Clerk's lower-level APIs to build a custom sign-up form, OR heavily style Clerk's `<SignUp />` component using its `appearance` prop to match the 50/50 split and Apple-style minimalism exactly.

**Do not deviate from the layout shown in the attached image, but elevate it significantly with the premium animations described above.**
