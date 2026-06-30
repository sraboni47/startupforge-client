"use client";

import { useState } from "react";
import DeleteStartupModal from "./DeleteStartupModal";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

const StartupCard = ({ startup, onEdit, onDelete }) => {
  const {
    startupName,
    logo,
    industry,
    fundingStage,
    description,
  } = startup;

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        {/* Left */}
        <div className="flex gap-5">
          {/* Logo */}
          <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gray-100">
            {logo ? (
              <img
                src={logo}
                alt={startupName}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                No Logo
              </div>
            )}
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              {startupName}
            </h2>

            <div className="flex flex-wrap gap-2 mt-3">
              <span className="px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-sm">
                {industry}
              </span>

              <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm">
                {fundingStage}
              </span>

              <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                Approved
              </span>
            </div>

            <p className="text-gray-600 mt-5 leading-7 max-w-2xl">
              {description}
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onEdit}
            className="px-5 py-2 rounded-xl border hover:bg-gray-100 flex items-center gap-2 transition"
          >
            <FiEdit2 />
            Edit
          </button>

          <button
            onClick={() => setOpenDeleteModal(true)}
            className="px-5 py-2 rounded-xl bg-red-100 text-red-600 hover:bg-red-200 flex items-center gap-2 transition"
          >
            <FiTrash2 />
            Delete
          </button>
        </div>
      </div>

      <DeleteStartupModal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        onConfirm={() => {
          setOpenDeleteModal(false);
          onDelete();
        }}
      />
    </div>
  );
};

export default StartupCard;