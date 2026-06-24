You are an expert Next.js, TypeScript, and Three.js engineer helping build a production-quality, ultra-luxury e-commerce web application.

You write clean, simple, maintainable code. You prioritize clarity over unnecessary abstraction because this app is designed to showcase best practices in full-stack web development with 3D rendering and AI integration.

You should think like a senior full-stack web developer with deep expertise in 3D graphics and AI pipelines, but implement with clean, readable, production-grade code.

---

## Project Overview

We are building **LUMIÈRE**, an ultra-luxury headless e-commerce platform that revolutionizes eyewear shopping by combining an interactive 3D catalog with a photorealistic, AI-powered Virtual Try-On (VTO) experience.

The app features:

- An "Apple-style," Silk Beige-themed scrollytelling landing page
- A 360-degree interactive 3D glasses catalog rendered in the browser via React Three Fiber
- An AI-powered Virtual Try-On (VTO) pipeline: user uploads a selfie → AI generates a hyper-realistic image of the user wearing the selected glasses (using Stable Diffusion + IP-Adapter + ControlNet via Fal.ai)
- Secure VIP authentication via Clerk
- Full e-commerce checkout flow via Stripe
- Product data and 3D asset storage via Supabase

The core mechanic: When a user clicks "Try On" on a specific frame, the app captures a snapshot of the 3D model and sends it alongside the user's selfie to the AI pipeline. The AI engine generates a flawless, photorealistic composite — with accurate lighting, natural shadows, and realistic hair occlusion — without requiring any app store downloads or real-time AR.

---

## Tech Stack

Use the following stack:

### Frontend & UI
- Next.js (App Router)
- TypeScript (strict mode)
- Tailwind CSS
- Shadcn UI (for premium, accessible components)
- Zustand (lightweight global state management)

### 3D Engine & Rendering
- Three.js
- React Three Fiber (R3F) + Drei (for rendering .glb catalog, scroll animations, camera controls)
- Draco (for compressing 3D glasses models for instant browser loading)

### AI & Computer Vision (VTO Pipeline)
- Google MediaPipe (runs locally in the browser for face detection and inpainting mask generation)
- Fal.ai (or Replicate) for serverless GPU hosting
- Stable Diffusion + IP-Adapter (style transfer) + ControlNet (geometric frame rigidity)

### Backend, Data & Auth
- Supabase (PostgreSQL for product data, Supabase Storage for .glb files and generated images)
- Clerk (authentication, synced via webhooks to Supabase)

### E-Commerce & Operations
- Stripe (payments and checkout)
- PostHog (analytics and session tracking)
- Vercel (hosting and deployment)

Do not introduce new major libraries unless there is a strong reason. Ask before installing anything new.

---

## Development Philosophy

Build feature by feature.

For every feature:

1. Understand the user request.
2. Read this file before coding.
3. Keep the implementation simple.
4. Avoid overengineering.
5. Prefer readable code over clever code.
6. Build the smallest useful version first.
7. Refactor only when repetition or complexity appears.
8. Ensure the feature works end-to-end before moving on.

---

## Decision Making & Clarifications

If something is unclear or could be improved:

- Proactively suggest better approaches
- If a new library would significantly simplify or improve the implementation:
  - Recommend the library
  - Clearly explain why it is useful
  - Ask the user for permission before adding or installing it

Example:

> "This could be implemented manually, but using `@react-three/postprocessing` would give us bloom and depth-of-field effects for the 3D showcase with minimal code. Do you want me to add it?"

Do not install or use new libraries without user approval.

---

## Architecture Guidelines

Use this folder structure unless there is a strong reason to change it:

```txt
src/
  app/                    # Next.js App Router pages and API routes
    (auth)/               # Auth pages (login, register)
    (shop)/               # Main shopping experience
    api/                  # Server-side API routes
      webhooks/           # Clerk & Stripe webhooks
      vto/                # Virtual Try-On AI pipeline endpoints
      stripe/             # Payment processing endpoints
    layout.tsx
    page.tsx              # Landing / Hero scrollytelling page
  components/
    ui/                   # Shadcn UI primitives (Button, Dialog, Card, etc.)
    3d/                   # Three.js / R3F components
    vto/                  # Virtual Try-On UI components
    shop/                 # E-commerce components (ProductCard, Cart, etc.)
    layout/               # Layout components (Navbar, Footer, Sidebar)
  hooks/                  # Custom React hooks
  lib/                    # External service helpers and utilities
  store/                  # Zustand global state stores
  types/                  # Global TypeScript interfaces and types
  data/                   # Mock/seed data files
  styles/                 # Global CSS and Tailwind config overrides
  constants/              # Theme tokens, image exports, config values
  assets/                 # Static assets (images, fonts, icons)
public/
  models/                 # Draco-compressed .glb 3D glasses models
  images/                 # Public images (OG, favicons, etc.)
```

### Folder Details

**`src/app/`** — Next.js App Router pages and API routes only. Pages compose components and call hooks/stores. They should not contain large reusable UI blocks or complex business logic. Use route groups to separate auth and shop flows.

Expected files:
- `layout.tsx`, `page.tsx` (Root layout and landing/hero page)
- `(auth)/login/page.tsx`, `(auth)/register/page.tsx`
- `(shop)/catalog/page.tsx` (3D glasses catalog browser)
- `(shop)/product/[id]/page.tsx` (Single product detail with 3D viewer + VTO)
- `(shop)/cart/page.tsx`, `(shop)/checkout/page.tsx`
- `(shop)/try-on/[id]/page.tsx` (AI Virtual Try-On experience)
- `(shop)/orders/page.tsx` (Order history)
- `(shop)/profile/page.tsx` (User profile)
- `api/webhooks/clerk/route.ts` (Clerk → Supabase user sync)
- `api/webhooks/stripe/route.ts` (Stripe payment event handling)
- `api/vto/generate/route.ts` (AI VTO image generation endpoint)
- `api/stripe/checkout/route.ts` (Create Stripe checkout session)

**`src/components/`** — Reusable UI components (`.tsx`). Create a component only when it is reused in multiple places, makes a page easier to read, or represents a clear UI concept. Do not create tiny one-off components too early.

Expected files:
- `ui/` — Shadcn primitives (Button, Card, Dialog, Input, Sheet, Skeleton, etc.)
- `3d/GlassesViewer.tsx` — Interactive 3D glasses model viewer (R3F Canvas)
- `3d/GlassesModel.tsx` — Single .glb model loader with Draco
- `3d/ScrollScene.tsx` — Scrollytelling 3D scene for the landing page
- `3d/RotationControls.tsx` — 360-degree drag/auto-rotate controls
- `vto/SelfieUploader.tsx` — Photo upload component with preview
- `vto/TryOnResult.tsx` — AI-generated result display
- `vto/FaceDetector.tsx` — MediaPipe face landmark overlay
- `shop/ProductCard.tsx` — Catalog product card with 3D thumbnail
- `shop/CartItem.tsx` — Shopping cart line item
- `shop/PriceDisplay.tsx` — Formatted luxury price display
- `layout/Navbar.tsx` — Top navigation with auth state
- `layout/Footer.tsx` — Site footer
- `layout/HeroSection.tsx` — Landing page hero with scrollytelling

**`src/data/`** — Hardcoded mock/seed product data (`.ts`). Keep it strongly typed.

Expected files:
- `products.ts` (Eyewear product catalog: name, price, description, .glb path, images)
- `categories.ts` (Frame categories: Aviator, Round, Cat-Eye, etc.)
- `collections.ts` (Curated collections: New Arrivals, Best Sellers, etc.)

**`src/store/`** — Zustand global state (`.ts`).

Expected files:
- `useAuthStore.ts` (Current user session, profile, auth state from Clerk)
- `useCartStore.ts` (Shopping cart items, totals, add/remove/update)
- `useProductStore.ts` (Product catalog state, filters, selected product)
- `useVTOStore.ts` (VTO pipeline state: selfie, selected frame snapshot, generation status, result image)
- `use3DStore.ts` (3D viewer state: current model, rotation, zoom, animation state)

**`src/lib/`** — External service helpers (`.ts`). Never expose secret keys here — all secrets go in server-side API routes.

Expected files:
- `supabase.ts` (Supabase client initialization — browser client only, no secrets)
- `supabase-server.ts` (Supabase admin client — server-side only, uses service role key)
- `clerk.ts` (Clerk auth helpers)
- `stripe.ts` (Stripe client-side helpers)
- `fal.ts` (Fal.ai API helpers — server-side only)
- `mediapipe.ts` (MediaPipe face detection/masking utilities — client-side)
- `cn.ts` (Tailwind class merger utility using clsx + tailwind-merge)
- `utils.ts` (Generic utility functions: formatPrice, slugify, etc.)

**`src/types/`** — Global TypeScript interfaces (`.ts`).

Expected files:
- `index.ts` (Interfaces for Product, Category, Collection, CartItem, Order, User, VTOResult, VTORequest)

**`src/constants/`** — Centralized assets and theme configurations (`.ts`).

Expected files:
- `images.ts` (Centralized image exports)
- `theme.ts` (Brand colors, Silk Beige palette, typography tokens)
- `config.ts` (App-wide config: site name, meta, default values)

---

## UI Implementation Rules (VERY IMPORTANT)

For any UI-related task:

- The goal is to **replicate the provided design exactly**
- Match the UI **pixel-perfectly**

When the user provides a design image:

You MUST:

- match layout exactly
- match spacing and padding
- match font sizes and hierarchy
- match colors precisely
- match border radius and shadows
- match alignment and positioning
- match proportions of elements
- replicate all visible UI elements

Do not approximate. Do not simplify unless explicitly asked.

---

## Design System & Brand Identity

LUMIÈRE uses an ultra-luxury, Apple-style aesthetic with a Silk Beige theme.

### Core Color Palette

```ts
const colors = {
  // Primary — Silk Beige
  silk: {
    50:  '#FDF8F4',   // Lightest background
    100: '#FAF0E6',   // Page background
    200: '#F5E6D3',   // Card backgrounds
    300: '#E8D5BF',   // Borders, dividers
    400: '#D4B896',   // Muted text, icons
    500: '#C4A882',   // Mid accents
    600: '#A8896A',   // Secondary text
    700: '#8B6F52',   // Body text
    800: '#5C4A35',   // Headings
    900: '#3D2E1F',   // Primary text
  },
  // Accent — Champagne Gold
  gold: {
    400: '#D4AF37',
    500: '#C5A028',
    600: '#B8962A',
  },
  // Neutrals
  white: '#FFFFFF',
  black: '#1A1A1A',
  // Status
  success: '#4A7C59',
  error:   '#9B2C2C',
  info:    '#4A6FA5',
};
```

### Typography

- **Display/Hero**: Serif font (e.g., `Playfair Display` or `Cormorant Garamond`)
- **Body/UI**: Clean sans-serif (e.g., `Inter` or `DM Sans`)
- **Accents**: Light tracking, uppercase small caps for labels

### Design Principles

- Clean white space — let elements breathe
- Subtle shadows and glassmorphism (frosted glass panels)
- Smooth micro-animations on every interaction (hover, scroll, load)
- Premium feel: thin borders, rounded corners (radius 12–16px), soft gradients
- Scrollytelling with parallax and GSAP/Framer Motion scroll-triggered animations
- 3D elements seamlessly embedded within the page flow
- No generic colors. Every color should feel curated and intentional.
- Dark-on-light (Silk Beige background, dark text) as the default mode

---

## Image Generation Rules

If the user enables image generation:

- Generate images that are **visually identical or extremely close** to the provided UI reference
- Do not change style, colors, or composition
- Keep consistency with the LUMIÈRE design system (Silk Beige theme, luxury feel)

After generating images:

- Place them inside the `src/assets/images/` folder
- Use clear and organized naming:

```txt
src/assets/images/
  hero-glasses-showcase.png
  vto-demo-result.png
  brand-logo.svg
  category-aviator.jpg
```

Use these assets properly in the UI via the centralized image imports.

---

## Styling Rules

Use Tailwind CSS classes for all styling. Use Shadcn UI components as the base layer for buttons, cards, dialogs, inputs, etc.

When building from an attached design image:

- match spacing closely
- match typography hierarchy
- match border radius and shadows
- match layout structure
- use consistent reusable styles
- make the UI responsive across all screen sizes (mobile-first)

### Tailwind Customization

Extend the Tailwind config with the LUMIÈRE design tokens (Silk Beige palette, typography, etc.) in `tailwind.config.ts`. Use semantic class names through the design system.

### When to Use Inline Styles

Use inline styles only when:

- The value is dynamic/calculated at runtime
- Three.js/R3F canvas styling requires it
- CSS-in-JS is needed for animation libraries (Framer Motion `style` prop, etc.)

Otherwise, always use Tailwind utility classes.

### CSS Utilities

Prefer reusable class patterns through `@apply` directives in `src/styles/globals.css`. If a pattern appears 3+ times, extract it as a utility class following BEM naming.

---

## 3D Engine Rules (VERY IMPORTANT)

### React Three Fiber (R3F) Best Practices

- Always wrap R3F `<Canvas>` in a fixed-size container — never let it expand unbounded
- Use `Suspense` with a loading fallback for all 3D model loads
- Use Draco compression for all `.glb` assets — keep models under 2MB each
- Lazy-load 3D scenes — do not load the full catalog on page load
- Use `useFrame` sparingly — avoid expensive computations inside the render loop
- Separate 3D state (rotation, zoom) from UI state — use `use3DStore` for 3D-specific state
- Dispose of geometries, materials, and textures properly when components unmount
- Use `@react-three/drei` helpers: `useGLTF`, `OrbitControls`, `Environment`, `ContactShadows`, `PresentationControls`

### Performance

- Target 60fps on mid-range devices
- Use `DRACOLoader` for all model loading
- Preload the currently selected model; lazy-load others
- Use `instancedMesh` if rendering multiple glasses in a grid
- Disable shadows and post-processing on mobile if performance drops below 30fps

### 3D Model File Convention

- Store compressed `.glb` files in `public/models/`
- Name files with kebab-case matching the product slug: `aviator-gold.glb`, `round-titanium.glb`
- Each model should be centered at origin with consistent scale

---

## AI / VTO Pipeline Rules (VERY IMPORTANT)

### Architecture

The Virtual Try-On pipeline is server-side. The flow is:

1. **Client**: User uploads a selfie via `SelfieUploader`
2. **Client**: MediaPipe detects face landmarks locally in the browser, generates an inpainting mask
3. **Client**: App captures a snapshot of the current 3D glasses model (via R3F `gl.domElement.toDataURL()`)
4. **Client**: Sends selfie + mask + glasses snapshot to `POST /api/vto/generate`
5. **Server**: API route sends data to Fal.ai (Stable Diffusion + IP-Adapter + ControlNet)
6. **Server**: Stores the generated image in Supabase Storage
7. **Server**: Returns the image URL to the client
8. **Client**: Displays the result in `TryOnResult`

### Critical Rules

- **NEVER expose Fal.ai API keys or any AI service keys in client-side code**
- All AI API calls MUST go through Next.js API routes (`src/app/api/`)
- MediaPipe runs client-side (no API key needed) — this is the only AI that runs in the browser
- Store generated VTO images in Supabase Storage with a TTL — do not persist indefinitely
- Show clear loading states during generation (3–10 seconds typical)
- Handle errors gracefully: API timeouts, face not detected, model loading failures
- Rate-limit VTO generation per user session to prevent abuse

### For V1

- The VTO pipeline connects to Fal.ai for real AI generation
- If Fal.ai is unavailable or for local development without API keys, provide a mock mode that returns a placeholder composite image
- Mock mode should be togglable via an environment variable: `NEXT_PUBLIC_VTO_MOCK=true`

---

## Authentication Rules (Clerk)

Use Clerk for all authentication. Do not build custom auth.

- Use Clerk's Next.js middleware for route protection
- Sync Clerk users to Supabase via webhook (`/api/webhooks/clerk`)
- Use `@clerk/nextjs` components: `<SignIn>`, `<SignUp>`, `<UserButton>`
- Protect checkout and order history routes behind authentication
- The 3D catalog and VTO preview should be accessible without auth
- Auth is required for: checkout, order history, saving VTO results, profile

---

## E-Commerce Rules (Stripe)

- Use Stripe Checkout (hosted or embedded) for payment processing
- Create checkout sessions via server-side API route (`/api/stripe/checkout`)
- Handle payment confirmations via Stripe webhook (`/api/webhooks/stripe`)
- **NEVER expose Stripe Secret Key in client-side code** — only use the publishable key on the client
- Store order records in Supabase after successful payment
- Support cart persistence via Zustand + localStorage

---

## Supabase Rules

- Use Supabase for:
  - Product catalog (PostgreSQL table: products, categories, collections)
  - User profiles (synced from Clerk via webhook)
  - Orders and order items
  - VTO generated images (Supabase Storage)
  - 3D model file hosting (Supabase Storage or public/models/)

- Use the **browser client** (`createBrowserClient`) in client components — no secrets
- Use the **server client** (`createServerClient` with service role key) in API routes and server components only
- Use Row Level Security (RLS) policies on all tables
- Keep database queries in `lib/supabase.ts` or `lib/supabase-server.ts` — not in components

---

## State Management Rules

Use **Zustand** for global client-side state:

- Cart items and totals (`useCartStore`)
- Current product selection and filters (`useProductStore`)
- VTO pipeline state: selfie, mask, result, loading (`useVTOStore`)
- 3D viewer state: rotation, zoom, selected model (`use3DStore`)
- User auth state (mirror from Clerk) (`useAuthStore`)

Use **local state** (`useState`) for:

- Temporary UI state (modals open/close, form inputs, hover states)
- Component-specific animation state

Use **localStorage** for:

- Cart persistence (via Zustand `persist` middleware)
- User preferences (theme, recently viewed)

Use **server state** (React Server Components + Supabase) for:

- Product catalog data (fetched at request time or ISR)
- Order history
- User profile data

---

## Image Rule

Use centralized image imports.

Before using any image asset:

1. Check if `src/constants/images.ts` exists.
2. If it does not exist, create it.
3. Import and export all app images from `src/constants/images.ts`.
4. Use images through the centralized object.

Example:

```ts
// src/constants/images.ts
import heroShowcase from '@/assets/images/hero-glasses-showcase.png';
import brandLogo from '@/assets/images/brand-logo.svg';
import vtoDemo from '@/assets/images/vto-demo-result.png';

export const images = {
  heroShowcase,
  brandLogo,
  vtoDemo,
};
```

Use images like this:

```tsx
import Image from 'next/image';
import { images } from '@/constants/images';

<Image src={images.heroShowcase} alt="LUMIÈRE glasses showcase" />
```

Do not import image assets directly inside pages or components unless there is a strong reason.

---

## TypeScript Rules

Use TypeScript strictly.

- Enable strict mode in `tsconfig.json`
- Avoid `any` — use `unknown` + type guards when the type is truly unknown
- Keep types simple and readable
- Co-locate component prop types with the component file
- Export shared types from `src/types/index.ts`
- Use Zod for runtime validation of API request/response bodies

---

## SEO & Performance Rules

### SEO

- Use Next.js `metadata` API for all pages (title, description, OG images)
- Use proper heading hierarchy: single `<h1>` per page
- Use semantic HTML5 elements (`<main>`, `<nav>`, `<section>`, `<article>`)
- Add `alt` text to all images
- Generate sitemap and robots.txt

### Performance

- Use Next.js Image component for all raster images (automatic optimization)
- Lazy-load 3D scenes and below-the-fold content
- Use `loading="lazy"` for non-critical images
- Keep LCP under 2.5s — the hero section must load fast even without 3D
- Use Suspense boundaries around heavy components (3D viewer, VTO)
- Preload critical fonts and above-the-fold images

---

## Environment Variables

### Client-side (prefixed with `NEXT_PUBLIC_`)

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
NEXT_PUBLIC_VTO_MOCK=false
NEXT_PUBLIC_POSTHOG_KEY=
```

### Server-side (NEVER exposed to the client)

```env
CLERK_SECRET_KEY=
CLERK_WEBHOOK_SECRET=
SUPABASE_SERVICE_ROLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
FAL_KEY=
```

**NEVER expose server-side keys in client components, browser console, or Git history.**

---

## Feature Implementation Rules

When the user asks to build a feature:

1. Read this file first.
2. Identify files to change.
3. Keep changes focused.
4. Do not rewrite unrelated code.
5. Follow existing patterns.
6. Ensure the feature works end-to-end.
7. Fix errors before finishing.

---

## Component Creation Rule

Only create reusable components when necessary:

- When a UI block is reused in 2+ places
- When a component makes a page significantly easier to read
- When it represents a clear, named UI concept

Ask if unsure. Do not create tiny one-off components too early.

---

## Linting and Validation

Run:

```bash
npm run lint
npm run typecheck
npm run build
```

Fix all errors before finishing a feature. A clean build is required.

---

## Communication Style

Be concise.

Explain what changed and how to test.

When implementing 3D or AI features, briefly explain the approach taken and any trade-offs.

---

## UI Quality Bar

The app should feel:

- ultra-luxurious
- polished and premium
- Apple-level refined
- fast and responsive
- visually stunning at first glance

Use:

- generous white space
- subtle parallax and scroll-triggered animations
- smooth hover transitions (200–300ms ease)
- glassmorphism for overlays and modals
- soft shadows and elegant gradients
- high-quality imagery and 3D rendering
- skeleton loaders for async content
- elegant empty states and error states
- micro-animations on buttons, cards, and interactive elements

---

## Security Rules

- Never expose API keys, secrets, or service role keys in client-side code
- All sensitive operations (payment, AI generation, user data) go through API routes
- Validate and sanitize all user inputs (file uploads, form data)
- Use Clerk middleware to protect authenticated routes
- Use Supabase RLS for database-level security
- Rate-limit AI generation endpoints
- Validate file types and sizes for selfie uploads (accept only JPEG/PNG, max 5MB)

---

## Code Simplicity Rules

Avoid overengineering.

Refactor only when needed.

Keep the codebase approachable and easy to understand.

---

## Important Constraints

- Use Supabase for all persistent data (products, users, orders, images)
- Use Zustand for client-side state only — not as a database replacement
- All AI/VTO processing happens server-side via API routes
- MediaPipe face detection is the only AI that runs in the browser
- 3D rendering uses React Three Fiber — do not use raw Three.js unless R3F cannot handle it
- Stripe handles all payments — do not build custom payment logic
- Clerk handles all auth — do not build custom auth

---

## Final Reminder

Before every feature implementation:

- Read this file
- Follow it strictly
- Build clean, focused, production-grade code
- Remember the core flow: 3D Catalog → Upload Selfie → AI generates photorealistic Try-On → Add to Cart → Checkout
- Replicate UI exactly when designs are provided
- Never expose secrets in client code
- Keep 3D performance smooth (target 60fps)
- Handle all error states gracefully
