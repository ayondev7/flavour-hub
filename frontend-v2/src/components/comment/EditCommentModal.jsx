import React, { useState, useEffect } from "react";

const EditCommentModal = ({ comment, onSave, isLoading }) => {
  const [content, setContent] = useState(comment?.content || "");

  useEffect(() => {
    setContent(comment?.content || "");
  }, [comment]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (content.trim()) {
      await onSave(content);
    }
  };

  return (
    <dialog id="editCommentModal" className="modal">
      <form method="dialog" className="modal-box" onSubmit={handleSubmit}>
        <textarea
          className="textarea w-full"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="modal-action">
          <button
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
          <button className="btn">Cancel</button>
        </div>
      </form>
    </dialog>
  );
};

export default EditCommentModal;