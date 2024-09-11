"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Greeting from "./Greeting";
import {
  useWalletInfo,
  useWeb3Modal,
  useWeb3ModalState,
} from "@web3modal/wagmi/react";
import { useAccount, useSwitchChain } from "wagmi";
import { WalletConnected } from "../WalletConnected";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import useVerifyStudent from "@/hooks/layoutProtectionHook/useVerifyStudent";
import { toast } from "sonner";
import useGetStudentName from "@/hooks/studentHooks/useGetStudentName";
import { PiStudentFill } from "react-icons/pi";
import { SUPPORTED_CHAIN_ID } from "@/constants/chain";

const Header = ({
  sidebarOpen,
  setSidebarOpen,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();
  const { walletInfo } = useWalletInfo();
  const { switchChain } = useSwitchChain();

  const { selectedNetworkId } = useWeb3ModalState();

  const router = useRouter();

  const isUserStudent = useVerifyStudent(address);

  const change = useCallback(async () => {
    if (!isConnected) {
      router.push("/programme");
      return toast.error("Please connect wallet", { position: "top-right" });
    } else if (!isUserStudent) {
      router.push("/programme");
      return toast.error("ACCESS NOT ALLOWED !", { position: "top-right" });
    }
  }, [isConnected, router, isUserStudent]);

  useEffect(() => {
    change();
  }, [change, isConnected, isUserStudent]);

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

  const studentName = useGetStudentName(address);

  return (
    <header className="sticky top-0 z-[999] flex w-full bg-color2 lg:rounded-b-lg overflow-hidden drop-shadow-1">
      <div className="flex flex-grow items-center justify-between py-4 px-4 shadow md:px-2 2xl:px-11 relative before:absolute before:bottom-0 before:left-0 before:w-full before:h-px before:bg-gradient-to-l before:from-color1 before:to-color2">
        <div className="flex items-center gap-3 sm:gap-4 lg:hidden">
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(!sidebarOpen);
            }}
            className="z-[9999] block rounded-sm border border-color1 bg-transparent p-1.5 shadow-sm lg:hidden"
          >
            <span className="relative block h-5 w-5 cursor-pointer">
              <span className="block absolute right-0 h-full w-full">
                <span
                  className={`relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-color1 delay-[0] duration-200 ease-in-out ${
                    !sidebarOpen && "!w-full delay-300"
                  }`}
                ></span>
                <span
                  className={`relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-color1 delay-150 duration-200 ease-in-out ${
                    !sidebarOpen && "delay-400 !w-full"
                  }`}
                ></span>
                <span
                  className={`relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-color1 delay-200 duration-200 ease-in-out ${
                    !sidebarOpen && "!w-full delay-500"
                  }`}
                ></span>
              </span>
              <span className="absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-color1 delay-300 duration-200 ease-in-out ${
                    !sidebarOpen && "!h-0 !delay-[0]"
                  }`}
                ></span>
                <span
                  className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-color1 duration-200 ease-in-out ${
                    !sidebarOpen && "!h-0 !delay-200"
                  }`}
                ></span>
              </span>
            </span>
          </button>
          {/* <!-- Hamburger Toggle BTN --> */}

          <Link
            href="/user"
            className="flex flex-shrink-0 lg:hidden items-center bg-gradient-to-r from-color1 to-color2 text-transparent bg-clip-text gap-1"
          >
            <PiStudentFill className="text-color1 md:text-4xl text-3xl" />
            <span className="text-color2 md:text-lg">PlanetPal</span>
          </Link>
        </div>

        <div className="hidden sm:block">
          <Greeting name={studentName} />
        </div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          {/* <!-- User Area --> */}
          <Button
            onClick={walletConnect}
            type="button"
            className={`transition-all duration-200  flex items-center gap-1 ${
              isConnected &&
              "bg-[#e8f5f0a8] text-color1 hover:bg-color1 hover:text-white border border-color1"
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
          {/* <!-- User Area --> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
