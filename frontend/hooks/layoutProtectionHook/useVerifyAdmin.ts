import { OrganisationABI } from "@/constants/ABIs/OrganisationABI";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { useReadContract } from "wagmi";

const useVerifyAdmin = (_userAddress: any) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(true);

  const active_organisation = window.localStorage?.getItem(
    "active_organisation"
  );
  const contract_address = JSON.parse(active_organisation as `0x${string}`);

  const {
    data: adminStatus,
    error: adminStatusError,
    isPending: adminStatusIsPending,
  } = useReadContract({
    address: contract_address,
    abi: OrganisationABI,
    functionName: "VerifyMentor",
    args: [_userAddress],
  });

  const fetchAdminStatus = useCallback(async () => {
    if (!adminStatus) return;
    setIsAdmin(adminStatus.toString() === "true");
  }, [adminStatus]);

  useEffect(() => {
    fetchAdminStatus();
  }, [fetchAdminStatus]);

  useEffect(() => {
    if (adminStatusError) {
      toast.error(adminStatusError.message, {
        position: "top-right",
      });
    }
  }, [adminStatusError]);

  return isAdmin;
};

export default useVerifyAdmin;
