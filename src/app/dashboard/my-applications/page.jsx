"use client";

import { authClient } from "@/lib/auth-client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function MyApplicationsPage() {
  const { data: session } = authClient.useSession();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user?.email) return;

    const fetchApplications = async () => {
      try {
        const { data } = await axios.get(
          "https://startupforge-server-5pdk.vercel.app/applications",
        );

        const myApplications = data.filter(
          (item) => item.applicantEmail === session.user.email,
        );

        setApplications(myApplications);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [session]);

  if (loading) {
    return (
      <div className="text-center py-20 text-lg font-medium">Loading...</div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold">My Applications</h1>

        <p className="text-gray-500 mt-2">
          Total Applications: {applications.length}
        </p>
      </div>

      {applications.length === 0 ? (
        <div className="bg-white rounded-2xl border p-10 text-center">
          <h2 className="text-2xl font-bold">No Applications Found</h2>

          <p className="text-gray-500 mt-3">
            You haven't applied to any opportunity yet.
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {applications.map((application) => (
            <div
              key={application._id}
              className="bg-white rounded-2xl border p-6"
            >
              <h2 className="text-2xl font-bold">{application.roleTitle}</h2>

              <p className="text-gray-600 mt-2">
                Applicant: {application.applicantEmail}
              </p>

              <p className="text-gray-600">
                Portfolio: {application.portfolio}
              </p>

              <p className="text-gray-600 mt-2">{application.message}</p>

              <div className="mt-4 flex items-center justify-between">
                <span className="px-4 py-1 rounded-full bg-yellow-100 text-yellow-700 font-medium">
                  {application.status || "Pending"}
                </span>

                <span className="text-sm text-gray-500">
                  {new Date(application.appliedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
