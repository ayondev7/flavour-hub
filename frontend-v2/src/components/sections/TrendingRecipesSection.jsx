import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@components/cards/Card';
import RecipeCardSkeleton from '@skeleton/RecipeCardSkeleton';

const TrendingRecipesSection = ({ recipes, isLoading, onBookmarkClick, userId, onBookmarkRemove, onCardClick }) => {
  if (isLoading || recipes.length === 0) {
    return (
      <div className="grid grid-cols-2 gap-x-4 lg:gap-x-0 lg:grid-cols-4 gap-y-16 px-4 lg:px-16 py-10">
        {Array.from({ length: 8 }).map((_, index) => (
          <RecipeCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between px-4 lg:px-16 py-4">
        <h2 className="text-black text-lg lg:text-2xl font-semibold">Trending Recipes</h2>
        <div className="text-sm lg:text-base text-hotPink font-bold">
          <Link to="/all-recipes/null">View More</Link>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:gap-x-10 lg:grid-cols-4 gap-x-4 gap-y-16 mx-4 lg:mx-16 pb-24">
        {recipes.slice(-8).map((recipe) => (
          <Card
            key={recipe._id}
            recipe={recipe}
            onBookmarkClick={onBookmarkClick}
            userId={userId}
            onBookmarkRemove={onBookmarkRemove}
            onCardClick={onCardClick}
          />
        ))}
      </div>
    </>
  );
};

export default TrendingRecipesSection;