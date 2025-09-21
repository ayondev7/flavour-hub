import React from "react";
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import CollectionCardSkeleton from "@skeleton/CollectionCardSkeleton";

const CollectionCard = ({ data, isLoading = false }) => {
  const navigate = useNavigate();

  if (isLoading) {
    return <CollectionCardSkeleton />;
  }

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

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No collections found.</p>
        <p className="text-gray-400 text-sm mt-2">Create your first collection to get started!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 lg:gap-x-10 gap-y-10">
      {data.map((collection, index) => {
        const gradientClass = gradients[index % gradients.length];
        return (
          <div
            key={collection?._id || index}
            onClick={() => handleCardClick(collection?._id)}
            className={`rounded-lg relative shadow-lg p-4 flex flex-col justify-between text-white ${gradientClass} cursor-pointer hover:shadow-xl transition-shadow duration-200`}
            style={{ height: "200px" }}
          >
            <button
              className="absolute top-2 right-2 hover:bg-white/20 rounded p-1 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <HiOutlineTrash className="lg:text-lg text-sm text-white" />
            </button>
            <div className="flex-grow">
              <h3 className="font-bold text-lg lg:text-xl">{collection?.title}</h3>
              <p className="mt-2 text-sm">{collection?.bookmarkCount || 0} items</p>
            </div>
            <div className="mt-4 text-[10px] lg:text-sm">
              <p>Last updated: {collection?.updatedAt ? new Date(collection.updatedAt).toLocaleDateString() : 'N/A'}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CollectionCard;
