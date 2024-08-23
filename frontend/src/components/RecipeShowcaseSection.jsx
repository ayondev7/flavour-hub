import React from 'react';
import RecipeCard from './RecipeCard';
import {Link} from 'react-router-dom';

const RecipeShowcaseSection = ({ title, recipes }) => {
  return (
    <div className="recipe-showcase-section lg:mt-10 mb-16">
      <h2 className="section-title mb-4 text-black text-2xl lg:text-4xl font-semibold">{title}</h2>
      <div className='flex w-[100%] justify-end mt-2 lg:text-xl lg:mb-10 text-hotPink font-bold'><Link to={'/recipesPage'}>View More</Link></div>
      <div className="flex flex-wrap justify-between pt-4 lg:pt-0 gap-y-10 lg:gap-y-16">
        {recipes.map(recipe => (
          <RecipeCard key={recipe.id} recipe={recipe} chefUser={recipe.chefUser} />
        ))}
      </div>
    </div>
  );
};

export default RecipeShowcaseSection;
