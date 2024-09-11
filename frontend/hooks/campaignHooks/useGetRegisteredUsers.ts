"use client";
import { OrganisationABI } from "@/constants/ABIs/OrganisationABI";
import { useCallback, useEffect, useState } from "react";
import { useReadContract, type BaseError } from "wagmi";

interface Reg {
  name: string;
  user_address: `0x${string}`;
  email_address: string;
}

const useGetUserCampaignReg = () => {
  const [users, setUsers] = useState<Reg[]>([]);
  const [isError, setIsError] = useState(false);

  const active_organisation = window.localStorage.getItem(
    "active_organisation"
  );
  const contract_address = JSON.parse(active_organisation as `0x${string}`);

  const { data, error, isLoading } = useReadContract({
    address: contract_address,
    abi: OrganisationABI,
    functionName: "getUserCampaignReg",
  });

  const toastId = "getUserCampaignReg";

  useEffect(() => {
    if (isLoading) {
    }

    if (data && Array.isArray(data)) {
      setUsers(data as Reg[]);
    } else if (data) {
      console.error("Data is not an array:", data);
    }

    if (error) {
      setIsError(true);
      console.error(error);
    }
  }, [data, error, isLoading]);

  return {
    users,
    isError,
    isLoading,
  };
};

export default useGetUserCampaignReg;
