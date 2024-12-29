import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCheck, FaPlus } from "react-icons/fa";
import { RxShare2 } from "react-icons/rx";
import { toast } from "react-toastify";
import { useToggleFollowMutation } from "../redux/store/followSlice";

const formatDate = (isoDate) => {
  if (!isoDate) return "Date not available"; // Fallback if date is missing or invalid

  const date = new Date(isoDate);

  // Check if the date is valid
  if (isNaN(date)) return "Date not available";

  const options = {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return date.toLocaleDateString("en-US", options).replace(",", " at"); // Replace comma for better readability
};

const PostCard = ({ data, onFollowChange, userId }) => {
  const [loading, setLoading] = useState(false);
  const [loadingChefIds, setLoadingChefIds] = useState(new Set());
  const [toggleFollow] = useToggleFollowMutation();

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

  return (
    <div className="shadow-lg rounded-xl p-6 bg-white">
      {/* User Info */}
      <div className="flex items-center gap-x-2 gap-y-4 mb-4 relative">
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
            <p className="font-bold text-gray-800 text-base">
              {data?.chefName}
            </p>
            <span>-</span>
            <h2 className="text-sm lg:text-base font-medium italic opacity-80">
              {data?.chefRank}
            </h2>
          </div>
          <p className="text-xs text-gray-500">{formatDate(data?.createdAt)}</p>
        </div>
        <button
          onClick={() => handleFollowClick(data.chefId)}
          className={`absolute flex gap-x-1 items-center border border-brightPink top-0 right-0 z-10 rounded-full px-4 py-2 text-sm font-bold transition-all duration-200 
    ${
      data?.following ? "bg-brightPink text-white" : "bg-white text-brightPink"
    }`}
          aria-label={data?.following ? "Unfollow Chef" : "Follow Chef"}
          disabled={loadingChefIds.has(data.chefId)} // Check if the chefId is in the loading set
        >
          {loadingChefIds.has(data.chefId) ? (
            "Loading..."
          ) : (
            <>
              {data?.following ? (
                <FaUserCheck className="text-xs" />
              ) : (
                <FaPlus className="text-xs" />
              )}
              {data?.following ? "Following" : "Follow"}
            </>
          )}
        </button>
      </div>

      {/* Post Content */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{data?.title}</h3>
        <p className="text-gray-600 leading-relaxed">{data?.description}</p>
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
      <div className="flex justify-end mt-4">
        <button className="items-center flex gap-x-1 text-brightPink rounded-lg">
          <RxShare2 /> Share
        </button>
      </div>
    </div>
  );
};

export default PostCard;
