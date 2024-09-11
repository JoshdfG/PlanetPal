"use client";
import { useCallback, useEffect, useRef } from "react";
import { IoIosArrowRoundBack, IoIosLogOut } from "react-icons/io";
import { RxDashboard } from "react-icons/rx";
import { GrCertificate, GrScorecard } from "react-icons/gr";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  MdAssignment,
  MdEventSeat,
  MdRecentActors,
  MdUploadFile,
} from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { sideLinksAd } from "@/utils/SidebarAD";
import { PiStudentLight } from "react-icons/pi";
import { PiStudentFill } from "react-icons/pi";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { GiGiftOfKnowledge, GiPlantsAndAnimals } from "react-icons/gi";
import { FaHandshake } from "react-icons/fa6";
import { BiTransfer } from "react-icons/bi";

const SideBar = ({
  sidebarOpen,
  setSidebarOpen,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const trigger = useRef(null);
  const sidebar = useRef(null);

  const { open } = useWeb3Modal();

  const pathname = usePathname();
  const router = useRouter();

  const handleCloseSideBar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const toggleScroll = () => {
      document.body.style.overflow = sidebarOpen ? "hidden" : "auto";
    };
    toggleScroll();

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [sidebarOpen]);

  const renderIcons = useCallback((element: number) => {
    switch (element) {
      case 0:
        return <RxDashboard />;
      case 1:
        return <PiStudentLight />;
      case 2:
        return <MdRecentActors />;
      case 3:
        return <FaHandshake />;
      case 4:
        return <MdEventSeat />;
      case 5:
        return <MdUploadFile />;
      case 6:
        return <FiSettings />;
      default:
        return "";
    }
  }, []);

  return (
    <aside
      ref={sidebar}
      className={`absolute font-barlow left-0 top-0 z-[9999] flex h-screen w-72 flex-col overflow-y-hidden bg-color2 duration-300 ease-linear lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex flex-col gap-2 font-barlow px-6 py-8 lg:py-6.5">
        <div className="flex items-start justify-between gap-2  ">
          <Link href={`/admin`} className="flex items-end">
            <GiPlantsAndAnimals className="text-gray-100 md:text-4xl text-3xl" />
            <span className="text-gray-200 md:text-xl font-semibold">
              PlanetPal
            </span>
          </Link>

          <button
            ref={trigger}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
            className="block lg:hidden text-white"
          >
            <IoIosArrowRoundBack className="text-2xl" />
          </button>
        </div>
        <h1 className="text-sm ml-2 text-gray-200 uppercase">
          Welcome Back Admin
        </h1>
      </div>

      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-3 pb-4 px-4 lg:mt-3 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <ul className="font-barlow flex flex-col gap-1.5">
              {/* <!-- Menu Item Calendar --> */}
              {sideLinksAd.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className={`group relative capitalize flex items-center gap-2.5 rounded-sm py-2 px-4 text-gray-300 duration-300 ease-in-out before:absolute before:left-0 before:top-0 before:w-0.5 before:transition-all before:duration-200  before:bg-color1 hover:before:h-full ${
                      pathname === link.href ? "before:h-full" : "before:h-0"
                    }`}
                    onClick={handleCloseSideBar}
                  >
                    {renderIcons(index)}
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  className="flex items-center gap-2.5 rounded-sm py-2 px-4  text-red-600 duration-300 ease-in-out"
                  onClick={() => router.push("/admin/transferownership")}
                >
                  <BiTransfer className="text-xl" />
                  Transfer Ownership
                </button>
              </li>
              <li>
                <button
                  className="flex items-center gap-2.5 rounded-sm py-2 px-4  text-gray-300 duration-300 ease-in-out"
                  onClick={() => open()}
                >
                  <IoIosLogOut className="text-xl" />
                  Log Out
                </button>
              </li>
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default SideBar;
