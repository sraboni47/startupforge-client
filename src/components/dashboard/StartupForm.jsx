"use client";

import { FiPlus } from "react-icons/fi";

const StartupForm = ({ setStartup }) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    setStartup({
      name: "My Startup",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border rounded-3xl shadow-sm p-8"
    >
      <h2 className="flex items-center gap-2 text-3xl font-bold mb-8">
        <FiPlus className="text-violet-600" />
        Create Startup
      </h2>

      <div>
        <label className="block font-medium mb-2">Startup Name</label>

        <input
          type="text"
          placeholder="e.g. TechNova"
          className="w-full border rounded-xl px-4 py-3 outline-none focus:border-violet-600"
        />
      </div>

      <button
        type="submit"
        className="w-full mt-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold"
      >
        Create Startup
      </button>
    </form>
  );
};

export default StartupForm;
