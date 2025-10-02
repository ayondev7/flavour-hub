import React from 'react';
import { BsFire } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const SideRecipeCard = ({ recipe }) => {
  const { averageRating, nutritionalValues, title, image, _id } = recipe;
  const navigate = useNavigate();  // Initialize navigate hook

  // Calculate the number of filled stars based on averageRating (max 5)
  const filledStars = Math.round(averageRating);

  // Function to handle card click
  const handleCardClick = () => {
    navigate(`/recipesPage/${_id}`);  // Navigate to the recipe page using the recipeId
  };

  return (
    <div
      key={_id}
      className="w-[400px] h-[150px] bg-white my-4 shadow-xl flex rounded-lg cursor-pointer"
      onClick={handleCardClick} // Add onClick event to navigate
    >
      {/* Image Section */}
      <figure className="w-[200px] h-[100%] overflow-hidden">
        <img
          className="w-[100%] h-full object-cover rounded-tl-lg rounded-bl-lg"
          src={image}
          alt={title}
        />
      </figure>

      {/* Details Section */}
      <div className="w-[50%] px-4 py-6">
        <p className="text-black font-semibold line-clamp-2 text-base">{title}</p>

        {/* Dynamic Rating Section */}
        <div className="rating my-2 flex">
          {[...Array(5)].map((_, index) => (
            <input
              key={index}
              type="radio"
              name={`rating-${_id}`}
              className={`mask mask-star-2 w-4 h-4 ${
                index < filledStars ? 'bg-green-500' : 'bg-gray-300'
              }`}
              readOnly
            />
          ))}
        </div>

        {/* Calories Section */}
        <div className="flex items-center font-medium text-sm">
          <BsFire className="text-red-500" />
          <span className="ml-1">{nutritionalValues.calories} Kcal</span>
        </div>
      </div>
    </div>
  );
};

export default SideRecipeCard;
