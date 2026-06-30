"use client";
import { format } from "date-fns";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

export default function ManageOpportunitiesPage() {
  const { data: session } = authClient.useSession();
  const [opportunities, setOpportunities] = useState([]);

  const fetchOpportunities = useCallback(async () => {
    if (!session?.user?.email) return;

    try {
      const res = await axios.get(
        `https://startupforge-server-5pdk.vercel.app/opportunities/founder/${session.user.email}`,
      );

      setOpportunities(res.data);
    } catch (error) {
      console.error(error);
    }
  }, [session]);

  useEffect(() => {
    fetchOpportunities();
  }, [fetchOpportunities]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this opportunity?",
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `https://startupforge-server-5pdk.vercel.app/opportunities/${id}`,
      );

      alert("Opportunity Deleted Successfully");

      fetchOpportunities();
    } catch (error) {
      console.error(error);
      alert("Failed to delete opportunity");
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">
          Manage Opportunities
        </h1>

        <p className="text-gray-500 mt-2">
          View, edit and delete your opportunities.
        </p>
      </div>

      {opportunities.length === 0 ? (
        <div className="bg-white border rounded-3xl p-16 text-center">
          <h2 className="text-2xl font-semibold">No Opportunity Found</h2>

          <p className="text-gray-500 mt-3">Add your first opportunity.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {opportunities.map((item) => (
            <div
              key={item._id}
              className="bg-white border rounded-3xl p-6 shadow-sm"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold">{item.roleTitle}</h2>

                  <p className="text-lg font-semibold text-violet-600 mt-2">
                    {item.startupName}
                  </p>

                  <p className="text-gray-600 mt-2">{item.skills}</p>

                  <div className="flex gap-3 mt-4 flex-wrap">
                    <span className="px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-sm">
                      {item.workType}
                    </span>

                    <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm">
                      {item.commitmentLevel}
                    </span>

                    <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-sm">
                      {format(new Date(item.deadline), "dd MMM yyyy")}
                    </span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Link href={`/dashboard/edit-opportunity/${item._id}`}>
                    <button className="px-4 py-2 border rounded-xl flex items-center gap-2">
                      <FiEdit2 />
                      Edit
                    </button>
                  </Link>

                  <button
                    onClick={() => handleDelete(item._id)}
                    className="px-4 py-2 bg-red-100 text-red-600 rounded-xl flex items-center gap-2 hover:bg-red-200 transition"
                  >
                    <FiTrash2 />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
