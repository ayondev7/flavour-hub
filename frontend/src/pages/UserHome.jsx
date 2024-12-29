import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import images from "../assets/images";
import axios from "axios";
import RecipeCategoryCarousel from "../components/RecipeCategoryCarousel";
import RecipeCardSkeleton from "../Skeleton/RecipeCardSkeleton";
import ChefCard from "../components/ChefCard";
import { getUserIdFromToken } from "../assets/tokenUtils";
import ChefCardSkeleton from "../Skeleton/ChefCardSkeleton";
import Card from "../components/Card";
import BookmarkDialog from "../components/BookmarkDialogue";
import { ToastContainer } from "react-toastify";

const UserHome = () => {
  const userId = getUserIdFromToken();
  const [recipes, setRecipes] = useState([]);
  const [chefs, setChefs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isBookmarkDialogOpen, setIsBookmarkDialogOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [collections, setCollections] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/api/recipe/getAllRecipes", {
        headers: {
          userId: userId, // Include userId in the headers
        },
      })
      .then((response) => {
        setRecipes(response.data);
        setLoading(false); // Only stop loading once recipes are set
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
        setLoading(false); // Stop loading even if there's an error
      });
  }, []);

  const fetchCollections = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/collections/get-collections/${userId}`
      );
      setCollections(response.data);
    } catch (error) {
      console.error("Error fetching collections:", error);
    } finally {
    }
  };

  useEffect(() => {
    fetchCollections();
  }, [userId]);

  const handleBookmarkClick = (recipe) => {
    setSelectedRecipe(recipe);
    setIsBookmarkDialogOpen(true);
  };

  // Fetch chefs function
  const fetchChefs = () => {
    setLoading(true); // Ensure loading is displayed while fetching
    axios
      .get(`http://localhost:5000/api/user/get-all-users/${userId}`)
      .then((response) => {
        setChefs(response.data.slice(0, 8)); // Assuming you only want the first 8 users
        setLoading(false);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching chefs:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchChefs(); // Fetch chefs when the component mounts
  }, []);

  const onFollowChange = (chefId) => {
    setChefs((prevChefs) =>
      prevChefs.map((chef) =>
        chef._id === chefId ? { ...chef, following: !chef.following } : chef
      )
    );
  };

  const onBookmarkRemove = (recipeId) => {
    setRecipes((prevRecipes) =>
      prevRecipes.map((recipe) =>
        recipe._id === recipeId ? { ...recipe, bookmarked: !recipe.bookmarked } : recipe
      )
    );
  };

  return (
    <div className="relative overflow-hidden">
      <ToastContainer />
      <div className="bg-white overflow-hidden relative h-screen">
        <div className="hero-content lg:flex-row-reverse lg:justify-between flex-col relative z-10 lg:px-16 px-4">
          <div className="lg:w-[50%] lg:pl-[100px] w-full h-full">
            <img
              src={images.donut}
              className="lg:max-w-xl w-full h-[400px] lg:h-auto absolute top-[70%] left-0 lg:static"
            />
          </div>
          <div className="w-full lg:w-[50%]">
            <h1 className="text-2xl lg:text-5xl font-bold text-black">
              Welcome Back, Chef!
            </h1>
            <p className="lg:py-6 py-2 text-sm lg:text-base text-black font-semibold block">
              Dive into a world of mouth-watering recipes, each crafted with
              passion and creativity. Explore new flavors, refine your skills,
              and let your taste buds embark on an unforgettable journey.
            </p>
            <Link to={"/allRecipes/null"}>
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
        >
          <path
            fill="#bbf7d0"
            fillOpacity="1"
            d="M0,96L48,112C96,128,192,160,288,170.7C384,181,480,171,576,154.7C672,139,768,117,864,133.3C960,149,1056,203,1152,197.3C1248,192,1344,128,1392,96L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
        <div className="w-[100%] bg-green-200 h-16 hidden lg:block"></div>
      </div>

      {isBookmarkDialogOpen && (
        <BookmarkDialog
          isVisible={isBookmarkDialogOpen}
          recipe={selectedRecipe}
          userId={userId}
          onClose={() => setIsBookmarkDialogOpen(false)}
          collections={collections}
          onCollectionCreated={fetchCollections}
          onConfirm={(selectedCollection) => {
            setIsBookmarkDialogOpen(false); // Close the dialog
            setRecipes((prevRecipes) =>
              prevRecipes.map((r) =>
                r._id === selectedRecipe._id ? { ...r, bookmarked: true } : r
              )
            );
          }}
        />
      )}

      {loading || recipes.length <= 0 ? (
        // Render skeleton loader
        <div className="grid grid-cols-2 gap-x-4 lg:gap-x-0 lg:grid-cols-4 gap-y-16 px-4 lg:px-16 py-10">
          {Array.from({ length: 8 }).map((_, index) => (
            <RecipeCardSkeleton key={index} />
          ))}
        </div>
      ) : recipes.length > 0 ? (
        <>
          <div className="flex justify-between px-4 lg:px-16 py-4">
            <h2 className="text-black text-lg lg:text-2xl font-semibold">
              Trending Recipes
            </h2>
            <div className="text-sm lg:text-base text-hotPink font-bold">
              <Link to="/recipesPage">View More</Link>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:gap-x-10 lg:grid-cols-4 gap-x-4 gap-y-16 mx-4 lg:mx-16 pb-24">
            {recipes.map((recipe) => (
              <Card
                key={recipe.id}
                recipe={recipe}
                onBookmarkClick={handleBookmarkClick}
                userId={userId}
                onBookmarkRemove={onBookmarkRemove}
              />
            ))}
          </div>
        </>
      ) : null}

      <div className="relative px-4 lg:px-16 mb-20 hidden lg:block">
        <RecipeCategoryCarousel />
        <div className="lg:absolute lg:top-0 lg:right-0 w-full lg:w-1/2 lg:px-16 text-center pt-16">
          <p className="text-2xl text-left lg:text-center lg:text-4xl font-bold text-black mb-3 lg:mb-6">
            Discover Delicious Diversity : Recipes For Every{" "}
            <span className="text-hotPink">Lifestyle</span>
          </p>
          <p className="text-left lg:text-center text-sm lg:text-lg text-black">
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
      <h2 className="section-title mb-4 px-16 text-black text-lg lg:text-2xl font-semibold">
        Follow the best chefs around the globe
      </h2>
      <div className="px-4 lg:px-16 grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-4 lg:gap-x-8 mt-8 mb-36">
        {loading
          ? Array(8)
              .fill()
              .map((_, index) => <ChefCardSkeleton />)
          : chefs
              .filter((chef) => chef._id !== userId) // Exclude the chef matching the userId
              .map((chef) => (
                <ChefCard
                  key={chef._id}
                  chefData={chef}
                  userId={userId}
                  onFollowChange={onFollowChange}
                />
              ))}
      </div>
    </div>
  );
};

export default UserHome;
