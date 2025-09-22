import React from "react";

const RecipeInstructions = ({ instructions }) => {
  return (
    <>
      <p className="mt-6 mb-3 text-black lg:text-lg font-semibold">
        Instructions :{" "}
      </p>
      <div className="space-y-2">
        {instructions.map((instruction, index) => (
          <div key={index} className="flex items-start lg:items-center">
            <span className="mr-2 text-hotPink text-sm lg:text-base font-semibold">
              {index + 1}.
            </span>
            <span className="text-sm lg:text-base text-black font-medium">
              {instruction.value}
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

export default RecipeInstructions;