"use client";
import { OrganisationABI } from "@/constants/ABIs/OrganisationABI";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { toast } from "sonner";
import {
  useWaitForTransactionReceipt,
  useWriteContract,
  type BaseError,
} from "wagmi";

const useTransferOwnership = (newModerator: any) => {
  const { data: hash, error, writeContract } = useWriteContract();

  const active_organisation = window.localStorage?.getItem(
    "active_organisation"
  );
  const contract_address = JSON.parse(active_organisation as `0x${string}`);

  const router = useRouter();

  const transferOwner = useCallback(() => {
    const formatAddress = newModerator as `0x${string}`;
    writeContract({
      address: contract_address,
      abi: OrganisationABI,
      functionName: "TransferOwnership",
      args: [formatAddress],
    });
  }, [newModerator]);

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const toastId = "transferOwnership";

  useEffect(() => {
    if (isConfirming) {
      toast.loading("Processing", {
        id: toastId,
        position: "top-right",
      });
    }

    if (isConfirmed) {
      toast.success("Ownership transferred successfully!", {
        id: toastId,
        position: "top-right",
      });
      router.push("/programme");
    }

    if (error) {
      toast.error((error as BaseError).shortMessage || error.message, {
        id: toastId,
        position: "top-right",
      });
    }
  }, [isConfirming, isConfirmed, error]);

  return {
    transferOwner,
    isConfirming,
    isConfirmed,
  };
};

export default useTransferOwnership;
