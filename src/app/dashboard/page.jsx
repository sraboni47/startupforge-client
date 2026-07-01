"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import axios from "axios";
import { FiBriefcase, FiUsers, FiCheckCircle } from "react-icons/fi";

export default function DashboardPage() {
  const { data: session } = authClient.useSession();

  const [role, setRole] = useState("");
  const [opportunities, setOpportunities] = useState([]);
  const [applications, setApplications] = useState([]);

  const checkRole = async () => {
    try {
      const { data } = await axios.get(
        `https://startupforge-server-5pdk.vercel.app/users/${session.user.email}`,
      );

      setRole(data.role);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDashboardData = async () => {
    try {
      const [opportunityRes, applicationRes] = await Promise.all([
        axios.get("https://startupforge-server-5pdk.vercel.app/opportunities"),
        axios.get("https://startupforge-server-5pdk.vercel.app/applications"),
      ]);

      setOpportunities(opportunityRes.data);
      setApplications(applicationRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (session?.user?.email) {
      checkRole();
      fetchDashboardData();
    }
  }, [session]);

  return (
    <div>
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900">
          Welcome back, Sraboni 👋
        </h1>

        <p className="text-gray-500 mt-2 text-lg">
          Here's an overview of your startup activity.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        {/* Total Opportunities */}
        <div className="bg-white rounded-3xl border p-7">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-violet-100 flex items-center justify-center">
              <FiBriefcase className="text-3xl text-violet-600" />
            </div>

            <div>
              <h2 className="text-4xl font-bold">{opportunities.length}</h2>

              <p className="text-gray-500 mt-1">Total Opportunities</p>
            </div>
          </div>
        </div>

        {/* Total Applications */}
        <div className="bg-white rounded-3xl border p-7">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center">
              <FiUsers className="text-3xl text-purple-600" />
            </div>

            <div>
              <h2 className="text-4xl font-bold">{applications.length}</h2>

              <p className="text-gray-500 mt-1">Total Applications</p>
            </div>
          </div>
        </div>

        {/* Accepted Members */}
        <div className="bg-white rounded-3xl border p-7">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center">
              <FiCheckCircle className="text-3xl text-emerald-600" />
            </div>

            <div>
              <h2 className="text-4xl font-bold">0</h2>

              <p className="text-gray-500 mt-1">Accepted Members</p>
            </div>
          </div>
        </div>
      </div>

      {/* Activity */}
      <div className="bg-white rounded-3xl border p-8">
        <h2 className="text-2xl font-bold mb-8">Activity Overview</h2>

        <div className="h-[350px] flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-2xl">
          <div className="text-6xl mb-4">📊</div>

          <h3 className="text-2xl font-bold">No Activity Yet</h3>

          <p className="text-gray-500 mt-3 text-center max-w-md">
            Your dashboard is empty right now. Add your first opportunity and
            start receiving applications.
          </p>
        </div>
      </div>
    </div>
  );
}
