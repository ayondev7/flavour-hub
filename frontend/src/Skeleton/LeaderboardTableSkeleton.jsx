import React from "react";

const LeaderboardTableSkeleton = () => {
  return (
    <div className="overflow-x-auto bg-gradient-to-r from-purple-500 via-pink-400 to-pink-500 p-6 rounded-xl">
      <div className="animate-pulse">
        <table className="table-auto w-full text-left border-collapse">
          <thead>
            <tr>
              {["Rank", "Chef", "Title", "Points", "Avg Rating", "Recipes"].map((header) => (
                <th
                  key={header}
                  className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white bg-clip-text"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                {/* Rank */}
                <td className="px-4 py-2">
                  <div className="h-4 w-6 bg-gray-300 rounded"></div>
                </td>
                {/* Chef */}
                <td className="px-4 py-2 flex items-center">
                  <div className="h-10 w-10 bg-gray-300 rounded-full mr-4"></div>
                  <div className="h-4 w-24 bg-gray-300 rounded"></div>
                </td>
                {/* Title */}
                <td className="px-4 py-2">
                  <div className="h-4 w-20 bg-gray-300 rounded"></div>
                </td>
                {/* Points */}
                <td className="px-4 py-2">
                  <div className="h-4 w-12 bg-gray-300 rounded"></div>
                </td>
                {/* Avg Rating */}
                <td className="px-4 py-2">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="h-4 w-4 bg-gray-300 mask mask-star-2 "></div>
                    ))}
                  </div>
                </td>
                {/* Recipes */}
                <td className="px-4 py-2">
                  <div className="h-4 w-8 bg-gray-300 rounded"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderboardTableSkeleton;
