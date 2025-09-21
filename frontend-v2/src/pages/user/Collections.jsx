import React from "react";
import CollectionCard from "@components/cards/CollectionCard";
import { getUserIdFromToken } from "@assets/tokenUtils";
import { useGetCollectionsByUserQuery } from "@redux/hooks/collectionHook";

const Collections = () => {
  const userId = getUserIdFromToken();
  const { data: collections = [], isLoading, error } = useGetCollectionsByUserQuery(userId);

  if (error) {
    return (
      <div className="px-4 lg:px-12 pb-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error Loading Collections</h2>
          <p className="text-gray-600">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 lg:px-12 pb-20 min-h-screen">
      <h1 className="text-lg lg:text-3xl font-bold text-center bg-gradient-to-r from-purple-500 via-pink-400 to-pink-500 text-transparent bg-clip-text">
        Your Collections
      </h1>
      <p className="text-sm lg:text-base text-gray-600 mt-2 text-center">
        Browse and manage the collections of recipes you've bookmarked.
      </p>
      <p className="text-sm lg:text-base mb-6 text-gray-600 mt-1 text-center">
        Each collection is a curated set of your favorite recipes, ready to be accessed at any time.
      </p>
      <CollectionCard data={collections} isLoading={isLoading} />
    </div>
  );
};

export default Collections;
