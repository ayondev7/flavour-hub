import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import CreateNewRecipe from "./pages/CreateNewRecipe";
import UserHome from "./pages/UserHome";
import MyRecipes from "./pages/MyRecipes";
import EditRecipe from "./pages/EditRecipe";
import RecipesPage from "./pages/RecipesPage";
import Login from "./pages/Login";
import AllRecipes from "./pages/AllRecipes";
import Signup from "./pages/Signup";
import Newsfeed from "./pages/Newsfeed";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import Leaderboard from "./pages/Leaderboard";
import Collections from "./pages/Collections";
import Bookmarks from "./pages/Bookmarks";

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

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastContainer />
        <div className="bg-white">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Layout />}>
              <Route
                index
                element={
                  <PageTransition>
                    <Home />
                  </PageTransition>
                }
              />

              <Route
                path="user-home"
                element={
                  <ProtectedRoute>
                    <PageTransition>
                      <UserHome />
                    </PageTransition>
                  </ProtectedRoute>
                }
              />
              <Route
                path="newsfeed"
                element={
                  <ProtectedRoute>
                    <PageTransition>
                      <Newsfeed />
                    </PageTransition>
                  </ProtectedRoute>
                }
              />
              <Route
                path="leaderboard"
                element={
                  <ProtectedRoute>
                    <PageTransition>
                      <Leaderboard />
                    </PageTransition>
                  </ProtectedRoute>
                }
              />
              <Route
                path="collections"
                element={
                  <ProtectedRoute>
                    <PageTransition>
                      <Collections />
                    </PageTransition>
                  </ProtectedRoute>
                }
              />
              <Route
                path="bookmarks/:collectionId"
                element={
                  <ProtectedRoute>
                    <PageTransition>
                      <Bookmarks />
                    </PageTransition>
                  </ProtectedRoute>
                }
              />
              <Route
                path="create-new-recipe"
                element={
                  <ProtectedRoute>
                    <PageTransition>
                      <CreateNewRecipe />
                    </PageTransition>
                  </ProtectedRoute>
                }
              />
              <Route
                path="edit-recipe/:recipeId"
                element={
                  <ProtectedRoute>
                    <PageTransition>
                      <EditRecipe />
                    </PageTransition>
                  </ProtectedRoute>
                }
              />
              <Route
                path="my-recipes"
                element={
                  <ProtectedRoute>
                    <PageTransition>
                      <MyRecipes />
                    </PageTransition>
                  </ProtectedRoute>
                }
              />
              <Route
                path="recipes-page/:recipeId"
                element={
                  <ProtectedRoute>
                    <PageTransition>
                      <RecipesPage />
                    </PageTransition>
                  </ProtectedRoute>
                }
              />
              <Route
                path="all-recipes/:genre"
                element={
                  <ProtectedRoute>
                    <PageTransition>
                      <AllRecipes />
                    </PageTransition>
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
