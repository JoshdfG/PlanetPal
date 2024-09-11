"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import { FormEvent, useCallback, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "../ui/dialog";
import { useAccount, useBlockNumber, useReadContract } from "wagmi";
import { toast } from "sonner";
import useCreateAttendance from "@/hooks/adminHooks/useCreateAttendance";
import { IoIosAddCircleOutline } from "react-icons/io";
import axios from "axios";
import { FiEdit } from "react-icons/fi";
import { SlPicture } from "react-icons/sl";
import ReactPaginate from "react-paginate";
import useOpenAttendance from "@/hooks/adminHooks/useOpenAttendance";
import useCloseAttendance from "@/hooks/adminHooks/useCloseAttendance";
import useEditLectureTopic from "@/hooks/adminHooks/useEditLectureTopic";
import { useQueryClient } from "@tanstack/react-query";
import { OrganisationABI } from "@/constants/ABIs/OrganisationABI";
import { getOrgContract } from "@/constants/contracts";
import { readOnlyProvider } from "@/constants/provider";
import { ethers } from "ethers";

const AttendenceNFT = ({ apiKey, secretKey }: any) => {
  // Getting lecture data
  const [lectureInfo, setLectureInfo] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const queryClient = useQueryClient();
  const { data: blockNumber } = useBlockNumber({ watch: true });

  const active_organisation = window.localStorage?.getItem(
    "active_organisation"
  );
  const contract_address = JSON.parse(active_organisation as `0x${string}`);

  const {
    data: listOfLectureIds,
    error: listOfLectureIdsError,
    isPending: listOfLectureIdsIsPending,
    queryKey,
    refetch: refetchLectureIds,
  } = useReadContract({
    address: contract_address,
    abi: OrganisationABI,
    functionName: "getCampaignIds",
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey });
  }, [blockNumber, queryClient, queryKey]);

  const fetchLectureData = useCallback(async () => {
    if (!listOfLectureIds) return;

    try {
      const formattedRes = listOfLectureIds.map((id: any) => id.toString());

      const data = formattedRes.map(async (id: any) => {
        const contract = getOrgContract(readOnlyProvider, contract_address);
        const lectureData = await contract.getCampaignData(id);
        return {
          lectureId: ethers.decodeBytes32String(id),
          topic: lectureData[1],
          imageURI: lectureData[2],
          attendenceStartTime: lectureData[3].toString(),
          studentsPresent: lectureData[4].toString(),
          isActive: lectureData[5],
        };
      });
      const results = await Promise.all(data);

      setIsLoading(false);
      setLectureInfo(results);
    } catch (error) {
      console.error(error);
    }
  }, [contract_address, blockNumber, queryClient]);

  useEffect(() => {
    fetchLectureData();
  }, [fetchLectureData]);

  const { isConnected } = useAccount();

  const [selectedFile, setSelectedFile] = useState();

  const [lectureId, setLectureId] = useState("");
  const [imageUri, setImageURI] = useState("");
  const [topic, setTopic] = useState("");

  const handleSelectImage = ({ target }: { target: any }) => {
    setSelectedFile(target.files[0]);
  };

  //For toggling the status of attendance
  const {
    openAttendance,
    isConfirming: openAttendanceIsConfirming,
    isConfirmed: openAttendanceIsConfirmed,
  } = useOpenAttendance();

  const {
    closeAttendance,
    isConfirming: closeAttendanceIsConfirming,
    isConfirmed: closeAttendanceIsConfirmed,
  } = useCloseAttendance();

  const handleToggle = async (id: string, status: boolean) => {
    try {
      if (status === false) {
        await openAttendance(id);
      } else if (status === true) {
        await closeAttendance(id);
      }
      refetchLectureIds();
      await fetchLectureData();
    } catch (error) {
      console.error("Failed to toggle attendance status:", error);
    }
  };

  // edict topic
  const {
    editLectureTopic,
    isConfirming: editTopicIsConfirming,
    isConfirmed: editTopicIsConfirmed,
  } = useEditLectureTopic();
  const [editedTopic, setEditedTopic] = useState("");
  const handleTopicEdit = async (id: string) => {
    if (!isConnected)
      return toast.error("Please connect wallet", {
        position: "top-right",
      });
    if (editedTopic === "")
      return toast.error("Please enter new topic", {
        position: "top-right",
      });

    await editLectureTopic(id, editedTopic);
    refetchLectureIds();
    await fetchLectureData();

    if (editTopicIsConfirmed) setEditedTopic("");
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
        toast.error("Failed to fetch image URI", {
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

  const { createAttendance, isConfirming, isConfirmed } = useCreateAttendance(
    lectureId,
    imageUri,
    topic
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!isConnected)
      return toast.error("Please connect wallet", {
        position: "top-right",
      });
    if (lectureId === "")
      return toast.error("Please enter lecture Id", {
        position: "top-right",
      });
    if (imageUri === "")
      return toast.error("Select image and await image URI", {
        position: "top-right",
      });
    if (topic === "")
      return toast.error("Please enter topic", {
        position: "top-right",
      });

    createAttendance();

    setLectureId("");
    setImageURI("");
    setTopic("");
  };

  // Pagination
  const [currentItems, setCurrentItems] = useState<any[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 9;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(lectureInfo.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(lectureInfo.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, lectureInfo, lectureInfo.length]);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % lectureInfo.length;
    setItemOffset(newOffset);
  };

  return (
    <section className="w-full py-6 flex flex-col">
      <main className="w-full flex flex-col gap-7">
        <div className="flex w-full flex-col gap-2 md:gap-0 md:flex-row justify-between md:items-center items-start">
          <div className="flex flex-col ">
            <h1 className="uppercase text-color2 md:text-2xl font-bold text-xl">
              Attendence
            </h1>
            <h4 className="text-lg tracking-wider text-color2">
              All Attendence NFTs
            </h4>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                type="button"
                className="text-white bg-color1 hover:bg-color2 flex items-center gap-1"
              >
                Create new attendance
                <IoIosAddCircleOutline className="text-xl" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>PlanetPal</DialogTitle>
                <DialogDescription>
                  Create new atttendance on PlanetPal
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
                    htmlFor="lectureId"
                    className="text-color3 font-medium ml-1"
                  >
                    Lecture ID
                  </label>
                  <input
                    type="text"
                    name="lectureId"
                    id="lectureId"
                    placeholder="Enter lecture id"
                    className="w-full caret-color1 py-3 px-4 outline-none rounded-lg border border-color1 text-sm bg-color1/5 text-color3"
                    value={lectureId}
                    onChange={(e) => setLectureId(e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="topic"
                    className="text-color3 font-medium ml-1"
                  >
                    Topic
                  </label>
                  <input
                    type="text"
                    name="topic"
                    id="topic"
                    placeholder="Enter topic"
                    className="w-full caret-color1 py-3 px-4 outline-none rounded-lg border border-color1 text-sm bg-color1/5 text-color3"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="imageUri"
                    className="text-color3 font-medium ml-1"
                  >
                    Image URI
                  </label>
                  <input
                    type="text"
                    name="imageUri"
                    id="imageUri"
                    placeholder="Select an image and await IPFS url..."
                    className="w-full caret-color1 py-3 px-4 outline-none rounded-lg border border-color1 text-sm bg-color1/5 text-color3"
                    value={imageUri}
                    readOnly
                    required
                  />
                </div>

                <DialogFooter>
                  <Button type="submit" disabled={isConfirming}>
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
              Fetching created attendance...
            </h1>
          </div>
        ) : isLoading === false && lectureInfo?.length === 0 ? (
          <div className="w-full h-[250px] flex justify-center items-center">
            <h1 className="text-center md:text-2xl text-lg text-color1 font-bold">
              No attendance created yet
            </h1>
          </div>
        ) : null}
        <section className="w-full grid lg:grid-cols-3 md:grid-cols-2 lg:gap-6 md:gap-8 gap-6">
          {currentItems?.map((list, index) => (
            <div className="w-full p-3 rounded bg-color2" key={index}>
              <div className="w-full flex flex-col gap-3 justify-between bg-transparent">
                <div className="w-full h-[250px] relative overflow-hidden rounded">
                  <img
                    src={list.imageURI}
                    alt="NFtImage"
                    className="object-cover w-full h-full object-top"
                  />
                </div>
                <h2 className="text-gray-300 text-sm font-medium">
                  Topic: {list.topic}
                </h2>
                <div className="bg-gray-100 p-3 rounded flex justify-between items-center">
                  <div className="flex flex-col">
                    <h3 className=" text-color1 uppercase font-bold">NFT ID</h3>
                    <h5 className="text-color2">{list.lectureId}</h5>
                  </div>

                  <div className="flex justify-center items-center gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-color1 text-sm text-white hover:bg-color2">
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Classmate+ Attendence</DialogTitle>
                          <DialogDescription>
                            Attendence Detail
                          </DialogDescription>
                        </DialogHeader>
                        <main className="w-full flex md:flex-row flex-col gap-4 mb-3 overflow-y-auto">
                          <div className="flex-1">
                            <div className="w-full h-[200px] overflow-hidden rounded">
                              <img
                                src={list.imageURI}
                                alt="NFtImage"
                                className="object-cover w-full h-full object-top"
                              />
                            </div>
                          </div>
                          <div className="flex-1 flex flex-col gap-2">
                            <h2 className="text-color2 text-sm font-medium">
                              Topic: {list.topic}
                            </h2>
                            <h2 className="text-color2 text-sm font-medium">
                              Attendance: {list.studentsPresent}
                            </h2>
                            <h2 className="text-color2 text-sm font-medium">
                              NFT ID: {list.lectureId}
                            </h2>
                            <h2 className="text-color2 text-sm font-medium">
                              Status: {list.isActive ? "On" : "Off"}
                            </h2>
                            <DialogClose asChild>
                              <Button
                                type="button"
                                onClick={() =>
                                  handleToggle(list.lectureId, list.isActive)
                                }
                                disabled={
                                  openAttendanceIsConfirming ||
                                  closeAttendanceIsConfirming
                                }
                                className="bg-color1 text-sm text-white hover:bg-color2"
                              >
                                Turn {list.isActive ? "Off" : "On"}
                              </Button>
                            </DialogClose>
                          </div>
                        </main>
                      </DialogContent>
                    </Dialog>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          type="button"
                          className="text-white bg-color1 hover:bg-color2 flex items-center gap-1"
                        >
                          Edit Topic
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Classmate+</DialogTitle>
                          <DialogDescription>Update Topic</DialogDescription>
                        </DialogHeader>
                        <div className="w-full grid gap-4">
                          <div className="flex flex-col">
                            <label
                              htmlFor="editTopic"
                              className="text-color3 font-medium ml-1"
                            >
                              Update Topic
                            </label>
                            <input
                              type="text"
                              name="editTopic"
                              id="editTopic"
                              placeholder="Enter new topic"
                              className="w-full caret-color1 py-3 px-4 outline-none rounded-lg border border-color1 text-sm bg-color1/5 text-color3"
                              value={editedTopic}
                              onChange={(e) => setEditedTopic(e.target.value)}
                            />
                          </div>

                          <DialogFooter>
                            <DialogClose asChild>
                              <Button
                                type="button"
                                onClick={() => handleTopicEdit(list.lectureId)}
                                disabled={editTopicIsConfirming}
                              >
                                Edit topic
                              </Button>
                            </DialogClose>
                          </DialogFooter>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* pagination */}
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
      </main>
    </section>
  );
};

export default AttendenceNFT;
