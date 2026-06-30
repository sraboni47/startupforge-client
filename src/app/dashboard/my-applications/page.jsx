"use client";

import Link from "next/link";
import { FiBriefcase, FiUser } from "react-icons/fi";

export default function MyApplicationsPage() {
  return (
    <div>
      <div className="mb-10">
        <h1 className="text-4xl font-bold">
          Welcome 👋
        </h1>

        <p className="text-gray-500 mt-2">
          Track your applications and update your profile.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Link
          href="/opportunities"
          className="bg-white border rounded-3xl p-8 hover:shadow-lg transition"
        >
          <FiBriefcase className="text-5xl text-violet-600 mb-6" />

          <h2 className="text-2xl font-bold">
            Browse Opportunities
          </h2>

          <p className="text-gray-500 mt-2">
            Explore startup opportunities.
          </p>
        </Link>

        <Link
          href="/dashboard/profile"
          className="bg-white border rounded-3xl p-8 hover:shadow-lg transition"
        >
          <FiUser className="text-5xl text-violet-600 mb-6" />

          <h2 className="text-2xl font-bold">
            Update Profile
          </h2>

          <p className="text-gray-500 mt-2">
            Manage your profile information.
          </p>
        </Link>
      </div>
    </div>
  );
}