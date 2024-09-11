import { OrganisationABI } from "@/constants/ABIs/OrganisationABI";
import { getOrgContract } from "@/constants/contracts";
import { readOnlyProvider } from "@/constants/provider";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useReadContract } from "wagmi";

const useGetCampaigns = () => {
  const [list, setList] = useState<any[]>([]);

  const active_organisation = window.localStorage?.getItem(
    "active_organisation"
  );
  const contract_address = JSON.parse(active_organisation as `0x${string}`);

  const {
    data: campaigns,
    error,
    isLoading,
  } = useReadContract({
    address: contract_address,
    abi: OrganisationABI,
    functionName: "getCampaigns",
  });

  useEffect(() => {
    if (Array.isArray(campaigns)) {
      setList(campaigns);
    } else {
      console.error("Invalid campaigns:", campaigns);
    }
  }, [campaigns]);

  useEffect(() => {
    if (error) {
      toast.error(error.message, {
        position: "top-right",
      });
    }
  }, [error]);

  return list;
};

export default useGetCampaigns;
