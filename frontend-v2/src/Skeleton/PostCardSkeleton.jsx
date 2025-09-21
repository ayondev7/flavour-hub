import React from "react";

const PostCardSkeleton = () => {
  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-lg animate-pulse">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          <div>
            <div className="w-36 h-4 bg-gray-300 rounded-full mb-2"></div>
            <div className="w-24 h-3 bg-gray-300 rounded-full"></div>
          </div>
        </div>
        <div className="w-20 h-8 bg-pink-300 rounded-full"></div>
      </div>

      {/* Title Section */}
      <div className="w-56 h-5 bg-gray-300 rounded-full mb-2"></div>
      <div className="w-80 h-4 bg-gray-300 rounded-full mb-4"></div>

      {/* Image Section */}
      <div className="w-full h-[300px] bg-gray-300 rounded-lg mb-4"></div>
    </div>
  );
};

export default PostCardSkeleton;
