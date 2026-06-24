// LUMIÈRE design tokens — single source of truth, mirrored as CSS variables
// in src/styles/globals.css (@theme block). Use this object wherever tokens
// are needed outside Tailwind classes (e.g. Three.js materials, canvas, charts).

export const colors = {
  primary: {
    black: "#111111",
    gold: "#D4BFA1",
    ivory: "#FAF7F5",
    grey: "#E9E9EB",
  },
  silk: {
    50: "#FDF8F4",
    100: "#FAF0E6",
    200: "#F5E6D3",
    300: "#E8D5BF",
    400: "#D4B896",
  },
  neutral: {
    900: "#2B2B2E",
    600: "#6B6B70",
    400: "#A8A8AD",
    200: "#E5E5EA",
    white: "#FFFFFF",
  },
  semantic: {
    success: "#2ECC71",
    warning: "#F5A623",
    error: "#E74C3C",
    info: "#4A90E2",
  },
  accent: {
    gold: "#C8761E",
  },
} as const;

export const gradients = {
  metallicSilver: "linear-gradient(135deg, #6B6B6F 0%, #E8E8EA 50%, #8A8A8D 100%)",
  metallicGraphite: "linear-gradient(135deg, #0F0F10 0%, #4C4C4C 45%, #777777 60%, #6A6B6C 100%)",
  warmBronze: "linear-gradient(135deg, #2B1810 0%, #6B3D22 30%, #C9845C 60%, #FDD69B 80%, #4C2513 100%)",
  pearl: "linear-gradient(135deg, #DEC8B6 0%, #F7EADD 50%, #FEFAF4 100%)",
} as const;

export const typography = {
  fontFamily: {
    display: "var(--font-playfair)",
    sans: "var(--font-inter)",
  },
  scale: {
    h1: { size: "56px", weight: 700, tracking: "-0.02em", leading: 1.1 },
    h2: { size: "36px", weight: 700, tracking: "-0.01em", leading: 1.2 },
    h3: { size: "24px", weight: 600, tracking: "0em", leading: 1.3 },
    h4: { size: "18px", weight: 500, tracking: "0em", leading: 1.4 },
    bodyLg: { size: "16px", weight: 400, tracking: "0em", leading: 1.6 },
    bodyMd: { size: "14px", weight: 400, tracking: "0em", leading: 1.6 },
    bodySm: { size: "12px", weight: 400, tracking: "0em", leading: 1.6 },
    caption: { size: "11px", weight: 400, tracking: "0em", leading: 1.4 },
    button: { size: "14px", weight: 500, tracking: "0.04em", leading: 1 },
  },
} as const;

export const radius = {
  xs: "4px",
  sm: "8px",
  md: "12px",
  lg: "16px",
  full: "9999px",
} as const;

export const shadows = {
  sm: "0px 2px 8px rgba(0, 0, 0, 0.06)",
  md: "0px 8px 24px rgba(0, 0, 0, 0.08)",
  lg: "0px 16px 40px rgba(0, 0, 0, 0.10)",
} as const;

export const theme = {
  colors,
  gradients,
  typography,
  radius,
  shadows,
} as const;
