import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { VtoHubView } from "@/components/vto/VtoHubView";

export const metadata: Metadata = {
  title: "VTO Hub — Aura Optic | LUMIÈRE",
  description:
    "Explore the Aura Optic in an interactive viewer and experience photorealistic AI virtual try-on.",
};

export default function VtoHubPage() {
  return (
    <>
      <Navbar />
      <main>
        <VtoHubView />
      </main>
      <Footer />
    </>
  );
}
