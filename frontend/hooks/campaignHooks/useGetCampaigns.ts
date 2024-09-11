"use client";
import { useBlockNumber, useReadContract } from "wagmi";
import { toast } from "sonner";
import { useEffect, useState, useCallback } from "react";
import { OrganisationABI } from "@/constants/ABIs/OrganisationABI";
import { useQueryClient } from "@tanstack/react-query";

const useGetCampaigns = () => {
  const [list, setList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const queryClient = useQueryClient();
  const { data: blockNumber } = useBlockNumber({ watch: true });

  const active_organisation = window.localStorage?.getItem(
    "active_organisation"
  );
  const contract_address = JSON.parse(active_organisation as `0x${string}`);

  const {
    data: campaigns,
    error: campaignsError,
    isPending: campaignsIsPending,
    queryKey,
  } = useReadContract({
    address: contract_address,
    abi: OrganisationABI,
    functionName: "getCampaigns",
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey });
  }, [blockNumber, queryClient, queryKey]);

  const fetchCampaigns = useCallback(async () => {
    if (!campaigns || !Array.isArray(campaigns)) return;

    try {
      setList(campaigns);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }, [campaigns]);

  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]);

  useEffect(() => {
    if (campaignsError) {
      toast.error(campaignsError.message, { position: "top-right" });
    }
  }, [campaignsError]);

  return { list, isLoading };
};

export default useGetCampaigns;
