import React, { useCallback } from 'react';
import { getUserIdFromToken } from '@assets/tokenUtils';
import PostCard from '@components/cards/PostCard';
import NewsfeedSidebar from '@components/ui/NewsfeedSidebar';
import NewsfeedSidebarSkeleton from '@skeleton/NewsfeedSidebarSkeleton';
import PostCardSkeleton from '@skeleton/PostCardSkeleton';
import { useGetChefsQuery } from '@redux/hooks/chefHook';
import { useGetAllRecipesQuery } from '@redux/hooks/recipeHook';
import { useToggleFollowMutation } from '@redux/hooks/chefHook';
import { useToggleLikeMutation } from '@redux/hooks/likesHook';
import { toast } from 'react-toastify';

const Newsfeed = () => {
  const userId = getUserIdFromToken();

  const { data: chefsData = [], isLoading: isChefsLoading } = useGetChefsQuery();
  const { data: recipesData = [], isLoading: isRecipesLoading } = useGetAllRecipesQuery();
  const [toggleFollow] = useToggleFollowMutation();
  const [toggleLike] = useToggleLikeMutation();

  const handleLikeChange = useCallback(async (recipeId) => {
    await toggleLike({ recipeId });
  }, [toggleLike]);

  const handleFollowChange = useCallback(async (chefId) => {
    try {
      const chef = chefsData.find(c => c._id === chefId);
      const isCurrentlyFollowing = chef?.following;
      
      await toggleFollow({ followerId: userId, followingId: chefId });
      
      const message = isCurrentlyFollowing 
        ? "You have unfollowed this user" 
        : "You have followed this user";
      toast.success(message);
    } catch (error) {
      toast.error("Failed to update follow status. Please try again.");
    }
  }, [toggleFollow, userId, chefsData]);

  return (
    <div className="px-4 lg:px-12 pb-24 pt-4 lg:pt-10 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 gap-x-4 w-full">
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
                chefs={chefsData}
                onFollowChange={handleFollowChange}
              />
            )}
          </div>
        </div>

        <div className="col-span-1 lg:col-span-6">
          <div className="space-y-6">
            {isRecipesLoading || recipesData.length <= 0 ? (
              <PostCardSkeleton />
            ) : (
              [...recipesData].reverse().map((recipe) => (
                <PostCard
                  data={recipe}
                  key={recipe._id}
                  onFollowChange={handleFollowChange}
                  userId={userId}
                  onLikeChange={handleLikeChange}
                />
              ))
            )}
          </div>
        </div>

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
                chefs={chefsData}
                onFollowChange={handleFollowChange}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsfeed;
