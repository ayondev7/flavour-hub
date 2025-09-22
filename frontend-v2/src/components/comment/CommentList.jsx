import React from "react";
import CommentItem from "./CommentItem";

const CommentList = ({ comments, userId, onEdit, onDelete, onReply }) => {
  return (
    <div className="comments-section mt-4 mb-16">
      <p className="text-black font-semibold text-base mb-6">
        All Comments ({comments.length})
      </p>

      {comments
        .filter((comment) => comment?.parentCommentId === null)
        .map((comment) => {
          const replies = comments.filter(
            (reply) => reply?.parentCommentId === comment?._id
          );

          return (
            <CommentItem
              key={comment?._id}
              comment={comment}
              userId={userId}
              onEdit={onEdit}
              onDelete={onDelete}
              onReply={onReply}
              replies={replies}
            />
          );
        })}
    </div>
  );
};

export default CommentList;