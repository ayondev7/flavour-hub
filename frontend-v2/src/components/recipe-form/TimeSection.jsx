import React from 'react';
import { useController } from 'react-hook-form';
import { TIME_VALIDATION } from '../../constants/recipeConstants';

const TimeSection = ({ title, name, errors }) => {
  const hoursField = useController({
    name: `${name}.hours`,
    rules: {
      min: { value: TIME_VALIDATION.HOURS.min, message: `Hours must be at least ${TIME_VALIDATION.HOURS.min}` },
      max: { value: TIME_VALIDATION.HOURS.max, message: `Hours cannot exceed ${TIME_VALIDATION.HOURS.max}` },
    },
  });

  const minutesField = useController({
    name: `${name}.minutes`,
    rules: {
      min: { value: TIME_VALIDATION.MINUTES.min, message: `Minutes must be at least ${TIME_VALIDATION.MINUTES.min}` },
      max: { value: TIME_VALIDATION.MINUTES.max, message: `Minutes cannot exceed ${TIME_VALIDATION.MINUTES.max}` },
    },
  });

  const validateNumber = (value, field) => {
    const num = parseInt(value);
    if (isNaN(num)) return false;
    const limits = field === 'hours' ? TIME_VALIDATION.HOURS : TIME_VALIDATION.MINUTES;
    return num >= limits.min && num <= limits.max;
  };

  return (
    <div className="flex flex-col items-start gap-y-2 w-full lg:w-[60%]">
      <label className="text-base text-black font-medium" htmlFor={name}>
        {title} :
      </label>
      <div className="flex justify-between w-[90%] lg:w-[80%]">
        <div className="flex flex-col">
          <input
            {...hoursField.field}
            type="number"
            placeholder="Hours"
            className="input input-bordered text-sm text-black w-[48%] border border-gray-400 focus:outline-none bg-white focus:border-hotPink"
            onKeyDown={(e) => {
              const value = parseInt(e.target.value + e.key);
              if (isNaN(value) || !validateNumber(value, 'hours')) {
                e.preventDefault();
              }
            }}
          />
          {errors?.[name]?.hours && (
            <span className="text-red-500 text-sm mt-1">{errors[name].hours.message}</span>
          )}
        </div>
        <div className="flex flex-col">
          <input
            {...minutesField.field}
            type="number"
            placeholder="Minutes"
            className="input input-bordered text-sm text-black w-[48%] border border-gray-400 focus:outline-none bg-white focus:border-hotPink"
            onKeyDown={(e) => {
              const value = parseInt(e.target.value + e.key);
              if (isNaN(value) || !validateNumber(value, 'minutes')) {
                e.preventDefault();
              }
            }}
          />
          {errors?.[name]?.minutes && (
            <span className="text-red-500 text-sm mt-1">{errors[name].minutes.message}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimeSection;