"use client";
import Image from "next/image";
import hero from "../../public/guest/hero.svg";
import { Button } from "../ui/button";
import { MdRocketLaunch } from "react-icons/md";
import { useRouter } from "next/navigation";

const HeroSection = () => {
  const router = useRouter();
  const handleAppLaunch = () => {
    router.push("/programme");
  };
  return (
    <section className="w-full mt-20 lg:h-[550px] md:h-[450px] relative grid md:grid-cols-2 gap-6 md:gap-0 lg:px-16 px-4 lg:py-12 md:py-0 py-10">
      <div className="absolute w-full h-full">
        <Image
          src={hero}
          alt="HeroImage"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
        />
      </div>
      <main className="md:h-full flex flex-col justify-center items-start md:gap-8 gap-4 md:pr-8 z-10">
        <h1 className="lg:text-5xl md:text-3xl text-2xl text-white font-bold">
          Empowering Eco-Friendly Campaigns
        </h1>
        <p className="text-white md:text-lg">
          Join the Green Revolution: Participate, Make an Impact, and Earn
          Rewards for a Better Tomorrow.
        </p>
        {/* <Button
          type="button"
          className="text-white bg-color1 hover:bg-color2 flex items-center gap-1"
          onClick={handleAppLaunch}
        >
          Launch App <MdRocketLaunch className="text-xl" />
        </Button> */}
      </main>
    </section>
  );
};

export default HeroSection;
