import React, { useState } from "react";

const ReplyForm = ({ onSubmit, isLoading }) => {
  const [reply, setReply] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (reply.trim()) {
      await onSubmit(reply);
      setReply("");
    }
  };

  return (
    <dialog id="my_modal_2" className="modal">
      <form method="dialog" className="modal-box" onSubmit={handleSubmit}>
        <textarea
          className="textarea w-full"
          placeholder="Write a reply..."
          value={reply}
          onChange={(e) => setReply(e.target.value)}
        />
        <div className="modal-action">
          <button className="btn btn-primary" disabled={isLoading}>
            {isLoading ? "Replying..." : "Reply"}
          </button>
          <button className="btn">Cancel</button>
        </div>
      </form>
    </dialog>
  );
};

export default ReplyForm;