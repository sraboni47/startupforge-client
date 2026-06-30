"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import {
  FiUser,
  FiMail,
  FiImage,
  FiTag,
  FiFileText,
  FiSave,
} from "react-icons/fi";
import { toast } from "react-toastify";

export default function ProfilePage() {
  // পরে Better Auth session থেকে আসবে
  const userEmail = "test@gmail.com";

  const [profile, setProfile] = useState({
    name: "",
    email: userEmail,
    image: "",
    role: "Collaborator",
    skills: "",
    bio: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/users/${userEmail}`);

      if (res.data.email) {
        setProfile(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      await axios.put("http://localhost:5000/users", profile);

      toast.success("Profile Updated");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-12">
      <h1 className="text-5xl font-bold">My Profile</h1>

      <p className="text-gray-500 mt-3">
        Update your personal information and skills.
      </p>

      <div className="grid lg:grid-cols-3 gap-8 mt-10">
        {/* Left */}

        <div className="border rounded-3xl bg-white p-8 text-center">
          {profile.image ? (
            <img
              src={profile.image}
              alt=""
              className="w-40 h-40 rounded-full object-cover mx-auto"
            />
          ) : (
            <div className="w-40 h-40 rounded-full bg-violet-600 text-white flex items-center justify-center text-6xl font-bold mx-auto">
              {profile.name ? profile.name.charAt(0).toUpperCase() : "U"}
            </div>
          )}

          <h2 className="text-3xl font-bold mt-6">
            {profile.name || "Your Name"}
          </h2>

          <span className="inline-block mt-3 px-4 py-2 rounded-full bg-violet-100 text-violet-700">
            {profile.role}
          </span>
        </div>

        {/* Right */}

        <div className="lg:col-span-2 border rounded-3xl bg-white p-8 space-y-6">
          <div>
            <label className="flex gap-2 items-center mb-2">
              <FiUser />
              Full Name
            </label>

            <input
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="flex gap-2 items-center mb-2">
              <FiMail />
              Email
            </label>

            <input
              value={profile.email}
              disabled
              className="w-full border rounded-xl px-4 py-3 bg-gray-100"
            />
          </div>

          <div>
            <label className="flex gap-2 items-center mb-2">
              <FiImage />
              Profile Image URL
            </label>

            <input
              name="image"
              value={profile.image}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="flex gap-2 items-center mb-2">
              <FiTag />
              Skills
            </label>

            <input
              name="skills"
              value={profile.skills}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="flex gap-2 items-center mb-2">
              <FiFileText />
              Bio
            </label>

            <textarea
              rows={5}
              name="bio"
              value={profile.bio}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full py-4 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold flex items-center justify-center gap-2"
          >
            <FiSave />
            Save Profile
          </button>
        </div>
      </div>
    </div>
  );
}
