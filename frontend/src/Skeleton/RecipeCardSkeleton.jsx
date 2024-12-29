import React from 'react'

const RecipeCardSkeleton = () => {
  return (
    <div>
         <div
              className="flex flex-col gap-4 w-[150px] lg:w-[320px] h-[200px] lg:h-[350px] bg-white shadow-xl p-3 rounded-xl"
            >
              <div className="skeleton h-[100px] lg:h-[200px] w-full bg-customGrayMedium animate-customPulse"></div>
              <div className="skeleton h-4 w-[50%] lg:w-28  mt-1 lg:mt-2 bg-customGrayMedium animate-customPulse"></div>
              <div className="skeleton h-4 w-full mt-1 lg:mt-2 bg-customGrayMedium animate-customPulse"></div>
              <div className="skeleton h-4 w-full  mt-1 lg:mt-2 bg-customGrayMedium animate-customPulse"></div>
            </div>
    </div>
  )
}

export default RecipeCardSkeleton