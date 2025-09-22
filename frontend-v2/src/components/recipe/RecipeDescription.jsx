import React from "react";

const RecipeDescription = ({ recipe }) => {
  return (
    <>
      <p className="text-black text-base lg:text-lg font-semibold mt-6 mb-3">
        Description :{" "}
      </p>
      <p className="w-[90%] text-black font-medium text-sm lg:text-base">
        {recipe.description}
      </p>
      <div className="my-6">
        <p className="text-black text-base lg:text-lg font-semibold mb-3">
          Dietary Information :{" "}
        </p>
        <p className="text-black font-medium text-sm lg:text-base">
          {recipe.dietaryInformation}
        </p>
      </div>
    </>
  );
};

export default RecipeDescription;