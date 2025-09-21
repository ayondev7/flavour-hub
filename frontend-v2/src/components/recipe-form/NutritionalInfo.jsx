import React from 'react';
import { useController } from 'react-hook-form';

const NutritionalInfo = ({ errors }) => {
  const fields = [
    { name: 'calories', placeholder: 'Enter Calories' },
    { name: 'protein', placeholder: 'Enter Protein' },
    { name: 'carbs', placeholder: 'Enter Carbs' },
    { name: 'fat', placeholder: 'Enter Fat' },
  ];

  return (
    <div className="flex flex-col items-start gap-y-2 w-full lg:w-[60%]">
      <label className="text-base text-black font-medium" htmlFor="nutritionalValues">
        Nutritional Values :
      </label>
      <div className="grid grid-rows-2 grid-cols-2 w-[90%] gap-x-2 gap-y-4">
        {fields.map((fieldConfig) => (
          <NutritionalField
            key={fieldConfig.name}
            name={`nutritionalValues.${fieldConfig.name}`}
            placeholder={fieldConfig.placeholder}
          />
        ))}
      </div>
    </div>
  );
};

const NutritionalField = ({ name, placeholder }) => {
  const { field } = useController({
    name,
  });

  return (
    <input
      {...field}
      type="text"
      placeholder={placeholder}
      className="input input-bordered text-sm text-black w-full lg:w-[78%] border border-gray-400 focus:outline-none bg-white focus:border-hotPink"
    />
  );
};

export default NutritionalInfo;