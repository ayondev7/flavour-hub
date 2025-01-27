import React, { useState } from "react";
import { getUserIdFromToken } from "../assets/tokenUtils";
import PostCard from "../components/PostCard";
import NewsfeedSidebar from "../components/NewsfeedSidebar";
import NewsfeedSidebarSkeleton from "../Skeleton/NewsfeedSidebarSkeleton";
import PostCardSkeleton from "../Skeleton/PostCardSkeleton";
import { useGetChefsQuery } from "../redux/store/chefSlice";
import {useGetAllRecipesQuery } from "../redux/store/recipeSlice";

const Newsfeed = () => {
  const userId = getUserIdFromToken();
  const [recipes, setRecipes] = useState([]);
  const [chefs, setChefs] = useState([]);

  const { data: chefsData = [], isLoading: isChefsLoading } =
    useGetChefsQuery(userId);
  if (chefsData && chefsData.length > 0 && chefs.length === 0) {
    setChefs(chefsData); // Set the chefs data to local state only once
  }

  const { data: recipesData = [], isLoading: isRecipesLoading } =
  useGetAllRecipesQuery(userId);
if (recipesData && recipesData.length > 0 && recipes.length === 0) {
  setRecipes(recipesData); // Set the chefs data to local state only once
}

const handleLikeChange = (recipeId) => {
  setRecipes((prevRecipes) =>
    prevRecipes.map((recipe) =>
      recipe._id === recipeId
        ? {
            ...recipe,
            likedByUser: !recipe.likedByUser, // Toggle likedByUser
            totalLikes: recipe.likedByUser
              ? recipe.totalLikes - 1 // Decrease if previously liked
              : recipe.totalLikes + 1, // Increase if not liked
          }
        : recipe
    )
  );
};


const handleFollowChange = (chefId) => {
  setChefs((prevChefs) =>
    prevChefs.map((chef) =>
      chef._id === chefId ? { ...chef, following: !chef.following } : chef
    )
  );

  setRecipes((prevRecipes) =>
    prevRecipes.map((recipe) =>
      recipe.chefId === chefId
        ? { ...recipe, following: !recipe.following }
        : recipe
    )
  );
};

  return (
    <div className="px-4 lg:px-12 pb-24 pt-4 lg:pt-10 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 gap-x-4 w-full">
        {/* Left Sidebar */}
        <div className="hidden lg:block lg:col-span-3">
          <div className="sticky top-16">
            {isChefsLoading ? (
              <NewsfeedSidebarSkeleton title="Following" />
            ) : (
              <NewsfeedSidebar
                title="Following"
                showSearchBar={false}
                followersSidebar={true}
                userId={userId}
                chefs={chefs}
                onFollowChange={handleFollowChange} // Pass down handler
              />
            )}
          </div>
        </div>

        {/* Newsfeed */}
        <div className="col-span-1 lg:col-span-6">
          <div className="space-y-6">
            {isRecipesLoading || recipes.length <= 0 ? (
              <PostCardSkeleton />
            ) : (
              recipes.map((_, index) => {
                const recipe = recipes[recipes.length - 1 - index];
                return (
                  <PostCard
                    data={recipe}
                    key={recipe._id}
                    onFollowChange={handleFollowChange}
                    userId={userId}
                    onLikeChange={handleLikeChange}
                  />
                );
              })
            )}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="hidden lg:block lg:col-span-3">
          <div className="sticky top-16">
            {isChefsLoading ? (
              <NewsfeedSidebarSkeleton title="Chefs you may like" />
            ) : (
              <NewsfeedSidebar
                title="Chefs you may like"
                showSearchBar={true}
                followersSidebar={false}
                userId={userId}
                chefs={chefs}
                onFollowChange={handleFollowChange} // Pass down handler
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsfeed;
