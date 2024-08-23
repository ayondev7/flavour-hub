import React, { useState, useEffect } from "react";
import { BsCalendar2Date } from "react-icons/bs";
import { FaRegCommentDots } from "react-icons/fa";
import images from "../assets/images";
import { FaHashtag } from "react-icons/fa";
import { BsFire } from "react-icons/bs";
import { useParams } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Rating from "../components/Rating";
import CommentSection from "../components/CommentSection";

const RecipesPage = () => {
  const { recipeId } = useParams();
  const [recipeDetails, setRecipeDetails] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingTrendingRecipes, setLoadingTrendingRecipes] = useState(false);
  const [loadingRelatedRecipes, setLoadingRelatedRecipes] = useState(false);
  const [recipe, setRecipe] = useState(null);
  const [relatedRecipes, setRelatedRecipes] = useState();
  const [trendingRecipes, setTrendingRecipes] = useState();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        sessionStorage.removeItem("token");
        window.location.href = "/login";
      } else {
        setIsAuthenticated(true);
      }
    } else {
      window.location.href = "/login";
    }
  }, []);

  useEffect(() => {
    const fetchRecipe = async () => {
      setIsLoading(true);
      setLoadingRelatedRecipes(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/recipe/getRecipe/${recipeId}`
        );
        const recipe = response.data;
        setRecipe(recipe);
        setIsLoading(false);
        try {
          const cuisineType = recipe.cuisineType;
          const response = await axios.get(
            `http://localhost:5000/api/recipe/getRelatedRecipes/${cuisineType}`
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
      .get("http://localhost:5000/api/recipe/getAllRecipes")
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
      .get(`http://localhost:5000/api/recipe/getRecipeDetails/${recipeId}`)
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
    <div className="lg:px-16 lg:py-6 px-2 py-2">
      <p className="lg:w-1/2 lg:text-3xl text-black font-semibold text-lg">{recipe.title}</p>
      {recipeDetails && (
        <div className="lg:w-1/2 flex justify-between my-4 items-center">
          <div className="flex ">
            <div className="avatar">
              <div className="lg:size-8 rounded-full size-6">
                <img
                  src={`data:image/jpeg;base64,${recipeDetails.chef.image}`}
                  alt={recipe.title}
                />
              </div>
            </div>
            <span className="lg:text-lg ml-2 text-black font-semibold text-sm">
              {recipeDetails.chef.name}
            </span>
          </div>
          <div className="flex">
            <BsCalendar2Date className="text-xl text-hotPink" />
            <span className="lg:text-lg ml-2 text-black font-semibold text-sm">
              {recipeDetails.createdAt}
            </span>
          </div>
          <div className="flex">
            <FaRegCommentDots className="text-xl text-hotPink" />
            <span className="lg:text-lg ml-2 text-black font-semibold text-sm">
              {recipeDetails.totalComments} comments
            </span>
          </div>
          <div>
            <div className="rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <input
                  key={star}
                  type="radio"
                  name={`rating-${recipe._id}`}
                  className="mask mask-star-2 bg-hotPink w-4 h-4"
                  checked={star === Number(recipeDetails.avgRating)}
                  readOnly
                />
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="w-[100%] h-[2px] bg-hotPink mt-2"></div>

      <div className="w-[100%] flex lg:flex-row flex-col space-x-[5%]">
        <section className="lg:w-[60%] w-full">
          {recipe.image && (
            <img
              className="h-[400px] mt-6 rounded-lg"
              src={`data:image/jpeg;base64,${recipe.image}`}
              alt=""
            />
          )}
          <div className="flex justify-start space-x-6 items-center lg:w-[80%] my-6 w-full">
            <div className="flex flex-col font-semibold text-sm">
              <span>Prep Time : </span>{" "}
              <span className="text-black">
                {recipe.prepTime.hours} hours {recipe.prepTime.minutes} minutes
              </span>
            </div>
            <div className="bg-hotPink h-20 w-[2px]"></div>
            <div className="flex flex-col font-semibold text-sm">
              <span>Cooking Time : </span>{" "}
              <span className="text-black">
                {recipe.cookTime.hours} hours {recipe.cookTime.minutes} minutes
              </span>
            </div>
            <div className="bg-hotPink h-20 w-[2px]"></div>
            <div className="flex flex-col font-semibold text-sm">
              <span>Servings : </span>{" "}
              <span className="text-black">{recipe.servings}</span>
            </div>
            <div className="bg-hotPink h-20 w-[2px]"></div>
            <div className="flex flex-col font-semibold text-sm">
              <span>Cusine Type : </span>{" "}
              <span className="text-black">{recipe.cuisineType}</span>
            </div>
          </div>
          <p className="text-black lg:text-2xl font-semibold mt-6 mb-3">
            Description :{" "}
          </p>
          <p className="w-[90%] text-black font-semibold lg:text-lg">
            {recipe.description}
          </p>
          <div className="my-6">
            <p className="text-black lg:text-2xl font-semibold mb-3">
              Dietary Information :{" "}
            </p>
            <p className="text-black font-semibold lg:text-lg">
              {recipe.dietaryInformation}
            </p>
          </div>
          <p className="mt-6 mb-3 text-black lg:text-2xl font-semibold">
            Ingredients :{" "}
          </p>
          <div className="space-y-2">
            {recipe.ingredients.map((ingredient, index) => (
              <div key={index} className="flex items-center">
                <span className="mr-2 text-hotPink">
                  <FaHashtag />
                </span>
                <span className="lg:text-lg text-black font-semibold">
                  {ingredient.value}
                </span>
              </div>
            ))}
          </div>

          <p className="mt-6 mb-3 text-black lg:text-2xl font-semibold">
            Instructions :{" "}
          </p>
          <div className="space-y-2">
            {recipe.instructions.map((instruction, index) => (
              <div key={index} className="flex items-center">
                <span className="mr-2 text-hotPink lg:text-xl font-semibold">
                  {index + 1}.
                </span>
                <span className="lg:text-lg text-black font-semibold">
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
        <section className="w-[35%] border-l-2 border-slate-200 pl-10">
          <div className="flex flex-col mt-6 text-black font-semibold lg:text-lg bg-slate-300 px-6 rounded-lg py-6 space-y-3 w-[400px]">
            <p className="text-2xl text-black font-semibold">
              Nutritional Values
            </p>
            <div className="flex justify-between">
              <span>Calories : </span>{" "}
              <span className="">{recipe.nutritionalValues.calories} Kcal</span>
            </div>
            <div className="flex justify-between">
              <span>Protein : </span>{" "}
              <span>{recipe.nutritionalValues.protein}</span>
            </div>
            <div className="flex justify-between">
              <span>Carbs : </span>{" "}
              <span>{recipe.nutritionalValues.carbs}</span>
            </div>
            <div className="flex justify-between">
              <span>Fat : </span> <span>{recipe.nutritionalValues.fat}</span>
            </div>
          </div>
          <div className="flex flex-col items-start my-12">
            <p className="text-black text-2xl font-semibold">Related Recipes</p>
            {loadingRelatedRecipes ? (
              // Render skeleton loader
              <div className="flex flex-col gap-y-8 my-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex gap-4 w-[400px] h-[150px] bg-white shadow-xl p-3"
                  >
                    <div className="skeleton h-[100%] w-full bg-customGrayMedium animate-customPulse"></div>
                    <div>
                      <div className="skeleton h-4 w-28 mt-3 bg-customGrayMedium animate-customPulse"></div>
                      <div className="skeleton h-4 w-full mt-3 bg-customGrayMedium animate-customPulse"></div>
                      <div className="skeleton h-4 w-full mt-3 bg-customGrayMedium animate-customPulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              relatedRecipes &&
              relatedRecipes.length > 0 &&
              relatedRecipes
                .filter((relatedRecipe) => relatedRecipe._id !== recipe._id)
                .slice(0, 3)
                .map((relatedRecipe) => (
                  <div
                    key={relatedRecipe._id}
                    className="w-[400px] h-[150px] bg-white my-4 shadow-xl flex"
                  >
                    <figure className="w-[60%] h-[100%] overflow-hidden">
                      <img
                        className="w-[100%]"
                        src={`data:image/jpeg;base64,${relatedRecipe.image}`}
                        alt=""
                      />
                    </figure>
                    <div className="w-[50%] px-4 py-6">
                      <p className="text-black font-bold">
                        {relatedRecipe.title}
                      </p>
                      <div className="rating my-2">
                        <input
                          type="radio"
                          name="rating-4"
                          className="mask mask-star-2 bg-brightPink w-4 h-4"
                        />
                        <input
                          type="radio"
                          name="rating-4"
                          className="mask mask-star-2 bg-brightPink w-4 h-4"
                          checked
                        />
                        <input
                          type="radio"
                          name="rating-4"
                          className="mask mask-star-2 bg-brightPink w-4 h-4"
                        />
                        <input
                          type="radio"
                          name="rating-4"
                          className="mask mask-star-2 bg-brightPink w-4 h-4"
                        />
                        <input
                          type="radio"
                          name="rating-4"
                          className="mask mask-star-2 bg-brightPink w-4 h-4"
                        />
                      </div>
                      <div className="flex items-center">
                        <BsFire className="text-red-500" />
                        <span className="ml-1 font-bold">
                          {relatedRecipe.nutritionalValues.calories}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
            )}
          </div>{" "}
          {/* related recipes section ends here */}
          <div>
            <Rating recipeId={recipe._id} />
          </div>
          <div className="w-[400px] px-6 py-4 bg-lightPink rounded-lg">
            <p className="text-black text-2xl font-semibold text-center my-2">
              Stay connected with our recipe updates
            </p>
            <p className="text-black text-center text-lg mb-4">
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
            <button className="rounded-lg w-[100%] h-[50px] p-2 my-6 text-xl text-white font-bold bg-brightPink">
              Sign Up
            </button>
          </div>
          <div className="flex flex-col items-start my-12">
            <p className="text-black text-2xl font-semibold">
              Trending Recipes
            </p>
            {loadingTrendingRecipes ? (
              // Render skeleton loader
              <div className="flex flex-col gap-y-8 my-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex gap-4 w-[400px] h-[150px] bg-white shadow-xl p-3"
                  >
                    <div className="skeleton h-[100%] w-full bg-customGrayMedium animate-customPulse"></div>
                    <div>
                      <div className="skeleton h-4 w-28 mt-3 bg-customGrayMedium animate-customPulse"></div>
                      <div className="skeleton h-4 w-full mt-3 bg-customGrayMedium animate-customPulse"></div>
                      <div className="skeleton h-4 w-full mt-3 bg-customGrayMedium animate-customPulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              trendingRecipes &&
              trendingRecipes.length > 0 &&
              trendingRecipes
                .filter((trendingRecipe) => trendingRecipe._id !== recipe._id)
                .slice(0, 3)
                .map((trendingRecipe) => (
                  <div className="w-[400px] h-[150px] bg-white my-4 shadow-xl flex">
                    <figure className="w-[60%] h-[100%] overflow-hidden">
                      <img
                        className="w-[100%]"
                        src={`data:image/jpeg;base64,${trendingRecipe.image}`}
                        alt=""
                      />
                    </figure>
                    <div className="w-[50%] px-4 py-6">
                      <p className="text-black font-bold">
                        {trendingRecipe.title}
                      </p>
                      <div className="rating my-2">
                        <input
                          type="radio"
                          name="rating-4"
                          className="mask mask-star-2 bg-brightPink w-4 h-4"
                        />
                        <input
                          type="radio"
                          name="rating-4"
                          className="mask mask-star-2 bg-brightPink w-4 h-4"
                          checked
                        />
                        <input
                          type="radio"
                          name="rating-4"
                          className="mask mask-star-2 bg-brightPink w-4 h-4"
                        />
                        <input
                          type="radio"
                          name="rating-4"
                          className="mask mask-star-2 bg-brightPink w-4 h-4"
                        />
                        <input
                          type="radio"
                          name="rating-4"
                          className="mask mask-star-2 bg-brightPink w-4 h-4"
                        />
                      </div>
                      <div className="flex items-center">
                        <BsFire className="text-red-500" />
                        <span className="ml-1 font-bold">
                          {trendingRecipe.nutritionalValues.calories}
                        </span>
                      </div>
                    </div>
                  </div>
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
