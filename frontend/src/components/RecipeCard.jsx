import React, { useEffect, useState } from "react";
import { BsFire } from "react-icons/bs"; // Ensure you have react-icons installed
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RecipeCard = ({ recipe, chefUser }) => {
  const navigate = useNavigate();
  const [ratings, setRatings] = useState();

  useEffect(() => {
    // Fetch recipes from the server
    axios
      .get("http://localhost:5000/api/recipe/getRating")
      .then((response) => {
        setRatings(response.data);
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
      });
  }, []);
  const handleCardClick = (recipeId) => {
    navigate(`/recipesPage/${recipeId}`);
  };

  return (
    <div
      className="card card-compact w-96 h-[350px] bg-white shadow-xl hover:cursor-pointer"
      onClick={() => handleCardClick(recipe._id)}
      key={recipe.id}
    >
      <figure className="h-[60%]">
        {recipe.image && (
          <img className="h-full w-full object-cover" src={`data:image/jpeg;base64,${recipe.image}`} alt="" />
        )}
      </figure>
      <div className="rating mt-3 ml-3">
        <div className="rating">
          {[1, 2, 3, 4, 5].map((value, index) => {
            const isChecked =
              Array.isArray(ratings) &&
              ratings.some(
                (rating) =>
                  rating.recipeId == recipe._id &&
                  parseInt(rating.averageRating) >= value
              );
            return (
              <input
                key={value}
                type="radio"
                name={`rating-${index}`} // Use a unique name for each rating
                className="mask mask-star-2 bg-green-500 size-4"
                checked={isChecked}
                readOnly // Make the radio inputs read-only
              />
            );
          })}
        </div>
      </div>
      <div className="p-3">
        <h2 className="text-md lg:text-xl text-black mb-4 font-semibold">
          {recipe.title}
        </h2>
        <div className="flex justify-between">
          <div className="flex items-center">
            <div className="avatar">
              <div className="w-10 rounded-full">
                <img
                  className="object-cover"
                  src={`data:image/jpeg;base64,${chefUser.image}`}
                  alt="Avatar"
                />
              </div>
            </div>
            <span className="ml-2 text-black text-sm lg:text-md font-bold">
              {chefUser.name}
            </span>
          </div>
          <div className="flex items-center text-sm font-bold border-2 p-2 rounded-lg">
            <BsFire className="text-red-500" />
            <span className="ml-1">{recipe.nutritionalValues.calories}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
