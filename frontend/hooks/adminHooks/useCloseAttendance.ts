import { OrganisationABI } from "@/constants/ABIs/OrganisationABI";
import { ethers } from "ethers";
import { useCallback, useEffect } from "react";
import { toast } from "sonner";
import {
  useWaitForTransactionReceipt,
  useWriteContract,
  type BaseError,
} from "wagmi";

const useCloseAttendance = () => {
  const { data: hash, error, writeContract } = useWriteContract();

  const active_organisation = window.localStorage?.getItem(
    "active_organisation"
  );
  const contract_address = JSON.parse(active_organisation as `0x${string}`);

  const closeAttendance = useCallback(async (id: string) => {
    const formattedData: any = ethers.encodeBytes32String(id);

    writeContract({
      address: contract_address,
      abi: OrganisationABI,
      functionName: "closeAttendance",
      args: [formattedData],
    });
  }, []);

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const toastId = "closeAttendance";

  useEffect(() => {
    if (isConfirming) {
      toast.loading("Processing...", {
        id: toastId,
        position: "top-right",
      });
    }

    if (isConfirmed) {
      toast.success("Attendance updated successfully !", {
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
  }, [isConfirmed, error, isConfirming]);

  return {
    closeAttendance,
    isConfirming,
    isConfirmed,
  };
};

export default useCloseAttendance;
