"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useGetStudentScore from "@/hooks/studentHooks/useGetStudentScore";
import { useAccount } from "wagmi";

const UserAssignment = () => {
  const { address } = useAccount();
  const { list, listOfScoreURIError, listOfScoreURIIsPending } =
    useGetStudentScore(address);

  return (
    <section className="w-full py-6 flex flex-col">
      <main className="w-full flex flex-col gap-7">
        <div className="w-full flex md:flex-row flex-col gap-3 md:gap-0 justify-between md:items-end items-start">
          <div className="flex flex-col">
            <h1 className="uppercase text-color2 md:text-2xl font-bold text-xl">
              Score List
            </h1>
            <h4 className="text-lg tracking-wider text-color2">
              {" "}
              Your score list{" "}
            </h4>
            {/* Guidelines */}
            <div className="w-full flex flex-col mt-4 text-red-600">
              <h5 className="text-red-600 text-sm">Guideline</h5>
              <p className="text-xs text-red-600">
                Your scores will be displayed here as you progress...
              </p>
            </div>
          </div>
        </div>

        {listOfScoreURIIsPending ? (
          <div className="w-full h-[250px] flex justify-center items-center">
            <h1 className="text-center md:text-2xl text-lg text-color1 font-bold">
              Fetching scores...
            </h1>
          </div>
        ) : listOfScoreURIIsPending === false && list?.length === 0 ? (
          <div className="w-full h-[250px] flex justify-center items-center">
            <h1 className="text-center md:text-2xl text-lg text-color1 font-bold">
              No scores uploaded yet
            </h1>
          </div>
        ) : null}

        <div className="w-full ">
          <Table>
            <TableHeader>
              <TableRow className="bg-color2 hover:bg-color2 text-gray-300">
                <TableHead className="font-semibold text-gray-300">
                  S/N
                </TableHead>
                <TableHead className="font-semibold text-gray-300">
                  Score List
                </TableHead>
                <TableHead className="font-semibold text-gray-300">
                  Student
                </TableHead>
                <TableHead className="font-semibold text-gray-300">
                  Score
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {list.map((lis, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{lis.scorelist}</TableCell>
                  <TableCell>{lis.student}</TableCell>
                  <TableCell>{lis.score}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </section>
  );
};

export default UserAssignment;
