"use client";
import axios from "axios";
import { useState } from "react";
import { FiX, FiSend, FiLink } from "react-icons/fi";
import { toast } from "react-toastify";

const ApplyModal = ({ open, onClose, opportunity }) => {
  const [email, setEmail] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [message, setMessage] = useState("");

  if (!open) return null;

  const handleSubmit = async () => {
      if (!opportunity) return;
      
    if 
    (!email.trim() || !portfolio.trim() || !message.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
     const application = {
  opportunityId: opportunity._id,
  roleTitle: opportunity.roleTitle,
  startupName: opportunity.startupName,
  applicantEmail: email,
  portfolio,
  message,
  status: "Pending",
  appliedAt: new Date(),
};
      await axios.post("https://startupforge-server-5pdk.vercel.app/applications", application);

      toast.success("Application submitted!");

      setEmail("");
      setPortfolio("");
      setMessage("");

      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit application");
    }
  };
  const handleCancel = () => {
    setEmail("");
    setPortfolio("");
    setMessage("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-3xl w-full max-w-xl p-8 relative">
        <button
          onClick={handleCancel}
          className="absolute top-5 right-5 text-gray-500 hover:text-black"
        >
          <FiX size={26} />
        </button>

        <h2 className="text-4xl font-bold">Apply for Role</h2>

      <p className="text-violet-600 mt-2">
  {opportunity.roleTitle}
</p>
       

        <div className="mt-8">
          <label className="font-medium">Applicant Email</label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full mt-2 border rounded-xl px-4 py-3 outline-none focus:border-violet-600"
          />
        </div>

        <div className="mt-6">
          <label className="flex items-center gap-2 font-medium">
            <FiLink />
            Portfolio / GitHub Link
          </label>

          <input
            type="text"
            value={portfolio}
            onChange={(e) => setPortfolio(e.target.value)}
            placeholder="https://github.com/..."
            className="w-full mt-2 border rounded-xl px-4 py-3 outline-none focus:border-violet-600"
          />
        </div>

        <div className="mt-6">
          <label className="font-medium">Motivation Message</label>

          <textarea
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Why are you a great fit for this role?"
            className="w-full mt-2 border rounded-xl px-4 py-3 resize-none outline-none focus:border-violet-600"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-8">
          <button
            onClick={handleCancel}
            className="border rounded-xl py-3 font-semibold hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="bg-violet-600 hover:bg-violet-700 text-white rounded-xl py-3 font-semibold flex items-center justify-center gap-2 transition"
          >
            <FiSend />
            Submit Application
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplyModal;
