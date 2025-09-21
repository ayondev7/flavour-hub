import React from "react";
import { BsFire } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();

  const handleCardClick = (recipeId) => {
    navigate(`/recipesPage/${recipeId}`);
  };

  return (
    <div
      className="rounded-xl h-[200px] lg:h-[350px] bg-white shadow-xl hover:cursor-pointer"
      onClick={() => handleCardClick(recipe._id)}
      key={recipe.id}
    >
      <figure className="h-[100px] lg:h-[200px]">
        {recipe?.image && (
          <img
            className="h-full w-full object-cover rounded-tr-xl rounded-tl-xl"
            src={`data:image/jpeg;base64,${recipe?.image}`}
            alt=""
          />
        )}
      </figure>
      <div className="rating mt-2 ml-3">
        {[1, 2, 3, 4, 5].map((value) => (
          <input
            key={value}
            type="radio"
            name={`rating-${recipe._id}`}
            className={`mask mask-star-2 size-2 lg:size-4 ${
              recipe?.averageRating >= value ? "bg-green-500" : "bg-gray-300"
            }`}
            readOnly
          />
        ))}
      </div>
      <div className="lg:p-3 px-3 py-1">
        <h2 className="text-sm line-clamp-1 lg:text-lg text-black mb-4 font-semibold">
          {recipe?.title}
        </h2>
        <div className="flex justify-between">
          <div className="flex items-center">
            <div className="avatar">
              <div className="lg:w-8 w-4 rounded-full">
                <img
                  className="object-cover"
                  src={`data:image/jpeg;base64,${recipe?.chefImage}`}
                  alt="Avatar"
                />
              </div>
            </div>
            <span className="lg:ml-2 ml-1 text-black text-xs lg:text-md font-bold line-clamp-1">
              {recipe?.chefName}
            </span>
          </div>
          <div className="flex items-center text-[8px] lg:text-xs font-bold border lg:p-2 p-1 rounded-lg">
            <BsFire className="text-red-500" />
            <span className="ml-1">{recipe?.nutritionalValues?.calories}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
