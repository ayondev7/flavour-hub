import React from "react";
import { FaHashtag } from "react-icons/fa";

const RecipeIngredients = ({ ingredients }) => {
  return (
    <>
      <p className="mt-6 mb-3 text-black text-base lg:text-lg font-semibold">
        Ingredients :{" "}
      </p>
      <div className="space-y-2">
        {ingredients.map((ingredient, index) => (
          <div key={index} className="flex items-start lg:items-center">
            <span className="mr-2 text-hotPink">
              <FaHashtag className="text-sm lg:text-base" />
            </span>
            <span className="text-sm lg:text-base text-black font-medium">
              {ingredient.value}
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

export default RecipeIngredients;