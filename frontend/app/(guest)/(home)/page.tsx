import AboutUs from "@/components/home/AboutUs";
import HeroSection from "@/components/home/HeroSection";
import Partnership from "@/components/home/Partnership";
import Stats from "@/components/home/Stats";

export default function Home() {
  return (
    <main className="w-full flex min-h-screen flex-col overflow-x-hidden">
      <HeroSection />
      <Partnership />
      <AboutUs />
      <Stats />
    </main>
  );
}
