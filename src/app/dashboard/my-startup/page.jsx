"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { authClient } from "@/lib/auth-client";
import { FiPlus, FiImage } from "react-icons/fi";
import StartupCard from "@/components/dashboard/StartupCard";

const uploadImage = async (image) => {
  const formData = new FormData();
  formData.append("image", image);

  const url = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`;

  const response = await axios.post(url, formData);

  return response.data.data.url;
};

export default function MyStartupPage() {
  const { data: session } = authClient.useSession();

  const [startupList, setStartupList] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [startupName, setStartupName] = useState("");
  const [logo, setLogo] = useState(null);
  const [industry, setIndustry] = useState("");
  const [fundingStage, setFundingStage] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (session?.user?.email) {
      fetchStartup();
    }
  }, [session]);

  const fetchStartup = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/startups/${session.user.email}`,
      );

      setStartupList(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">My Startup</h1>

        <p className="text-gray-500 mt-2">
          Create and manage your startup profile.
        </p>
      </div>

      {/* Startup Card */}
      {startupList.length > 0 && (
        <div className="space-y-6 mb-8">
          {startupList.map((startup) => (
            <StartupCard
              key={startup._id}
              startup={startup}
              onEdit={() => {
                setEditingId(startup._id);
                setStartupName(startup.startupName);
                setLogo(startup.logo);
                setIndustry(startup.industry);
                setFundingStage(startup.fundingStage);
                setDescription(startup.description);
              }}
              onDelete={async () => {
                const confirmDelete = window.confirm(
                  "Are you sure you want to delete this startup?",
                );

                if (!confirmDelete) return;

                try {
                  await axios.delete(
                    `http://localhost:5000/startups/${startup._id}`,
                  );

                  await fetchStartup();

                  alert("Startup Deleted Successfully");
                } catch (error) {
                  console.log(error);
                }
              }}
            />
          ))}
        </div>
      )}

      {/* Form */}
      <div className="max-w-4xl bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-2 mb-8">
          <FiPlus className="text-violet-600 text-xl" />

          <h2 className="text-2xl font-bold">
            {editingId ? "Update Startup" : "Create Startup"}
          </h2>
        </div>

        <form
          className="space-y-6"
          onSubmit={async (e) => {
            e.preventDefault();

            if (
              !startupName.trim() ||
              !logo ||
              !industry ||
              !fundingStage ||
              !description.trim()
            ) {
              alert("Please fill up all required fields.");
              return;
            }

            try {
              const logoUrl =
                logo instanceof File ? await uploadImage(logo) : logo;

              const startup = {
                startupName,
                logo: logoUrl,
                industry,
                fundingStage,
                description,
                founderEmail: session.user.email,
              };

              if (editingId) {
                await axios.put(
                  `http://localhost:5000/startups/${editingId}`,
                  startup,
                );

                alert("Startup Updated Successfully");
              } else {
                await axios.post("http://localhost:5000/startups", startup);

                alert("Startup Created Successfully");
              }

              await fetchStartup();

              setEditingId(null);
              setStartupName("");
              setLogo(null);
              setIndustry("");
              setFundingStage("");
              setDescription("");
            } catch (error) {
              console.log(error);
              alert("Something went wrong");
            }
          }}
        >
          {/* Startup Name */}
          <div>
            <label className="block font-medium mb-2">Startup Name</label>

            <input
              type="text"
              value={startupName}
              onChange={(e) => setStartupName(e.target.value)}
              placeholder="e.g. TechNova"
              className="w-full border rounded-xl px-4 py-3 outline-none focus:border-violet-600"
            />
          </div>

          {/* Logo */}
          <div>
            <label className="block font-medium mb-2">Logo</label>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl border flex items-center justify-center">
                <FiImage className="text-2xl text-gray-400" />
              </div>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => setLogo(e.target.files[0])}
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>
          </div>

          {/* Industry + Funding */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium mb-2">Industry</label>

              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full border rounded-xl px-4 py-3"
              >
                <option value="">Select Industry</option>
                <option>Technology</option>
                <option>AI/ML</option>
                <option>FinTech</option>
                <option>HealthTech</option>
                <option>EdTech</option>
                <option>E-commerce</option>
                <option>Creative</option>
              </select>
            </div>

            <div>
              <label className="block font-medium mb-2">Funding Stage</label>

              <select
                value={fundingStage}
                onChange={(e) => setFundingStage(e.target.value)}
                className="w-full border rounded-xl px-4 py-3"
              >
                <option value="">Select Stage</option>
                <option>Idea</option>
                <option>Seed</option>
                <option>Series A</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium mb-2">Description</label>

            <textarea
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your startup..."
              className="w-full border rounded-xl px-4 py-3 resize-none outline-none focus:border-violet-600"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold hover:opacity-90 transition"
          >
            {editingId ? "Update Startup" : "Create Startup"}
          </button>
        </form>
      </div>
    </div>
  );
}
