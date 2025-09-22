// Chef/User API endpoints
import { BASE_URL } from './config';

export const CHEF_ENDPOINTS = {
  GET_ALL_USERS: `${BASE_URL}/api/user/get-all-users`,
  GET_LEADERBOARD: `${BASE_URL}/api/user/get-leaderboard-rankings`,
  TOGGLE_FOLLOW: `${BASE_URL}/api/user/toggle-follow`,
};