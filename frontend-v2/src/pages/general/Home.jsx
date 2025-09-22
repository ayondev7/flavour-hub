import React from "react";
import { Link } from "react-router-dom";
import images from "@assets/images.js";
import RecipeCard from "@components/cards/RecipeCard.jsx";
import RecipeCardSkeleton from "@skeleton/RecipeCardSkeleton.jsx";
import ReviewCard from "@components/cards/ReviewCard.jsx";
import { useGetAllRecipesQuery } from "../../redux/hooks/recipeHook";

const Home = () => {
  const { data: recipes, isLoading: loading, error } = useGetAllRecipesQuery();

  if (error) {
    console.error("Error fetching recipes:", error);
  }

  return (
    <div className="min-h-screen">
      <div className="flex h-screen">
        <div className="w-[50%] pt-[10%] pl-16 h-[90vh]">
          <p className="text-black font-semibold text-5xl">
            Eat Healthier With
          </p>
          <p className="mt-2 text-black font-semibold text-5xl">
            <span className="text-hotPink">Nutritious</span> Recipes
          </p>
          <div className="mt-6 text-lg text-gray-400 ">
            <p>
              Explore thousands of mouthwatering recipes handpicked by our team
              of food enthusiasts. From savory main courses to delectable
              desserts, We've got something for every taste bud and occasion.
            </p>
          </div>
          <Link to={'/signup'}>
            <div className="mt-6 mb-4">
              <button className="bg-hotPink rounded-lg px-3 text-white py-2 font-medium text-lg w-[200px]">
                Sign up
              </button>
            </div>
          </Link>
          <Link to={'/login'} className="hover:underline">
            Already have an account?{" "}
            <span className="text-hotPink font-semibold">Login</span>
          </Link>
        </div>

        <div className="relative w-[50%] flex justify-center items-center h-[90vh] overflow-hidden">
          <img
            className="h-[80%] relative z-10"
            src={images.homeImage1}
            alt="homeImage1"
          />
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="w-[900px] h-[900px] bg-fdbfb6 rounded-full bg-green-200 absolute left-[40%]"></div>
          </div>
         <ReviewCard/>
        </div>
      </div>

      <div className="flex h-screen">
        <div className="w-[50%] flex items-center pl-16">
          <img className="rounded-lg w-[90%]" src={images.homeImage2} alt="" />
        </div>

        <div className="w-[50%] my-auto text-black">
          <p className="text-4xl font-semibold mb-6 text-center">
            Share Your <span className="text-hotPink">Recipes</span>
          </p>
          <p className="text-center pl-8 pr-8 text-base font-semibold">
            <span className="text-hotPink text-2xl">"</span>Welcome to our
            culinary community, where every meal is a story waiting to be
            shared. Have a signature dish you're proud of? Or perhaps a creative
            twist on a classic recipe? Share your culinary adventures with our
            global community of food enthusiasts! Whether you're a seasoned chef
            or a kitchen novice, your recipes are valuable contributions that
            inspire and delight others.
            <span className="text-hotPink text-2xl">"</span>
          </p>

          <div className="flex justify-center mt-6">
            <Link to={'/create-new-recipe'}>
            <button className="px-3 py-3 font-medium text-base rounded-lg bg-hotPink text-white border-none">
              Create New Recipe
            </button></Link>
          </div>
        </div>
      </div>

      <div className="pl-16 flex-col pr-16 h-auto pb-16">
        <p className="text-4xl font-semibold text-black">Explore Recipes</p>
        <p className="flex w-[100%] justify-end mt-2 text-base mb-10 text-hotPink font-bold">
          <Link to={"/all-recipes"}>View more</Link>
        </p>
        <div className="grid grid-cols-2 lg:gap-x-10 lg:grid-cols-4 gap-x-4 gap-y-16 mx-4 lg:mx-0 pb-24">
          {loading
            ? 
              Array.from({ length: 6 }).map((_, index) => (
                <RecipeCardSkeleton key={index} />
              ))
            : 
              recipes.slice(0, 6).map((recipe) => {
                return <RecipeCard key={recipe._id} recipe={recipe} />;
              })}
        </div>
      </div>
    </div>
  );
};

export default Home;
