import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; 
import AboutUs from './pages/AboutUs'; 
import Layout from './components/Layout';
import CreateNewRecipe from './pages/CreateNewRecipe';
import UserHome from './pages/UserHome';
import MyRecipes from './pages/MyRecipes';
import EditRecipe from './pages/EditRecipe';
import RecipesPage from './pages/RecipesPage';
import Login from './pages/Login';
import AllRecipes from './pages/AllRecipes';

const App = () => {
  return (
    <BrowserRouter>
      <div className="bg-white">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="userHome" element={<UserHome />} />
            <Route path="about" element={<AboutUs />} />
            <Route path="blog" element={<AboutUs />} />
            <Route path="createNewRecipe" element={<CreateNewRecipe />} />
            <Route path="editRecipe/:recipeId" element={<EditRecipe />} />
            <Route path="myRecipes" element={<MyRecipes />} />
            <Route path="recipesPage/:recipeId" element={<RecipesPage />} />
            <Route path="allRecipes/:genre" element={<AllRecipes />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
