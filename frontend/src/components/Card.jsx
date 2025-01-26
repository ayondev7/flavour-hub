import React from "react";
import { BsFire, BsBookmarkPlusFill, BsBookmarkCheckFill } from "react-icons/bs";
import { useDeleteBookmarkMutation } from "../redux/store/bookmarkSlice"; // Import the delete hook
import { toast } from "react-toastify";

const Card = ({ recipe, onCardClick, onBookmarkClick, userId, onBookmarkRemove }) => {
  const [deleteBookmark, { isLoading: isDeleting }] = useDeleteBookmarkMutation();

  const handleBookmarkClick = (e) => {
    e.stopPropagation(); // Prevent triggering `onCardClick`
    if (recipe?.bookmarked) {
      // Call deleteBookmark if the recipe is already bookmarked
      deleteBookmark({ recipeId: recipe._id, userId: userId })
        .unwrap()
        .then((response) => {
          onBookmarkRemove(recipe._id);
          toast.success(response.message);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } else {
      // Call onBookmarkClick if the recipe is not bookmarked
      onBookmarkClick(recipe);
    }
  };

  return (
    <div
      className="relative rounded-xl z-10 w-[150px] lg:w-[320px] h-[200px] lg:h-[350px] bg-white shadow-xl hover:cursor-pointer"
      onClick={() => onCardClick(recipe._id)}
    >
      <button
        className="absolute top-1 right-1 z-20 bg-white p-1 rounded-md"
        onClick={handleBookmarkClick}
        disabled={isDeleting}
      >
        {recipe?.bookmarked ? (
          <BsBookmarkCheckFill className="text-lg md:text-2xl font-medium text-green-400" />
        ) : (
          <BsBookmarkPlusFill className="text-lg md:text-2xl font-medium text-brightPink" />
        )}
      </button>
      <figure className="h-[100px] lg:h-[200px]">
        {recipe?.image && (
          <img
            src={`data:image/jpeg;base64,${recipe?.image}`}
            alt="Recipe"
            className="h-full w-full object-cover rounded-tr-xl rounded-tl-xl"
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
      <div className="p-3">
        <h2 className="text-[10px] line-clamp-1 lg:text-lg text-black mb-4 font-semibold">
          {recipe?.title}
        </h2>
        <div className="flex justify-between">
          <div className="flex items-center">
            <div className="avatar">
              <div className="lg:w-8 w-3 rounded-full">
                <img
                  className="object-contain"
                  src={`data:image/jpeg;base64,${recipe?.chefImage}`}
                  alt="Chef Avatar"
                />
              </div>
            </div>
            <span className="lg:ml-2 ml-1 text-black text-[8px] lg:text-sm lg:text-md font-semibold line-clamp-1">
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

export default Card;
