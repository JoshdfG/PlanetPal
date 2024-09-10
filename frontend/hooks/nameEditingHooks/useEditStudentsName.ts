import { OrganisationABI } from "@/constants/ABIs/OrganisationABI";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
  type BaseError,
} from "wagmi";

const useEditStudentsName = (name: string) => {
  const [isWriting, setIsWriting] = useState(false);
  const { address } = useAccount();
  const { data: hash, error, writeContract } = useWriteContract();

  const active_organisation = window.localStorage.getItem(
    "active_organisation"
  );
  const contract_address = JSON.parse(active_organisation as `0x${string}`);

  const editStudentsName = useCallback(() => {
    if (!address) {
      toast.error("No connected address found");
      return;
    }

    setIsWriting(true);
    const formattedData = [{ _address: address, _name: name }];

    writeContract({
      address: contract_address,
      abi: OrganisationABI,
      functionName: "editStudentName",
      args: [formattedData],
    });
  }, [address, name]);

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const toastId = "editStudentsName";

  useEffect(() => {
    if (isConfirming) {
      toast.loading("Processing...", {
        id: toastId,
        position: "top-right",
      });
    }

    if (isConfirmed) {
      toast.success("Students name edited successfully!", {
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
  }, [isConfirmed, error, isConfirming]);

  return {
    editStudentsName,
    isWriting,
    isConfirming,
  };
};

export default useEditStudentsName;
