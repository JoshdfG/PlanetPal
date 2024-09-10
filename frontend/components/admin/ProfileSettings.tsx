"use client";
import { User2Icon } from "lucide-react";
import { FormEvent, useState } from "react";
import { Button } from "../ui/button";
import useEditMentorsName from "@/hooks/nameEditingHooks/useEditMentorsName";
import useRequestNameCorrection from "@/hooks/nameEditingHooks/useRequestNameCorrection";

const ProfileSettings = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const fullName = `${firstName} ${lastName}`;

  /* started handling the request for the change of name */
  const {
    requestNameCorrection,
    isWriting: isWritingtoMentors,
    isConfirming: isConfirmingtoMentors,
  } = useRequestNameCorrection();

  const handleRequestNameChange = () => {
    requestNameCorrection();
  };
  /* Ended handling the request for the change of name */

  const {
    editMentorsName,
    isWriting: isWritingtoEditMentorsName,
    isConfirming: isConfirmingEditMentorsName,
  } = useEditMentorsName(fullName);

  const handleNameChange = (e: FormEvent) => {
    e.preventDefault();
    editMentorsName();
  };

  return (
    <section className="w-full py-6 flex flex-col">
      <main className="w-full flex flex-col gap-7">
        <div className="flex flex-col">
          <h1 className="uppercase text-color2 md:text-2xl font-bold text-xl">
            Basic Details
          </h1>
          <h4 className="text-lg tracking-wider text-color2">
            Personal Information
          </h4>
        </div>

        <div className="w-full flex flex-col items-center mt-6">
          <div className="flex flex-col items-center mb-3">
            <Button
              className="border-none outline-none px-3 py-1.5 rounded bg-color1 text-gray-200 capitalize hover:bg-color2 text-sm"
              onClick={handleRequestNameChange}
            >
              request name change
            </Button>
          </div>
          <form
            className="lg:w-[50%] md:w-[70%] w-full grid gap-4"
            onSubmit={handleNameChange}
          >
            <div className="flex flex-col">
              <label
                htmlFor="firstname"
                className="text-color3 font-medium ml-1"
              >
                First Name
              </label>
              <input
                type="text"
                name="firstname"
                id="firstname"
                placeholder="Enter your first name"
                className="w-full caret-color1 py-3 px-4 outline-none rounded-lg border border-color1 text-sm bg-color1/5 text-color3"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="lastname"
                className="text-color3 font-medium ml-1"
              >
                Last Name
              </label>
              <input
                type="text"
                name="lastname"
                id="lastname"
                placeholder="Enter your last name"
                className="w-full caret-color1 py-3 px-4 outline-none rounded-lg border border-color1 text-sm bg-color1/5 text-color3"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div className="flex flex-col mt-3">
              <Button
                type="submit"
                className="bg-color1 hover:bg-color2"
                onClick={handleNameChange}
              >
                Upload Data
              </Button>
            </div>
          </form>
        </div>
      </main>
    </section>
  );
};

export default ProfileSettings;
