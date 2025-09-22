import React from "react";
import NutritionalValuesCard from "@components/recipe/NutritionalValuesCard";
import RelatedRecipesSection from "@components/sections/RelatedRecipesSection";
import Rating from "@components/user/Rating";
import NewsletterSignup from "@components/ui/NewsletterSignup";
import RecipeTrendingSection from "@components/recipe/RecipeTrendingSection";

const RecipeSidebar = ({
  nutritionalValues,
  relatedRecipes,
  isLoadingRelated,
  recipeId,
  trendingRecipes,
  isLoadingTrending
}) => {
  return (
    <section className="hidden lg:flex flex-col items-end border-slate-200 col-span-5">
      <NutritionalValuesCard nutritionalValues={nutritionalValues}/>
      <RelatedRecipesSection
        relatedRecipes={relatedRecipes}
        isLoadingRelated={isLoadingRelated}
        recipeId={recipeId}
      />
      <div>
        <Rating recipeId={recipeId} />
      </div>
      <NewsletterSignup />
      <RecipeTrendingSection
        trendingRecipes={trendingRecipes}
        isLoadingTrending={isLoadingTrending}
        recipeId={recipeId}
      />
    </section>
  );
};

export default RecipeSidebar;