"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { FiGlobe, FiClock, FiCalendar } from "react-icons/fi";
import ApplyModal from "./ApplyModal";

export default function OpportunityCard({ opportunity }) {
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const { data: session } = authClient.useSession();

  const {
    title,
    roleTitle,
    skills,
    workType,
    employment,
    commitmentLevel,
    deadline,
  } = opportunity;

  const handleApply = () => {
    if (!session) {
      router.push("/login");
      return;
    }

    setOpen(true);
  };

  return (
    <>
      <div className="border rounded-2xl p-6 bg-white hover:shadow-xl transition-all duration-300 h-full">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {roleTitle || title}
          </h2>

          <p className="text-violet-600 font-semibold mt-2">
  {opportunity.startupName}
</p>
        </div>

        <div className="flex flex-wrap gap-2 mt-6">
          {Array.isArray(skills) ? (
            skills.slice(0, 3).map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 rounded-full bg-violet-100 text-violet-700 text-sm"
              >
                {skill}
              </span>
            ))
          ) : (
            <span className="px-4 py-2 rounded-full bg-violet-100 text-violet-700 text-sm">
              {skills}
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-5 text-gray-500 mt-6">
          <div className="flex items-center gap-2">
            <FiGlobe />
            <span>{workType}</span>
          </div>

          <div className="flex items-center gap-2">
            <FiClock />
            <span>{commitmentLevel || employment}</span>
          </div>

          <div className="flex items-center gap-2">
            <FiCalendar />
            <span>{deadline}</span>
          </div>
        </div>

        <button
          onClick={handleApply}
          className="w-full mt-8 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-violet-600 to-purple-600 hover:opacity-90 transition"
        >
          {session ? "Apply Now" : "Login to Apply"}
        </button>
      </div>

      <ApplyModal
        open={open}
        onClose={() => setOpen(false)}
        opportunity={opportunity}
      />
    </>
  );
}