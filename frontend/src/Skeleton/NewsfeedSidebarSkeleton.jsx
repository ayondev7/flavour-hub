import React from "react";

const NewsfeedSidebarSkeleton = ({title}) => {
  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold text-pink-500 mb-4">{title}</h3>
      {[1, 2, 3, 4].map((_, index) => (
        <div
          key={index}
          className="flex items-center space-x-4 mb-4 last:mb-0 animate-pulse"
        >
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          <div className="flex-grow">
            <div className="w-32 h-4 bg-gray-300 rounded-full mb-2"></div>
            <div className="w-20 h-3 bg-gray-300 rounded-full"></div>
          </div>
          <div className="w-20 h-6 bg-pink-300 rounded-full"></div>
        </div>
      ))}
    </div>
  );
};

export default NewsfeedSidebarSkeleton;
