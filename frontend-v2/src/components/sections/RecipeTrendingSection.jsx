import React from "react";
import SideRecipeCard from "@components/cards/SideRecipeCard";
import SideRecipeCardSkeleton from "@skeleton/SideRecipeCardSkeleton";

const RecipeTrendingSection = ({ trendingRecipes, isLoadingTrending, recipeId }) => {
  return (
    <div className="lg:flex flex-col items-start my-12 hidden">
      <p className="text-black text-2xl font-semibold">
        Trending Recipes
      </p>
      {isLoadingTrending ? (
        // Render skeleton loader
        <div className="flex flex-col gap-y-8 my-4">
          {Array.from({ length: 3 }).map(() => (
           <SideRecipeCardSkeleton/>
          ))}
        </div>
      ) : (
        trendingRecipes &&
        trendingRecipes.length > 0 &&
        trendingRecipes
          .filter((trendingRecipe) => trendingRecipe._id !== recipeId)
          .slice(0, 3)
          .map((trendingRecipe) => (
            <SideRecipeCard recipe={trendingRecipe}/>
          ))
      )}
    </div>
  );
};

export default RecipeTrendingSection;
