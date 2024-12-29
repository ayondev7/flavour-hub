const express = require('express');
const multer = require('multer');
const authenticateJWT = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

const router = express.Router();
const upload = multer();

router.post('/create-user', upload.single('image'), userController.createUser);

router.post('/loginUser', userController.loginUser);

router.get('/get-all-users/:userId', userController.getAllUsers); // Add this line to get all users

router.get('/get-leaderboard-rankings/:userId', userController.getLeaderboardRankings);

router.get('/getUser/:id', userController.getUserById); // Get a single user by ID

module.exports = router;