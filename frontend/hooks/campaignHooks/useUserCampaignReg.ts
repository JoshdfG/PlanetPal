import { OrganisationABI } from "@/constants/ABIs/OrganisationABI";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  useWaitForTransactionReceipt,
  useWriteContract,
  type BaseError,
} from "wagmi";

interface Reg {
  name: string;
  user_address: `0x${string}`;
  email_address: string;
}

const useUserCampaignReg = () => {
  const [isWritingCampReg, setIsWritingCampReg] = useState(false);
  const [registeredUser, setRegisteredUser] = useState<Reg | null>(null); // Store registered user data
  const { data: hash, error, writeContract } = useWriteContract();

  const active_organisation = window.localStorage.getItem(
    "active_organisation"
  );
  const contract_address = JSON.parse(active_organisation as `0x${string}`);

  const registerUser = useCallback(
    async (user: Reg) => {
      setIsWritingCampReg(true);

      writeContract({
        address: contract_address,
        abi: OrganisationABI,
        functionName: "userCampaignReg",
        args: [user],
      });

      // Store the input data in state
      setRegisteredUser(user);
    },
    [contract_address, writeContract]
  );

  const { isLoading: isConfirmingCampReg, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const toastId = "userCampaignReg";

  useEffect(() => {
    if (isConfirmingCampReg) {
      toast.loading("Processing...", {
        id: toastId,
        position: "top-right",
      });
    }

    if (isConfirmed) {
      toast.success("User registered successfully!", {
        id: toastId,
        position: "top-right",
      });
      setIsWritingCampReg(false);
    }

    if (error) {
      toast.error((error as BaseError).shortMessage || error.message, {
        id: toastId,
        position: "top-right",
      });
      setIsWritingCampReg(false);
    }
  }, [isConfirmed, error, isConfirmingCampReg]);

  return {
    registerUser,
    isWritingCampReg,
    isConfirmingCampReg,
    registeredUser, // Return the registered user data
  };
};

export default useUserCampaignReg;
