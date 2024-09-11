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
import useCreateCampaign from "@/hooks/campaignHooks/useCreateCampaign";
import useGetCampaigns from "@/hooks/campaignHooks/useGetCampaigns";
import useUserCampaignReg from "@/hooks/campaignHooks/useUserCampaignReg";

const StartProgramme = ({ apiKey, secretKey }: any) => {
  const router = useRouter();
  const { isConnected } = useAccount();

  const [instName, setInstName] = useState<string>("");
  const [adminName, setAdminName] = useState<string>("");
  const [imageURI, setImageURI] = useState<string>("");

  const [campaignName, setCampaignName] = useState<string>("");
  const [campaignLocation, setCampaignLocation] = useState<string>("");
  const [campaignDescription, setCampaignDescription] = useState<string>("");
  const [campaignImageURI, setCampaignImageURI] = useState<string>("");
  const [campaignCreator, setCampaignCreator] = useState<string>("");

  const { createProgramme, isWriting, isConfirming } = useCreateNewProgramme(
    instName,
    imageURI,
    adminName
  );

  const { createCampaign, isWritingCampaign, isConfirmingCampaign } =
    useCreateCampaign(
      campaignName,
      campaignImageURI,
      campaignCreator,
      campaignLocation,
      campaignDescription
    );

  const handleCreateCampaign = async (e: FormEvent) => {
    e.preventDefault();

    if (!isConnected)
      return toast.error("Please connect wallet", { position: "top-right" });
    if (campaignName === "")
      return toast.error("Please enter institution name", {
        position: "top-right",
      });
    if (campaignCreator === "")
      return toast.error("Please enter admin name", { position: "top-right" });

    if (campaignImageURI === "")
      return toast.error("Please select image", { position: "top-right" });
    if (campaignLocation === "")
      return toast.error("Please enter campaign location", {
        position: "top-right",
      });
    if (campaignDescription === "")
      return toast.error("Please enter campaign description", {
        position: "top-right",
      });

    createCampaign();

    setCampaignName("");
    setCampaignCreator("");
    setCampaignImageURI("");
    setCampaignLocation("");
    setCampaignDescription("");
  };

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

  const [campaignFile, setCampaignFile] = useState<any>();

  const handleSelectCampaignImage = ({ target }: { target: any }) => {
    setCampaignFile(target.files[0]);
  };

  const getCampaignImage = useCallback(async () => {
    if (campaignFile) {
      try {
        const formData = new FormData();
        formData.append("file", campaignFile!);

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
        setCampaignImageURI(gateWayAndhash);

        toast.success("Image URI fetched successfully", {
          position: "top-right",
        });

        return fileUrl;
      } catch (error) {
        console.log("Pinata API Error:", error);
        toast.error("Error fetching Image URI", { position: "top-right" });
      }
    }
  }, [campaignFile]);

  useEffect(() => {
    if (selectedFile) {
      getImage();
    }
    if (campaignFile) {
      getCampaignImage();
    }
  }, [selectedFile, getImage, campaignFile, getCampaignImage]);

  const handleRoute = () => {
    if (!isConnected) {
      return toast.error("Please connect wallet", { position: "top-right" });
    } else {
      router.push("/viewprogramme");
    }
  };
  interface Reg {
    name: string;
    user_address: `0x${string}`;
    email_address: string;
  }
  const { registerUser, isWritingCampReg, isConfirmingCampReg } =
    useUserCampaignReg();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userAddress, setUserAddress] = useState("");

  const handleRegister = async () => {
    const user: Reg = {
      name,
      user_address: userAddress as `0x${string}`,
      email_address: email,
    };

    await registerUser(user);
  };

  const campaigns = useGetCampaigns();
  console.log(campaigns);

  return (
    <section className="w-full flex flex-col gap-10">
      <div className="w-full flex justify-between gap-1">
        <div>
          <h1 className="text-2xl font-bold text-color1">
            Welcome to Our Campaigns
          </h1>
          <p className="text-lg text-color3">PlanetPal Campaign</p>
        </div>

        {/* form */}
        <div className="w-full flex flex-col md:flex-row justify-end items-center gap-4">
          <Dialog>
            {isConnected ? (
              <DialogTrigger asChild>
                <Button
                  type="button"
                  className="text-white bg-color1 hover:bg-color1/65 flex items-center gap-1"
                >
                  Create new Organisation{" "}
                  <IoIosAddCircleOutline className="text-xl" />
                </Button>
              </DialogTrigger>
            ) : (
              <Button
                onClick={() =>
                  toast.error("Please connect wallet", {
                    position: "top-right",
                  })
                }
                type="button"
                className="text-white bg-color1 hover:bg-color1/50 flex items-center gap-1"
              >
                Create new Organization{" "}
                <IoIosAddCircleOutline className="text-xl" />
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
                    Organizations Name
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
                    Owners Name
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
            Go to your Organization{" "}
            <HiOutlineViewfinderCircle className="text-xl" />
          </Button>
        </div>
      </div>

      <main className="w-full flex flex-col gap-2">
        <h3 className="text-xl font-medium text-color1 ml-2">
          Hello, this platform has the following features available for you and
          more ...
        </h3>
        <div className="w-full md:p-10 p-6 bg-gradient-to-r from-color1 to-[#000c1a] rounded-lg">
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
      {/* campaigns */}
      <section>
        <div className="text-center">
          <h1 className="  font-semibold capitalize">Create a campaign</h1>
          <h5 className="text-sm my-4">click below to create a campaign</h5>
        </div>
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
                  toast.error("Please connect wallet", {
                    position: "top-right",
                  })
                }
                type="button"
                className="text-white bg-color1 hover:bg-color1/50 flex items-center gap-1"
              >
                Create new Campaign{" "}
                <IoIosAddCircleOutline className="text-xl" />
              </Button>
            )}

            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>PlanetPal</DialogTitle>
                <DialogDescription>
                  Create new organization on PlanetPal
                </DialogDescription>
              </DialogHeader>
              <form
                className="w-full grid gap-4"
                onSubmit={handleCreateCampaign}
              >
                <div className="w-full flex flex-col items-center">
                  <div className="w-[80px] h-[80px] border-[0.5px] border-color3/50 rounded relative ">
                    {campaignFile ? (
                      <Image
                        src={URL.createObjectURL(campaignFile)}
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
                      onChange={handleSelectCampaignImage}
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
                    Campaign Name
                  </label>
                  <input
                    type="text"
                    name="institutionName"
                    id="institutionName"
                    placeholder="Enter organization name"
                    className="w-full caret-color1 py-3 px-4 outline-none rounded-lg border border-color1 text-sm bg-color1/5 text-color3"
                    value={campaignName}
                    onChange={(e) => setCampaignName(e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="adminName"
                    className="text-color3 font-medium ml-1"
                  >
                    Owners address
                  </label>
                  <input
                    type="text"
                    name="adminName"
                    id="adminName"
                    placeholder="Enter admin name"
                    className="w-full caret-color1 py-3 px-4 outline-none rounded-lg border border-color1 text-sm bg-color1/5 text-color3"
                    value={campaignCreator}
                    onChange={(e) => setCampaignCreator(e.target.value)}
                    required
                  />
                </div>{" "}
                <div className="flex flex-col">
                  <label
                    htmlFor="institutionName"
                    className="text-color3 font-medium ml-1"
                  >
                    Campaign Location
                  </label>
                  <input
                    type="text"
                    name="campaignlocatioon"
                    id="campaignlocation"
                    placeholder="Enter location"
                    className="w-full caret-color1 py-3 px-4 outline-none rounded-lg border border-color1 text-sm bg-color1/5 text-color3"
                    value={campaignLocation}
                    onChange={(e) => setCampaignLocation(e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="institutionName"
                    className="text-color3 font-medium ml-1"
                  >
                    Campaign Description
                  </label>
                  <input
                    type="text"
                    name="campaignDescription"
                    id="campaignDescription"
                    placeholder="Enter organization name"
                    className="w-full caret-color1 py-3 px-4 outline-none rounded-lg border border-color1 text-sm bg-color1/5 text-color3"
                    value={campaignDescription}
                    onChange={(e) => setCampaignDescription(e.target.value)}
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
                    value={campaignImageURI}
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
            // onClick={handleRoute}
            className="text-color3 flex items-center gap-1 border border-color3 hover:text-white hover:bg-color1/60"
          >
            View existing campaign
            <HiOutlineViewfinderCircle className="text-xl" />
          </Button>
        </div>
        {/* display campaigns */}
        <section>
          <div>
            <h1>Here you'll find ongoing campaigns</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4 mx-2">
            {campaigns.map((campaign, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-4">
                <img
                  src={campaign.campaign_uri}
                  alt={campaign.campaign_name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <h1 className="text-lg font-bold mb-2">
                  {campaign.campaign_name}
                </h1>
                <div className="text-gray-600">
                  <p>
                    <span className="font-bold">Location:</span>{" "}
                    {campaign.campaign_location}
                  </p>
                  <p>
                    <span className="font-bold">Description:</span>{" "}
                    {campaign.campaign_description}
                  </p>
                  {/* <p>
                    <span className="font-bold">Owner:</span> {campaign.owner}
                  </p> */}
                  <p className="text-red-300 my-2 text-xs font-bold">
                    Register to be added to the organisation
                  </p>{" "}
                  <Dialog>
                    {isConnected ? (
                      <DialogTrigger asChild>
                        <Button
                          type="button"
                          className="text-white bg-color1 hover:bg-color1/65 flex items-center gap-1 w-full"
                        >
                          Register
                          <IoIosAddCircleOutline className="text-xl" />
                        </Button>
                      </DialogTrigger>
                    ) : (
                      <Button
                        onClick={() =>
                          toast.error("Please connect wallet", {
                            position: "top-right",
                          })
                        }
                        type="button"
                        className="text-white bg-color1 hover:bg-color1/50 flex items-center gap-1"
                      >
                        Register
                        <IoIosAddCircleOutline className="text-xl" />
                      </Button>
                    )}

                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle className="mx-auto">Sign Up</DialogTitle>
                        <DialogDescription className="mx-auto">
                          Sign up to be added to the organisation
                        </DialogDescription>
                      </DialogHeader>
                      <form
                        className="w-full grid gap-4"
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleRegister();
                        }}
                      >
                        <div className="w-full flex flex-col items-center"></div>
                        <div className="flex flex-col">
                          <label
                            htmlFor="name"
                            className="text-color3 font-medium ml-1"
                          >
                            UserName
                          </label>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Enter organization name"
                            className="w-full caret-color1 py-3 px-4 outline-none rounded-lg border border-color1 text-sm bg-color1/5 text-color3"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                          />
                        </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor="name"
                            className="text-color3 font-medium ml-1"
                          >
                            User Address
                          </label>
                          <input
                            type="text"
                            name="userAddress"
                            id="userAddress"
                            placeholder="Enter organization name"
                            className="w-full caret-color1 py-3 px-4 outline-none rounded-lg border border-color1 text-sm bg-color1/5 text-color3"
                            value={userAddress}
                            onChange={(e) => setUserAddress(e.target.value)}
                            required
                          />
                        </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor="email"
                            className="text-color3 font-medium ml-1"
                          >
                            E-mail{" "}
                          </label>
                          <input
                            type="text"
                            name="email"
                            id="email"
                            placeholder="Enter email"
                            className="w-full caret-color1 py-3 px-4 outline-none rounded-lg border border-color1 text-sm bg-color1/5 text-color3"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>{" "}
                        <DialogFooter>
                          <Button
                            type="submit"
                            disabled={isWritingCampReg || isConfirmingCampReg}
                          >
                            Submit
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            ))}
          </div>
        </section>
      </section>
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
