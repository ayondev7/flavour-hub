import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LeaderboardTable = ({ data, userId }) => {
  // Function to render star ratings
  const renderStars = (rating) => {
    const roundedRating = Math.round(rating); // Round rating to nearest whole number
    return (
      <div className="rating flex items-center">
        {Array(5)
          .fill()
          .map((_, index) => (
            <input
              key={index}
              type="radio"
              className={`mask mask-star-2 size-4 ${
                index < roundedRating ? "bg-pink-500" : "bg-gray-300"
              }`}
              disabled
              defaultChecked={index < roundedRating}
            />
          ))}
      </div>
    );
  };

  return (
    <div className="overflow-x-auto h-full bg-gradient-to-r from-purple-500 via-pink-400 to-pink-500 p-6 shadow-lg rounded-lg">
      <motion.table
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-w-full bg-white shadow-lg rounded-lg h-full"
      >
        <thead>
          <tr>
            {["Rank", "Chef", "Title", "Points", "Avg Rating", "Recipes"].map((header, index) => (
              <motion.th
                key={index}
                className="px-4 py-2 text-left text-sm font-medium text-gray-800"
              >
                {header}
              </motion.th>
            ))}
          </tr>
        </thead>
        <motion.tbody layout>
          <AnimatePresence>
            {data.map((row, index) => (
              <motion.tr
                key={row._id}
                className={`hover:bg-gradient-to-r via-purple-300 from-indigo-300 to-pink-300 ${
                  row._id === userId ? "bg-purple-200" : ""
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {/* Rank */}
                <motion.td className="px-4 py-2 text-sm font-semibold text-black">
                  {index + 1}
                </motion.td>

                {/* Chef */}
                <motion.td className="px-4 py-2 text-sm">
                  <div className="flex items-center space-x-3">
                    <img
                      src={`data:image/jpeg;base64,${row?.image}`}
                      alt={row.name}
                      className="size-12 rounded-full object-cover border-2 border-brightPink"
                    />
                    <span className="font-semibold text-black">{row.name}</span>
                  </div>
                </motion.td>

                {/* Title */}
                <motion.td className="px-4 py-2 text-sm font-medium italic text-brightPink">
                  {row.rank}
                </motion.td>

                {/* Points */}
                <motion.td className="px-4 py-2 text-sm font-medium text-brightPink">
                  {row.points}
                </motion.td>

                {/* Average Rating */}
                <motion.td className="px-4 py-2 text-sm">
                  {renderStars(row.averageRating)}
                </motion.td>

                {/* Recipes */}
                <motion.td className="px-4 py-2 text-sm font-medium text-brightPink">
                  {row.numberOfRecipes}
                </motion.td>
              </motion.tr>
            ))}
          </AnimatePresence>
        </motion.tbody>
      </motion.table>
    </div>
  );
};

export default LeaderboardTable;
