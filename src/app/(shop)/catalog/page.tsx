import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CatalogView } from "@/components/shop/CatalogView";

export const metadata: Metadata = {
  title: "Catalog | LUMIÈRE",
  description:
    "The Architectural Collection — precision crafted eyewear engineered for clarity.",
};

export default function CatalogPage() {
  return (
    <>
      <Navbar />
      <main>
        <CatalogView />
      </main>
      <Footer />
    </>
  );
}
