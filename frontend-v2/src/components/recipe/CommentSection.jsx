import React, { useState, useRef } from "react";
import { FiMessageSquare } from "react-icons/fi";
import { MdEdit } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUserIdFromToken } from "@assets/tokenUtils";
import {
  useGetCommentsQuery,
  usePostCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation
} from "@redux/hooks/commentHook";

const CommentSection = ({ recipeId }) => {
  const [comment, setComment] = useState("");
  const [fetchedComment, setFetchedComment] = useState("");
  const userId = getUserIdFromToken();
  const [reply, setReply] = useState("");
  const [parentCommentId, setParentCommentId] = useState();
  const modalRef = useRef(null);
  const [commentId, setCommentId] = useState();

  const { data: comments = [] } = useGetCommentsQuery(recipeId);
  const [postComment, { isLoading: isPostingComment }] = usePostCommentMutation();
  const [updateComment, { isLoading: isUpdatingComment }] = useUpdateCommentMutation();
  const [deleteComment, { isLoading: isDeletingComment }] = useDeleteCommentMutation();

  const handlePostComment = async (e) => {
    e.preventDefault();
    try {
      await postComment({
        userId,
        content: comment,
        recipeId,
      }).unwrap();
      toast.success("Your comment has been posted.");
      setComment("");
    } catch (error) {
      console.error("Error posting comment", error);
      toast.error("Error posting comment");
    }
  };

  const handlePostReply = async (e) => {
    e.preventDefault();
    try {
      await postComment({
        userId,
        content: reply,
        recipeId,
        parentCommentId,
      }).unwrap();
      toast.success("Your reply has been posted.");
      setReply("");
      modalRef.current.close();
    } catch (error) {
      console.error("Error posting reply", error);
      toast.error("Error posting reply");
    }
  };

  const openDeleteModal = (commentId) => {
    setCommentId(commentId);
    document.getElementById("deleteCommentModal").showModal();
  };

  const openEditModal = (comment) => {
    setFetchedComment(comment.content);
    setCommentId(comment._id);
    document.getElementById("editCommentModal").showModal();
  };

  const handleDelete = async () => {
    try {
      await deleteComment(commentId).unwrap();
      document.getElementById("deleteCommentModal").close();
      toast.success("Comment deleted successfully");
    } catch (error) {
      toast.error("Failed to delete comment");
      console.error(error);
    }
  };

  const handleEdit = async () => {
    try {
      await updateComment({
        commentId,
        content: fetchedComment
      }).unwrap();
      document.getElementById("editCommentModal").close();
      toast.success("Comment updated successfully");
      setFetchedComment("");
      setCommentId(null);
    } catch (error) {
      toast.error("Failed to update comment");
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handlePostComment}>
        <textarea
          className="textarea w-full bg-white h-[150px] border-2 text-base text-black placeholder:text-customGray border-hotPink focus:outline-none focus:border-hotPink"
          placeholder="Leave your comment here..."
          value={comment}
          required
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <div className="flex justify-end mt-4">
          <button
            className="bg-hotPink p-2 rounded-lg text-white font-semibold text-base flex items-center justify-center gap-x-3 px-5"
            disabled={isPostingComment}
          >
            {isPostingComment ? (
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

      <div className="comments-section mt-4 mb-16">
        <p className="text-black font-semibold text-base mb-6">
          All Comments ({comments.length})
        </p>

        {comments
          .filter((comment) => comment?.parentCommentId === null)
          .map((comment) => {
            return (
              <div className="comment mb-8 rounded-md bg-gray-100" key={comment?._id}>
                <div className="flex py-4 px-6">
                  <div className="mr-3">
                    <div className="avatar">
                      <div className="w-10 rounded-full">
                        <img
                          src={`data:image/jpeg;base64,${comment?.image}`}
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
                            onClick={() => openEditModal(comment)}
                          >
                            <MdEdit className="text-sm mr-1 mt-1" /> Edit
                          </button>

                          <button
                            className="flex items-center text-slate-500 text-sm font-medium"
                            onClick={() => openDeleteModal(comment?._id)}
                          >
                            <FaRegTrashCan className="text-sm mr-1" /> Delete
                          </button>
                        </>
                      )}
                      <button
                        className="flex items-center text-slate-500 text-sm font-medium"
                        onClick={() => {
                          setParentCommentId(comment?._id);
                          document.getElementById("my_modal_2").showModal();
                        }}
                      >
                        <FiMessageSquare className="text-sm mr-1 mt-1" /> Reply
                      </button>
                    </div>
                  </div>
                </div>

                {comments
                  .filter((reply) => reply?.parentCommentId === comment?._id)
                  .map((reply) => {
                    return (
                      <div key={reply?._id} className="flex py-4 px-12 ml-6">
                        <div className="mr-3">
                          <div className="avatar">
                            <div className="w-10 rounded-full">
                              <img
                                src={`data:image/jpeg;base64,${reply?.image}`}
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
                    );
                  })}
              </div>
            );
          })}
      </div>

    
      <dialog id="deleteCommentModal" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="text-lg font-bold text-center">
            Are you sure you want to delete this comment?
          </h3>
          <div className="modal-action">
            <button className="btn btn-primary" onClick={handleDelete}>
              Confirm
            </button>
            <button className="btn">Cancel</button>
          </div>
        </form>
      </dialog>

      
      <dialog id="editCommentModal" className="modal">
        <form method="dialog" className="modal-box">
          <textarea
            className="textarea w-full"
            value={fetchedComment}
            onChange={(e) => setFetchedComment(e.target.value)}
          ></textarea>
          <div className="modal-action">
            <button className="btn btn-primary" onClick={handleEdit}>
              Save
            </button>
            <button className="btn">Cancel</button>
          </div>
        </form>
      </dialog>

    
      <dialog id="my_modal_2" className="modal">
        <form method="dialog" className="modal-box">
          <textarea
            className="textarea w-full"
            placeholder="Write a reply..."
            value={reply}
            onChange={(e) => setReply(e.target.value)}
          ></textarea>
          <div className="modal-action">
            <button className="btn btn-primary" onClick={handlePostReply}>
              Reply
            </button>
            <button className="btn">Cancel</button>
          </div>
        </form>
      </dialog>

      <ToastContainer />
    </div>
  );
};

export default CommentSection;
