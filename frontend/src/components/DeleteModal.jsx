import React from "react";
import { IoIosWarning } from "react-icons/io";

const DeleteModal = ({ isSpinnerVisible, onClose, onDelete }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm"
        onClick={onClose} // Close modal if clicking outside
      ></div>

      {/* Modal */}
      <div className="relative z-10 modal-box bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        {!isSpinnerVisible ? (
          <>
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-black"
              onClick={onClose}
            >
              ✕
            </button>
            <div className="flex text-3xl items-end mb-4">
              <IoIosWarning className="text-4xl mr-1 text-orange-400" />
              <span className="text-black">Warning!</span>
            </div>
            <p className="py-4 text-black text-lg">
              Are you sure you want to delete this recipe?
            </p>
            <div className="flex justify-end">
              <button
                className="bg-hotPink text-white font-medium text-base py-2 px-3 rounded-lg"
                onClick={onDelete}
              >
                Yes, I do
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-40">
            <span className="loading loading-spinner w-16 h-16 text-brightPink"></span>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeleteModal;
