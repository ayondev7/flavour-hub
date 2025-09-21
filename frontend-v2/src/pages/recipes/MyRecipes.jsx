import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Pagination from "@components/ui/Pagination";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import MyCollectionCard from "@components/cards/MyCollectionCard";
import DeleteModal from "@components/modals/DeleteModal";
import RecipeCardSkeleton from "@skeleton/RecipeCardSkeleton";

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const recipesPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      const token = sessionStorage.getItem("token");
      if (token) {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;

        try {
          const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/recipe/getMyRecipes/${userId}`
          );
          setRecipes(response.data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching recipes:", error);
          setLoading(true);
        }
      }
    };

    fetchRecipes();
  }, []);

  const handleDelete = async () => {
    if (selectedRecipe) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_BACKEND_URL}/api/recipe/deleteRecipe/${selectedRecipe._id}`
        );
        setRecipes((prevRecipes) =>
          prevRecipes.filter((recipe) => recipe._id !== selectedRecipe._id)
        );
        toast.success("Recipe deleted successfully!");
      } catch (error) {
        console.error("Error deleting recipe:", error);
        toast.error("Failed to delete recipe.");
      }
      closeModal();
    }
  };

  const handleEdit = (recipeId) => {
    navigate(`/editRecipe/${recipeId}`);
  };

  const openModal = (recipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRecipe(null);
  };

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  return (
    <div className="min-h-screen">
      <p className="px-4 lg:px-16 lg:my-5 text-black text-base lg:text-xl font-semibold">
        My Recipes Collection
      </p>
      <div className="px-4 lg:px-16 grid lg:grid-cols-4 grid-cols-2 gap-y-10 gap-x-4 lg:gap-x-10 lg:mt-10 mt-6">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <RecipeCardSkeleton />
            ))
          : currentRecipes.map((recipe) => (
              <MyCollectionCard
                key={recipe._id}
                recipe={recipe}
                onEdit={handleEdit}
                onDelete={openModal}
              />
            ))}
      </div>
      <Pagination
        totalRecipes={recipes.length}
        recipesPerPage={recipesPerPage}
        currentPage={currentPage}
        paginate={setCurrentPage}
      />

      <ToastContainer />

      {isModalOpen && (
        <DeleteModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default MyRecipes;
