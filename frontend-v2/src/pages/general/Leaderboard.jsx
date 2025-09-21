import React, { useEffect } from "react";
import LeaderboardTable from "@components/user/LeaderboardTable.jsx";
import { getUserIdFromToken } from "@assets/tokenUtils";
import LeaderboardTableSkeleton from "@skeleton/LeaderboardTableSkeleton";
import { useGetLeaderboardQuery } from "@redux/hooks/chefHook";
import { toast } from "react-toastify";

const Leaderboard = () => {
  const userId = getUserIdFromToken();
  const { data: leaderboardData = [], isLoading, error } = useGetLeaderboardQuery();

  console.log("Leaderboard data:", leaderboardData);

  return (
    <div className="px-4 lg:px-12 pt-4 lg:pt-10 pb-24">
      {/* Page Header */}
      <div className="text-center pb-6">
        <h1 className="text-lg lg:text-5xl font-bold bg-gradient-to-r from-purple-500 via-pink-400 to-pink-500 text-transparent bg-clip-text">
          Top Chefs Leaderboard
        </h1>

        <p className="mt-2 lg:mt-4 text-sm lg:text-xl text-gray-600">
          Discover the top-ranking chefs in our community. See their
          achievements, ratings, and contributions to the culinary world.
        </p>
      </div>

      {/* Conditional Rendering */}
      {isLoading ? (
        <LeaderboardTableSkeleton/>
      ) : (
        <LeaderboardTable data={leaderboardData} userId={userId} />
      )}
    </div>
  );
};

export default Leaderboard;
