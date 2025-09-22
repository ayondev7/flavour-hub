import React from "react";

const RecipeMetadata = ({ recipe }) => {
  return (
    <div className="flex justify-start space-x-6 items-center lg:w-[80%] my-6 w-full">
      <div className="flex flex-col font-semibold text-xs lg:text-sm">
        <span>Prep Time : </span>{" "}
        <span className="text-black">
          {recipe.prepTime.hours} hours {recipe.prepTime.minutes} minutes
        </span>
      </div>
      <div className="bg-hotPink h-20 w-[2px]"></div>
      <div className="flex flex-col font-semibold text-xs lg:text-sm">
        <span>Cooking Time : </span>{" "}
        <span className="text-black">
          {recipe.cookTime.hours} hours {recipe.cookTime.minutes} minutes
        </span>
      </div>
      <div className="bg-hotPink h-20 w-[2px]"></div>
      <div className="flex flex-col font-semibold text-xs lg:text-sm">
        <span>Servings : </span>{" "}
        <span className="text-black">{recipe.servings}</span>
      </div>
      <div className="bg-hotPink h-20 w-[2px]"></div>
      <div className="flex flex-col font-semibold text-xs lg:text-sm">
        <span>Cuisine Type : </span>{" "}
        <span className="text-black">{recipe.cuisineType}</span>
      </div>
    </div>
  );
};

export default RecipeMetadata;