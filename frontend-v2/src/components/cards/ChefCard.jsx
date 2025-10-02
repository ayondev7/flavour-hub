import React from "react";
import { FaPlus } from "react-icons/fa6";
import { FaUserCheck } from "react-icons/fa6";
import { toast } from "react-toastify";
import { useToggleFollowMutation } from "@redux/store/followSlice";

const ChefCard = ({ chefData, userId, onFollowChange }) => {
  const [toggleFollow, { isLoading }] = useToggleFollowMutation();

  const handleFollowClick = async () => {
    try {
      await toggleFollow({
        followerId: userId,
        followingId: chefData._id,
      }).unwrap(); 
      
      const message = chefData.following 
        ? "You have unfollowed this user" 
        : "You have followed this user";
      toast.success(message);
      
      onFollowChange(chefData._id);
    } catch (error) {
      toast.error("Failed to update follow status. Please try again.");
    }
  };

  return (
    <div className="relative rounded-xl z-10 w-[150px] lg:w-[320px] h-[250px] lg:h-[300px] text-black shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
   
      <div className="h-[100px] w-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 absolute top-0 rounded-xl"></div>

      
      <button
        className={`absolute text-xs flex gap-x-1 items-center top-3 right-3 z-20 bg-white text-indigo-500 rounded-full px-4 py-2 md:text-sm font-bold shadow-md transition-all duration-200`}
        aria-label={chefData.following ? "Unfollow Chef" : "Follow Chef"}
        onClick={handleFollowClick}
        disabled={isLoading} 
      >
        {isLoading ? (
          "Loading..."
        ) : (
          <>
            {chefData.following ? (
              <FaUserCheck className="text-xs" />
            ) : (
              <FaPlus className="text-xs" />
            )}
            {chefData.following ? "Following" : "Follow"}
          </>
        )}
      </button>

     
      <div className="flex flex-col w-full items-center pt-16">
        <div className="avatar">
          <div className="ring-green-500 ring-offset-base-100 w-12 lg:w-16 rounded-full ring ring-offset-2 overflow-hidden">
            <img
              src={chefData?.image}
              alt={`${chefData.name}'s Avatar`}
              className="object-cover"
            />
          </div>
        </div>
        <div className="flex flex-col items-center mt-3">
          <h1 className="text-xs lg:text-xl font-bold tracking-wide line-clamp-1">
            {chefData?.name}
          </h1>
          <h2 className="text-[10px] lg:text-base font-medium italic opacity-80">
            {chefData?.rank}
          </h2>
        </div>

        
        <div className="rating mt-2 ml-3">
          {[1, 2, 3, 4, 5].map((value) => (
            <input
              key={value}
              type="radio"
              name={`rating-${chefData._id}`}
              className={`mask mask-star-2 size-2 lg:size-4 ${
                chefData?.averageRating >= value
                  ? "bg-green-500"
                  : "bg-gray-300"
              }`}
              readOnly
            />
          ))}
        </div>

    
        <div className="flex flex-col items-center bg-white text-indigo-500 p-2 rounded-lg shadow-sm w-10/12 lg:w-8/12">
          <p className="text-[10px] lg:text-sm font-medium">
            Recipes: {chefData?.numberOfRecipes}
          </p>
          <p className="text-[10px] lg:text-sm font-medium">
            Points: {chefData?.points}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChefCard;
