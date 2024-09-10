import { OrganisationABI } from "@/constants/ABIs/OrganisationABI";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  useWaitForTransactionReceipt,
  useWriteContract,
  type BaseError,
} from "wagmi";

const useRegisterStaff = (data: any[]) => {
  const [isWriting, setIsWriting] = useState(false);

  const { data: hash, error, writeContract } = useWriteContract();

  const active_organisation = window.localStorage?.getItem(
    "active_organisation"
  );
  const contract_address = JSON.parse(active_organisation as `0x${string}`);

  const registerStaff = useCallback(() => {
    setIsWriting(true);
    const formattedData = data.map(({ address, name }) => ({
      _address: address as `0x${string}`,
      _name: name,
    }));
    writeContract({
      address: contract_address,
      abi: OrganisationABI,
      functionName: "registerStaffs",
      args: [formattedData],
    });
  }, [data]);

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const toastId = "registerStaffs";

  useEffect(() => {
    if (isConfirming) {
      toast.loading("Processing...", {
        id: toastId,
        position: "top-right",
      });
    }

    if (isConfirmed) {
      toast.success("staffs registered successfully !", {
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
    registerStaff,
    isWriting,
    isConfirming,
    isConfirmed,
  };
};

export default useRegisterStaff;
