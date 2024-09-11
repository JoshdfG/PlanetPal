"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import useSignAttendance from "@/hooks/userHooks/useSignAttendance";
import Link from "next/link";
import { useState } from "react";

export default function SubmitAttendanceID() {
  const [attendanceId, setAttendanceId] = useState("");
  const { signAttendance, isConfirming } = useSignAttendance(attendanceId);

  const handleOnChange = (e: any) => {
    setAttendanceId(e.target.value);
  };

  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    signAttendance();
  };

  return (
    <div>
      <Card className="w-[90%] md:w-[50%] shadow-lg mt-20 mx-auto bg-gray-200/70 border-color2/20 hover:border-color2/40">
        <form action="" onSubmit={handleOnSubmit}>
          <CardHeader>
            <CardTitle className="capitalize text-bg-color2/20">
              PlanetPal Attendance form
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-3">Enter ID</CardDescription>
            <input
              type="text"
              name="firstname"
              id="firstname"
              placeholder="Enter the secret ID sent to your mail"
              className="w-full caret-color2 py-3 px-4 outline-none rounded-lg border border-color2/60 text-sm bg-color1/5 text-color3"
              value={attendanceId}
              onChange={handleOnChange}
            />
          </CardContent>
          <div className="flex justify-end ">
            <CardFooter className="gap-2">
              <Button className="bg-color2 hover:bg-color1 transition-all ease-in-out">
                Cancel
              </Button>
              <Button
                className="bg-color2 hover:bg-color1 transition-all ease-in-out"
                onClick={handleOnSubmit}
                disabled={isConfirming}
              >
                Submit
              </Button>
            </CardFooter>
          </div>
        </form>
      </Card>
    </div>
  );
}
