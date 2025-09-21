import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Provider } from "react-redux";
import store from "@redux/store";
import Home from "@pages/general/Home";
import Layout from "@components/ui/Layout";
import CreateNewRecipe from "@pages/recipes/CreateNewRecipe";
import UserHome from "@pages/user/UserHome";
import MyRecipes from "@pages/recipes/MyRecipes";
import EditRecipe from "@pages/recipes/EditRecipe";
import RecipesPage from "@pages/recipes/RecipesPage";
import Login from "@pages/auth/Login";
import AllRecipes from "@pages/recipes/AllRecipes";
import Signup from "@pages/auth/Signup";
import Newsfeed from "@pages/user/Newsfeed";
import { AuthProvider } from "@context/AuthContext";
import ProtectedRoute from "@components/user/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import Leaderboard from "@pages/general/Leaderboard";
import Collections from "@pages/user/Collections";
import Bookmarks from "@pages/user/Bookmarks";

// Reusable wrapper for transitions
const PageTransition = ({ children }) => {
  const location = useLocation();

  return (
    <motion.div
      key={location.key}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

// Helper to wrap a component in ProtectedRoute + PageTransition
const ProtectedPage = (Component) => (
  <ProtectedRoute>
    <PageTransition>
      <Component />
    </PageTransition>
  </ProtectedRoute>
);

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AuthProvider>
        <ToastContainer autoClose={3000} />
        <div className="bg-white">
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected routes inside layout */}
            <Route path="/" element={<Layout />}>
              <Route index element={<PageTransition><Home /></PageTransition>} />
              <Route path="user-home" element={ProtectedPage(UserHome)} />
              <Route path="newsfeed" element={ProtectedPage(Newsfeed)} />
              <Route path="leaderboard" element={ProtectedPage(Leaderboard)} />
              <Route path="collections" element={ProtectedPage(Collections)} />
              <Route path="bookmarks/:collectionId" element={ProtectedPage(Bookmarks)} />
              <Route path="create-new-recipe" element={ProtectedPage(CreateNewRecipe)} />
              <Route path="edit-recipe/:recipeId" element={ProtectedPage(EditRecipe)} />
              <Route path="my-recipes" element={ProtectedPage(MyRecipes)} />
              <Route path="recipes-page/:recipeId" element={ProtectedPage(RecipesPage)} />
              <Route path="all-recipes/:genre" element={ProtectedPage(AllRecipes)} />
            </Route>
          </Routes>
        </div>
      </AuthProvider>
    </Provider>
    </BrowserRouter>
  );
};

export default App;
