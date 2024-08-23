import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import images from "../assets/images.js";
import { BsFire } from "react-icons/bs";
import Pagination from "../components/Pagination";
import { getUserIdFromToken, isTokenValid } from "../assets/tokenUtils";

const AllRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 6;
  const navigate = useNavigate();
  const { cuisineType } = useParams();
  const [cuisineTypeState, setCuisineTypeState] = useState(cuisineType);

  const fetchRecipes = async () => {
    setLoading(true); // Set loading to true when starting the fetch
    try {
      let response;
      if (!cuisineTypeState) {
        // Fetch all recipes from the server
        response = await axios.get(
          "http://localhost:5000/api/recipe/getAllRecipes"
        );
      } else {
        // Fetch related recipes from the server
        response = await axios.get(
          `http://localhost:5000/api/recipe/getRelatedRecipes/${cuisineTypeState}`
        );
      }
      setRecipes(response.data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false); // Set loading to false after data is fetched or an error occurs
    }
  };

  useEffect(() => {
    if (isTokenValid()) {
        fetchRecipes();
    } else {
      navigate("/login");
    }
  }, [cuisineTypeState])

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

  // Get current recipes
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleClick = (cuisineType) => {
    setCuisineTypeState(cuisineType);
    navigate(`/allRecipes/${cuisineType}`);
  }

  const recipeCardClick =async(recipeId) =>{
    navigate(`/recipesPage/${recipeId}`);
  }

  return (
    <div className="px-16 py-20">
      <div className="flex">
        <section className="w-[70%]">
          <div className="flex flex-wrap justify-between gap-y-10 pr-10">
            {loading
              ? // Render skeleton loader
                Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-4 w-96 h-[350px] bg-white shadow-xl p-3 rounded-xl"
                  >
                    <div className="skeleton h-[60%] w-full bg-customGrayMedium animate-customPulse"></div>
                    <div className="skeleton h-4 w-28 mt-3 bg-customGrayMedium animate-customPulse"></div>
                    <div className="skeleton h-4 w-full mt-3 bg-customGrayMedium animate-customPulse"></div>
                    <div className="skeleton h-4 w-full mt-3 bg-customGrayMedium animate-customPulse"></div>
                  </div>
                ))
              : // Render recipe cards
                currentRecipes.map((recipe) => {
                  // Find the user associated with the recipe's chefId
                  const chefUser = users.find(
                    (user) => user._id === recipe.chefId
                  );

                  return (
                    <div
                      className="card card-compact w-96 h-[350px] bg-white shadow-xl hover:cursor-pointer"
                      key={recipe._id} onClick={()=>{recipeCardClick(recipe._id)}}
                    >
                      <figure className="h-[60%]">
                        {recipe.image && (
                          <img
                            src={`data:image/jpeg;base64,${recipe.image}`}
                            alt=""
                          />
                        )}
                      </figure>
                      <div className="rating mt-3 ml-3">
                        <input
                          type="radio"
                          name="rating-4"
                          className="mask mask-star-2 bg-green-500 w-4 h-4"
                        />
                        <input
                          type="radio"
                          name="rating-4"
                          className="mask mask-star-2 bg-green-500 w-4 h-4"
                          checked
                        />
                        <input
                          type="radio"
                          name="rating-4"
                          className="mask mask-star-2 bg-green-500 w-4 h-4"
                        />
                        <input
                          type="radio"
                          name="rating-4"
                          className="mask mask-star-2 bg-green-500 w-4 h-4"
                        />
                        <input
                          type="radio"
                          name="rating-4"
                          className="mask mask-star-2 bg-green-500 w-4 h-4"
                        />
                      </div>
                      <div className="p-3">
                        <h2 className="text-xl text-black mb-4 font-semibold">
                          {recipe.title}
                        </h2>
                        <div className="flex justify-between">
                          <div className="flex items-center">
                            <div className="avatar">
                              <div className="w-10 rounded-full">
                                <img
                                  className="object-contain"
                                  src={`data:image/jpeg;base64,${chefUser.image}`}
                                  alt="Avatar"
                                />
                              </div>
                            </div>
                            <span className="ml-2 text-black text-md font-bold">
                              {chefUser.name}
                            </span>
                          </div>
                          <div className="flex items-center text-sm font-bold border-2 p-2 rounded-lg">
                            <BsFire className="text-red-500" />
                            <span className="ml-1">
                              {recipe.nutritionalValues.calories}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            <div className="flex justify-center w-[100%]">
              <Pagination
                totalRecipes={recipes.length}
                recipesPerPage={recipesPerPage}
                currentPage={currentPage}
                paginate={paginate}
              />
            </div>
          </div>
          {/* card container ends here */}
        </section>

        {/* left section starts here */}
        <section className="w-[30%] p-6 bg-neutral-100 rounded-lg h-[1100px]">
          <div>
            <p className="text-black text-2xl font-semibold">Explore Our <span className="text-hotPink">Cuisines</span></p>
            <div
              className="relative h-[200px] hover:cursor-pointer mt-4 mb-8"
              onClick={() => handleClick("Italian")}
            >
              <img
                className="w-full h-[200px] object-cover rounded-md"
                src={images.italianRecipe}
                alt=""
              />
              <div className="absolute bg-black h-[200px] w-full top-0 rounded-md opacity-30"></div>
              <p className="absolute top-0 h-[200px] w-full text-white font-bold text-4xl flex items-center justify-center">
                Italian
              </p>
            </div>

            <div
              className="relative h-[200px] hover:cursor-pointer mt-4 mb-8"
              onClick={() => handleClick("Korean")}
            >
              <img
                className="w-full h-[200px] object-cover rounded-md"
                src={images.koreanRecipe}
                alt=""
              />
              <div className="absolute bg-black h-[200px] w-full top-0 rounded-md opacity-30"></div>
              <p className="absolute top-0 h-[200px] w-full text-white font-bold text-4xl flex items-center justify-center">
                Korean
              </p>
            </div>

            <div
              className="relative h-[200px] hover:cursor-pointer mt-4 mb-8"
              onClick={() => handleClick("Mexican")}
            >
              <img
                className="w-full h-[200px] object-cover rounded-md"
                src={images.mexicanRecipe}
                alt=""
              />
              <div className="absolute bg-black h-[200px] w-full top-0 rounded-md opacity-30"></div>
              <p className="absolute top-0 h-[200px] w-full text-white font-bold text-4xl flex items-center justify-center">
                Mexican
              </p>
            </div>

            <div
              className="relative h-[200px] hover:cursor-pointer mt-4 mb-8"
              onClick={() => handleClick("Indian")}
            >
              <img
                className="w-full h-[200px] object-cover rounded-md"
                src={images.indianRecipe}
                alt=""
              />
              <div className="absolute bg-black h-[200px] w-full top-0 rounded-md opacity-30"></div>
              <p className="absolute top-0 h-[200px] w-full text-white font-bold text-4xl flex items-center justify-center">
                Indian
              </p>
            </div>

            <Link to={'/cuisineTypes'}><p className="text-center text-hotPink text-xl font-semibold hover:cursor-pointer hover:underline underline-offset-[4px]">View more</p></Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AllRecipes;
