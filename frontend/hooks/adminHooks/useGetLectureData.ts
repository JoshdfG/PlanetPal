import { OrganisationABI } from "@/constants/ABIs/OrganisationABI";
import { getOrgContract } from "@/constants/contracts";
import { readOnlyProvider } from "@/constants/provider";
import { useQueryClient } from "@tanstack/react-query";
import { ethers } from "ethers";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { useBlockNumber, useReadContract } from "wagmi";

const useGetLectureData = () => {
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
  } = useReadContract({
    address: contract_address,
    abi: OrganisationABI,
    functionName: "getLectureIds",
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
        const lectureData = await contract.getLectureData(id);
        return {
          lectureId: ethers.decodeBytes32String(id),
          mentorOnDuty: lectureData[0],
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
  }, [listOfLectureIds?.length, listOfLectureIds, contract_address]);

  useEffect(() => {
    fetchLectureData();
  }, [fetchLectureData]);

  useEffect(() => {
    if (listOfLectureIdsError) {
      toast.error(listOfLectureIdsError.message, {
        position: "top-right",
      });
    }
  }, [listOfLectureIdsError]);

  return { lectureInfo, isLoading, fetchLectureData };
};

export default useGetLectureData;
