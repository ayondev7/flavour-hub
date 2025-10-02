import React from "react";
import { BsCalendar2Date } from "react-icons/bs";
import { FaRegCommentDots } from "react-icons/fa";

const RecipeHeader = ({ recipe, recipeDetails }) => {
  return (
    <>
      <p className="lg:w-1/2 lg:text-xl text-black font-semibold text-lg">{recipe.title}</p>
      {recipeDetails && (
        <div className="lg:w-1/2 w-full flex flex-wrap gap-x-4 gap-y-2 lg:gap-x-6 my-4 lg:items-center">
          <div className="flex items-center">
            <div className="avatar">
              <div className="lg:size-8 rounded-full size-6">
                <img
                  src={recipeDetails?.chef.image}
                  alt={recipe.title}
                />
              </div>
            </div>
            <span className="lg:text-md ml-2 text-black font-semibold text-sm">
              {recipeDetails?.chef.name}
            </span>
          </div>
          <div className="flex items-center">
            <BsCalendar2Date className="text-md text-hotPink" />
            <span className="lg:text-md ml-2 text-black font-semibold text-sm">
              {recipeDetails?.createdAt}
            </span>
          </div>
          <div className="flex items-center">
            <FaRegCommentDots className="text-md text-hotPink" />
            <span className="lg:text-md ml-2 text-black font-semibold text-sm">
              {recipeDetails?.totalComments} comments
            </span>
          </div>
          <div>
            <div className="rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <input
                  key={star}
                  type="radio"
                  name={`rating-${recipe._id}`}
                  className="mask mask-star-2 bg-hotPink w-3 h-3"
                  checked={star === Number(recipeDetails.avgRating)}
                  readOnly
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RecipeHeader;