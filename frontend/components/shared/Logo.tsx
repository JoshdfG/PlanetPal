import Link from "next/link";
// import { PiStudentFill } from "react-icons/pi";
// import logo from "/home/josh/Documents/Projects/frontend/public/logo.svg";
// import Image from "next/image";
import { LeafyGreenIcon } from "lucide-react";
import { GiPlantsAndAnimals } from "react-icons/gi";

const Logo = () => {
  return (
    <Link href={`/`} className="flex items-end align-middle ">
      <GiPlantsAndAnimals className="text-color1 md:text-4xl text-3xl" />
      <span className="text-color2 md:text-xl font-semibold">PlanetPal</span>
    </Link>
  );
};

export default Logo;
