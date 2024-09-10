import Image from "next/image";
import aboutUs from "../../public/guest/green_land.png";
import { Button } from "../ui/button";
import { MdRocketLaunch } from "react-icons/md";

const HeroSection = () => {
  return (
    <>
      <section className="w-full mt-20 lg:h-[550px] md:h-[450px] grid md:grid-cols-2 gap-6 md:gap-0 lg:px-16 px-4 lg:py-12 md:py-0 py-10 relative z-10">
        <main className="md:h-full flex flex-col justify-center items-center">
          <div className="w-full lg:h-[500px] md:h-[400px] h-[300px]">
            <Image
              src={aboutUs}
              alt="HeroImage"
              width={368}
              height={622}
              quality={100}
              className="w-full h-full object-contain"
              priority
            />
          </div>
        </main>
        <main className="md:h-full flex flex-col justify-center items-start md:gap-6 gap-4 md:pr-8">
          <h1 className="lg:text-5xl md:text-3xl text-2xl text-color2 font-bold">
            Empowering a Sustainable Future with Planet Pal
          </h1>
          <p className="text-color3 md:text-lg">
            Our mission is to inspire and enable individuals, communities, and
            organizations to adopt eco-friendly habits and practices, promoting
            a healthier planet for all. Join us in our vision to create a world
            where sustainability and technology unite for a brighter future.
          </p>
        </main>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute bottom-0 left-0 -z-10 "
          viewBox="0 0 1440 320"
        >
          <path
            fill="#725d1d23"
            fillOpacity="1"
            d="M0,192L48,165.3C96,139,192,85,288,80C384,75,480,117,576,144C672,171,768,181,864,208C960,235,1056,277,1152,261.3C1248,245,1344,171,1392,133.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </section>
      {/* <div className="patternbg w-full lg:h-7 h-6"></div> */}
    </>
  );
};

export default HeroSection;
