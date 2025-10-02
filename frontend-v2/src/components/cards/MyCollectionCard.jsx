import React from "react";
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";
import { BsFire } from "react-icons/bs";

const MyCollectionCard = ({ recipe, onEdit, onDelete }) => {
  return (
    <div
      className="card card-compact w-[150px] lg:w-[320px] h-[200px] lg:h-[320px] shadow-md rounded-lg overflow-hidden bg-white mb-10"
      key={recipe._id}
    >
      <figure className="h-[100px] lg:h-[200px]">
        {recipe.image && (
          <img
            src={recipe.image}
            alt={recipe.title}
            className="object-cover"
          />
        )}
      </figure>
      <div className="p-3">
        <h2 className="text-base text-black lg:mb-4 mb-3 font-semibold line-clamp-1">{recipe.title}</h2>
        <div className="flex flex-row-reverse justify-between">
          <div className="flex items-center">
            <button className="mx-3" onClick={() => onEdit(recipe._id)}>
              <HiOutlinePencilAlt className="lg:text-lg text-sm text-hotPink " />
            </button>
            <button onClick={() => onDelete(recipe)}>
              <HiOutlineTrash className="lg:text-lg text-sm text-hotPink" />
            </button>
          </div>
          <div className="flex items-center text-[8px] lg:text-xs font-bold border lg:p-2 p-1 rounded-lg">
            <BsFire className="text-red-500 text-[8px] lg:text-xs " />
            <span className="ml-1">
              {recipe.nutritionalValues
                ? recipe.nutritionalValues.calories
                : "N/A"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCollectionCard;
