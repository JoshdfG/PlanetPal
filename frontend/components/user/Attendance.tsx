"use client";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import ReactPaginate from "react-paginate";
import useGetSignedAttendanceImages from "@/hooks/studentHooks/useGetSignedAttendanceImages";
import { useAccount } from "wagmi";

const UserAttendenceNFT = () => {
  const { address } = useAccount();
  const { signedAttendanceImages, isLoading } =
    useGetSignedAttendanceImages(address);

  // Pagination
  const [currentItems, setCurrentItems] = useState<any[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 9;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(signedAttendanceImages.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(signedAttendanceImages.length / itemsPerPage));
  }, [
    itemOffset,
    itemsPerPage,
    signedAttendanceImages.length,
    signedAttendanceImages.length,
  ]);

  const handlePageClick = (event: any) => {
    const newOffset =
      (event.selected * itemsPerPage) % signedAttendanceImages.length;
    setItemOffset(newOffset);
  };
  return (
    <section className="w-full py-6 flex flex-col">
      <main className="w-full flex flex-col gap-7">
        <div className="flex flex-col ">
          <h1 className="uppercase text-color2 md:text-2xl font-bold text-xl">
            Attendence
          </h1>
          <h4 className="text-lg tracking-wider text-color2">
            All Attendence NFTs
          </h4>
        </div>
        {isLoading ? (
          <div className="w-full h-[250px] flex justify-center items-center">
            <h1 className="text-center md:text-2xl text-lg text-color1 font-bold">
              Fetching signed attendance...
            </h1>
          </div>
        ) : isLoading === false && signedAttendanceImages?.length === 0 ? (
          <div className="w-full h-[250px] flex justify-center items-center">
            <h1 className="text-center md:text-2xl text-lg text-color1 font-bold">
              No attendance signed yet
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

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-color1 text-sm text-white hover:bg-color2">
                        View
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Classmate+ Attendence</DialogTitle>
                        <DialogDescription>Attendence Detail</DialogDescription>
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
                          <section>
                            <div>{list.mentorName}</div>
                            <div>{list.topic}</div>
                          </section>
                        </div>
                      </main>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          ))}
        </section>
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
export default UserAttendenceNFT;
