"use client";
import { Calendar } from "@/components/ui/calendar";
import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import useGetStudentName from "@/hooks/studentHooks/useGetStudentName";
import useGetAttendanceRatio from "@/hooks/studentHooks/useGetAttendanceRatio";
import useGetSignedAttendanceImages from "@/hooks/studentHooks/useGetSignedAttendanceImages";
import { useAccount } from "wagmi";
import Link from "next/link";
import { FaFileSignature } from "react-icons/fa6";
import { SiGoogleclassroom } from "react-icons/si";
import { GiPieChart } from "react-icons/gi";
import { TbAlarmAverage, TbArrowRotaryLastLeft } from "react-icons/tb";

interface Statistic {
  title: any;
  value: any;
  icon?: any;
}

const Statistics = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { address, isConnected } = useAccount();
  const userName = useGetStudentName(address);
  const attendanceRatio = useGetAttendanceRatio(address);

  const { signedAttendanceImages, isLoading } =
    useGetSignedAttendanceImages(address);

  const statistics: Statistic[] = [
    {
      title: "Total Campaigns",
      value: Math.floor(
        attendanceRatio.attendanceRatio.totalClasses
          ? attendanceRatio.attendanceRatio.totalClasses
          : 0
      ),
      icon: <SiGoogleclassroom />,
    },
    {
      title: "Campaign attended",
      value: Math.floor(
        attendanceRatio.attendanceRatio.attendance
          ? attendanceRatio.attendanceRatio.attendance
          : 0
      ),
      icon: <FaFileSignature />,
    },
    {
      title: "Attendance Percentage",
      value:
        attendanceRatio.attendanceRatio.attendance &&
        attendanceRatio.attendanceRatio.totalClasses
          ? `${Math.floor(
              (attendanceRatio.attendanceRatio.attendance /
                attendanceRatio.attendanceRatio.totalClasses) *
                100
            )}%`
          : 0,
      icon: <GiPieChart />,
    },
  ];

  return (
    <>
      <section className="flex justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold">Welcome back, {userName}</h1>
          <p className="capitalize text-xs">welcome to PlanetPal dashboard</p>
        </div>
      </section>
      <section>
        <h1 className="mb-2">Overview</h1>
      </section>
      <section className="w-full grid md:grid-cols-3 gap-8 ">
        <main className="w-full md:col-span-2">
          <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-3 ">
            {statistics?.map((stat, index) => (
              <div
                key={index}
                className="w-full h-24 flex flex-col justify-between hover:border hover:border-color1 transition-all ease-in-out shadow-md bg-color2/90 rounded-md px-3 p-2"
              >
                <h1 className="text-white/85 font-medium text-sm">
                  {stat.title}
                </h1>
                <div className="w-full flex md:flex-row-reverse flex-wrap justify-between items-center">
                  <div className="w-12 h-12 rounded-full border border-white/85 flex items-center justify-center text-white/85 text-xl">
                    {stat.icon}
                  </div>
                  <h3 className="text-2xl font-semibold text-white/90">
                    {stat.value}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </main>
        <aside className="w-full p-6 bg-white rounded-md  h-[350px] shadow-lg">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border h-full"
          />
        </aside>
      </section>
    </>
  );
};

export default Statistics;
