"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { FiExternalLink, FiTrash2 } from "react-icons/fi";

export default function ApplicationsPage() {
  const [applications, setApplications] = useState([]);

  const fetchApplications = async () => {
    try {
      const res = await axios.get("http://localhost:5000/applications");
      setApplications(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this application?",
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/applications/${id}`);

      alert("Application Deleted Successfully");

      fetchApplications();
    } catch (error) {
      console.error(error);
      alert("Failed to delete application");
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold">My Applications</h1>

        <p className="text-gray-500 mt-2">
          {applications.length} application(s) submitted.
        </p>
      </div>

      {applications.length === 0 ? (
        <div className="bg-white border rounded-3xl p-16 text-center">
          <h2 className="text-2xl font-semibold">No Applications Yet</h2>

          <p className="text-gray-500 mt-2">Apply for an opportunity first.</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white border rounded-3xl">
          <table className="min-w-full">
            <thead className="bg-violet-50">
              <tr>
                <th className="px-6 py-4 text-left">Role</th>
                <th className="px-6 py-4 text-left">Email</th>
                <th className="px-6 py-4 text-left">Applied</th>
                <th className="px-6 py-4 text-left">Portfolio</th>
                <th className="px-6 py-4 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {applications.map((application) => (
                <tr key={application._id} className="border-t">
                  <td className="px-6 py-5">{application.roleTitle}</td>

                  <td className="px-6 py-5">{application.applicantEmail}</td>

                  <td className="px-6 py-5">
                    {new Date(application.appliedAt).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-5">
                    <a
                      href={application.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-violet-600 hover:underline"
                    >
                      <FiExternalLink />
                      View
                    </a>
                  </td>

                  <td className="px-6 py-5">
                    <button
                      onClick={() => handleDelete(application._id)}
                      className="text-red-600"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
