import React from 'react';
import RecipeCategoryCarousel from '../RecipeCategoryCarousel';

const LifestyleSection = () => {
  return (
    <>
      <div className="relative px-4 lg:px-16 mb-20 hidden lg:block">
        <RecipeCategoryCarousel />
        <div className="lg:absolute lg:top-0 lg:right-0 w-full lg:w-1/2 lg:px-16 text-center pt-16">
          <p className="text-lg md:text-2xl text-left lg:text-center lg:text-4xl font-bold text-black mb-3 lg:mb-6">
            Discover Delicious Diversity: Recipes For Every <span className="text-hotPink">Lifestyle</span>
          </p>
          <p className="text-left lg:text-center text-sm lg:text-lg text-black">
            Explore our diverse collection of recipes designed to match your unique dietary needs. Whether you're vegan, gluten-free, vegetarian, or dairy-free, we have delicious options for everyone. Our recipes ensure you can enjoy mouth-watering, nutritious meals without compromise. Explore our selection and find the perfect dish to complement your lifestyle today!
          </p>
        </div>
      </div>
      <div className="relative px-4 lg:px-16 mb-20 lg:hidden">
        <div className="lg:absolute lg:top-0 lg:right-0 w-full lg:w-1/2 lg:px-16 text-center lg:pt-16 mb-14 lg:mb-0">
          <p className="text-2xl text-left lg:text-center lg:text-4xl font-bold text-black mb-3 lg:mb-6">
            Discover Delicious Diversity: Recipes For Every <span className="text-hotPink">Lifestyle</span>
          </p>
          <p className="text-left lg:text-center text-lg text-black">
            Explore our diverse collection of recipes designed to match your unique dietary needs. Whether you're vegan, gluten-free, vegetarian, or dairy-free, we have delicious options for everyone. Our recipes ensure you can enjoy mouth-watering, nutritious meals without compromise. Explore our selection and find the perfect dish to complement your lifestyle today!
          </p>
        </div>
        <RecipeCategoryCarousel />
      </div>
    </>
  );
};

export default LifestyleSection;