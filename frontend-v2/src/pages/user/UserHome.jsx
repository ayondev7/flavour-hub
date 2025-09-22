import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserIdFromToken } from '@assets/tokenUtils';
import { useGetAllRecipesQuery } from '@redux/hooks/recipeHook';
import { useGetChefsQuery } from '@redux/hooks/chefHook';
import { useGetCollectionsByUserQuery } from '@redux/hooks/collectionHook';
import BookmarkDialog from '@components/modals/BookmarkDialogue';
import { ToastContainer } from 'react-toastify';
import HeroSection from '@components/sections/HeroSection';
import TrendingRecipesSection from '@components/sections/TrendingRecipesSection';
import LifestyleSection from '@components/sections/LifestyleSection';
import ChefsSection from '@components/sections/ChefsSection';

const UserHome = () => {
  const userId = getUserIdFromToken();
  const navigate = useNavigate();

  const { data: recipes = [], isLoading: recipesLoading } = useGetAllRecipesQuery();
  const { data: chefsData = [], isLoading: chefsLoading } = useGetChefsQuery();
  const { data: collections = [] } = useGetCollectionsByUserQuery(userId);

  const [isBookmarkDialogOpen, setIsBookmarkDialogOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const chefs = chefsData.slice(0, 8);

  const handleBookmarkClick = useCallback((recipe) => {
    setSelectedRecipe(recipe);
    setIsBookmarkDialogOpen(true);
  }, []);

  const onFollowChange = useCallback((chefId) => {
    // Optimistic update logic here if needed
  }, []);

  const onBookmarkRemove = useCallback((recipeId) => {
    // Optimistic update logic here if needed
  }, []);

  const handleCardClick = useCallback((recipeId) => {
    navigate(`/recipe-page/${recipeId}`);
  }, [navigate]);

  return (
    <div className="relative overflow-hidden min-h-screen">
      <HeroSection />

      {isBookmarkDialogOpen && (
        <BookmarkDialog
          isVisible={isBookmarkDialogOpen}
          recipe={selectedRecipe}
          userId={userId}
          onClose={() => setIsBookmarkDialogOpen(false)}
          collections={collections}
          onCollectionCreated={() => {}}
          onConfirm={() => setIsBookmarkDialogOpen(false)}
        />
      )}

      <TrendingRecipesSection
        recipes={recipes}
        isLoading={recipesLoading}
        onBookmarkClick={handleBookmarkClick}
        userId={userId}
        onBookmarkRemove={onBookmarkRemove}
        onCardClick={handleCardClick}
      />

      <LifestyleSection />

      <ChefsSection
        chefs={chefs}
        isLoading={chefsLoading}
        userId={userId}
        onFollowChange={onFollowChange}
      />
    </div>
  );
};

export default UserHome;
