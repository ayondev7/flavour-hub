import React from "react";

const RecipeImage = ({ recipe }) => {
  return (
    <>
      {recipe?.image && (
        <img
          className="h-[300px] w-[500px] object-cover mt-6 rounded-lg"
          src={recipe?.image}
          alt=""
        />
      )}
    </>
  );
};

export default RecipeImage;