"use client";
import { OrganisationABI } from "./../../constants/ABIs/OrganisationABI";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  useWriteContract,
  useWaitForTransactionReceipt,
  type BaseError,
} from "wagmi";

const useCreateCampaign = (
  campaignName: string,
  imageUri: string,
  creatorsAddress: string,
  campaignLocation: string,
  campaignDescription: string
) => {
  const router = useRouter();
  const [isWritingCampaign, setIsWriting] = useState(false);

  const { data: hash, error, writeContract } = useWriteContract();

  const active_organisation = window.localStorage?.getItem(
    "active_organisation"
  );
  const contract_address = JSON.parse(active_organisation as `0x${string}`);

  const createCampaign = useCallback(() => {
    setIsWriting(true);
    writeContract({
      address: contract_address,
      abi: OrganisationABI,
      functionName: "createCampaign",
      args: [
        campaignName,
        imageUri,
        creatorsAddress,
        campaignLocation,
        campaignDescription,
      ],
    });
  }, [
    campaignName,
    imageUri,
    creatorsAddress,
    campaignLocation,
    campaignDescription,
  ]);

  const { isLoading: isConfirmingCampaign, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const toastId = "createCampaign";

  useEffect(() => {
    if (isConfirmingCampaign) {
      toast.loading("Processing...", {
        id: toastId,
        position: "top-right",
      });
    }

    if (isConfirmed) {
      toast.success("campaign created successfully !", {
        id: toastId,
        position: "top-right",
      });
      setIsWriting(false);
    }

    if (error) {
      toast.error((error as BaseError).shortMessage || error.message, {
        id: toastId,
        position: "top-right",
      });
      setIsWriting(false);
    }
  }, [isConfirmed, router, error, isConfirmingCampaign]);

  return {
    createCampaign,
    isWritingCampaign,
    isConfirmingCampaign,
  };
};

export default useCreateCampaign;
