import { GiJourney } from "react-icons/gi";
import { GrTechnology } from "react-icons/gr";
import { RiTeamLine } from "react-icons/ri";
import { RxValue } from "react-icons/rx";
import { SiPagespeedinsights } from "react-icons/si";
import { TbDeviceVisionPro } from "react-icons/tb";

const AboutPlanetPal = () => {
  return (
    <section className="flex flex-col md:gap-12 gap-8 lg:my-36 md:my-20 my-20">
      <h1 className="font-bold text-color2 lg:text-4xl md:text-3xl text-3xl text-center">
        Mission and Vision of PlanetPal
      </h1>
      <main className="w-full grid lg:grid-cols-3 md:grid-cols-2 lg:gap-8 md:gap-6 gap-8 lg:px-20 px-4">
        {planetPals.map((item) => (
          <div
            className="flex flex-col cursor-pointer group items-start bg-color2 px-8 py-12 rounded-md"
            key={item.id}
          >
            <div className="bg-white h-12 w-12 rounded-full flex items-center justify-center text-color2 group-hover:bg-color1">
              {item.icon}
            </div>
            <h1 className="text-white mt-8 font-semibold">{item.title}</h1>
            <p className="text-gray-200 mt-3 text-sm">{item.text}</p>
          </div>
        ))}
      </main>
    </section>
  );
};

export default AboutPlanetPal;

type PlanetPalContent = {
  id: number;
  title: string;
  text: string;
  icon: JSX.Element;
};

const planetPals: PlanetPalContent[] = [
  {
    id: 1,
    title: "Our Mission",
    text: "Join the movement to protect our planet. Our mission is to promote sustainable practices, reduce waste, and conserve natural resources.",
    icon: (
      <SiPagespeedinsights className="text-xl text-color2 group-hover:text-white" />
    ),
  },
  {
    id: 2,
    title: "Our Vision",
    text: "We envision a future where individuals, communities, and organizations work together to create a more sustainable world.",
    icon: (
      <TbDeviceVisionPro className="text-xl text-color2 group-hover:text-white" />
    ),
  },
  {
    id: 3,
    title: "Our Technology",
    text: "We leverage technology to promote eco-friendly habits, reduce carbon footprint, and conserve natural resources.",
    icon: (
      <GrTechnology className="text-xl text-color2 group-hover:text-white" />
    ),
  },
  {
    id: 4,
    title: "Our Team",
    text: "Meet the dedicated professionals passionate about creating innovative solutions for a sustainable future.",
    icon: <RiTeamLine className="text-xl text-color2 group-hover:text-white" />,
  },
  {
    id: 5,
    title: "Our Values",
    text: "We value reduce, reuse, recycle, conserve, and collaboration to achieve a more sustainable world.",
    icon: <RxValue className="text-xl text-color2 group-hover:text-white" />,
  },
  {
    id: 6,
    title: "Our Journey",
    text: "Learn about our journey, milestones, and continuous efforts to promote sustainability and protect our planet.",
    icon: <GiJourney className="text-xl text-color2 group-hover:text-white" />,
  },
];
