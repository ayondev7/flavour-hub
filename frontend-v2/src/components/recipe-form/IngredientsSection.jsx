import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { BsPlusLg } from 'react-icons/bs';
import { useController } from 'react-hook-form';

const IngredientsSection = ({ ingredients, errors }) => {
  return (
    <div className="flex flex-col items-start gap-y-2 w-full lg:w-[60%]">
      <label className="text-base text-black font-medium" htmlFor="ingredients">
        Ingredients :
      </label>
      {ingredients.fields.map((field, index) => (
        <IngredientField
          key={field.id}
          index={index}
          canRemove={ingredients.canRemove}
          onRemove={() => ingredients.removeField(index)}
          error={errors.ingredients?.[index]?.value?.message}
        />
      ))}
      <button
        className="btn btn-outline border-hotPink text-hotPink hover:text-hotPink my-2"
        onClick={ingredients.addField}
        type="button"
      >
        <BsPlusLg /> Add new ingredient
      </button>
      {errors.ingredients && (
        <span className="text-red-500 text-sm">{errors.ingredients.message}</span>
      )}
    </div>
  );
};

const IngredientField = ({ index, canRemove, onRemove, error }) => {
  const { field } = useController({
    name: `ingredients.${index}.value`,
  });

  return (
    <div className="flex items-start gap-y-4 w-[90%] lg:w-full">
      <input
        {...field}
        type="text"
        placeholder="Enter your ingredient with their respective quantity"
        className="input input-bordered text-sm text-black w-[90%] lg:w-[80%] border border-gray-400 focus:outline-none bg-white focus:border-hotPink"
      />
      <button
        className="p-2 ml-2 mt-2"
        onClick={onRemove}
        disabled={!canRemove}
        type="button"
      >
        <FaTrashAlt className="text-sm text-hotPink hover:cursor-pointer" />
      </button>
      {error && <span className="text-red-500 text-sm ml-2">{error}</span>}
    </div>
  );
};

export default IngredientsSection;