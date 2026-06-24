# Project Dependencies Setup

This prompt is designed to initialize the project and install all required dependencies for the **LUMIÈRE** web application. 

**Instructions for the AI:**
Read `wagents.md` (the AGENTS.md equivalent for this project) first and follow it strictly. Then, read the constraints and dependencies below. Run the appropriate terminal commands to set up the Next.js project and install all the listed libraries. After installation, configure the basic providers (Clerk, Supabase, etc.) if required.

---

## 1. Dependencies to Install

Run the following commands inside your existing `lumiere-app` directory to install the core tech stack:

### UI & Styling
```bash
npm install clsx tailwind-merge class-variance-authority lucide-react
# Shadcn UI will be initialized later via CLI
```

### 3D Engine & Rendering
```bash
npm install three @react-three/fiber @react-three/drei
npm install -D @types/three
```

### State Management
```bash
npm install zustand
```

### Authentication & Backend
```bash
npm install @clerk/nextjs
npm install @supabase/supabase-js @supabase/ssr
```

### Payments & Analytics
```bash
npm install stripe @stripe/stripe-js
npm install posthog-js
```

### AI & Computer Vision (VTO Pipeline)
```bash
npm install @fal-ai/serverless-client
npm install @mediapipe/tasks-vision
```

### Utilities
```bash
npm install zod
```

---

## 3. Dependency Documentation

*(Add links to the official documentation or specific code snippets for each library below as a reference for the AI during development)*

### Next.js & React
- **Docs:** [Next.js App Router Documentation](https://nextjs.org/docs)
- **Notes:** Use Server Components by default. Add `"use client"` only when necessary (e.g., for Three.js Canvas or interactive UI).

### Three.js & React Three Fiber
- **R3F Docs:** [https://docs.pmnd.rs/react-three-fiber](https://docs.pmnd.rs/react-three-fiber)
- **Drei Docs:** [https://github.com/pmndrs/drei](https://github.com/pmndrs/drei)
- **Notes:** 
  - Paste any specific `Canvas` setup or `Suspense` loading examples here.
  - Paste Draco loader configuration here.

### Zustand
- **Docs:** [https://docs.pmnd.rs/zustand](https://docs.pmnd.rs/zustand)
- **Notes:** Paste your standard store setup here (e.g., `useCartStore`, `useVTOStore`).

### Clerk Authentication
- **Docs:** [https://clerk.com/docs](https://clerk.com/docs)
- **Notes:** Paste the middleware setup and `ClerkProvider` implementation here.

### Supabase
- **Docs:** [https://supabase.com/docs](https://supabase.com/docs)
- **Notes:** Paste snippets for server-side (`@supabase/ssr`) and client-side initialization here.

### Stripe
- **Docs:** [https://stripe.com/docs](https://stripe.com/docs)
- **Notes:** Paste checkout session creation logic here.

### Fal.ai (AI Pipeline)
- **Docs:** [https://fal.ai/docs](https://fal.ai/docs)
- **Notes:** Paste the specific Stable Diffusion + IP Adapter + ControlNet endpoint configuration here.

### Google MediaPipe
- **Docs:** [https://developers.google.com/mediapipe](https://developers.google.com/mediapipe)
- **Notes:** Paste the face landmark detection initialization and mask generation logic here.

### Shadcn UI
- **Docs:** [https://ui.shadcn.com/docs](https://ui.shadcn.com/docs)
- **Notes:** List the specific Shadcn components to install via CLI (e.g., `npx shadcn-ui@latest add button card dialog ...`).
