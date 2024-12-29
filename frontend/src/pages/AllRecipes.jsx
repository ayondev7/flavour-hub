import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Pagination from "../components/Pagination";
import CategoryTab from "../components/CategoryTab";
import Card from "../components/Card";
import RecipeCardSkeleton from "../Skeleton/RecipeCardSkeleton";
import MarqueeComponent from "../components/MarqueeComponent";
import Marquee from "react-fast-marquee";
import mealType from "../assets/data";
import BookmarkDialog from "../components/BookmarkDialogue";
import { isTokenValid, getUserIdFromToken } from "../assets/tokenUtils";
import { ToastContainer } from "react-toastify";

const AllRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 6;
  const navigate = useNavigate();
  const { cuisineType } = useParams();
  const [cuisineTypeState, setCuisineTypeState] = useState(cuisineType);
  const [isBookmarkDialogOpen, setIsBookmarkDialogOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [collections, setCollections] = useState(null);
  const userId = getUserIdFromToken();

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        cuisineTypeState
          ? `http://localhost:5000/api/recipe/getRelatedRecipes/${cuisineTypeState}`
          : "http://localhost:5000/api/recipe/getAllRecipes",
        {
          headers: {
            userId: userId, // Include userId in the headers
          },
        }
      );
      setRecipes(response.data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCollections = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/collections/get-collections/${userId}`
      );
      setCollections(response.data);
    } catch (error) {
      console.error("Error fetching collections:", error);
    } finally {
    }
  };

  useEffect(() => {
    if (isTokenValid()) {
      fetchRecipes();
    } else {
      navigate("/login");
    }
  }, [cuisineTypeState]);

  useEffect(() => {
    if (isTokenValid()) {
      fetchCollections();
    } else {
      navigate("/login");
    }
  }, [userId]);

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const recipeCardClick = (recipeId) => {
    navigate(`/recipesPage/${recipeId}`);
  };

  const handleCuisineSelect = (cuisine) => {
    setCuisineTypeState(cuisine);
    navigate(`/allRecipes/${cuisine}`);
  };

  const handleBookmarkClick = (recipe) => {
    setSelectedRecipe(recipe);
    setIsBookmarkDialogOpen(true);
  };

  const onBookmarkRemove = (recipeId) => {
    setRecipes((prevRecipes) =>
      prevRecipes.map((recipe) =>
        recipe._id === recipeId ? { ...recipe, bookmarked: !recipe.bookmarked } : recipe
      )
    );
  };

  return (
    <div className="px-4 lg:px-12">
      <ToastContainer />
      <Marquee>
        {mealType.map((meal, index) => (
          <div className="mx-4">
            <MarqueeComponent key={index} name={meal.name} image={meal.image} />
          </div>
        ))}
      </Marquee>

      {isBookmarkDialogOpen && (
        <BookmarkDialog
          isVisible={isBookmarkDialogOpen}
          recipe={selectedRecipe}
          userId={userId}
          onClose={() => setIsBookmarkDialogOpen(false)}
          collections={collections}
          onCollectionCreated={fetchCollections}
          onConfirm={(selectedCollection) => {
            setIsBookmarkDialogOpen(false); // Close the dialog
            setRecipes((prevRecipes) =>
              prevRecipes.map((r) =>
                r._id === selectedRecipe._id ? { ...r, bookmarked: true } : r
              )
            );
          }}
        />
      )}

      <div className="grid lg:grid-cols-12 grid-cols-1">
        <section className="w-full lg:col-span-9">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-10 lg:pr-10">
            {loading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <RecipeCardSkeleton />
                ))
              : currentRecipes.map((recipe) => (
                  <Card
                    key={recipe?._id}
                    recipe={recipe}
                    onCardClick={recipeCardClick}
                    onBookmarkClick={handleBookmarkClick}
                    userId={userId}
                    onBookmarkRemove={onBookmarkRemove}
                  />
                ))}
          </div>
          <div className="flex justify-center mt-2 w-full">
            <Pagination
              totalRecipes={recipes.length}
              recipesPerPage={recipesPerPage}
              currentPage={currentPage}
              paginate={paginate}
            />
          </div>
        </section>

        <section className="py-3 px-6 h-[830px] lg:col-span-3 bg-neutral-100 rounded-lg hidden lg:block">
          <CategoryTab onCuisineSelect={handleCuisineSelect} />
        </section>
      </div>
    </div>
  );
};

export default AllRecipes;
