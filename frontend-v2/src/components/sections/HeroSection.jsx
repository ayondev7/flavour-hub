import React, { useState } from "react";
import { Link } from "react-router-dom";
import images from "@assets/images";
import ReviewCard from "@components/cards/ReviewCard";
import Searchbar from "@components/ui/Searchbar";

const HeroSection = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
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
            <div className="relative mt-4">
              <Searchbar
                onSearchResults={setSearchResults}
                onSearchQueryChange={(query) => setSearchQuery(query)}
                showIcon={false}
              />
              {(searchResults.length > 0 || searchQuery.trim() !== "") && (
                <div className="absolute top-10 lg:top-12 left-0 lg:w-[400px] bg-white border border-gray-300 rounded-md shadow-md z-10">
                  {searchResults.length > 0 ? (
                    searchResults.map((result, index) => (
                      <Link to={`/recipe-page/${result._id}`} key={index}>
                        <div className="text-xs lg:text-base p-2 hover:bg-gray-100 cursor-pointer">
                          {result.title}
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="p-2 text-gray-500">No recipes found</div>
                  )}
                </div>
              )}
            </div>

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
