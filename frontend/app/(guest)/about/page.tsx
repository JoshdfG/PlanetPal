import AboutClassMate from "@/components/about/AboutClassMate";
import HeroSection from "@/components/about/HeroSection";
import Partnership from "@/components/home/Partnership";

export default function About() {
  return (
    <main className="w-full flex min-h-screen flex-col overflow-x-hidden">
      <HeroSection />
      <AboutClassMate />
      <Partnership />
    </main>
  );
}
