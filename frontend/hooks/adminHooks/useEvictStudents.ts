import { OrganisationABI } from "@/constants/ABIs/OrganisationABI";
import { useCallback, useEffect } from "react";
import { toast } from "sonner";
import {
  useWaitForTransactionReceipt,
  useWriteContract,
  type BaseError,
} from "wagmi";

const useEvictStudents = (data: any[]) => {
  const { data: hash, error, writeContract } = useWriteContract();

  const active_organisation = window.localStorage?.getItem(
    "active_organisation"
  );
  const contract_address = JSON.parse(active_organisation as `0x${string}`);

  const evictStudents = useCallback(() => {
    const formattedData = data.map((address) => address as `0x${string}`);

    writeContract({
      address: contract_address,
      abi: OrganisationABI,
      functionName: "EvictStudents",
      args: [formattedData],
    });
  }, [data]);

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const toastId = "evictStudents";

  useEffect(() => {
    if (isConfirming) {
      toast.loading("Processing...", {
        id: toastId,
        position: "top-right",
      });
    }

    if (isConfirmed) {
      toast.success("Students evicted successfully !", {
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
    evictStudents,
    isConfirming,
    isConfirmed,
  };
};

export default useEvictStudents;
