import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import images from "../assets/images";
import RecipeShowcaseSection from "../components/RecipeShowcaseSection";
import axios from "axios";
import RecipeCategoryCarousel from "../components/RecipeCategoryCarousel";

const UserHome = () => {
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();
  const [trendingRecipes, setTrendingRecipes] = useState([]);
  const [exploreRecipes, setExploreRecipes] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Retrieve token from session storage
    const token = sessionStorage.getItem("token");

    // Check if the token exists and is valid
    if (token) {
      try {
        const decodedToken = jwtDecode(token);

        // Check if the token is expired
        const currentTime = Date.now() / 1000; // convert to seconds
        if (decodedToken.exp < currentTime) {
          throw new Error("Token expired");
        }

        setUserId(decodedToken.id);
      } catch (error) {
        console.error("Invalid token:", error);
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    // Fetch recipes from the server
    axios
      .get("http://localhost:5000/api/recipe/getAllRecipes")
      .then((response) => {
        setRecipes(response.data);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
        setLoading(false); // Set loading to false in case of error
      });
  }, []);

  useEffect(() => {
    // Fetch users from the server
    axios
      .get("http://localhost:5000/api/user/getAllUsers")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  useEffect(() => {
    if (recipes.length > 0 && users.length > 0) {
      // Assuming each recipe has a chefId property to match with users
      const updatedRecipes = recipes.map((recipe) => ({
        ...recipe,
        chefUser: users.find((user) => user._id === recipe.chefId),
      }));

      // Select the first 6 recipes as trending
      const trendingRecipes = updatedRecipes.slice(0, 6);

      // Select the next 6 recipes as explore
      const exploreRecipes = updatedRecipes.slice(6, 12);

      setTrendingRecipes(trendingRecipes);
      setExploreRecipes(exploreRecipes);
    }
  }, [recipes, users]);

  return (
    <div className="relative overflow-hidden">
      <div className="bg-white overflow-hidden relative h-screen">
        <div className="hero-content flex-row-reverse justify-between relative z-10 lg:px-16 px-8">
          <div className="lg:w-[50%] lg:pl-[100px] w-full h-full">
            <img
              src={images.donut}
              className="lg:max-w-xl w-full h-full lg:h-auto absolute top-[70%] left-0 lg:static"
            />
          </div>
          <div className="w-full lg:w-[50%]">
            <h1 className="text-3xl lg:text-5xl font-bold text-black">
              Welcome Back, Chef!
            </h1>
            <p className="py-6 text-black font-semibold hidden lg:block">
              Dive into a world of mouth-watering recipes, each crafted with
              passion and creativity. Explore new flavors, refine your skills,
              and let your taste buds embark on an unforgettable journey.
            </p>
            <button className="border-none p-3 rounded-lg bg-brightPink text-white">
              Explore Recipes
            </button>
          </div>
        </div>
        <svg
          className="absolute bottom-10 z-1 h-[90%] wave-animation"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#bbf7d0"
            fillOpacity="1"
            d="M0,96L48,112C96,128,192,160,288,170.7C384,181,480,171,576,154.7C672,139,768,117,864,133.3C960,149,1056,203,1152,197.3C1248,192,1344,128,1392,96L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
        <div className="w-[100%] bg-green-200 h-16"></div>
      </div>
      {loading ? (
        // Render skeleton loader
        <div className="flex flex-wrap justify-between gap-y-16 px-16 py-10">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col gap-4 w-96 h-[350px] bg-white shadow-xl p-3 rounded-xl"
            >
              <div className="skeleton h-[60%] w-full bg-customGrayMedium animate-customPulse"></div>
              <div className="skeleton h-4 w-28 mt-3 bg-customGrayMedium animate-customPulse"></div>
              <div className="skeleton h-4 w-full mt-3 bg-customGrayMedium animate-customPulse"></div>
              <div className="skeleton h-4 w-full mt-3 bg-customGrayMedium animate-customPulse"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="px-4 lg:px-16">
          <RecipeShowcaseSection
            title="Trending Recipes"
            recipes={trendingRecipes}
          />
        </div>
      )}
      ;
      <div className="relative px-4 lg:px-16 mb-20 hidden lg:block">
        <RecipeCategoryCarousel />
        <div className="lg:absolute lg:top-0 lg:right-0 w-full lg:w-1/2 lg:px-16 text-center pt-16">
          <p className="text-2xl text-left lg:text-center lg:text-4xl font-bold text-black mb-3 lg:mb-6">
            Discover Delicious Diversity : Recipes For Every{" "}
            <span className="text-hotPink">Lifestyle</span>
          </p>
          <p className="text-left lg:text-center text-lg text-black">
            Explore our diverse collection of recipes designed to match your
            unique dietary needs. Whether you're vegan, gluten-free, vegetarian,
            or dairy-free, we have delicious options for everyone. Our recipes
            ensure you can enjoy mouth-watering, nutritious meals without
            compromise. Explore our selection and find the perfect dish to
            complement your lifestyle today!
          </p>
        </div>
      </div>
      <div className="relative px-4 lg:px-16 mb-20 lg:hidden">
        <div className="lg:absolute lg:top-0 lg:right-0 w-full lg:w-1/2 lg:px-16 text-center lg:pt-16 mb-14 lg:mb-0">
          <p className="text-2xl text-left lg:text-center lg:text-4xl font-bold text-black mb-3 lg:mb-6">
            Discover Delicious Diversity : Recipes For Every{" "}
            <span className="text-hotPink">Lifestyle</span>
          </p>
          <p className="text-left lg:text-center text-lg text-black">
            Explore our diverse collection of recipes designed to match your
            unique dietary needs. Whether you're vegan, gluten-free, vegetarian,
            or dairy-free, we have delicious options for everyone. Our recipes
            ensure you can enjoy mouth-watering, nutritious meals without
            compromise. Explore our selection and find the perfect dish to
            complement your lifestyle today!
          </p>
        </div>
        <RecipeCategoryCarousel />
      </div>
      {loading ? (
        // Render skeleton loader
        <div className="flex flex-wrap justify-between gap-y-16 px-16 py-10">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col gap-4 w-96 h-[350px] bg-white shadow-xl p-3 rounded-xl"
            >
              <div className="skeleton h-[60%] w-full bg-customGrayMedium animate-customPulse"></div>
              <div className="skeleton h-4 w-28 mt-3 bg-customGrayMedium animate-customPulse"></div>
              <div className="skeleton h-4 w-full mt-3 bg-customGrayMedium animate-customPulse"></div>
              <div className="skeleton h-4 w-full mt-3 bg-customGrayMedium animate-customPulse"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="px-4 lg:px-16">
          <RecipeShowcaseSection
            title="Explore More Recipes"
            recipes={exploreRecipes}
          />
        </div>
      )}
      ;
    </div>
  );
};

export default UserHome;
