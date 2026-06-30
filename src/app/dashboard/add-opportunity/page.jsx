"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function AddOpportunityPage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const [myStartups, setMyStartups] = useState([]);

  const [startupId, setStartupId] = useState("");
  const [roleTitle, setRoleTitle] = useState("");
  const [skills, setSkills] = useState("");
  const [workType, setWorkType] = useState("");
  const [commitmentLevel, setCommitmentLevel] = useState("");
  const [deadline, setDeadline] = useState("");

  useEffect(() => {
    if (session?.user?.email) {
      fetchMyStartups();
    }
  }, [session]);

  const fetchMyStartups = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/startups/${session.user.email}`,
      );

      setMyStartups(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Add Opportunity</h1>

        <p className="text-gray-500 mt-2">
          Post a new opportunity for your startup.
        </p>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-3xl shadow-sm p-8">
        <form
          className="space-y-6"
          onSubmit={async (e) => {
            e.preventDefault();

            if (
              !startupId ||
              !roleTitle.trim() ||
              !skills.trim() ||
              !workType ||
              !commitmentLevel ||
              !deadline
            ) {
              alert("Please fill up all required fields.");
              return;
            }

            try {
              const selectedStartup = myStartups.find(
                (startup) => startup._id === startupId,
              );

              const opportunityData = {
                startupId,
                startupName: selectedStartup.startupName,
                founderEmail: session.user.email,

                roleTitle,
                skills,
                workType,
                commitmentLevel,
                deadline,

                createdAt: new Date(),
              };

              await axios.post(
                "http://localhost:5000/opportunities",
                opportunityData,
              );

              alert("Opportunity Added Successfully");

              setStartupId("");
              setRoleTitle("");
              setSkills("");
              setWorkType("");
              setCommitmentLevel("");
              setDeadline("");

              router.push("/dashboard/manage-opportunities");
            } catch (error) {
              console.log(error);
              alert("Failed to add opportunity");
            }
          }}
        >
          {/* Startup */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Startup <span className="text-red-500">*</span>
            </label>

            <select
              value={startupId}
              onChange={(e) => setStartupId(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-violet-600"
            >
              <option value="">Select Startup</option>

              {myStartups.map((startup) => (
                <option key={startup._id} value={startup._id}>
                  {startup.startupName}
                </option>
              ))}
            </select>
          </div>

          {/* Role Title */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Role Title <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              value={roleTitle}
              onChange={(e) => setRoleTitle(e.target.value)}
              placeholder="e.g. Senior React Developer"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-violet-600"
            />
          </div>

          {/* Required Skills */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Required Skills
              <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="e.g. React, Next.js, Node.js"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-violet-600"
            />
          </div>

          {/* Work Type + Commitment Level */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Work Type */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Work Type <span className="text-red-500">*</span>
              </label>

              <select
                value={workType}
                onChange={(e) => setWorkType(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-violet-600"
              >
                <option value="">Select type</option>
                <option>Remote</option>
                <option>Hybrid</option>
                <option>Onsite</option>
              </select>
            </div>

            {/* Commitment Level */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Commitment Level <span className="text-red-500">*</span>
              </label>

              <select
                value={commitmentLevel}
                onChange={(e) => setCommitmentLevel(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-violet-600"
              >
                <option value="">Select level</option>
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Contract</option>
                <option>Internship</option>
              </select>
            </div>
          </div>

          {/* Application Deadline */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Application Deadline <span className="text-red-500">*</span>
            </label>

            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-violet-600"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold hover:opacity-90 transition duration-300"
          >
            Post Opportunity
          </button>
        </form>
      </div>
    </div>
  );
}
