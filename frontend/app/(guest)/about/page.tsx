import AboutPlanetPal from "@/components/about/AboutPlanetPal";
import HeroSection from "@/components/about/HeroSection";
import Partnership from "@/components/home/Partnership";

export default function About() {
  return (
    <main className="w-full flex min-h-screen flex-col overflow-x-hidden">
      <HeroSection />
      <AboutPlanetPal />
      <Partnership />
    </main>
  );
}
