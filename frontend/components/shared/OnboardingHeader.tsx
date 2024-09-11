"use client";
import { navLinks } from "@/utils/NavLinks";
import Logo from "./Logo";
import MaxWrapper from "./MaxWrapper";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { MobileNavToggler } from "./MobileNavToggler";
import { usePathname } from "next/navigation";
import { useScroll, useSpring, motion } from "framer-motion";
import {
  useWalletInfo,
  useWeb3Modal,
  useWeb3ModalState,
} from "@web3modal/wagmi/react";
import { WalletConnected } from "./WalletConnected";
import { useAccount, useSwitchChain } from "wagmi";
import { SUPPORTED_CHAIN_ID } from "@/constants/chain";

const OnboardingHeader = () => {
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();
  const { walletInfo } = useWalletInfo();
  const { switchChain } = useSwitchChain();

  const { selectedNetworkId } = useWeb3ModalState();

  const pathname = usePathname();
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const walletConnect = () => {
    if (!isConnected) {
      open();
    } else if (
      isConnected &&
      Number(selectedNetworkId) !== SUPPORTED_CHAIN_ID
    ) {
      switchChain({ chainId: SUPPORTED_CHAIN_ID });
    }
  };

  return (
    <header className="w-full">
      <div className="fixed top-0 inset-x-0 z-50 w-full bg-green-500/20 backdrop-blur-md h-20 lg:px-8 md:px-4 shadow-sm">
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
              onClick={walletConnect}
              type="button"
              className={`transition-all duration-200  flex items-center gap-1 ${
                isConnected &&
                "bg-white text-color1 hover:bg-color1 hover:text-white border border-color1"
              } ${
                !isConnected &&
                "bg-color1 text-white border border-color1 hover:bg-color2"
              } ${
                isConnected &&
                Number(selectedNetworkId) !== SUPPORTED_CHAIN_ID &&
                "bg-red-600 text-white border border-red-600 hover:bg-red-700"
              }`}
            >
              {isConnected ? (
                <WalletConnected address={address} icon={walletInfo?.icon} />
              ) : (
                <span>Connect Wallet</span>
              )}
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

export default OnboardingHeader;
