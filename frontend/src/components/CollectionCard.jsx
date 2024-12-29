import React from "react";
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const CollectionCard = ({ data }) => {
  const navigate = useNavigate(); // Hook for navigation

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

  const handleCardClick = (id) => {
    navigate(`/bookmarks/${id}`);
  };

  return (
    <div className="grid grid-cols-4 gap-x-10 gap-y-10">
      {data.map((collection, index) => {
        const gradientClass = gradients[index % gradients.length];
        return (
          <div
            key={index}
            onClick={() => handleCardClick(collection?._id)} // Navigate on click
            className={`rounded-lg relative shadow-lg p-4 flex flex-col justify-between text-white ${gradientClass} cursor-pointer`} // Add cursor-pointer
            style={{ height: "200px" }}
          >
            <button
              className="absolute top-2 right-2"
              onClick={(e) => {
                e.stopPropagation(); // Prevent navigation when clicking the trash icon
                console.log("Delete clicked");
              }}
            >
              <HiOutlineTrash className="lg:text-lg text-sm text-white" />
            </button>
            <div className="flex-grow">
              <h3 className="font-bold text-xl">{collection?.title}</h3>
              <p className="mt-2 text-sm">{collection?.bookmarkCount} items</p>
            </div>
            <div className="mt-4 text-sm">
              <p>Last updated: {collection?.updatedAt}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CollectionCard;
