import { OrganisationABI } from "@/constants/ABIs/OrganisationABI";
import { useCallback, useEffect } from "react";
import { toast } from "sonner";
import {
  useWaitForTransactionReceipt,
  useWriteContract,
  type BaseError,
} from "wagmi";

const useRemoveMentor = (data: any[]) => {
  const { data: hash, error, writeContract } = useWriteContract();

  const active_organisation = window.localStorage?.getItem(
    "active_organisation"
  );
  const contract_address = JSON.parse(active_organisation as `0x${string}`);

  const removeMentors = useCallback(() => {
    const formattedData = data.map((address) => address as `0x${string}`);

    writeContract({
      address: contract_address,
      abi: OrganisationABI,
      functionName: "removeMentor",
      args: [formattedData],
    });
  }, [data]);

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const toastId = "removeMentor";

  useEffect(() => {
    if (isConfirming) {
      toast.loading("Processing...", {
        id: toastId,
        position: "top-right",
      });
    }

    if (isConfirmed) {
      toast.success("Mentor removed successfully !", {
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
    removeMentors,
    isConfirming,
    isConfirmed,
  };
};

export default useRemoveMentor;
