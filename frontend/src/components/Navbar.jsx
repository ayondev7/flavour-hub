import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { HiOutlineMenu } from "react-icons/hi";
import { getUserIdFromToken } from "../assets/tokenUtils";
import Sidebar from "../components/Sidebar";
import Searchbar from "../components/Searchbar";

const Navbar = () => {
  const baseURL = `${process.env.REACT_APP_BACKEND_URL}`;
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const userId = getUserIdFromToken();
  const [userData, setUserData] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (userId) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchUserData(userId);
  }, [userId, navigate]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/user/get-user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleLogoutClick = () => {
    sessionStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const homeLink = isAuthenticated ? "/user-home" : "/";
  const navLinks = isAuthenticated
    ? [
        { to: "/user-home", label: "Home" },
        { to: `/all-recipes/${null}`, label: "Recipes" },
        { to: "/create-new-recipe", label: "Create Recipe" },
        { to: "/my-recipes", label: "My Recipes" },
      ]
    : [
        { to: "/", label: "Home" },
        { to: "/about", label: "About" },
        { to: "/blog", label: "Blog" },
        { to: "/create-new-recipe", label: "Add Recipe" },
      ];

  return (
    <div className="relative z-[11]">
      {isAuthenticated && userData ? (
        <>
          <Sidebar
            userData={userData}
            userId={userId}
            handleLogoutClick={handleLogoutClick}
          />
          <div className="flex items-center justify-between h-20 w-full lg:px-12 px-1">
            <Link
              to={homeLink}
              className="font-bold text-gray-800 lg:text-3xl text-xl"
            >
              Recipe<span className="text-pink-600">Finder</span>
            </Link>
            <div className="flex gap-x-4 lg:gap-x-10 relative">
              <Searchbar
                onSearchResults={setSearchResults}
                onSearchQueryChange={(query) => setSearchQuery(query)}
              />
              {(searchResults.length > 0 || searchQuery.trim() !== "") && (
                <div className="absolute top-10 lg:top-12 right-4 lg:right-auto lg:left-0 lg:w-[400px] bg-white border border-gray-300 rounded-md shadow-md z-10">
                  {searchResults.length > 0 ? (
                    searchResults.map((result, index) => (
                      <Link to={`/recipesPage/${result._id}`} key={index}>
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
              <label
                htmlFor="my-drawer-4"
                className="text-hotPink hover:cursor-pointer flex items-center rounded-md"
              >
                <HiOutlineMenu className="lg:text-3xl text-2xl font-semibold" />
              </label>
            </div>
          </div>
        </>
      ) : (
        <nav className="flex justify-between items-center h-20 w-full">
          <div>
            <Link to="/" className="font-bold text-gray-800 pl-4 text-3xl">
              Recipe<span className="text-pink-600">Finder</span>
            </Link>
          </div>
          <UnauthenticatedNav handleLoginClick={handleLoginClick} />
        </nav>
      )}
    </div>
  );
};

const UnauthenticatedNav = ({ handleLoginClick }) => (
  <div className="pr-4 flex gap-x-6 w-[300px]">
    <button
      onClick={handleLoginClick}
      className="rounded-lg text-white bg-hotPink px-3 py-2 font-medium w-[120px] text-lg border-none"
    >
      Login
    </button>
    <Link to="/signup">
      <button className="rounded-lg text-hotPink bg-transparent border-2 border-hotPink px-3 py-2 font-medium w-[120px] text-lg">
        Signup
      </button>
    </Link>
  </div>
);

export default Navbar;
