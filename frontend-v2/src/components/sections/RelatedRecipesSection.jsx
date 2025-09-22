import React from "react";
import SideRecipeCard from "@components/cards/SideRecipeCard";
import SideRecipeCardSkeleton from "@skeleton/SideRecipeCardSkeleton";

const RelatedRecipesSection = ({ relatedRecipes, isLoadingRelated, recipeId }) => {
  return (
    <div className="flex flex-col items-start my-12">
      <p className="text-black text-2xl font-semibold">Related Recipes</p>
      {isLoadingRelated ? (
        // Render skeleton loader
        <div className="flex flex-col gap-y-8 my-4">
          {Array.from({ length: 3 }).map(() => (
           <SideRecipeCardSkeleton/>
          ))}
        </div>
      ) : (
        relatedRecipes &&
        relatedRecipes.length > 0 &&
        relatedRecipes
          .filter((relatedRecipe) => relatedRecipe._id !== recipeId)
          .slice(0, 3)
          .map((relatedRecipe) => (
           <SideRecipeCard recipe={relatedRecipe}/>
          ))
      )}
    </div>
  );
};

export default RelatedRecipesSection;