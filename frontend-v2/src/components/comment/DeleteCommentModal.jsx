import React from "react";

const DeleteCommentModal = ({ onConfirm, isLoading }) => {
  return (
    <dialog id="deleteCommentModal" className="modal">
      <form method="dialog" className="modal-box">
        <h3 className="text-lg font-bold text-center">
          Are you sure you want to delete this comment?
        </h3>
        <div className="modal-action">
          <button
            className="btn btn-primary"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Confirm"}
          </button>
          <button className="btn">Cancel</button>
        </div>
      </form>
    </dialog>
  );
};

export default DeleteCommentModal;