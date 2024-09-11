"use client";
import useGetAllStats from "@/hooks/guestHook/useGetAllStats";
import Piechart from "./Piechart";

const Stats = () => {
  const { statsData, isLoading } = useGetAllStats();

  return (
    <section className="w-full flex flex-col gap-6 items-center my-8">
      <div className="flex flex-col items-center">
        <h2 className="font-bold text-color2 lg:text-4xl md:text-3xl text-3xl text-center">
          Empowering Learning through Numbers
        </h2>
        <p className="font-medium text-color2 md:text-lg text-center lg:w-1/2 md:w-[65%] mt-3 px-3 md:px-0">
          Discover the Impact of PlanetPal and Green Revolution with Real-Time
          Statistics
        </p>
      </div>

      <section className="w-full grid md:grid-cols-2">
        <div className="w-full flex flex-col items-center p-3">
          <div className="flex flex-col items-center mb-4">
            <h1 className="uppercase text-color2 md:text-lg font-bold text-base">
              PlanetPal Programme Analysis
            </h1>
            <h4 className="text-base tracking-wider text-color2">
              Real-time Statistics
            </h4>
          </div>
          {/* pie */}
          <Piechart />
        </div>
        <main className="w-full flex md:flex-row flex-wrap flex-col items-center justify-center px-4">
          {/* total organisations */}
          <div className="w-full md:w-1/2 lg:w-[30%] flex flex-col cursor-pointer group items-center py-3 rounded-md">
            <h3 className="text-color1 text-5xl font-bold">
              {isLoading ? 0 : statsData?.totalOrganisations}
            </h3>
            <h1 className="text-color3 mt-3 text-base font-medium">
              Total Organisations
            </h1>
            <p className="text-color2 text-xs text-center">
              Number of organisations using PlanetPal
            </p>
          </div>

          {/* total no of students */}
          <div className="w-full md:w-1/2 lg:w-[30%] flex flex-col cursor-pointer group items-center py-3 rounded-md">
            <h3 className="text-color1 text-5xl  font-bold">
              {isLoading ? 0 : statsData?.totalStudents}
            </h3>
            <h1 className="text-color3 mt-3 text-base font-medium">
              Total Users
            </h1>
            <p className="text-color2 text-xs text-center">
              Number of Users enrolled
            </p>
          </div>

          {/* total no of mentors */}
          <div className="w-full md:w-1/2 lg:w-[30%] flex flex-col cursor-pointer group items-center py-3 rounded-md">
            <h3 className="text-color1 text-5xl font-bold">
              {isLoading ? 0 : statsData?.totalMentors}
            </h3>
            <h1 className="text-color3 mt-3 text-base font-medium">
              Total Staffs
            </h1>
            <p className="text-color2 text-xs text-center">
              Number of staffs guiding Users
            </p>
          </div>

          {/* total no of classes */}
          <div className="w-full md:w-1/2 lg:w-[30%] flex flex-col cursor-pointer group items-center py-3 rounded-md">
            <h3 className="text-color1 text-5xl font-bold">
              {isLoading ? 0 : statsData?.totalClasses}
            </h3>
            <h1 className="text-color3 mt-3 text-base font-medium">
              Total Classes
            </h1>
            <p className="text-color2 text-xs text-center">
              Number of classes conducted
            </p>
          </div>

          {/* total no of signed attendance */}
          <div className="w-full md:w-1/2 lg:w-[30%] flex flex-col cursor-pointer group items-center py-3 rounded-md">
            <h3 className="text-color1 text-5xl font-bold">
              {isLoading ? 0 : statsData?.totalSignedAttendance}
            </h3>
            <h1 className="text-color3 mt-3 text-base font-medium">
              Campaign Attendance
            </h1>
            <p className="text-color2 text-xs text-center">
              Total number of signed attendance
            </p>
          </div>
        </main>
      </section>
    </section>
  );
};

export default Stats;
