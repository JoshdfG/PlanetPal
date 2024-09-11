import { OrganisationABI } from "@/constants/ABIs/OrganisationABI";
import { getOrgContract } from "@/constants/contracts";
import { readOnlyProvider } from "@/constants/provider";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { useBlockNumber, useReadContract } from "wagmi";

const useGetListOfUsers = () => {
  const [list, setList] = useState<any[]>([]);

  const queryClient = useQueryClient();
  const { data: blockNumber } = useBlockNumber({ watch: true });

  const active_organisation = window.localStorage?.getItem(
    "active_organisation"
  );
  const contract_address = JSON.parse(active_organisation as `0x${string}`);

  const {
    data: listOfStudents,
    error: listOfStudentsError,
    isPending: listOfStudentsIsPending,
    queryKey,
  } = useReadContract({
    address: contract_address,
    abi: OrganisationABI,
    functionName: "listUsers",
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey });
  }, [blockNumber, queryClient, queryKey]);

  const fetchStudentsDetails = useCallback(async () => {
    if (!listOfStudents || !Array.isArray(listOfStudents)) return;

    try {
      const formattedRes = listOfStudents.map((address: any) =>
        address.toString()
      );

      const data = formattedRes.map(async (address: any) => {
        const contract = getOrgContract(readOnlyProvider, contract_address);
        const name = await contract.getUserName(address);
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
  }, [listOfStudents]);

  useEffect(() => {
    fetchStudentsDetails();
  }, [fetchStudentsDetails]);

  useEffect(() => {
    if (listOfStudentsError) {
      toast.error(listOfStudentsError.message, {
        position: "top-right",
      });
    }
  }, [listOfStudentsError]);

  return list;
};

export default useGetListOfUsers;
