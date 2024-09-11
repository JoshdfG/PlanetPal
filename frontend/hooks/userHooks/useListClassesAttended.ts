import { OrganisationABI } from "@/constants/ABIs/OrganisationABI";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { useBlockNumber, useReadContract } from "wagmi";

const useListClassesAttended = (student_address: any) => {
  const queryClient = useQueryClient();
  const [classesAttended, setClassesAttended] = useState<number[]>([]);

  const active_organisation = window.localStorage?.getItem(
    "active_organisation"
  );
  const contract_address = JSON.parse(active_organisation as string);

  const { data: blockNumber } = useBlockNumber({ watch: true });

  const {
    data: classesAttendedData,
    error: classesAttendedError,
    isPending: classesAttendedIsPending,
    queryKey,
  } = useReadContract({
    address: contract_address,
    abi: OrganisationABI,
    functionName: "listClassesAttended",
    args: [student_address],
  });

  useEffect(() => {
    if (blockNumber) {
      queryClient.invalidateQueries({ queryKey });
    }
  }, [blockNumber, queryClient, queryKey]);

  const fetchClassesAttended = useCallback(() => {
    if (classesAttendedData) {
      setClassesAttended(
        classesAttendedData.map((item: `0x${string}`) => Number(BigInt(item)))
      );
    }
  }, [classesAttendedData]);

  useEffect(() => {
    fetchClassesAttended();
  }, [classesAttendedData, fetchClassesAttended]);

  return {
    classesAttended,
    isPending: classesAttendedIsPending,
    error: classesAttendedError,
  };
};

export default useListClassesAttended;
