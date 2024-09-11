"use client";
import { OrganisationABI } from "@/constants/ABIs/OrganisationABI";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useReadContract } from "wagmi";

interface Reg {
  name: string;
  user_address: `0x${string}`;
  email_address: string;
}

const useGetRegisteredUsers = () => {
  const [list, setList] = useState<Reg[]>([]);
  const [isLoadingState, setIsLoading] = useState(true);

  const active_organisation = window.localStorage?.getItem(
    "active_organisation"
  );
  const contract_address = active_organisation
    ? JSON.parse(active_organisation)
    : null;

  if (!contract_address) {
    console.error("No active organisation found.");
    return { list, isLoading: false, error: "No active organisation found." };
  }

  const {
    data: usersData,
    error,
    isLoading,
  } = useReadContract({
    address: contract_address,
    abi: OrganisationABI,
    functionName: "getUserCampaignReg",
  });

  useEffect(() => {
    if (Array.isArray(usersData)) {
      setList(usersData as Reg[]);
    } else {
      console.error("Invalid users data:", usersData);
    }
    setIsLoading(false);
  }, [usersData]);

  useEffect(() => {
    if (error) {
      toast.error(error.message, { position: "top-right" });
      setIsLoading(false);
    }
  }, [error]);

  return { list, isLoading: isLoadingState, error };
};

export default useGetRegisteredUsers;
