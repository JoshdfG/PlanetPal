import { OrganisationABI } from "@/constants/ABIs/OrganisationABI";
import { getOrgContract } from "@/constants/contracts";
import { readOnlyProvider } from "@/constants/provider";
import { useQueryClient } from "@tanstack/react-query";
import { ethers } from "ethers";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { useBlockNumber, useReadContract } from "wagmi";

const useGetSignedAttendanceImages = (_studentAddress: any) => {
  const [signedAttendanceImages, setSignedAttendanceImages] = useState<any[]>(
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const queryClient = useQueryClient();
  const { data: blockNumber } = useBlockNumber({ watch: true });

  const active_organisation = window.localStorage?.getItem(
    "active_organisation"
  );
  const contract_address = JSON.parse(active_organisation as `0x${string}`);

  const {
    data: attendedLectureIds,
    error: attendedLectureIdsError,
    isPending: attendedLectureIdsIsPending,
    queryKey,
  } = useReadContract({
    address: contract_address,
    abi: OrganisationABI,
    functionName: "listCampaignAttended",
    args: [_studentAddress],
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey });
  }, [blockNumber, queryClient, queryKey]);

  const fetchSignedAttendanceImages = useCallback(async () => {
    if (!attendedLectureIds || !Array.isArray(attendedLectureIds)) return;

    try {
      const formattedRes = attendedLectureIds.map((id: any) => id.toString());

      const data = formattedRes.map(async (id: any) => {
        const contract = getOrgContract(readOnlyProvider, contract_address);
        const lectureData = await contract.getCampaignData(id);
        const mentorName = await contract.getStaffsName(lectureData[0]);

        return {
          lectureId: ethers.decodeBytes32String(id),
          mentorOnDuty: lectureData[0],
          mentorName: mentorName.toString(),
          topic: lectureData[1],
          imageURI: lectureData[2],
        };
      });
      const results = await Promise.all(data);

      setIsLoading(false);
      setSignedAttendanceImages(results);
    } catch (error) {
      console.error(error);
    }
  }, [attendedLectureIds, contract_address]);

  useEffect(() => {
    fetchSignedAttendanceImages();
  }, [fetchSignedAttendanceImages]);

  useEffect(() => {
    if (attendedLectureIdsError) {
      toast.error(attendedLectureIdsError.message, {
        position: "top-right",
      });
    }
  }, [attendedLectureIdsError]);

  return { signedAttendanceImages, isLoading, fetchSignedAttendanceImages };
};

export default useGetSignedAttendanceImages;
