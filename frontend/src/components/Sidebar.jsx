import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Notifications from "../components/Notifications";
import axios from "axios";
import { io } from "socket.io-client";
import {
  FaHome,
  FaNewspaper,
  FaUtensils,
  FaBook,
  FaPlus,
  FaBell,
  FaSignOutAlt,
  FaTrophy,
  FaBookmark,
} from "react-icons/fa"; // Import icons

const Sidebar = ({ userData, handleLogoutClick, userId }) => {
  const [notificationsData, setNotificationsData] = useState([]);
  const [hasNewNotifications, setHasNewNotifications] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const socket = io(`${process.env.REACT_APP_BACKEND_URL}`);

  useEffect(() => {
    if (userId) {
      fetchNotifications(userId);
    }

    // Listen for new notifications
    socket.on("new_notification", () => {
      fetchNotifications(userId);
      setHasNewNotifications(true);
    });

    // Clean up the socket listener
    return () => {
      socket.off("new_notification");
    };
  }, [userId]);

  const fetchNotifications = async (userId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/comment/get-notifications/${userId}`
      );
      setNotificationsData(response.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const notificationOnClick = (recipeId) => {
    navigate(`/recipesPage/${recipeId}`);
    closeSidebar(); // Close the sidebar when a notification is clicked
  };

  const closeSidebar = () => {
    const checkbox = document.getElementById("my-drawer-4");
    if (checkbox) {
      checkbox.checked = false; // Uncheck to close the drawer
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setHasNewNotifications(false); // Reset indicator
    }
  };

  const handleSidebarLinkClick = () => {
    closeSidebar(); // Close the sidebar when a menu item is clicked
  };

  return (
    <div className="drawer drawer-end relative z-20">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-side h-screen">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-pink-300 text-white h-full lg:w-80 w-[80%] p-4">
          {/* User Info */}
          <div className="flex items-center mb-6 ml-1">
            <div className="avatar">
              <div className="lg:w-12 w-10 rounded-full">
                <img
                  className="object-contain"
                  src={`data:image/jpeg;base64,${userData.image}`}
                  alt="Avatar"
                />
              </div>
            </div>
            <div className="ml-4">
              <p className="lg:text-lg text-base font-medium line-clamp-1">
                {userData.name}
              </p>
            </div>
          </div>
          {/* Sidebar Menu */}
          <ul className="text-base lg:text-xl flex flex-col gap-y-4">
            <li className="border-white border-b-2 pb-2">
              <Link
                className="hover:bg-hotPink flex items-center gap-x-3"
                to="/userHome"
                onClick={handleSidebarLinkClick}
              >
                <FaHome />
                Home
              </Link>
            </li>
            <li className="border-white border-b-2 pb-2">
              <Link
                className="hover:bg-hotPink flex items-center gap-x-3"
                to="/newsfeed"
                onClick={handleSidebarLinkClick}
              >
                <FaNewspaper />
                Newsfeed
              </Link>
            </li>
            <li className="border-white border-b-2 pb-2">
              <Link
                className="hover:bg-hotPink flex items-center gap-x-3"
                to="/leaderboard"
                onClick={handleSidebarLinkClick}
              >
                <FaTrophy />
                Leaderboard
              </Link>
            </li>
            <li className="border-white border-b-2 pb-2">
              <Link
                className="hover:bg-hotPink flex items-center gap-x-3"
                to={`/allRecipes/${null}`}
                onClick={handleSidebarLinkClick}
              >
                <FaUtensils />
                Explore Recipes
              </Link>
            </li>
            <li className="border-white border-b-2 pb-2">
              <Link
                className="hover:bg-hotPink flex items-center gap-x-3"
                to="/myRecipes"
                onClick={handleSidebarLinkClick}
              >
                <FaBook />
                My Recipes
              </Link>
            </li>
            <li className="border-white border-b-2 pb-2">
              <Link
                className="hover:bg-hotPink flex items-center gap-x-3"
                to="/createNewRecipe"
                onClick={handleSidebarLinkClick}
              >
                <FaPlus />
                Create Recipe
              </Link>
            </li>
            <li className="border-white border-b-2 pb-2">
              <Link
                className="hover:bg-hotPink flex items-center gap-x-3"
                to="/collections"
                onClick={handleSidebarLinkClick}
              >
                <FaBookmark />
                My Collection
              </Link>
            </li>
            {/* Notifications Option */}
            <li className="border-white border-b-2 pb-2">
              <button
                className="hover:bg-hotPink flex items-center gap-x-3 cursor-pointer"
                onClick={() => setIsOpen(true)}
              >
                <FaBell />
                Notifications
                {hasNewNotifications && (
                  <span className="ml-2 text-red-500 font-bold">*</span>
                )}
              </button>
            </li>
            <li className="border-white border-b-2 pb-2">
              <button
                className="hover:bg-hotPink w-full text-left flex items-center gap-x-3"
                onClick={() => {
                  handleLogoutClick();
                  closeSidebar(); // Close the sidebar on logout
                }}
              >
                <FaSignOutAlt />
                Logout
              </button>
            </li>
          </ul>
        </ul>
      </div>
      {/* Notifications Modal */}
      {isOpen && (
        <Notifications
          notificationsData={notificationsData}
          onNotificationClick={notificationOnClick}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default Sidebar;
