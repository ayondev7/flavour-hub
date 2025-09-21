import React from 'react';
import { useController } from 'react-hook-form';
import { MEAL_TYPES, CUISINE_TYPES } from '../../constants/recipeConstants';

const RecipeMetadata = ({ errors }) => {
  const { field: servingsField } = useController({
    name: 'servings',
  });

  const { field: mealTypeField } = useController({
    name: 'mealType',
  });

  const { field: cuisineTypeField } = useController({
    name: 'cuisineType',
  });

  const { field: dietaryInfoField } = useController({
    name: 'dietaryInformation',
  });

  return (
    <>
      <div className="flex flex-col items-start gap-y-2 w-full lg:w-[60%]">
        <label className="text-base text-black font-medium" htmlFor="servings">
          Servings :
        </label>
        <input
          {...servingsField}
          type="text"
          placeholder="Number of servings"
          className="input input-bordered text-sm text-black w-[90%] lg:w-[80%] border border-gray-400 focus:outline-none bg-white focus:border-hotPink"
        />
        {errors.servings && (
          <span className="text-red-500 text-sm">{errors.servings.message}</span>
        )}
      </div>

      <div className="flex flex-col items-start gap-y-2 w-full lg:w-[60%]">
        <label className="text-base text-black font-medium" htmlFor="mealType">
          Meal Type :
        </label>
        <select
          {...mealTypeField}
          className="select select-primary w-[90%] lg:w-[80%] border-gray-400 bg-white focus:outline-none focus:border-hotPink"
        >
          <option disabled value="">
            Select a meal type
          </option>
          {MEAL_TYPES.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
        {errors.mealType && (
          <span className="text-red-500 text-sm">{errors.mealType.message}</span>
        )}
      </div>

      <div className="flex flex-col items-start gap-y-2 w-full lg:w-[60%]">
        <label className="text-base text-black font-medium" htmlFor="cuisineType">
          Cuisine Type :
        </label>
        <select
          {...cuisineTypeField}
          className="select select-primary w-[90%] lg:w-[80%] border-gray-400 bg-white focus:outline-none focus:border-hotPink"
        >
          <option disabled value="">
            Select a cuisine type
          </option>
          {CUISINE_TYPES.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
        {errors.cuisineType && (
          <span className="text-red-500 text-sm">{errors.cuisineType.message}</span>
        )}
      </div>

      <div className="flex flex-col items-start gap-y-2 w-full lg:w-[60%]">
        <label className="text-base text-black font-medium" htmlFor="dietaryInformation">
          Dietary Information :
        </label>
        <input
          {...dietaryInfoField}
          type="text"
          placeholder="E.g - vegan-friendly, gluten-free"
          className="input input-bordered text-sm text-black w-[90%] lg:w-[80%] border border-gray-400 focus:outline-none bg-white focus:border-hotPink"
        />
      </div>
    </>
  );
};

export default RecipeMetadata;