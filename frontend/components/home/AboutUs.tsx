import { MdOutlineSendTimeExtension } from "react-icons/md";
import { TbLockAccess } from "react-icons/tb";

import Image from "next/image";
import about from "../../public/guest/about.svg";
import { RxValue } from "react-icons/rx";

const AboutUs = () => {
  return (
    <section className="flex flex-col md:gap-12 gap-8 lg:my-36 md:my-20 my-20">
      <div>
        {" "}
        <h1 className="font-bold text-color2 lg:text-4xl md:text-3xl text-3xl text-center">
          About Us
        </h1>
        <div className=" border-2 rounded-full w-[18%] md:w-[12%] border-color2 mx-auto my-2"></div>
      </div>

      <main className="w-full lg:px-20 px-4">
        <p className="text-color2 mt-3 text-sm text-center">
          At PlanetPal, we're passionate about creating a sustainable future.
          Our decentralized platform connects organizations and individuals to
          take action for the environment.
        </p>
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 lg:mt-12 md:mt-8 mt-4">
          <div className="md:w-1/2 w-full">
            <Image
              src={about}
              alt="about"
              className="w-full lg:h-[89%] h-full"
            />
          </div>
          <div className="md:w-1/2 w-full flex flex-col gap-8">
            <div className="flex flex-col cursor-pointer group items-center bg-color2 px-8 py-12 rounded-md">
              <div className="bg-white h-12 w-12 rounded-full flex items-center justify-center text-color2 group-hover:bg-color1">
                <MdOutlineSendTimeExtension className="text-xl text-color2 group-hover:text-white" />
              </div>
              <h1 className="text-white mt-8 font-semibold text-center">
                Our Mission
              </h1>
              <p className="text-gray-200 mt-3 text-sm">
                Businesses, NGOs, and groups can easily create eco-friendly
                campaigns, such as reforestation or waste reduction. This can
                also make the environment clean and more accessible.
              </p>
            </div>
            <div className="flex flex-col cursor-pointer group items-center bg-color2 px-8 py-12 rounded-md">
              <div className="bg-white h-12 w-12 rounded-full flex items-center justify-center text-color2 group-hover:bg-color1">
                <RxValue className="text-xl text-color2 group-hover:text-white" />
              </div>
              <h1 className="text-white mt-8 font-semibold">Our Values</h1>
              <p className="text-gray-200 mt-3 text-sm">
                Transparency, Security, and Sustainability. Participants receive
                rewards once their work is verified, with blockchain technology
                ensuring transparency and secure withdrawals.
              </p>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default AboutUs;
