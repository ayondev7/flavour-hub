import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "@components/cards/Card";
import RecipeCardSkeleton from "@skeleton/RecipeCardSkeleton";
import { useGetBookmarksQuery } from "@redux/hooks/bookmarkHook";

const Bookmarks = () => {
  const navigate = useNavigate();
  const { collectionId } = useParams();

  const { data: bookmarks = [], isLoading, error } = useGetBookmarksQuery(collectionId, {
    skip: !collectionId,
  });

  const recipeCardClick = (recipeId) => {
    navigate(`/recipe-page/${recipeId}`);
  };

  if (error) {
    return (
      <div className="px-4 lg:px-12 pb-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error Loading Bookmarks</h2>
          <p className="text-gray-600">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 lg:px-12 pb-20 min-h-screen">
      {/* Header Section */}
      <div className="text-center pt-4 mb-8">
        <h1 className="text-lg lg:text-3xl font-bold bg-gradient-to-r from-purple-500 via-pink-400 to-pink-500 text-transparent bg-clip-text">
          Your Bookmarked Recipes
        </h1>
        <p className="text-sm lg:text-base text-gray-600 mt-2">
          Explore your favorite recipes saved for later. Manage and revisit the ones you love!
        </p>
      </div>

      {/* Recipe Cards or Skeletons */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 lg:gap-x-6 gap-y-10">
        {isLoading
          ? // Show 8 skeletons while loading
            Array.from({ length: 8 }).map((_, index) => (
              <RecipeCardSkeleton key={index} />
            ))
          : // Render the bookmarks dynamically if any exist
            bookmarks.length > 0 ? (
              bookmarks.map((bookmark) => (
                <Card
                  key={bookmark._id}
                  recipe={bookmark}
                  onCardClick={recipeCardClick}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">No bookmarks found in this collection.</p>
              </div>
            )}
      </div>
    </div>
  );
};

export default Bookmarks;
