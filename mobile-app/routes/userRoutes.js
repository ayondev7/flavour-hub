import { BASE_URL } from './index';

export const userRoutes = {
  createUser: `${BASE_URL}/user/create-user`,
  loginUser: `${BASE_URL}/user/login-user`,
  guestLogin: `${BASE_URL}/user/guest-login`,
  getUser: `${BASE_URL}/user/get-user`,
  getAllUsers: `${BASE_URL}/user/get-all-users`,
  getLeaderboardRankings: `${BASE_URL}/user/get-leaderboard-rankings`,
};
