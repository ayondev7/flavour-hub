import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "@components/ui/Pagination";
import { toast } from "react-toastify";
import MyCollectionCard from "@components/cards/MyCollectionCard";
import DeleteModal from "@components/modals/DeleteModal";
import RecipeCardSkeleton from "@skeleton/RecipeCardSkeleton";
import { getUserIdFromToken } from "@assets/tokenUtils";
import { useGetMyRecipesQuery, useDeleteRecipeMutation } from "@redux/hooks/recipeHook";

// Custom hook for pagination logic
const usePagination = (items, itemsPerPage = 6) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
  }, []);

  // Reset to first page when items change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [items.length]);

  return {
    currentPage,
    totalPages,
    currentItems,
    paginate,
  };
};

// Custom hook for delete modal logic
const useDeleteModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const openModal = useCallback((recipe) => {
    setSelectedRecipe(recipe);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setSelectedRecipe(null);
  }, []);

  return {
    isOpen,
    selectedRecipe,
    openModal,
    closeModal,
  };
};

const MyRecipes = () => {
  const navigate = useNavigate();
  const userId = getUserIdFromToken();

  // RTK Query hooks
  const { data: recipes = [], isLoading } = useGetMyRecipesQuery();
  const [deleteRecipe] = useDeleteRecipeMutation();

  // Custom hooks
  const { currentPage, currentItems, paginate } = usePagination(recipes);
  const deleteModal = useDeleteModal();

  const handleEdit = useCallback((recipeId) => {
    navigate(`/edit-recipe/${recipeId}`);
  }, [navigate]);

  const handleDelete = useCallback(async () => {
    if (deleteModal.selectedRecipe) {
      try {
        await deleteRecipe(deleteModal.selectedRecipe._id).unwrap();
        toast.success("Recipe deleted successfully!");
        deleteModal.closeModal();
      } catch (error) {
        console.error("Error deleting recipe:", error);
        toast.error("Failed to delete recipe.");
      }
    }
  }, [deleteRecipe, deleteModal]);

  return (
    <div className="min-h-screen">
      <p className="px-4 lg:px-16 lg:my-5 text-black text-base lg:text-xl font-semibold">
        My Recipes Collection
      </p>
      <div className="px-4 lg:px-16 grid lg:grid-cols-4 grid-cols-2 gap-y-10 gap-x-4 lg:gap-x-10 lg:mt-10 mt-6">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <RecipeCardSkeleton key={index} />
            ))
          : currentItems.map((recipe) => (
              <MyCollectionCard
                key={recipe._id}
                recipe={recipe}
                onEdit={handleEdit}
                onDelete={deleteModal.openModal}
              />
            ))}
      </div>
      <Pagination
        totalRecipes={recipes.length}
        recipesPerPage={6}
        currentPage={currentPage}
        paginate={paginate}
      />

      {deleteModal.isOpen && (
        <DeleteModal
          isOpen={deleteModal.isOpen}
          onClose={deleteModal.closeModal}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default MyRecipes;
