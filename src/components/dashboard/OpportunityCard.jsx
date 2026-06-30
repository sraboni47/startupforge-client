


import { FiEdit2, FiTrash2, FiClock, FiGlobe } from "react-icons/fi";

export default function OpportunityCard({ opportunity, onEdit, onDelete }) {
  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
      <div className="flex justify-between items-start gap-6">
        <div className="flex-1">
          <h2 className="text-2xl font-bold">{opportunity.roleTitle}</h2>

          <p className="text-violet-600 mt-1">StartupForge</p>

          <div className="flex flex-wrap gap-2 mt-4">
            {opportunity.skills.split(",").map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-sm"
              >
                {skill.trim()}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-6 mt-5 text-gray-600">
            <div className="flex items-center gap-2">
              <FiGlobe />
              {opportunity.workType}
            </div>

            <div className="flex items-center gap-2">
              <FiClock />
              {opportunity.commitmentLevel}
            </div>
          </div>

          <p className="mt-5 text-sm text-gray-500">
            Deadline: {opportunity.deadline}
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onEdit}
            className="px-4 py-2 rounded-xl border hover:bg-gray-100"
          >
            <FiEdit2 />
          </button>

          <button
            onClick={onDelete}
            className="px-4 py-2 rounded-xl bg-red-100 text-red-600 hover:bg-red-200"
          >
            <FiTrash2 />
          </button>
        </div>
      </div>
    </div>
  );
}
