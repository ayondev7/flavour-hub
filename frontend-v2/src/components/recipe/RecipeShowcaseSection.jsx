import React from 'react';
import RecipeCard from './RecipeCard';
import {Link} from 'react-router-dom';

const RecipeShowcaseSection = ({ title, recipes }) => {
  return (
    <div className="recipe-showcase-section lg:mt-10 mb-16">
     <div className='flex justify-between'>
     <h2 className=" text-black text-lg lg:text-2xl font-semibold">{title}</h2>
     <div className='text-sm lg:text-base text-hotPink font-bold'><Link to={'/recipe-page'}>View More</Link></div>
     </div>
      <div className="grid grid-cols-2 mt-8 gap-x-6 lg:grid-cols-4 pt-4 lg:pt-0 gap-y-10 lg:gap-y-16">
        {recipes.map(recipe => (
          <RecipeCard key={recipe.id} recipe={recipe}/>
        ))}
      </div>
    </div>
  );
};

export default RecipeShowcaseSection;
