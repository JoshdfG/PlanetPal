"use client";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useEffect, useMemo, useState } from "react";
import useGetNumericStatistics from "@/hooks/adminHooks/useGetNumericStatistics";

const options: ApexOptions = {
  chart: {
    width: 380,
    type: "pie",
  },
  labels: [
    "Total Classes",
    "Total Students",
    "Total Mentors",
    "Attendance Signed",
    "Total Certifications",
  ],
  colors: ["#725D1D", "#374151", "#f59e0b", "#557ab5", "#e4732c"],
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          position: "bottom",
        },
      },
    },
  ],
  legend: {
    position: "bottom",
  },
};

const Piechart = () => {
  const initialData = {
    series: [42, 47, 52, 58, 65],
  };

  const [data, setData] = useState(initialData);

  const { statsData, isLoading } = useGetNumericStatistics();

  useEffect(() => {
    if (!isLoading) {
      setData({
        series: [
          statsData?.totalClass,
          statsData?.totalStudent,
          statsData?.totalMentors,
          statsData?.totalSignedAttendance,
          statsData?.totalCertification
            ? statsData.totalStudent
            : statsData.totalCertification === undefined
            ? 0
            : 0,
        ],
      });
    }
  }, [
    statsData?.totalClass,
    statsData?.totalStudent,
    statsData?.totalMentors,
    statsData?.totalSignedAttendance,
    statsData?.totalCertification,
    isLoading,
  ]);

  return (
    <div className="w-full">
      <ReactApexChart
        options={options}
        series={data.series}
        type="pie"
        height={380}
      />
    </div>
  );
};

export default Piechart;
