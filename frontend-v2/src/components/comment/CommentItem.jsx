import React from "react";
import { FiMessageSquare } from "react-icons/fi";
import { MdEdit } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";

const CommentItem = ({ comment, userId, onEdit, onDelete, onReply, replies = [] }) => {
  return (
    <div className="comment mb-8 rounded-md bg-gray-100" key={comment?._id}>
      <div className="flex py-4 px-6">
        <div className="mr-3">
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img
                src={comment?.image}
                alt="User Avatar"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <p className="text-black font-semibold text-sm">
            {comment?.name}
          </p>
          <p className="text-gray-500 text-[10px] font-semibold mb-3">
            {comment?.formattedDate}
          </p>
          <p className="text-black pr-4 text-sm">{comment?.content}</p>
          <div className="flex gap-x-16 my-4">
            {userId === comment?.userId && (
              <>
                <button
                  className="flex items-center text-slate-500 text-sm font-medium"
                  onClick={() => onEdit(comment)}
                >
                  <MdEdit className="text-sm mr-1 mt-1" /> Edit
                </button>

                <button
                  className="flex items-center text-slate-500 text-sm font-medium"
                  onClick={() => onDelete(comment?._id)}
                >
                  <FaRegTrashCan className="text-sm mr-1" /> Delete
                </button>
              </>
            )}
            <button
              className="flex items-center text-slate-500 text-sm font-medium"
              onClick={() => onReply(comment?._id)}
            >
              <FiMessageSquare className="text-sm mr-1 mt-1" /> Reply
            </button>
          </div>
        </div>
      </div>

      {replies.map((reply) => (
        <div key={reply?._id} className="flex py-4 px-12 ml-6">
          <div className="mr-3">
            <div className="avatar">
              <div className="w-10 rounded-full">
                <img
                  src={reply?.image}
                  alt="User Avatar"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <p className="text-black font-semibold text-sm">
              {reply?.name}
            </p>
            <p className="text-gray-500 text-[10px] font-semibold mb-3">
              {reply?.formattedDate}
            </p>
            <p className="text-black pr-4 text-sm">{reply?.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentItem;