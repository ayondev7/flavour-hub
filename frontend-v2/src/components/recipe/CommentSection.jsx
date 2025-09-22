import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUserIdFromToken } from "@assets/tokenUtils";
import {
  useGetCommentsQuery,
  usePostCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation
} from "@redux/hooks/commentHook";
import CommentForm from "@components/comment/CommentForm";
import CommentList from "@components/comment/CommentList";
import ReplyForm from "@components/comment/ReplyForm";
import DeleteCommentModal from "@components/comment/DeleteCommentModal";
import EditCommentModal from "@components/comment/EditCommentModal";

const CommentSection = ({ recipeId }) => {
  const userId = getUserIdFromToken();
  const [parentCommentId, setParentCommentId] = useState(null);
  const [editingComment, setEditingComment] = useState(null);

  const { data: comments = [] } = useGetCommentsQuery(recipeId);
  const [postComment, { isLoading: isPostingComment }] = usePostCommentMutation();
  const [updateComment, { isLoading: isUpdatingComment }] = useUpdateCommentMutation();
  const [deleteComment, { isLoading: isDeletingComment }] = useDeleteCommentMutation();

  const handlePostComment = async (content) => {
    try {
      await postComment({
        userId,
        content,
        recipeId,
      }).unwrap();
      toast.success("Your comment has been posted.");
    } catch (error) {
      console.error("Error posting comment", error);
      toast.error("Error posting comment");
    }
  };

  const handlePostReply = async (content) => {
    try {
      await postComment({
        userId,
        content,
        recipeId,
        parentCommentId,
      }).unwrap();
      toast.success("Your reply has been posted.");
      document.getElementById("my_modal_2").close();
      setParentCommentId(null);
    } catch (error) {
      console.error("Error posting reply", error);
      toast.error("Error posting reply");
    }
  };

  const handleEditComment = async (content) => {
    try {
      await updateComment({
        commentId: editingComment._id,
        content
      }).unwrap();
      document.getElementById("editCommentModal").close();
      toast.success("Comment updated successfully");
      setEditingComment(null);
    } catch (error) {
      toast.error("Failed to update comment");
      console.error(error);
    }
  };

  const handleDeleteComment = async () => {
    try {
      await deleteComment(editingComment._id).unwrap();
      document.getElementById("deleteCommentModal").close();
      toast.success("Comment deleted successfully");
      setEditingComment(null);
    } catch (error) {
      toast.error("Failed to delete comment");
      console.error(error);
    }
  };

  const openEditModal = (comment) => {
    setEditingComment(comment);
    document.getElementById("editCommentModal").showModal();
  };

  const openDeleteModal = (comment) => {
    setEditingComment(comment);
    document.getElementById("deleteCommentModal").showModal();
  };

  const handleReply = (commentId) => {
    setParentCommentId(commentId);
    document.getElementById("my_modal_2").showModal();
  };

  return (
    <div>
      <CommentForm
        onSubmit={handlePostComment}
        isLoading={isPostingComment}
      />

      <CommentList
        comments={comments}
        userId={userId}
        onEdit={openEditModal}
        onDelete={openDeleteModal}
        onReply={handleReply}
      />

      <ReplyForm
        onSubmit={handlePostReply}
        isLoading={isPostingComment}
      />

      <DeleteCommentModal
        onConfirm={handleDeleteComment}
        isLoading={isDeletingComment}
      />

      <EditCommentModal
        comment={editingComment}
        onSave={handleEditComment}
        isLoading={isUpdatingComment}
      />

      <ToastContainer />
    </div>
  );
};

export default CommentSection;
