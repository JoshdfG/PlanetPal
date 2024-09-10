"use client";
import React, { FormEvent, useCallback, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { IoIosAddCircleOutline } from "react-icons/io";
import { HiOutlineViewfinderCircle } from "react-icons/hi2";
import { FaCheckToSlot } from "react-icons/fa6";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogTrigger,
  DialogFooter,
} from "../ui/dialog";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAccount } from "wagmi";
import useCreateNewProgramme from "@/hooks/onboardingHooks/useCreateNewProgramme";
import axios from "axios";
import Image from "next/image";
import { SlPicture } from "react-icons/sl";
import { FiEdit } from "react-icons/fi";

const StartProgramme = ({ apiKey, secretKey }: any) => {
  const router = useRouter();
  const { isConnected } = useAccount();

  const [instName, setInstName] = useState<string>("");
  const [adminName, setAdminName] = useState<string>("");
  const [imageURI, setImageURI] = useState<string>("");

  const { createProgramme, isWriting, isConfirming } = useCreateNewProgramme(
    instName,
    imageURI,
    adminName
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!isConnected)
      return toast.error("Please connect wallet", { position: "top-right" });
    if (instName === "")
      return toast.error("Please enter institution name", {
        position: "top-right",
      });
    if (adminName === "")
      return toast.error("Please enter admin name", { position: "top-right" });

    if (imageURI === "")
      return toast.error("Please select image", { position: "top-right" });

    createProgramme();

    setInstName("");
    setAdminName("");
    setImageURI("");
  };

  const [selectedFile, setSelectedFile] = useState<any>();

  const handleSelectImage = ({ target }: { target: any }) => {
    setSelectedFile(target.files[0]);
  };

  const getImage = useCallback(async () => {
    if (selectedFile) {
      try {
        const formData = new FormData();
        formData.append("file", selectedFile!);

        const response = await axios.post(
          "https://api.pinata.cloud/pinning/pinFileToIPFS",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              pinata_api_key: apiKey,
              pinata_secret_api_key: secretKey,
            },
          }
        );
        const fileUrl = response.data.IpfsHash;
        const gateWayAndhash = `https://gateway.pinata.cloud/ipfs/${fileUrl}`;
        setImageURI(gateWayAndhash);

        toast.success("Image URI fetched successfully", {
          position: "top-right",
        });

        return fileUrl;
      } catch (error) {
        console.log("Pinata API Error:", error);
        toast.error("Error fetching Image URI", { position: "top-right" });
      }
    }
  }, [selectedFile]);

  useEffect(() => {
    if (selectedFile) {
      getImage();
    }
  }, [selectedFile, getImage]);

  const handleRoute = () => {
    if (!isConnected) {
      return toast.error("Please connect wallet", { position: "top-right" });
    } else {
      router.push("/viewprogramme");
    }
  };

  return (
    <section className="w-full flex flex-col gap-10">
      <div className="w-full flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-color1">
          Welcome to Our Campaigns
        </h1>
        <p className="text-lg text-color3">PlanetPal Campaign</p>
      </div>

      <main className="w-full flex flex-col gap-2">
        <h3 className="text-xl font-medium text-color1 ml-2">
          Hello, this platform has the following features available for you and
          more ...
        </h3>
        <div className="w-full md:p-10 p-6 bg-color2 rounded-lg">
          <ul className="flex flex-col gap-6 ">
            {lists.map((list, index) => (
              <li key={index} className="flex text-base items-start gap-1">
                <FaCheckToSlot className="text-base text-white mt-1.5" />
                <p className="text-base text-white flex flex-col">
                  <span className="font-semibold">{list.caption}: </span>
                  <span className="text-base">{list.text}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </main>

      <div className="w-full flex flex-col md:flex-row justify-center items-center gap-4">
        <Dialog>
          {isConnected ? (
            <DialogTrigger asChild>
              <Button
                type="button"
                className="text-white bg-color1 hover:bg-color1/65 flex items-center gap-1"
              >
                Create new Campaign{" "}
                <IoIosAddCircleOutline className="text-xl" />
              </Button>
            </DialogTrigger>
          ) : (
            <Button
              onClick={() =>
                toast.error("Please connect wallet", { position: "top-right" })
              }
              type="button"
              className="text-white bg-color1 hover:bg-color1/50 flex items-center gap-1"
            >
              Create new Campaign <IoIosAddCircleOutline className="text-xl" />
            </Button>
          )}

          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>PlanetPal</DialogTitle>
              <DialogDescription>
                Create new organization on PlanetPal
              </DialogDescription>
            </DialogHeader>
            <form className="w-full grid gap-4" onSubmit={handleSubmit}>
              <div className="w-full flex flex-col items-center">
                <div className="w-[80px] h-[80px] border-[0.5px] border-color3/50 rounded relative ">
                  {selectedFile ? (
                    <Image
                      src={URL.createObjectURL(selectedFile)}
                      alt="profile"
                      className="w-full h-full object-cover"
                      width={440}
                      height={440}
                      priority
                      quality={100}
                    />
                  ) : (
                    <span className="relative flex justify-center items-center w-full h-full">
                      <SlPicture className="relative text-6xl inline-flex rounded text-gray-300" />
                    </span>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    className="hidden"
                    id="selectFile"
                    onChange={handleSelectImage}
                  />
                  <label
                    htmlFor="selectFile"
                    className=" absolute -right-1 p-1 rounded-full -bottom-1 cursor-pointer bg-gray-100 border-[0.5px] border-color3/50 font-Bebas tracking-wider text-color3"
                  >
                    <FiEdit />
                  </label>
                </div>
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="institutionName"
                  className="text-color3 font-medium ml-1"
                >
                  Organization Name
                </label>
                <input
                  type="text"
                  name="institutionName"
                  id="institutionName"
                  placeholder="Enter organization name"
                  className="w-full caret-color1 py-3 px-4 outline-none rounded-lg border border-color1 text-sm bg-color1/5 text-color3"
                  value={instName}
                  onChange={(e) => setInstName(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="adminName"
                  className="text-color3 font-medium ml-1"
                >
                  Admin Name
                </label>
                <input
                  type="text"
                  name="adminName"
                  id="adminName"
                  placeholder="Enter admin name"
                  className="w-full caret-color1 py-3 px-4 outline-none rounded-lg border border-color1 text-sm bg-color1/5 text-color3"
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                  required
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="imageURI"
                  className="text-color3 font-medium ml-1"
                >
                  Organization Image
                </label>
                <input
                  type="text"
                  name="imageURI"
                  id="imageURI"
                  placeholder="Choose an image for URI to show"
                  className="w-full caret-color1 py-3 px-4 outline-none rounded-lg border border-color1 text-sm bg-color1/5 text-color3"
                  value={imageURI}
                  readOnly
                  required
                />
              </div>
              <DialogFooter>
                <Button type="submit" disabled={isWriting || isConfirming}>
                  Submit
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <Button
          type="button"
          variant={`outline`}
          onClick={handleRoute}
          className="text-color3 flex items-center gap-1 border border-color3 hover:text-white hover:bg-color1/60"
        >
          Go to your Campaign <HiOutlineViewfinderCircle className="text-xl" />
        </Button>
      </div>
    </section>
  );
};

export default StartProgramme;

type ListsType = {
  caption: string;
  text: string;
};

const lists: ListsType[] = [
  {
    caption: "Campaign Overview",
    text: "This will provide a comprehensive overview of the campaign you choose, outline the structure and also guide you on how to participate and also join the NGO as a user",
  },
  {
    caption: "Campaign Details",
    text: "A detailed overview of the campaigns and How to participate.",
  },
  {
    caption: "Attendance and evaluation",
    text: "Clearly communicates the grading criteria and evaluation process.",
  },
  {
    caption: "Instructor’s information",
    text: "The instructors and facilitators involved have their contact information made available. This helps you to connect with your tutors easily.",
  },
];
