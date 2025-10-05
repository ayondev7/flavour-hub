const express = require('express');
const likeController = require('../controllers/likeController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/toggle-like', authMiddleware.auth, likeController.toggleLike);

router.get('/get-likes/:recipeId/:userId', authMiddleware.auth, likeController.getLikes);

module.exports = router;

