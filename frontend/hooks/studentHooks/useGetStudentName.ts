"use client";
import { OrganisationABI } from "@/constants/ABIs/OrganisationABI";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { useBlockNumber, useReadContract } from "wagmi";

const useGetStudentName = (_userAddress: any) => {
  const [studentName, setStudentName] = useState("");

  const active_organisation = window.localStorage?.getItem(
    "active_organisation"
  );
  const contract_address = JSON.parse(active_organisation as `0x${string}`);

  const queryClient = useQueryClient();
  const { data: blockNumber } = useBlockNumber({ watch: true });

  const {
    data: nameOfStudent,
    error: nameOfStudentError,
    isPending: nameOfStudentIsPending,
    queryKey,
  } = useReadContract({
    address: contract_address,
    abi: OrganisationABI,
    functionName: "getUserName",
    args: [_userAddress],
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey });
  }, [blockNumber, queryClient, queryKey]);

  const fetchStudentName = useCallback(async () => {
    if (!nameOfStudent) return;
    setStudentName(nameOfStudent.toString());
  }, [nameOfStudent]);

  useEffect(() => {
    fetchStudentName();
  }, [fetchStudentName]);

  useEffect(() => {
    if (nameOfStudentError) {
      toast.error(nameOfStudentError.message, {
        position: "top-right",
      });
    }
  }, [nameOfStudentError]);

  return studentName;
};

export default useGetStudentName;
