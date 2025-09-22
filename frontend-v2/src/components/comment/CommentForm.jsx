import React, { useState } from "react";
import { IoSend } from "react-icons/io5";

const CommentForm = ({ onSubmit, isLoading, placeholder = "Leave your comment here..." }) => {
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.trim()) {
      await onSubmit(comment);
      setComment("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        className="textarea w-full bg-white h-[150px] border-2 text-base text-black placeholder:text-customGray border-hotPink focus:outline-none focus:border-hotPink"
        placeholder={placeholder}
        value={comment}
        required
        onChange={(e) => setComment(e.target.value)}
      />
      <div className="flex justify-end mt-4">
        <button
          className="bg-hotPink p-2 rounded-lg text-white font-semibold text-base flex items-center justify-center gap-x-3 px-5"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center">
              <span className="loading loading-spinner mr-2"></span>
              Posting...
            </span>
          ) : (
            <>
              Post
              <IoSend className="mt-1" />
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default CommentForm;