import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/layout/HeroSection";
import { FeaturesGrid } from "@/components/layout/FeaturesGrid";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesGrid />
      </main>
      <Footer />
    </>
  );
}
