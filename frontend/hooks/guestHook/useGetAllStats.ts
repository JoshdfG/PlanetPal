import { getOrgContract, getOrgFactoryContract } from "@/constants/contracts";
import { readOnlyProvider } from "@/constants/provider";
import { useCallback, useEffect, useState } from "react";

interface StatsData {
  totalOrganisations: number;
  totalStudents: number;
  totalMentors: number;
  totalClasses: number;
  totalSignedAttendance: number;
}

const useGetAllStats = () => {
  const [allOrganisation, setAllOrganisation] = useState<string[]>([]);
  const [statsData, setStatsData] = useState<StatsData>({
    totalOrganisations: 0,
    totalStudents: 0,
    totalMentors: 0,
    totalClasses: 0,
    totalSignedAttendance: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchAllOrganisations = useCallback(async () => {
    try {
      const contract = getOrgFactoryContract(readOnlyProvider);
      const res = await contract.getOrganizations();
      const formattedRes = res.map((address: any) => address.toString());
      setAllOrganisation(formattedRes);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const fetchAllStats = useCallback(async () => {
    if (!allOrganisation) return;

    try {
      const totalListOfStudents = allOrganisation.map(async (address: any) => {
        const contract = getOrgContract(readOnlyProvider, address);
        const list = await contract.liststudents();
        return list.length;
      });
      const totalListOfStudentResults = await Promise.all(totalListOfStudents);
      const totalStudents = totalListOfStudentResults.reduce(
        (a: number, b: number) => a + b,
        0
      );

      const totalListOfMentors = allOrganisation.map(async (address: any) => {
        const contract = getOrgContract(readOnlyProvider, address);
        const list = await contract.listMentors();
        return list.length;
      });
      const totalListOfMentorResults = await Promise.all(totalListOfMentors);
      const totalMentors = totalListOfMentorResults.reduce(
        (a: number, b: number) => a + b,
        0
      );

      const totalListOfClasses = allOrganisation.map(async (address: any) => {
        const contract = getOrgContract(readOnlyProvider, address);
        const list = await contract.getLectureIds();
        return list.length;
      });
      const totalListOfClassResults = await Promise.all(totalListOfClasses);
      const totalClasses = totalListOfClassResults.reduce(
        (a: number, b: number) => a + b,
        0
      );

      const totalListOfAttendances = allOrganisation.map(
        async (address: any) => {
          const contract = getOrgContract(readOnlyProvider, address);
          const list = await contract.liststudents();
          const formattedList = list.map((address: any) => address.toString());

          const totalAttendances = formattedList.map(async (addr: any) => {
            const attendedClasses = await contract.listClassesAttended(addr);
            return attendedClasses.length;
          });
          const attendances = await Promise.all(totalAttendances);
          return attendances.reduce((a: number, b: number) => a + b, 0);
        }
      );

      const totalListOfAttendanceResults = await Promise.all(
        totalListOfAttendances
      );
      const totalSignedAttendance = totalListOfAttendanceResults.reduce(
        (a: number, b: number) => a + b,
        0
      );

      const stats = {
        totalOrganisations: allOrganisation.length,
        totalStudents,
        totalMentors,
        totalClasses,
        totalSignedAttendance,
      };

      setStatsData(stats);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching statistics:", error);
      setIsLoading(false);
    }
  }, [allOrganisation]);

  useEffect(() => {
    fetchAllOrganisations();
  }, [fetchAllOrganisations]);

  useEffect(() => {
    if (allOrganisation.length) {
      fetchAllStats();
    }
  }, [allOrganisation, fetchAllStats]);

  return { statsData, isLoading };
};

export default useGetAllStats;
