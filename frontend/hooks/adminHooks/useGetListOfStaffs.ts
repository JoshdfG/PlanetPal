import { OrganisationABI } from "@/constants/ABIs/OrganisationABI";
import { getOrgContract } from "@/constants/contracts";
import { readOnlyProvider } from "@/constants/provider";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { useBlockNumber, useReadContract } from "wagmi";

const useGetListOfStaffs = () => {
  const [list, setList] = useState<any[]>([]);

  const queryClient = useQueryClient();
  const { data: blockNumber } = useBlockNumber({ watch: true });

  const active_organisation = window.localStorage?.getItem(
    "active_organisation"
  );
  const contract_address = JSON.parse(active_organisation as `0x${string}`);

  const {
    data: listOfMentors,
    error: listOfMentorsError,
    isPending: listOfMentorsIsPending,
    queryKey,
  } = useReadContract({
    address: contract_address,
    abi: OrganisationABI,
    functionName: "listStaffs",
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey });
  }, [blockNumber, queryClient, queryKey]);

  const fetchMmentorsDetails = useCallback(async () => {
    if (!listOfMentors || !Array.isArray(listOfMentors)) return;

    try {
      const formattedRes = listOfMentors.map((address: any) =>
        address.toString()
      );

      const data = formattedRes.map(async (address: any) => {
        const contract = getOrgContract(readOnlyProvider, contract_address);
        const name = await contract.getStaffsName(address);
        return {
          name,
          address,
        };
      });
      const results = await Promise.all(data);
      setList(results);
    } catch (error) {
      console.error(error);
    }
  }, [listOfMentors]);

  useEffect(() => {
    fetchMmentorsDetails();
  }, [fetchMmentorsDetails]);

  useEffect(() => {
    if (listOfMentorsError) {
      toast.error(listOfMentorsError.message, {
        position: "top-right",
      });
    }
  }, [listOfMentorsError]);

  return list;
};

export default useGetListOfStaffs;
