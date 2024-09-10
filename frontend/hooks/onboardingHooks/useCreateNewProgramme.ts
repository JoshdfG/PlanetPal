"use client";
import { OrganisationFactoryABI } from "./../../constants/ABIs/OrganisationFactoryABI";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  useWriteContract,
  useWaitForTransactionReceipt,
  type BaseError,
} from "wagmi";

const useCreateNewProgramme = (
  newOrganisationName: string,
  newImageURI: string,
  newAdminName: string
) => {
  const router = useRouter();
  const [isWriting, setIsWriting] = useState(false);

  const { data: hash, error, writeContract } = useWriteContract();

  const createProgramme = useCallback(() => {
    setIsWriting(true);
    writeContract({
      address: process.env.NEXT_PUBLIC_ORG_FACTORY_CONTRACT as `0x${string}`,
      abi: OrganisationFactoryABI,
      functionName: "createorganisation",
      args: [newOrganisationName, newImageURI, newAdminName],
    });
  }, [newOrganisationName, newImageURI, newAdminName]);

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const toastId = "createNewProgramme";

  useEffect(() => {
    if (isConfirming) {
      toast.loading("Processing...", {
        id: toastId,
        position: "top-right",
      });
    }

    if (isConfirmed) {
      toast.success("Programme created successfully !", {
        id: toastId,
        position: "top-right",
      });
      router.push("/viewprogramme");
      setIsWriting(false);
    }

    if (error) {
      toast.error((error as BaseError).shortMessage || error.message, {
        id: toastId,
        position: "top-right",
      });
      setIsWriting(false);
    }
  }, [isConfirmed, router, error, isConfirming]);

  return {
    createProgramme,
    isWriting,
    isConfirming,
  };
};

export default useCreateNewProgramme;
