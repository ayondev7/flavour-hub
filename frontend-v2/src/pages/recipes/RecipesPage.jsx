import React from "react";
import { useParams } from "react-router-dom";
import RecipeHeader from "@components/recipe/RecipeHeader";
import RecipeImage from "@components/recipe/RecipeImage";
import RecipeMetadata from "@components/recipe/RecipeMetadata";
import RecipeDescription from "@components/recipe/RecipeDescription";
import RecipeIngredients from "@components/recipe/RecipeIngredients";
import RecipeInstructions from "@components/recipe/RecipeInstructions";
import CommentSection from "@components/recipe/CommentSection";
import RecipeSidebar from "@components/recipe/RecipeSidebar";
import { useGetRecipeQuery, useGetRelatedRecipesQuery, useGetAllRecipesQuery, useGetRecipeDetailsQuery } from '@redux/hooks/recipeHook';

const RecipesPage = () => {
  const { recipeId } = useParams();

  const { data: recipe, isLoading: isLoadingRecipe } = useGetRecipeQuery(recipeId);
  const { data: recipeDetails, isLoading: isLoadingDetails } = useGetRecipeDetailsQuery(recipeId);
  const { data: trendingRecipes, isLoading: isLoadingTrending } = useGetAllRecipesQuery();
  const { data: relatedRecipes, isLoading: isLoadingRelated } = useGetRelatedRecipesQuery(
    recipe?.cuisineType || null,
    { skip: !recipe?.cuisineType }
  );

  // Render loading indicator while data is being fetched
  if (isLoadingRecipe || isLoadingDetails) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <span className="loading loading-spinner text-hotPink w-32 h-32"></span>
      </div>
    );
  }

  // Render nothing if recipe data is not available
  if (!recipe) {
    return null;
  }

  return (
    <div className="lg:px-12 lg:py-6 px-2 py-2 min-h-screen">
      <RecipeHeader recipe={recipe} recipeDetails={recipeDetails} />

      <div className="w-[100%] h-[2px] bg-hotPink mt-1"></div>

      <div className="w-[100%] grid grid-cols-12">
        <section className="col-span-12 lg:col-span-7">
          <RecipeImage recipe={recipe} />
          <RecipeMetadata recipe={recipe} />
          <RecipeDescription recipe={recipe} />
          <RecipeIngredients ingredients={recipe.ingredients} />
          <RecipeInstructions instructions={recipe.instructions} />

          <div className="w-[100%] h-[2px] bg-hotPink my-10"></div>

          <div>
            <CommentSection recipeId={recipeId} />
          </div>
        </section>{" "}
        {/*left section end shere */}
        <RecipeSidebar
          nutritionalValues={recipe?.nutritionalValues}
          relatedRecipes={relatedRecipes}
          isLoadingRelated={isLoadingRelated}
          recipeId={recipe._id}
          trendingRecipes={trendingRecipes}
          isLoadingTrending={isLoadingTrending}
        />
        {/*right section end shere */}
      </div>
    </div>
  );
};

export default RecipesPage;
