import React from "react";
import { FaUserCheck, FaPlus } from "react-icons/fa";
import { VscSearch } from "react-icons/vsc";
import { useFollow } from "@hooks/useFollow";

const NewsfeedSidebar = ({ showSearchBar, title, followersSidebar, userId, chefs, onFollowChange }) => {
  const { loadingChefIds, handleFollowClick } = useFollow(userId, onFollowChange);

  const filteredData = chefs.filter((user) => user?.following === followersSidebar && user._id !== userId);

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
                    src={user?.image}
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
                onClick={() => handleFollowClick(user._id)}
                disabled={loadingChefIds.has(user._id)} 
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
