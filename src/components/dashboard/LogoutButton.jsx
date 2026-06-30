"use client";

import { FiLogOut } from "react-icons/fi";

const LogoutButton = () => {
  return (
    <button
      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition"
    >
      <FiLogOut size={20} />

      Logout
    </button>
  );
};

export default LogoutButton;