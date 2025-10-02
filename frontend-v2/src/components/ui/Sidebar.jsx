import React, { useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  FaHome,
  FaNewspaper,
  FaUtensils,
  FaBook,
  FaPlus,
  FaSignOutAlt,
  FaTrophy,
  FaBookmark,
} from 'react-icons/fa';

const menuItems = [
  { to: '/user-home', icon: FaHome, label: 'Home' },
  { to: '/newsfeed', icon: FaNewspaper, label: 'Newsfeed' },
  { to: '/leaderboard', icon: FaTrophy, label: 'Leaderboard' },
  { to: '/all-recipes/null', icon: FaUtensils, label: 'Explore Recipes' },
  { to: '/my-recipes', icon: FaBook, label: 'My Recipes' },
  { to: '/create-new-recipe', icon: FaPlus, label: 'Create Recipe' },
  { to: '/collections', icon: FaBookmark, label: 'My Collection' },
];

const Sidebar = ({ userData, handleLogoutClick, userId }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActiveRoute = useCallback((path) => {
    if (path === '/all-recipes/null') {
      return location.pathname.startsWith('/all-recipes');
    }
    return location.pathname === path;
  }, [location.pathname]);

  const closeSidebar = useCallback(() => {
    const checkbox = document.getElementById('my-drawer-4');
    if (checkbox) {
      checkbox.checked = false;
    }
  }, []);

  const handleSidebarLinkClick = useCallback(() => {
    closeSidebar();
  }, [closeSidebar]);

  return (
    <div className="drawer drawer-end relative z-20">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-side h-screen">
        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-pink-300 text-white h-full lg:w-80 w-[80%] p-4">
          <div className="flex items-center mb-6 ml-1">
            <div className="avatar">
              <div className="lg:w-12 w-10 rounded-full">
                <img className="object-contain" src={userData.image} alt="Avatar" />
              </div>
            </div>
            <div className="ml-4">
              <p className="lg:text-lg text-base font-medium line-clamp-1">{userData.name}</p>
            </div>
          </div>
          <ul className="text-base lg:text-xl flex flex-col gap-y-4">
            {menuItems.map((item, index) => (
              <li key={index} className="border-white border-b-2 pb-2">
                <Link 
                  className={`flex items-center gap-x-3 transition-colors duration-200 ${
                    isActiveRoute(item.to) 
                      ? 'bg-hotPink text-white font-semibold' 
                      : 'hover:bg-hotPink'
                  }`} 
                  to={item.to} 
                  onClick={handleSidebarLinkClick}
                >
                  <item.icon />
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="border-white border-b-2 pb-2">
              <button
                className="hover:bg-hotPink w-full text-left flex items-center gap-x-3"
                onClick={() => {
                  handleLogoutClick();
                  closeSidebar();
                }}
              >
                <FaSignOutAlt />
                Logout
              </button>
            </li>
          </ul>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
