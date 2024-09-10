"use client";
import React from "react";
import { FaFileSignature } from "react-icons/fa6";
import { GiPieChart } from "react-icons/gi";
import { PiStudentFill } from "react-icons/pi";
import { SiCodementor, SiGoogleclassroom } from "react-icons/si";
import { LiaCertificateSolid } from "react-icons/lia";
import { Calendar } from "@/components/ui/calendar";
import dynamic from "next/dynamic";
import useGetNumericStatistics from "@/hooks/adminHooks/useGetNumericStatistics";
import { Button } from "../ui/button";
import useGetProgramStatus from "@/hooks/adminHooks/useGetProgramStatus";
import useChangeProgramStatus from "@/hooks/adminHooks/useChangeProgramStatus";
const Barchart = dynamic(() => import("./chart/Barchart"), { ssr: false });
const Piechart = dynamic(() => import("./chart/Piechart"), { ssr: false });

const Dashboard = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const { statsData, isLoading } = useGetNumericStatistics();

  const calculateAttendancePercentage = (data: any) => {
    const attendancePercentage =
      data.totalStudent > 0 && data.totalClass > 0
        ? (data.totalSignedAttendance / (data.totalStudent * data.totalClass)) *
          100
        : 0;

    return `${attendancePercentage.toFixed(2)}%`;
  };

  const status = useGetProgramStatus();

  const { toggleProgramStatus, isWriting, isConfirming } =
    useChangeProgramStatus();

  return (
    <section className="w-full py-6 flex flex-col">
      <div className="w-full grid lg:grid-cols-6 md:grid-cols-5 gap-4">
        <main className="lg:col-span-6 md:col-span-5 flex flex-col gap-4">
          <div className="w-full flex md:flex-row flex-col md:justify-between items-center">
            <div className="flex flex-col">
              <h1 className="uppercase text-color2 md:text-2xl font-bold text-xl">
                Admin Dashboard
              </h1>
              <h4 className="text-lg tracking-wider text-color2">Statistics</h4>
            </div>

            <div className="flex items-center gap-4">
              <h4 className="text-color2">
                Program Status:{" "}
                <span
                  className={`${status ? "text-green-600" : "text-red-600"}`}
                >
                  {status ? "Ongoing" : "Ended"}
                </span>
              </h4>
              <Button
                onClick={() => toggleProgramStatus()}
                disabled={isWriting || isConfirming}
                className={`border-none outline-none rounded px-3 text-gray-200 py-1.5 ${
                  status
                    ? "bg-red-600 hover:bg-red-800"
                    : "bg-green-600 hover:bg-green-800"
                }`}
              >
                {status ? "End Program" : "Resume Program"}
              </Button>
            </div>
          </div>

          <article className="w-full grid md:grid-cols-3 gap-3">
            {/* one */}
            <div className="w-full p-3 rounded-md flex flex-col gap-4 bg-black">
              <h1 className="text-white/80 font-medium text-sm">
                Total Campaigns
              </h1>
              <div className="w-full flex md:flex-row-reverse flex-wrap justify-between items-center">
                <div className="w-12 h-12 rounded-full border border-white/80 flex items-center justify-center text-white/80 text-xl">
                  <SiGoogleclassroom />
                </div>
                <h3 className="text-2xl font-semibold text-white/90">
                  {isLoading ? 0 : statsData?.totalClass}
                </h3>
              </div>
            </div>
            {/* two */}
            <div className="w-full p-3 rounded-md flex flex-col gap-4 bg-black">
              <h1 className="text-white/80 font-medium text-sm">Total Users</h1>
              <div className="w-full flex md:flex-row-reverse flex-wrap justify-between items-center">
                <div className="w-12 h-12 rounded-full border border-white/80 flex items-center justify-center text-white/80 text-xl">
                  <PiStudentFill />
                </div>
                <h3 className="text-2xl font-semibold text-white/90">
                  {isLoading ? 0 : statsData.totalStudent}
                </h3>
              </div>
            </div>
            {/* three */}
            <div className="w-full p-3 rounded-md flex flex-col gap-4 bg-black">
              <h1 className="text-white/80 font-medium text-sm">
                Total Staffs
              </h1>
              <div className="w-full flex md:flex-row-reverse flex-wrap justify-between items-center">
                <div className="w-12 h-12 rounded-full border border-white/80 flex items-center justify-center text-white/80 text-xl">
                  <SiCodementor />
                </div>
                <h3 className="text-2xl font-semibold text-white/90">
                  {isLoading ? 0 : statsData.totalMentors}
                </h3>
              </div>
            </div>
            {/* four */}
            <div className="w-full p-3 rounded-md flex flex-col gap-4 bg-black">
              <h1 className="text-white/80 font-medium text-sm">
                Total Campaign Attended
              </h1>
              <div className="w-full flex md:flex-row-reverse flex-wrap justify-between items-center">
                <div className="w-12 h-12 rounded-full border border-white/80 flex items-center justify-center text-white/80 text-xl">
                  <FaFileSignature />
                </div>
                <h3 className="text-2xl font-semibold text-white/90">
                  {isLoading ? 0 : statsData.totalSignedAttendance}
                </h3>
              </div>
            </div>
            {/* five */}
            <div className="w-full p-3 rounded-md flex flex-col gap-4 bg-black">
              <h1 className="text-white/80 font-medium text-sm">
                Attendence (%)
              </h1>
              <div className="w-full flex md:flex-row-reverse flex-wrap justify-between items-center">
                <div className="w-12 h-12 rounded-full border border-white/80 flex items-center justify-center text-white/80 text-xl">
                  <GiPieChart />
                </div>
                <h3 className="text-2xl font-semibold text-white/90">
                  {isLoading ? 0 : calculateAttendancePercentage(statsData)}
                </h3>
              </div>
            </div>
          </article>
        </main>
      </div>

      {/* Charts */}
      <div className="w-full grid lg:grid-cols-6 md:grid-cols-5 md:gap-3 gap-5 lg:gap-5 mt-8">
        <main className="w-full lg:col-span-4 md:col-span-3 flex flex-col p-3">
          <div className="flex flex-col items-center mb-4">
            <h1 className="uppercase text-color2 md:text-lg font-bold text-xl">
              Programme Analysis
            </h1>
            <h4 className="text-base tracking-wider text-color2">
              Class, Students and Mentors Statistics
            </h4>
          </div>
          {/* pie */}
          <Piechart />
        </main>
        <aside className="lg:col-span-2 md:col-span-2 flex flex-col gap-4 rounded-md md:mt-8 p-4 md:p-2 lg:p-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border border-gray-500 w-full"
          />
        </aside>
      </div>
    </section>
  );
};

export default Dashboard;
