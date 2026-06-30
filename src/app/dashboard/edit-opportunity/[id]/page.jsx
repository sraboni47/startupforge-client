"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditOpportunityPage() {
  const { id } = useParams();
  const router = useRouter();

  const [startupName, setStartupName] = useState("");
  const [roleTitle, setRoleTitle] = useState("");
  const [skills, setSkills] = useState("");
  const [workType, setWorkType] = useState("");
  const [commitmentLevel, setCommitmentLevel] = useState("");
  const [deadline, setDeadline] = useState("");

  useEffect(() => {
    fetchOpportunity();
  }, []);

  const fetchOpportunity = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/opportunities/${id}`);

      const data = res.data;

      setStartupName(data.startupName || "");
      setRoleTitle(data.roleTitle || "");
      setSkills(data.skills || "");
      setWorkType(data.workType || "");
      setCommitmentLevel(data.commitmentLevel || "");
      setDeadline(data.deadline || "");
    } catch (error) {
      console.error(error);
      alert("Failed to load opportunity");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
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
      const updatedOpportunity = {
        startupName,
        roleTitle,
        skills,
        workType,
        commitmentLevel,
        deadline,
      };

      await axios.put(
        `http://localhost:5000/opportunities/${id}`,
        updatedOpportunity,
      );

      alert("Opportunity Updated Successfully");

      router.push("/dashboard/manage-opportunities");
    } catch (error) {
      console.error(error);
      alert("Failed to update opportunity");
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Edit Opportunity</h1>

        <p className="text-gray-500 mt-2">
          Update your opportunity information.
        </p>
      </div>

      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-3xl shadow-sm p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Startup */}
          <div>
            <label className="block mb-2 font-medium">Startup</label>

            <input
              type="text"
              value={startupName}
              readOnly
              className="w-full border rounded-xl px-4 py-3 bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Role Title */}
          <div>
            <label className="block mb-2 font-medium">Role Title</label>

            <input
              type="text"
              value={roleTitle}
              onChange={(e) => setRoleTitle(e.target.value)}
              className="w-full border rounded-xl px-4 py-3 outline-none focus:border-violet-600"
            />
          </div>

          {/* Required Skills */}
          <div>
            <label className="block mb-2 font-medium">Required Skills</label>

            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="e.g. React, Node.js"
              className="w-full border rounded-xl px-4 py-3 outline-none focus:border-violet-600"
            />
          </div>

          {/* Work Type + Commitment */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-medium">Work Type</label>

              <select
                value={workType}
                onChange={(e) => setWorkType(e.target.value)}
                className="w-full border rounded-xl px-4 py-3 outline-none focus:border-violet-600"
              >
                <option value="">Select type</option>
                <option>Remote</option>
                <option>Hybrid</option>
                <option>Onsite</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium">Commitment Level</label>

              <select
                value={commitmentLevel}
                onChange={(e) => setCommitmentLevel(e.target.value)}
                className="w-full border rounded-xl px-4 py-3 outline-none focus:border-violet-600"
              >
                <option value="">Select level</option>
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Contract</option>
                <option>Internship</option>
              </select>
            </div>
          </div>

          {/* Deadline */}
          <div>
            <label className="block mb-2 font-medium">
              Application Deadline
            </label>

            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full border rounded-xl px-4 py-3 outline-none focus:border-violet-600"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold hover:opacity-90 transition"
          >
            Update Opportunity
          </button>
        </form>
      </div>
    </div>
  );
}
