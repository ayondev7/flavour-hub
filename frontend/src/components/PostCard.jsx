import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCheck, FaPlus, FaHeart, FaRegHeart, FaRegComment } from "react-icons/fa";
import { toast } from "react-toastify";
import { useToggleFollowMutation } from "../redux/store/followSlice";
import { useToggleLikeMutation } from "../redux/store/likesApi"; // Import like mutation

const PostCard = ({ data, onFollowChange, userId,onLikeChange }) => {
  const [loadingChefIds, setLoadingChefIds] = useState(new Set());
  const [loadingLikes, setLoadingLikes] = useState(false); // To track like/unlike loading
  const [toggleFollow] = useToggleFollowMutation();
  const [toggleLike] = useToggleLikeMutation(); // Use the like mutation

  // Follow/Unfollow logic
  const handleFollowClick = async (chefId) => {
    try {
      setLoadingChefIds((prev) => new Set(prev).add(chefId));

      const result = await toggleFollow({
        followerId: userId,
        followingId: chefId,
      }).unwrap();
      onFollowChange(chefId);
      toast.success(result?.message || "Follow status updated!");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update follow status");
    } finally {
      setLoadingChefIds((prev) => {
        const updated = new Set(prev);
        updated.delete(chefId);
        return updated;
      });
    }
  };

  // Like/Unlike logic
  const handleLikeClick = async (recipeId) => {
    try {
      setLoadingLikes(true);

      const result = await toggleLike({
        userId,
        recipeId,
      }).unwrap();
      toast.success(result?.message);
      onLikeChange(recipeId);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update like status");
    } finally {
      setLoadingLikes(false);
    }
  };

  return (
    <div className="shadow-lg rounded-xl p-4 lg:p-6 bg-white relative">
      {/* User Info */}
      <div className="flex items-center mt-6 lg:mt-0 gap-x-2 gap-y-4 mb-4">
        <div className="avatar">
          <div className="w-12 rounded-full">
            <img
              src={`data:image/jpeg;base64,${data?.chefImage}`}
              alt="Profile"
            />
          </div>
        </div>
        <div>
          <div className="flex gap-x-1">
            <p className="font-bold text-gray-800 text-xs lg:text-base">
              {data?.chefName}
            </p>
            <span className="text-xs lg:text-base">-</span>
            <h2 className="text-xs lg:text-base font-medium italic opacity-80">
              {data?.chefRank}
            </h2>
          </div>
          <p className="text-[10px] lg:text-xs text-gray-500">{data?.createdAt}</p>
        </div>
        <button
          onClick={() => handleFollowClick(data.chefId)}
          className={`absolute flex gap-x-1 items-center border border-brightPink top-2 lg:top-6 right-2 lg:right-6 z-10 rounded-full px-4 py-2 text-[10px] md:text-sm font-bold transition-all duration-200 
            ${data?.following ? "bg-brightPink text-white" : "bg-white text-brightPink"}
          `}
          aria-label={data?.following ? "Unfollow Chef" : "Follow Chef"}
          disabled={loadingChefIds.has(data.chefId)}
        >
          {loadingChefIds.has(data.chefId) ? (
            "Loading..."
          ) : (
            <>
              {data?.following ? <FaUserCheck className="text-xs" /> : <FaPlus className="text-xs" />}
              {data?.following ? "Following" : "Follow"}
            </>
          )}
        </button>
      </div>

      {/* Post Content */}
      <div className="mb-4">
        <h3 className="text-sm lg:text-lg font-semibold text-gray-800">{data?.title}</h3>
        <p className="text-xs lg:text-base text-gray-600 leading-relaxed">{data?.description}</p>
      </div>

      {/* Post Image */}
      <div className="overflow-hidden rounded-lg">
        <Link to={`/recipesPage/${data?._id}`}>
          <img
            src={`data:image/jpeg;base64,${data?.image}`}
            alt="Recipe post image"
            className="w-full h-[300px] object-cover"
          />
        </Link>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-start mt-4 gap-x-4 text-brightPink">
        <button
          className="flex gap-x-2 items-center justify-center"
          onClick={() => handleLikeClick(data._id)} // Handle like click
          disabled={loadingLikes} // Disable button while loading
        >
          {data?.likedByUser ? <FaHeart /> : <FaRegHeart />}
          <span className="text-xs">{data?.totalLikes || 0}</span>
        </button>
        <button className="flex gap-x-2 items-center justify-center">
          <FaRegComment />
          <span className="text-xs">{data?.totalComments || 0}</span>
        </button>
      </div>
    </div>
  );
};

export default PostCard;
