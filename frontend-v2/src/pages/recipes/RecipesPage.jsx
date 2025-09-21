import React, { useState, useEffect } from "react";
import { BsCalendar2Date } from "react-icons/bs";
import { FaRegCommentDots } from "react-icons/fa";
import images from "@assets/images";
import { FaHashtag } from "react-icons/fa";
import { BsFire } from "react-icons/bs";
import { useParams } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Rating from "@components/user/Rating";
import CommentSection from "@components/recipe/CommentSection";
import NutritionalValuesCard from "@components/recipe/NutritionalValuesCard";
import SideRecipeCard from "@components/cards/SideRecipeCard";
import SideRecipeCardSkeleton from "@skeleton/SideRecipeCardSkeleton";

const RecipesPage = () => {
  const { recipeId } = useParams();
  const [recipeDetails, setRecipeDetails] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingTrendingRecipes, setLoadingTrendingRecipes] = useState(false);
  const [loadingRelatedRecipes, setLoadingRelatedRecipes] = useState(false);
  const [recipe, setRecipe] = useState(null);
  const [relatedRecipes, setRelatedRecipes] = useState();
  const [trendingRecipes, setTrendingRecipes] = useState();

  useEffect(() => {
    const fetchRecipe = async () => {
      setIsLoading(true);
      setLoadingRelatedRecipes(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/recipe/getRecipe/${recipeId}`
        );
        const recipe = response.data;
        setRecipe(recipe);
        setIsLoading(false);
        try {
          const cuisineType = recipe.cuisineType;
          const response = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/api/recipe/getRelatedRecipes/${cuisineType}`
          );
          const relatedRecipe = response.data;
          setRelatedRecipes(relatedRecipe);
          setLoadingRelatedRecipes(false);
        } catch (error) {
          console.error("Error fetching related recipe:", error);
          setLoadingRelatedRecipes(false);
        }

        // Do something with the recipe data
      } catch (error) {
        console.error("Error fetching recipe:", error);
        setIsLoading(false);
      }
    };

    fetchRecipe();
  }, [recipeId]); // Add recipeId as a dependency

  useEffect(() => {
    setLoadingTrendingRecipes(true);
    // Fetch recipes from the server
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/recipe/getAllRecipes`)
      .then((response) => {
        setTrendingRecipes(response.data);
        setLoadingTrendingRecipes(false);
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
        setLoadingTrendingRecipes(false);
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/recipe/getRecipeDetails/${recipeId}`)
      .then((response) => {
        setRecipeDetails(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching Recipe Details:", error);
        setLoadingTrendingRecipes(false);
      });
  }, [recipeId]);

  // Render loading indicator while data is being fetched
  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <span className="loading loading-spinner text-hotPink w-32 h-32"></span>
      </div>
    );
  }

  // Render nothing if recipe data is not available
  if (!recipe) {
    return null;
  }

  return (
    <div className="lg:px-12 lg:py-6 px-2 py-2 min-h-screen">
      <p className="lg:w-1/2 lg:text-xl text-black font-semibold text-lg">{recipe.title}</p>
      {recipeDetails && (
        <div className="lg:w-1/2 w-full flex flex-wrap gap-x-4 gap-y-2 lg:gap-x-6 my-4 lg:items-center">
          <div className="flex items-center">
            <div className="avatar">
              <div className="lg:size-8 rounded-full size-6">
                <img
                  src={`data:image/jpeg;base64,${recipeDetails?.chef.image}`}
                  alt={recipe.title}
                />
              </div>
            </div>
            <span className="lg:text-md ml-2 text-black font-semibold text-sm">
              {recipeDetails?.chef.name}
            </span>
          </div>
          <div className="flex items-center">
            <BsCalendar2Date className="text-md text-hotPink" />
            <span className="lg:text-md ml-2 text-black font-semibold text-sm">
              {recipeDetails?.createdAt}
            </span>
          </div>
          <div className="flex items-center">
            <FaRegCommentDots className="text-md text-hotPink" />
            <span className="lg:text-md ml-2 text-black font-semibold text-sm">
              {recipeDetails?.totalComments} comments
            </span>
          </div>
          <div>
            <div className="rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <input
                  key={star}
                  type="radio"
                  name={`rating-${recipe._id}`}
                  className="mask mask-star-2 bg-hotPink w-3 h-3"
                  checked={star === Number(recipeDetails.avgRating)}
                  readOnly
                />
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="w-[100%] h-[2px] bg-hotPink mt-1"></div>

      <div className="w-[100%] grid grid-cols-12">
        <section className="col-span-12 lg:col-span-7">
          {recipe?.image && (
            <img
              className="h-[300px] w-[500px] object-cover mt-6 rounded-lg"
              src={`data:image/jpeg;base64,${recipe?.image}`}
              alt=""
            />
          )}
          <div className="flex justify-start space-x-6 items-center lg:w-[80%] my-6 w-full">
            <div className="flex flex-col font-semibold text-xs lg:text-sm">
              <span>Prep Time : </span>{" "}
              <span className="text-black">
                {recipe.prepTime.hours} hours {recipe.prepTime.minutes} minutes
              </span>
            </div>
            <div className="bg-hotPink h-20 w-[2px]"></div>
            <div className="flex flex-col font-semibold text-xs lg:text-sm">
              <span>Cooking Time : </span>{" "}
              <span className="text-black">
                {recipe.cookTime.hours} hours {recipe.cookTime.minutes} minutes
              </span>
            </div>
            <div className="bg-hotPink h-20 w-[2px]"></div>
            <div className="flex flex-col font-semibold text-xs lg:text-sm">
              <span>Servings : </span>{" "}
              <span className="text-black">{recipe.servings}</span>
            </div>
            <div className="bg-hotPink h-20 w-[2px]"></div>
            <div className="flex flex-col font-semibold text-xs lg:text-sm">
              <span>Cusine Type : </span>{" "}
              <span className="text-black">{recipe.cuisineType}</span>
            </div>
          </div>
          <p className="text-black text-base lg:text-lg font-semibold mt-6 mb-3">
            Description :{" "}
          </p>
          <p className="w-[90%] text-black font-medium text-sm lg:text-base">
            {recipe.description}
          </p>
          <div className="my-6">
            <p className="text-black text-base lg:text-lg font-semibold mb-3">
              Dietary Information :{" "}
            </p>
            <p className="text-black font-medium text-sm lg:text-base">
              {recipe.dietaryInformation}
            </p>
          </div>
          <p className="mt-6 mb-3 text-black text-base lg:text-lg font-semibold">
            Ingredients :{" "}
          </p>
          <div className="space-y-2">
            {recipe.ingredients.map((ingredient, index) => (
              <div key={index} className="flex items-start lg:items-center">
                <span className="mr-2 text-hotPink">
                  <FaHashtag className="text-sm lg:text-base" />
                </span>
                <span className="text-sm lg:text-base text-black font-medium">
                  {ingredient.value}
                </span>
              </div>
            ))}
          </div>

          <p className="mt-6 mb-3 text-black lg:text-lg font-semibold">
            Instructions :{" "}
          </p>
          <div className="space-y-2">
            {recipe.instructions.map((instruction, index) => (
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

          <div className="w-[100%] h-[2px] bg-hotPink my-10"></div>

          <div>
            <CommentSection recipeId={recipeId} />
          </div>
        </section>{" "}
        {/*left section end shere */}
        <section className="hidden lg:flex flex-col items-end border-slate-200 col-span-5">
          <NutritionalValuesCard nutritionalValues={recipe?.nutritionalValues}/>
          <div className="flex flex-col items-start my-12">
            <p className="text-black text-2xl font-semibold">Related Recipes</p>
            {loadingRelatedRecipes ? (
              // Render skeleton loader
              <div className="flex flex-col gap-y-8 my-4">
                {Array.from({ length: 3 }).map((_, index) => (
                 <SideRecipeCardSkeleton/>
                ))}
              </div>
            ) : (
              relatedRecipes &&
              relatedRecipes.length > 0 &&
              relatedRecipes
                .filter((relatedRecipe) => relatedRecipe._id !== recipe._id)
                .slice(0, 3)
                .map((relatedRecipe) => (
                 <SideRecipeCard recipe={relatedRecipe}/>
                ))
            )}
          </div>{" "}
          {/* related recipes section ends here */}
          <div>
            <Rating recipeId={recipe._id} />
          </div>
          <div className="w-[400px] px-6 py-4 bg-lightPink rounded-lg hidden lg:block">
            <p className="text-black text-xl font-semibold text-center my-2">
              Stay connected with our recipe updates
            </p>
            <p className="text-gray-600 text-center text-base mb-4">
              Subscribe for the latest recipes and health tips
            </p>
            <label className="input input-bordered bg-white flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="email"
                className="grow text-black"
                placeholder="Enter Your Email"
              />
            </label>
            <button className="rounded-lg w-[100%] p-3 my-6 text-base text-white font-bold bg-hotPink">
              Sign Up
            </button>
          </div>
          <div className="lg:flex flex-col items-start my-12 hidden">
            <p className="text-black text-2xl font-semibold">
              Trending Recipes
            </p>
            {loadingTrendingRecipes ? (
              // Render skeleton loader
              <div className="flex flex-col gap-y-8 my-4">
                {Array.from({ length: 3 }).map((_, index) => (
                 <SideRecipeCardSkeleton/>
                ))}
              </div>
            ) : (
              trendingRecipes &&
              trendingRecipes.length > 0 &&
              trendingRecipes
                .filter((trendingRecipe) => trendingRecipe._id !== recipe._id)
                .slice(0, 3)
                .map((trendingRecipe) => (
                  <SideRecipeCard recipe={trendingRecipe}/>
                ))
            )}
          </div>{" "}
          {/* trending recipes section ends here */}
        </section>{" "}
        {/*right section end shere */}
      </div>
    </div>
  );
};

export default RecipesPage;
