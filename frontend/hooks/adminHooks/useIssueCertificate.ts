import { OrganisationABI } from "@/constants/ABIs/OrganisationABI";
import { useCallback, useEffect } from "react";
import { toast } from "sonner";
import {
  useWaitForTransactionReceipt,
  useWriteContract,
  type BaseError,
} from "wagmi";

const useIssueCertificate = (URI: string) => {
  const { data: hash, error, writeContract } = useWriteContract();

  const active_organisation = window.localStorage?.getItem(
    "active_organisation"
  );
  const contract_address = JSON.parse(active_organisation as `0x${string}`);

  const issueCertificateToStudents = useCallback(() => {
    writeContract({
      address: contract_address,
      abi: OrganisationABI,
      functionName: "MintCertificate",
      args: [URI],
    });
  }, [URI]);

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const toastId = "issueCertificateToStudents";

  useEffect(() => {
    if (isConfirming) {
      toast.loading("Processing...", {
        id: toastId,
        position: "top-right",
      });
    }

    if (isConfirmed) {
      toast.success("Certificate issued successfully !", {
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
    issueCertificateToStudents,
    isConfirming,
    isConfirmed,
  };
};

export default useIssueCertificate;
