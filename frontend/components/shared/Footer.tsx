"use client";

import { LeafyGreenIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { GiPlantsAndAnimals } from "react-icons/gi";

const Footer = () => {
  const [year, setYear] = useState("");

  useEffect(() => {
    const year = new Date().getFullYear();
    setYear(year.toString());
  }, []);

  return (
    <footer className="w-full flex justify-center items-center py-6 bg-color2">
      <p className="text-sm py-4 text-gray-300">
        <GiPlantsAndAnimals className="inline text-color1 text-3xl" /> ©{year}
        <span className=" font-semibold"> PlanetPal</span>, built on Base. All
        rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
