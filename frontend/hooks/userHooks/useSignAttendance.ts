import { OrganisationABI } from "@/constants/ABIs/OrganisationABI";
import { ethers } from "ethers";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  useWriteContract,
  useWaitForTransactionReceipt,
  type BaseError,
} from "wagmi";

const useSignAttendance = (_lectureId: string) => {
  const { data: hash, error, writeContract } = useWriteContract();

  const active_organisation = window.localStorage?.getItem(
    "active_organisation"
  );
  const contract_address = JSON.parse(active_organisation as `0x${string}`);

  const signAttendance = useCallback(() => {
    const lectureIdBytes: any = ethers.encodeBytes32String(_lectureId);
    writeContract({
      address: contract_address,
      abi: OrganisationABI,
      functionName: "signAttendance",
      args: [lectureIdBytes],
    });
  }, [_lectureId]);

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const toastId = "signAttendance";

  useEffect(() => {
    if (isConfirming) {
      toast.success("Signing attendance...", {
        id: toastId,
        position: "top-right",
      });
    }

    if (isConfirmed) {
      toast.success("Attendance signed", {
        id: toastId,
        position: "top-right",
      });
    }

    if (error) {
      toast.error((error as BaseError).shortMessage || error.message, {
        id: toastId,
        position: "top-right",
      });
    }
  }, [isConfirming, isConfirmed, error]);

  return {
    signAttendance,
    isConfirming,
    isConfirmed,
  };
};

export default useSignAttendance;
