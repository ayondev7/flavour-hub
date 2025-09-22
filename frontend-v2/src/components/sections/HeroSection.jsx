import React from 'react';
import { Link } from 'react-router-dom';
import images from '@assets/images';

const HeroSection = () => {
  return (
    <div className="bg-white overflow-hidden relative h-screen">
      <div className="hero-content lg:flex-row-reverse lg:justify-between flex-col relative z-10 lg:px-16 px-4">
        <div className="lg:w-[50%] lg:pl-[100px] w-full h-full">
          <img
            src={images.donut}
            className="lg:max-w-xl w-full h-[400px] lg:h-auto absolute top-[70%] left-0 lg:static"
            alt="Delicious donut"
          />
        </div>
        <div className="w-full lg:w-[50%]">
          <h1 className="text-2xl lg:text-5xl font-bold text-black">Welcome Back, Chef!</h1>
          <p className="lg:py-6 py-2 text-sm lg:text-base text-black font-semibold block">
            Dive into a world of mouth-watering recipes, each crafted with passion and creativity. Explore new flavors, refine your skills, and let your taste buds embark on an unforgettable journey.
          </p>
          <Link to="/all-recipes/null">
            <button className="border-none lg:px-3 lg:py-3 px-3 py-2 mt-3 lg:mt-0 rounded-lg text-sm lg:text-base font-medium lg:w-[200px] bg-brightPink text-white">
              Explore Recipes
            </button>
          </Link>
        </div>
      </div>
      <svg
        className="absolute bottom-10 z-1 h-[90%] wave-animation"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        aria-hidden="true"
      >
        <path
          fill="#bbf7d0"
          fillOpacity="1"
          d="M0,96L48,112C96,128,192,160,288,170.7C384,181,480,171,576,154.7C672,139,768,117,864,133.3C960,149,1056,203,1152,197.3C1248,192,1344,128,1392,96L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
      </svg>
      <div className="w-[100%] bg-green-200 h-16 hidden lg:block" />
    </div>
  );
};

export default HeroSection;