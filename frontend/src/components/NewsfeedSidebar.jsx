import React, { useState } from "react";
import { FaUserCheck, FaPlus } from "react-icons/fa";
import { VscSearch } from "react-icons/vsc";
import { toast } from "react-toastify";
import { useToggleFollowMutation } from "../redux/store/followSlice";

const NewsfeedSidebar = ({ showSearchBar, title, followersSidebar, userId, chefs, onFollowChange }) => {
  const [loadingChefIds, setLoadingChefIds] = useState(new Set()); // Track loading state for each chef
  const [toggleFollow] = useToggleFollowMutation();

  const handleFollowClick = async (chefId, isFollowing) => {
    try {
      // Set the loading state for the specific chef
      setLoadingChefIds((prev) => new Set(prev).add(chefId));

      const result = await toggleFollow({ followerId: userId, followingId: chefId }).unwrap();
      onFollowChange(chefId); // Update the follow state
      toast.success(result?.message || "Follow status updated!");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update follow status");
    } finally {
      // Remove the loading state once the action is complete
      setLoadingChefIds((prev) => {
        const updated = new Set(prev);
        updated.delete(chefId);
        return updated;
      });
    }
  };

  const filteredData = chefs.filter((user) => user?.following === followersSidebar);

  return (
    <div className="bg-white shadow-md rounded-xl p-4 space-y-4 w-full">
      {showSearchBar === "true" && (
        <div className="relative">
          <input
            type="text"
            placeholder="Search chef name"
            className="input border-2 rounded-lg py-2 border-hotPink placeholder:text-gray-400 focus:outline-none focus:border-hotPink text-black text-xs lg:text-base lg:h-full w-full"
          />
          <VscSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-lg pointer-events-none text-hotPink" />
        </div>
      )}
      <div className="space-y-4">
        <h3 className="font-semibold text-hotPink text-lg">{title}</h3>
        <ul className="space-y-4">
          {filteredData.map((user) => (
            <li key={user._id} className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-3">
                <div className="size-8 rounded-full overflow-hidden">
                  <img
                    src={`data:image/jpeg;base64,${user?.image}`}
                    alt="Profile Image"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex-grow">
                  <p className="font-semibold text-gray-800 text-sm line-clamp-1">{user?.name}</p>
                  <div>
                    <span className="text-brightPink italic opacity-80 text-sm">{user?.rank}</span>
                    <span className="text-brightPink text-xs"> - {user?.points} points</span>
                  </div>
                </div>
              </div>
              <button
                className={`flex gap-x-1 items-center border border-brightPink rounded-full px-2 py-1 text-xs font-medium transition-all duration-200 hover:text-white hover:bg-brightPink 
                 ${
                   user?.following
                     ? "bg-brightPink text-white"
                     : "bg-white text-brightPink"
                 }
               `}
                aria-label={user?.following ? "Unfollow Chef" : "Follow Chef"}
                onClick={() => handleFollowClick(user._id, user?.following)}
                disabled={loadingChefIds.has(user._id)} // Disable only the button of the chef currently being followed/unfollowed
              >
                {loadingChefIds.has(user._id) ? (
                  "Loading..."
                ) : (
                  <>
                    {user?.following ? <FaUserCheck className="text-xs" /> : <FaPlus className="text-xs" />}
                    {user?.following ? "Following" : "Follow"}
                  </>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NewsfeedSidebar;
