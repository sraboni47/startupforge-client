"use client";

const DeleteStartupModal = ({ open, onClose, onConfirm }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
        <h2 className="text-3xl font-bold text-gray-900">Delete Startup</h2>

        <p className="mt-4 text-gray-600 leading-7">
          Are you sure you want to delete this startup? This action cannot be
          undone.
        </p>

        <div className="mt-8 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-xl border hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-6 py-3 rounded-xl bg-red-600 text-white hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteStartupModal;
