import React from 'react';

const NutritionalValuesCard = ({ nutritionalValues }) => {
  return (
    <div className="flex flex-col mt-6 text-black bg-slate-100 px-6 rounded-lg py-6 space-y-3 w-[400px]">
      <p className="text-2xl text-black font-semibold">Nutritional Values</p>
      <div className="flex justify-between">
        <span className='text-lg font-semibold'>Calories:</span>
        <span className='text-base font-medium'>{nutritionalValues.calories} Kcal</span>
      </div>
      <div className="flex justify-between">
        <span className='text-lg font-semibold'>Protein:</span>
        <span className='text-base font-medium'>{nutritionalValues.protein}</span>
      </div>
      <div className="flex justify-between">
        <span className='text-lg font-semibold'>Carbs:</span>
        <span className='text-base font-medium'>{nutritionalValues.carbs}</span>
      </div>
      <div className="flex justify-between">
        <span className='text-lg font-semibold'>Fat:</span>
        <span className='text-base font-medium'>{nutritionalValues.fat}</span>
      </div>
    </div>
  );
};

export default NutritionalValuesCard;
