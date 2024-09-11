"use client";
import { useReadContract } from "wagmi";
import { OrganisationABI } from "@/constants/ABIs/OrganisationABI";

interface Reg {
  name: string;
  user_address: `0x${string}`;
  email_address: string;
}

const useGetUserCampaignReg = () => {
  const active_organisation = window.localStorage.getItem(
    "active_organisation"
  );
  const contract_address = JSON.parse(active_organisation as `0x${string}`);

  // Use useContractRead to fetch the data
  const { data, error, isLoading } = useReadContract({
    address: contract_address,
    abi: OrganisationABI,
    functionName: "getUserCampaignReg",
  });

  return {
    data: (data as Reg[]) || [], // Explicitly cast data to Reg[]
    error,
    isLoading,
  };
};

export default useGetUserCampaignReg;
