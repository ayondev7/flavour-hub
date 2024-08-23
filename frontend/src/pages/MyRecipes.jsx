import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { BsFire } from "react-icons/bs";
import Pagination from "../components/Pagination";
import { IoIosWarning } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { HiOutlinePencilAlt,HiOutlineTrash } from "react-icons/hi";

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSpinnerVisible, setIsSpinnerVisible] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const recipesPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      const token = sessionStorage.getItem("token");
      if (token) {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;

        try {
          const response = await axios.get(
            `http://localhost:5000/api/recipe/getMyRecipes/${userId}`
          );
          setRecipes(response.data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching recipes:", error);
          setLoading(true);
        }
      }
    };

    fetchRecipes();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const token = sessionStorage.getItem("token");
      if (token) {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;

        try {
          const response = await axios.get(
            `http://localhost:5000/api/user/getUser/${userId}`
          );
          setUser(response.data);
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }
    };

    fetchUser();
  }, []);

  // Get current recipes
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const openModal = (recipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRecipe(null);
  };

  const handleDelete = async () => {
    if (selectedRecipe) {
      setIsSpinnerVisible(true); // Show spinner
      try {
        await axios.delete(
          `http://localhost:5000/api/recipe/deleteRecipe/${selectedRecipe._id}`
        );
        // Update the recipes state by filtering out the deleted recipe
        setRecipes((prevRecipes) =>
          prevRecipes.filter((recipe) => recipe._id !== selectedRecipe._id)
        );
        toast.success("Recipe deleted successfully!");
      } catch (error) {
        console.error("Error deleting recipe:", error);
        toast.error("Failed to delete recipe.");
      }
      setIsSpinnerVisible(false); // Hide spinner
      closeModal();
    }
  };

  const handleEdit = (recipeId) => {
    navigate(`/editRecipe/${recipeId}`);
  };

  return (
    <div>
      <p className="px-16 my-5 text-black text-3xl font-semibold">
        My Recipes Collection
      </p>
      <div className="px-16 flex flex-wrap gap-x-10 mt-10">
        {loading
          ? // Render skeleton loader
            Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="flex flex-col gap-4 w-96 h-[350px] bg-white shadow-xl p-3 rounded-xl mb-10"
              >
                <div className="skeleton h-[60%] w-full bg-customGrayMedium animate-customPulse"></div>
                <div className="skeleton h-4 w-28 mt-3 bg-customGrayMedium animate-customPulse"></div>
                <div className="skeleton h-4 w-full mt-3 bg-customGrayMedium animate-customPulse"></div>
                <div className="skeleton h-4 w-full mt-3 bg-customGrayMedium animate-customPulse"></div>
              </div>
            ))
          : currentRecipes.map((recipe) => (
              <div
                className="card card-compact w-96 h-[350px] shadow-xl hover:cursor-pointer rounded-lg overflow-hidden bg-white mb-10"
                key={recipe._id}
              >
                <figure className="h-[60%] overflow-hidden">
                  {recipe.image && (
                    <img
                      src={`data:image/jpeg;base64,${recipe.image}`}
                      alt={recipe.title}
                    />
                  )}
                </figure>
                <div className="rating mt-3 ml-3">
                  <input
                    type="radio"
                    name={`rating-${recipe._id}`}
                    className="mask mask-star-2 bg-green-500 w-4 h-4"
                  />
                  <input
                    type="radio"
                    name={`rating-${recipe._id}`}
                    className="mask mask-star-2 bg-green-500 w-4 h-4"
                    checked
                  />
                  <input
                    type="radio"
                    name={`rating-${recipe._id}`}
                    className="mask mask-star-2 bg-green-500 w-4 h-4"
                  />
                  <input
                    type="radio"
                    name={`rating-${recipe._id}`}
                    className="mask mask-star-2 bg-green-500 w-4 h-4"
                  />
                  <input
                    type="radio"
                    name={`rating-${recipe._id}`}
                    className="mask mask-star-2 bg-green-500 w-4 h-4"
                  />
                </div>
                <div className="p-3">
                  <h2 className="text-xl text-black mb-4 font-semibold">
                    {recipe.title}
                  </h2>
                  <div className="flex flex-row-reverse justify-between">
                    <div className="flex items-center">
                        <button
                          className="mx-3"
                          onClick={() => handleEdit(recipe._id)}
                        >
                          <HiOutlinePencilAlt className="text-3xl text-hotPink " />
                        </button>
                        <button
                          onClick={() => openModal(recipe)}
                        >
                           <HiOutlineTrash className="text-3xl text-hotPink" />
                        </button>
                    </div>
                    <div className="flex items-center text-sm font-bold border-2 p-2 rounded-lg">
                      <BsFire className="text-red-500" />
                      <span className="ml-1">
                        {recipe.nutritionalValues
                          ? recipe.nutritionalValues.calories
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </div>
      <Pagination
        totalRecipes={recipes.length}
        recipesPerPage={recipesPerPage}
        currentPage={currentPage}
        paginate={paginate}
      />

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {isModalOpen && (
        <dialog id="my_modal_3" className="modal" open>
          <div className="modal-box bg-white">
            {!isSpinnerVisible ? (
              <>
                <form method="dialog">
                  <button
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-black"
                    onClick={closeModal}
                  >
                    ✕
                  </button>
                </form>
                <div className="flex text-3xl items-end">
                  <IoIosWarning className="text-4xl mr-1 text-orange-400" />{" "}
                  <span className="text-black">Warning!</span>
                </div>
                <p className="py-4 text-black text-lg">
                  Are you sure you want to delete this recipe?
                </p>
                <div className="flex justify-end">
                  <button
                    className="bg-hotPink text-white font-semibold text-lg p-3 rounded-lg"
                    onClick={handleDelete}
                  >
                    Yes, I do
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <span className="loading loading-spinner w-[200px] h-[200px] text-brightPink"></span>
              </div>
            )}
          </div>
        </dialog>
      )}
    </div>
  );
};

export default MyRecipes;
