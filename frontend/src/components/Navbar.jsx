import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";
import { HiOutlineMenu } from "react-icons/hi";
import { HiOutlineX } from "react-icons/hi";
import { isTokenValid, getUserIdFromToken } from "../assets/tokenUtils";

const Navbar = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const userId = getUserIdFromToken();
  const socket = io("http://localhost:5000"); // Connect to the backend server

  const [userData, setUserData] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [hasNewNotifications, setHasNewNotifications] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setHasNewNotifications(false); // Hide indicator when opening the dropdown
    }
  };

  useEffect(() => {
    if (isTokenValid()) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      navigate("/login");
    }
  }, [userId]);

  const fetchNotifications = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/comment/getNotifications/${userId}` // Corrected endpoint
      );
      setNotifications(response.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    if (isTokenValid()) {
      fetchUserData(userId);
    } else {
      navigate("/login");
    }
  }, [userId, navigate]);

  useEffect(() => {
    if (isTokenValid()) {
      fetchNotifications(userId);
    } else {
      navigate("/login");
    }

    // Listen for new notifications
    socket.on("new_notification", () => {
      fetchNotifications(userId);
      setHasNewNotifications(true);
    });

    // Clean up the effect
    return () => {
      socket.off("new_notification");
    };
  }, [userId, navigate]);

  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/user/getUser/${userId}`
      );
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchInput(query);
    if (query) {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/recipe/search",
          { params: { title: query } }
        );
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error searching for recipes:", error);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleLogoutClick = () => {
    sessionStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  const notificationOnClick = async (recipeId) => {
    navigate(`/recipesPage/${recipeId}`);
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const homeLink = isAuthenticated ? "/userHome" : "/";
  const navLinks = isAuthenticated
    ? [
        { to: "/userHome", label: "Home" },
        { to: `/allRecipes/${null}`, label: "Recipes" },
        { to: "/createNewRecipe", label: "Create Recipe" },
        { to: "/myRecipes", label: "My Recipes" },
      ]
    : [
        { to: "/", label: "Home" },
        { to: "/about", label: "About" },
        { to: "/blog", label: "Blog" },
        { to: "/createNewRecipe", label: "Add Recipe" },
      ];

  return (
    <div className="relative z-[11]">
      {isAuthenticated && userData ? (
        <div className="drawer drawer-end">
          <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <div className="flex items-center justify-between h-20 w-full lg:p-4 px-1">
              <Link to={homeLink} className="font-bold text-gray-800 lg:text-3xl text-xl">
                Recipe<span className="text-pink-600">Finder</span>
              </Link>
              <div className="flex lg:gap-x-10 gap-x-2">
                <div className="form-control">
                  <input
                    type="text"
                    placeholder="Search"
                    className="input input-bordered bg-lightPink text-black font-semibold text-sm  lg:py-2 lg:text-xl lg:h-full h-[30px] lg:w-[400px] w-[120px] focus:outline-hotPink"
                    value={searchInput}
                    onChange={handleSearchChange}
                  />
                </div>
                <label
                  htmlFor="my-drawer-4"
                  className="bg-hotPink text-white flex items-center lg:px-4 rounded-md px-2 py-1"
                >
                  <HiOutlineMenu className="lg:text-3xl text-xl font-semibold" />
                </label>
              </div>
            </div>
          </div>
          <div className="drawer-side h-screen">
            <label
              htmlFor="my-drawer-4"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-pink-300 text-white h-full lg:w-80 w-[90%] p-4">
              <div className="flex items-center mb-6 ml-1">
                <div className="avatar">
                  <div className="ring-white ring-offset-base-100 w-12 rounded-full ring ring-offset-4">
                    <img
                      className="object-contain"
                      src={`data:image/jpeg;base64,${userData.image}`}
                      alt="Avatar"
                    />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-lg font-medium">{userData.name}</p>
                </div>
              </div>
              <ul className="text-xl flex flex-col gap-y-4">
                <li className="borber-white border-b-2 pb-2">
                  <Link className="hover:bg-hotPink" to="/userHome">
                    Home
                  </Link>
                </li>
                <li className="borber-white border-b-2 pb-2">
                  <Link className="hover:bg-hotPink" to={`/allRecipes/${null}`}>
                    Explore Recipes
                  </Link>
                </li>
                <li className="borber-white border-b-2 pb-2">
                  <Link className="hover:bg-hotPink" to="/myRecipes">
                    My Recipes
                  </Link>
                </li>
                <li className="borber-white border-b-2 pb-2">
                  <Link className="hover:bg-hotPink" to="/createNewRecipe">
                    Create Recipe
                  </Link>
                </li>
                <li className="relative border-white border-b-2 pb-2">
                  <Link
                    className="hover:bg-hotPink focus:text-white"
                    to="#"
                    onClick={toggleDropdown}
                  >
                    Notifications
                    {hasNewNotifications && (
                      <span className="bg-hotPink rounded-full size-2"></span>
                    )}
                  </Link>
                  {isOpen && (
                    <div className="absolute rounded-sm w-[400px] h-[250px] overflow-x-hidden overflow-y-scroll right-[350px] bg-pink-300 py-3 hover:bg-pink-300">
                      <div className="tooltip-arrow"></div>
                      <div className="flex flex-col gap-y-4">
                        {notifications.length === 0 ? (
                          <p className="text-center text-lg text-white">
                            No notifications to show
                          </p>
                        ) : (
                          notifications.map((_, index, arr) => {
                            const reverseIndex = arr.length - 1 - index;
                            const notification = arr[reverseIndex];

                            return (
                              <div
                                key={reverseIndex}
                                className="flex items-start"
                                onClick={() => {
                                  notificationOnClick(notification.recipeId);
                                }}
                              >
                                <div className="avatar mt-1">
                                  <div className="w-10 rounded-full">
                                    <img
                                      src={`data:image/jpeg;base64,${notification.image}`}
                                      alt="avatar"
                                    />
                                  </div>
                                </div>
                                <div className="ml-3 relative">
                                  <HiOutlineX className="absolute right-0 top-1" />
                                  <p className="text-lg mb-1">
                                    <span className="font-medium">
                                      {notification.name}
                                    </span>{" "}
                                    commented on your recipe post.
                                  </p>
                                  <p className="text-sm">
                                    {notification.createdAt}
                                  </p>
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </div>
                  )}
                </li>
                <li className="borber-white border-b-2 pb-2">
                  <button
                    className="hover:bg-hotPink"
                    onClick={handleLogoutClick}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </ul>
          </div>
        </div>
      ) : (
        <nav className="flex justify-between items-center h-20 w-full">
          <div>
            <Link to="/" className="font-bold text-gray-800 pl-4 text-3xl">
              Recipe<span className="text-pink-600">Finder</span>
            </Link>
          </div>
          <div>
            <ul className="flex space-x-8 text-xl font-semibold">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.to}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <UnauthenticatedNav handleLoginClick={handleLoginClick} />
        </nav>
      )}
    </div>
  );
};

const UnauthenticatedNav = ({ handleLoginClick }) => (
  <div className="pr-4 flex justify-between w-[300px]">
    <button
      onClick={handleLoginClick}
      className="btn btn-xs sm:btn-sm md:btn-md lg:btn-md lg:text-xl lg:w-32 bg-customGrayPale text-black border-none hover:text-white transition-all duration-500 ease-in-out"
    >
      Login
    </button>
    <Link to="/signup">
      <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-md lg:text-xl lg:w-32 bg-hotPink text-white border-none transition-all duration-500 ease-in-out">
        Signup
      </button>
    </Link>
  </div>
);

export default Navbar;
