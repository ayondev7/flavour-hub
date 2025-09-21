import React from "react";

const CollectionCardSkeleton = () => {
  const gradients = [
    "bg-gradient-to-r from-purple-400 to-pink-600",
    "bg-gradient-to-r from-green-300 to-blue-500",
    "bg-gradient-to-r from-yellow-400 to-orange-500",
    "bg-gradient-to-r from-teal-300 to-cyan-500",
    "bg-gradient-to-r from-indigo-400 to-purple-500",
    "bg-gradient-to-r from-pink-300 to-red-500",
    "bg-gradient-to-r from-blue-400 to-indigo-500",
    "bg-gradient-to-r from-lime-400 to-emerald-600",
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 lg:gap-x-10 gap-y-10">
      {Array.from({ length: 8 }).map((_, index) => {
        const gradientClass = gradients[index % gradients.length];
        return (
          <div
            key={index}
            className={`rounded-lg relative shadow-lg p-4 flex flex-col justify-between text-white ${gradientClass} animate-pulse`}
            style={{ height: "200px" }}
          >
            <div className="absolute top-2 right-2">
              <div className="w-4 h-4 bg-white/30 rounded"></div>
            </div>
            <div className="flex-grow space-y-2">
              <div className="h-6 bg-white/30 rounded w-3/4"></div>
              <div className="h-4 bg-white/30 rounded w-1/2"></div>
            </div>
            <div className="mt-4">
              <div className="h-3 bg-white/30 rounded w-2/3"></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CollectionCardSkeleton;