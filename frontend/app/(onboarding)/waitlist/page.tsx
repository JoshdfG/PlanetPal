"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useGetUserCampaignReg from "@/hooks/campaignHooks/useGetRegisteredUsers";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Reg {
  name: string;
  user_address: `0x${string}`;
  email_address: string;
}

export default function WaitList() {
  const { data, error, isLoading } = useGetUserCampaignReg();
  const [users, setUsers] = useState<Reg[]>([]);

  useEffect(() => {
    if (error) {
      toast.error("Error fetching users: " + error.message);
    }
    if (!isLoading && data) {
      setUsers(data);
    }
  }, [data, error, isLoading]);

  if (isLoading) {
    return (
      <p className="w-full flex min-h-screen justify-center align-middle mx-auto my-auto overflow-x-hidden text-4xl text-color1">
        Loading...
      </p>
    );
  }

  if (users.length === 0) {
    return <p>No registered users yet.</p>;
  }

  return (
    <div className="w-full flex min-h-screen flex-col overflow-x-hidden">
      <h1 className="text-2xl font-bold mx-auto">Wait List</h1>

      <Table>
        <TableHeader>
          <TableRow className="bg-color2 hover:bg-color2 text-gray-300">
            <TableHead className="w-[100px] font-semibold text-gray-300">
              Name
            </TableHead>
            <TableHead className="w-[100px] font-semibold text-gray-300">
              Address
            </TableHead>
            <TableHead className="w-[100px] font-semibold text-gray-300">
              Email
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={index}>
              <TableCell className="text-nowrap">{user.name}</TableCell>
              <TableCell className="text-nowrap">{user.user_address}</TableCell>
              <TableCell className="text-nowrap">
                {user.email_address}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
