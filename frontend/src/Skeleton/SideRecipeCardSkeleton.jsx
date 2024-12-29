import React from "react";

const SideRecipeCardSkeleton = () => {
  return (
    <div>
      <div
        className="flex gap-4 w-[400px] h-[150px] bg-white shadow-xl p-3"
      >
        <div className="skeleton h-[100%] w-full bg-customGrayMedium animate-customPulse"></div>
        <div>
          <div className="skeleton h-4 w-28 mt-3 bg-customGrayMedium animate-customPulse"></div>
          <div className="skeleton h-4 w-full mt-3 bg-customGrayMedium animate-customPulse"></div>
          <div className="skeleton h-4 w-full mt-3 bg-customGrayMedium animate-customPulse"></div>
        </div>
      </div>
    </div>
  );
};

export default SideRecipeCardSkeleton;
