import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Import useParams from react-router-dom
import axios from "axios";
import Card from "../components/Card"; // Assuming you have a Card component to display bookmarks
import RecipeCardSkeleton from "../Skeleton/RecipeCardSkeleton"; // Skeleton component for loading state

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const navigate = useNavigate(); 
  const [loading, setLoading] = useState(true); // Loading state
  const { collectionId } = useParams(); // Get collectionId from URL params

  const fetchCollections = async () => {
    try {
      setLoading(true); // Start loading
      const response = await axios.get(
        `http://localhost:5000/api/bookmark/get-bookmarks/${collectionId}`
      );
      setBookmarks(response.data); // Set the fetched bookmarks data
    } catch (error) {
      console.error("Error fetching collections:", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  useEffect(() => {
    if (collectionId) { // Make sure collectionId is available
      fetchCollections();
    }
  }, [collectionId]); // Re-fetch when collectionId changes

  const recipeCardClick = (recipeId) => {
    navigate(`/recipesPage/${recipeId}`);
  };

  return (
    <div className="px-4 lg:px-12 pb-20 min-h-screen">
      {/* Header Section */}
      <div className="text-center pt-4 mb-8">
        <h1 className="text-lg lg:text-3xl font-bold bg-gradient-to-r from-purple-500 via-pink-400 to-pink-500 text-transparent bg-clip-text">Your Bookmarked Recipes</h1>
        <p className="text-sm lg:text-base text-gray-600 mt-2">
          Explore your favorite recipes saved for later. Manage and revisit the ones you love!
        </p>
      </div>

      {/* Recipe Cards or Skeletons */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 lg:gap-x-6 gap-y-10">
        {loading
          ? // Show 8 skeletons while loading
            Array.from({ length: 8 }).map((_, index) => (
              <RecipeCardSkeleton key={index} />
            ))
          : // Render the bookmarks dynamically if any exist
            bookmarks.map((bookmark) => (
              <Card key={bookmark._id} recipe={bookmark}   onCardClick={recipeCardClick}/> // Assuming Card is the component to display each bookmark
            ))}
      </div>
    </div>
  );
};

export default Bookmarks;
