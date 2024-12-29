import React from "react";

const ChefCardSkeleton = () => {
  return (
    <div className="relative rounded-xl z-10 w-[150px] lg:w-[320px] h-[250px] lg:h-[300px] shadow-lg">
      {/* Background Gradient */}
      <div className="h-[100px] w-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 absolute top-0 rounded-xl"></div>

      {/* Follow Button Skeleton */}
      <div className="absolute top-3 right-3 bg-gray-300 rounded-full h-8 w-20 animate-pulse"></div>

      {/* Avatar and Name Section Skeleton */}
      <div className="flex flex-col w-full items-center pt-16">
        <div className="avatar">
          <div className="ring-gray-300 ring-offset-base-100 w-16 lg:w-16 rounded-full ring ring-offset-2 overflow-hidden animate-pulse">
            <div className="bg-gray-300 h-full w-full"></div>
          </div>
        </div>
        <div className="flex flex-col items-center mt-3 space-y-2">
          <div className="bg-gray-300 h-4 w-24 lg:w-36 rounded animate-pulse"></div>
          <div className="bg-gray-200 h-3 w-16 lg:w-20 rounded animate-pulse"></div>
        </div>

        {/* Dynamic Rating Skeleton */}
        <div className="flex mt-2 space-x-1">
          {[1, 2, 3, 4, 5].map((value) => (
            <div
              key={value}
              className=" bg-gray-300 mask mask-star-2 size-2 lg:size-4 animate-pulse"
            ></div>
          ))}
        </div>

        {/* Recipes and Points Section Skeleton */}
        <div className="flex flex-col items-center p-2 rounded-lg shadow-sm w-10/12 lg:w-8/12 mt-3 space-y-2">
          <div className="bg-gray-300 h-3 w-20 lg:w-24 rounded animate-pulse"></div>
          <div className="bg-gray-300 h-3 w-20 lg:w-24 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default ChefCardSkeleton;
