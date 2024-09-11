"use client";
import Link from "next/link";
import MaxWrapper from "./MaxWrapper";
import { navLinks } from "@/utils/NavLinks";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useScroll, motion, useSpring } from "framer-motion";
import { Button } from "../ui/button";
import { MobileNavToggler } from "./MobileNavToggler";
import { MdRocketLaunch } from "react-icons/md";
import Logo from "./Logo";
import { SiCampaignmonitor } from "react-icons/si";

const Header = () => {
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();

  const router = useRouter();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const handleAppLaunch = () => {
    router.push("/programme");
  };

  return (
    <header className="w-full">
      <div className="fixed top-0 inset-x-0 z-50 w-full bg-green-500/20 backdrop-blur-lg h-20 lg:px-8 md:px-4 shadow-sm">
        <MaxWrapper className="h-full w-full flex items-center justify-between">
          <Logo />

          <div className="hidden md:flex h-full items-stretch justify-center">
            {navLinks.map((link, _key) => (
              <Link
                href={link.href}
                key={_key}
                className={cn(
                  "text-base relative before:absolute before:bottom-0 before:left-0 before:w-0 before:h-1 before:bg-color1 before:transition-all before:duration-200 text-color2 before:-z-10 flex justify-center items-center px-6 transition",
                  {
                    "before:w-full text-color1": link.href == pathname,
                    "hover:before:w-full hover:text-color1":
                      link.href != pathname,
                  }
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center justify-end gap-3">
            <Button
              type="button"
              className="text-white bg-color1 hover:bg-color1/80 flex items-center gap-1"
              onClick={handleAppLaunch}
            >
              View campaigns <SiCampaignmonitor className="text-xl" />
            </Button>

            <div className="md:hidden">
              <MobileNavToggler />
            </div>
          </div>
        </MaxWrapper>
      </div>
    </header>
  );
};

export default Header;
