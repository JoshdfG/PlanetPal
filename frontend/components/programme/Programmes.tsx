"use client";
import React, { FormEvent, useCallback, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../ui/dialog";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import useCreateNewProgramme from "@/hooks/onboardingHooks/useCreateNewProgramme";
import { useAccount } from "wagmi";
import useGetUserOrganisations from "@/hooks/onboardingHooks/useGetUserOrganisation";
import axios from "axios";
import Image from "next/image";
import { SlPicture } from "react-icons/sl";
import { FiEdit } from "react-icons/fi";
import ReactPaginate from "react-paginate";
// import { createNewOrganization } from "@/hooks/readFuntions/allReadFunctions";

const Programmes = ({ apiKey, secretKey }: any) => {
  const { isConnected, address } = useAccount();

  const router = useRouter();

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
    if (imageURI === "")
      return toast.error("Please enter image URI", { position: "top-right" });
    if (adminName === "")
      return toast.error("Please enter admin name", { position: "top-right" });

    createProgramme();

    setInstName("");
    setAdminName("");
    setImageURI("");
  };

  // Uplaod to IPFS and return of the URI
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
        toast.error("Error feteching image URI", {
          position: "top-right",
        });
      }
    }
  }, [selectedFile]);

  useEffect(() => {
    if (selectedFile) {
      getImage();
    }
  }, [selectedFile, getImage]);

  // redirect to programme page if not connected
  const change = useCallback(async () => {
    if (!isConnected) {
      router.push("/programme");
    }
  }, [isConnected, router]);

  useEffect(() => {
    change();
  }, [change, isConnected]);

  // getting list of organisations
  const { list: listOfOrganisations, isLoading } =
    useGetUserOrganisations(address);

  // const getOrg = createNewOrganization();

  // route handling
  const handleRouting = (
    contract_address: string,
    admin: boolean,
    user: boolean
  ) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "active_organisation",
        JSON.stringify(contract_address)
      );
      if (admin) {
        router.push(`/admin`);
      } else if (user) {
        router.push(`/user`);
      } else {
        return toast.error("You're not allowed access !", {
          position: "top-right",
        });
      }
    }
  };

  // Pagination
  const [currentItems, setCurrentItems] = useState<any[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 9;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(listOfOrganisations.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(listOfOrganisations.length / itemsPerPage));
  }, [
    itemOffset,
    itemsPerPage,
    listOfOrganisations.length,
    listOfOrganisations.length,
  ]);

  const handlePageClick = (event: any) => {
    const newOffset =
      (event.selected * itemsPerPage) % listOfOrganisations.length;
    setItemOffset(newOffset);
  };

  return (
    <section className="flex flex-col w-full ">
      <div className="w-full flex justify-between items-end">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-color1 uppercase">
            My Organizations
          </h1>
          <p className="text-lg text-color3">Welcome to PlanetPal Campaigns</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <button
              type="button"
              className="text-color2 bg-white border border-color2 hover:bg-color2 hover:text-white rounded-lg flex items-center gap-1 text-sm py-2.5 px-6"
            >
              Create new organisation{" "}
              <IoIosAddCircleOutline className="text-xl" />
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>PlanetPal</DialogTitle>
              <DialogDescription>
                Create new organisation on PlanetPal
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
                  placeholder="Enter institution name"
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
                  Image URI
                </label>
                <input
                  type="text"
                  name="imageURI"
                  id="imageURI"
                  placeholder="Choose an image and URI will be fetched"
                  className="w-full caret-color1 py-3 px-4 outline-none rounded-lg border border-color1 text-sm bg-color1/5 text-color3"
                  value={imageURI}
                  readOnly
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
      </div>
      {isLoading ? (
        <div className="w-full h-[250px] flex justify-center items-center">
          <h1 className="text-center md:text-2xl text-lg text-color1 font-bold">
            Fetching organisations...
          </h1>
        </div>
      ) : isLoading === false && listOfOrganisations?.length === 0 ? (
        <div className="w-full h-[250px] flex justify-center items-center">
          <h1 className="text-center md:text-2xl text-lg text-color1 font-bold">
            No Organizations created yet
          </h1>
        </div>
      ) : null}
      <main className="w-full grid lg:grid-cols-3 md:grid-cols-2 gap-8 md:gap-6 lg:gap-8 mt-16">
        {currentItems?.map((organisation, index) => (
          <div
            key={index}
            className="w-full flex flex-col gap-4 rounded-lg shadow-lg p-7 border border-color2/10 relative cursor-pointer hover:border-color1"
            onClick={() =>
              handleRouting(
                organisation.address,
                organisation.isAdmin,
                organisation.isUser
              )
            }
          >
            <div className="w-[120px] h-[120px] rounded-full bg-gray-200">
              <img
                src={organisation.imageURI}
                alt={organisation.name}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <h3 className="text-xl text-color1 font-medium">
              {organisation.name}
            </h3>
            <div className="w-[15%] h-1.5 rounded-lg bg-color1"></div>\
            <div className="flex justify-between items-end w-full mt-4">
              <div className="flex flex-col">
                <small className="text-color3 text-xs">Role</small>
                {organisation.isAdmin && (
                  <h4 className="text-color1 font-bold">Admin</h4>
                )}
                {organisation.isUser && (
                  <h4 className="text-color1 font-bold">User</h4>
                )}
              </div>
            </div>
            <div className="absolute top-6 right-6 flex flex-col items-center">
              <small className="text-color3 text-xs">Status</small>
              <h4
                className={`${
                  organisation.status
                    ? "text-green-500 bg-green-100"
                    : "text-red-600 bg-red-100"
                }  rounded-lg px-2 py-1.5 font-medium text-xs`}
              >
                {organisation.status ? "Ongoing" : "Ended"}
              </h4>
            </div>
          </div>
        ))}
      </main>
      <div className="w-full flex flex-col md:flex-row justify-center items-center gap-4">
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
          containerClassName="flex justify-center items-center mt-8 gap-1 pb-4"
          pageLinkClassName="py-2 md:px-4 px-3 md:text-base text-sm font-medium text-gray-800 bg-white hover:bg-gray-800 hover:text-white border border-gray-800 transition-all duration-300"
          previousLinkClassName="py-2 md:px-4 px-3 md:text-base text-sm font-medium text-gray-800 bg-white hover:bg-gray-800 hover:text-white border border-gray-800 transition-all duration-300"
          nextLinkClassName="py-2 md:px-4 px-3 md:text-base text-sm font-medium text-gray-800 bg-white hover:bg-gray-800 hover:text-white border border-gray-800 transition-all duration-300"
          activeLinkClassName="rounded-xl"
        />
      </div>
    </section>
  );
};

export default Programmes;
