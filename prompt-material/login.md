Read `wagents.md` file and follow it strictly.

**Task:** Build the "Client Access" Authentication Page (`login`) for the LUMIÈRE web application according to the provided design. 
*(Context: This page is linked to and accessed via the "Client Access" button on the landing page you built previously.)*

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
   - A large, high-quality, edge-to-edge abstract macro photograph (swirling, polished glass/acetate with rich amber and dark tones).
   - Ensure the image covers the entire height of the viewport (`h-screen`).

2. **Right Panel (Auth Form):**
   - Background: Clean white or very light Silk Beige.
   - Takes up 50% of the screen width on desktop, centered vertically and horizontally within its container.
   - **Header:**
     - "LUMIÈRE" logo (Serif font) at the top.
     - Primary Heading: "Client Access" (Large, sophisticated Serif font).
     - Subheading: "Enter your details to view your atelier appointments and bespoke selections." (Clean sans-serif, muted gray color).
   - **Form Fields (Minimalist Apple-style):**
     - "EMAIL ADDRESS" input.
     - "PASSWORD" input.
     - Styling: Use clean, minimalist bottom-border inputs (no full bounding boxes), with elegant micro-interactions on focus.
   - **Form Utilities:**
     - Left: "Remember me" (small clean radio/checkbox).
     - Right: "FORGOT PASSWORD?" (small, uppercase, wide letter-spacing).
   - **Primary Action:**
     - "CONTINUE" button (Solid black, fully rounded pill shape).
   - **Divider:**
     - "OR" text centered with thin, elegant horizontal lines extending on both sides.
   - **Social Providers:**
     - "CONTINUE WITH GOOGLE" button (White pill, thin border, Google logo).
     - "CONTINUE WITH APPLE" button (White pill, thin border, Apple logo).
   - **Footer Text:**
     - "Don't have an account? **Request Access**"

**Technical Instructions & Premium Animations:**
- Implement this page in `src/app/(auth)/login/page.tsx` (using Clerk custom UI if bypassing Clerk's pre-built components, or style Clerk's `<SignIn />` component via their `appearance` prop to match this design exactly).
- **Luxurious Animations (Must Implement):** Use **Framer Motion** or **GSAP** to implement the following ultra-premium interactions:
  1. **Split-Screen Reveal:** On page load, the left image panel should slide/fade in elegantly, while the right form panel smoothly slides in from the opposite direction or fades up with staggered spring physics.
  2. **Staggered Form Entry:** The form elements (Logo, Heading, Subheading, Inputs, Buttons) should stagger-fade upwards into view (`y: 20` to `y: 0`, opacity 0 to 1) with a soft spring animation (`stiffness: 70, damping: 20`).
  3. **Input Focus Polish:** When clicking an input field, the bottom border should elegantly expand its width or color with a smooth, 300ms cubic-bezier transition.
  4. **Magnetic Buttons:** Add a subtle "magnetic" hover effect to the primary "CONTINUE" button and the social login buttons.
  5. **Image Parallax/Scale:** Add a very subtle, extremely slow scaling effect (`scale 1.0` to `1.05` over 10-15 seconds) to the left background image to make it feel alive without being distracting.
- Use `next/image` for the heavy imagery. If the specific swirling glass image is missing, use a placeholder or generate one that matches the dark, rich amber/glass aesthetic exactly.

**Clerk Implementation Rules (CRITICAL):**
- **Authentication Setup:** Use `@clerk/nextjs` for authentication.
- **Middleware:** Create `src/proxy.ts` (NOT `middleware.ts`) and use `clerkMiddleware()` from `@clerk/nextjs/server`. Ensure the matcher includes `'/__clerk/:path*'` so Clerk's auto-proxy path is routed.
- **Provider:** Add `<ClerkProvider>` inside the `<body>` tag in `src/app/layout.tsx`.
- **UI Components:** Use the new `<Show>` component instead of the deprecated `<SignedIn>`/`<SignedOut>`. Use `when="signed-in"` or `when="signed-out"`. Use `<SignInButton>`, `<SignUpButton>`, and `<UserButton>`.
- **App Router:** Use App Router strictly (`app/page.tsx`, `app/layout.tsx`). NEVER reference `_app.tsx` or `pages/` router.
- **Auth API:** Use async/await with `auth()` from `@clerk/nextjs/server`. Do not use deprecated APIs like `withAuth` or the old `currentUser`.
- **Design Alignment:** Since the design in `screen_auth.png` is custom, you may need to use Clerk's lower-level APIs to build a custom sign-in form, OR heavily style Clerk's `<SignIn />` component using its `appearance` prop to match the 50/50 split and Apple-style minimalism exactly.

**Do not deviate from the layout shown in the attached image, but elevate it significantly with the premium animations described above.**
