import React from "react";
import { Link } from "react-router-dom";
import images from "@assets/images";
import ReviewCard from "@components/cards/ReviewCard";

const HeroSection = () => {
  return (
    <section className="bg-white overflow-hidden relative h-screen flex justify-between pt-12 lg:pt-20">
      <div className="relative z-10 px-4 sm:px-6 lg:pl-24">
        <div className="flex lg:flex-row flex-col gap-x-12 justify-center items-center">
          {/* Left: Content */}
          <div className="space-y-6 lg:pr-8">
            <div className="inline-flex items-center py-3 space-x-3 bg-hotPink/10 text-hotPink rounded-full px-3 text-sm font-semibold w-max">
              <span className="px-2 py-1 bg-hotPink text-white rounded-full text-xs">
                New
              </span>
              <span>Weekly curated recipes</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
              Welcome Back, <span className="text-hotPink">Chef!</span>
            </h1>

            <p className="text-lg text-gray-700 max-w-2xl">
              Find recipes you'll love — personalized picks, trending dishes,
              and easy-to-follow guides to cook like a pro. Search by
              ingredient, diet, or difficulty and start cooking in minutes.
            </p>

            {/* Search bar */}
            <form className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mt-4">
              <div className="flex-1 relative">
                <input
                  aria-label="Search recipes"
                  placeholder="Search recipes, e.g. 'chicken biryani'"
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-hotPink"
                />
              </div>

              <div className="flex-shrink-0">
                <button className="bg-hotPink text-white px-5 py-3 rounded-lg font-medium shadow-md hover:opacity-95">
                  Search
                </button>
              </div>
            </form>

            {/* CTA row */}
            <div className="flex items-center space-x-4 mt-4">
              <Link to="/all-recipes/null" className="inline-block">
                <button className="bg-brightPink text-white px-6 py-3 rounded-lg font-semibold shadow">
                  Explore Recipes
                </button>
              </Link>
            </div>

            {/* Feature badges */}
            <div className="flex flex-wrap gap-3 mt-6">
              <div className="text-sm bg-gray-100 px-3 py-2 rounded-lg font-medium text-gray-700">
                5000+ Recipes
              </div>
              <div className="text-sm bg-gray-100 px-3 py-2 rounded-lg font-medium text-gray-700">
                Community Favorites
              </div>
              <div className="text-sm bg-gray-100 px-3 py-2 rounded-lg font-medium text-gray-700">
                Easy To Follow
              </div>
            </div>
          </div>

          <div className="relative flex justify-center items-center">
            <img
              className="absolute z-10 w-[400px] h-[400px] object-contain right-[-50%]"
              src={images.homeImage1}
              alt="homeImage1"
            />
            <div className="size-[400px]"></div>
            <div className="absolute inset-0 flex justify-center items-center">
              <div className="w-[500px] h-[500px] bg-fdbfb6 rounded-full bg-[#ff007e] absolute right-[-500px]"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
