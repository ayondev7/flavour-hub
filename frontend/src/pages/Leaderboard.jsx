import React, { useEffect, useState } from "react";
import axios from "axios";
import LeaderboardTable from "../components/LeaderboardTable";
import { getUserIdFromToken } from "../assets/tokenUtils";
import LeaderboardTableSkeleton from "../Skeleton/LeaderboardTableSkeleton";

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state
  const userId = getUserIdFromToken();

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/user/get-leaderboard-rankings/${userId}`);
        setLeaderboardData(response.data); // Set leaderboard data
      } catch (err) {
        setError("Failed to fetch leaderboard data. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false); // Stop loading spinner
      }
    };

    fetchLeaderboardData();
  }, []);

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
      {loading ? (
        <LeaderboardTableSkeleton/>
      ) : (
        <LeaderboardTable data={leaderboardData} userId={userId} />
      )}
    </div>
  );
};

export default Leaderboard;
