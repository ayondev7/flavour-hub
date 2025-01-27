const express = require('express');
const likeController = require('../controllers/likeController');

const router = express.Router();

router.post('/toggle-like',likeController.toggleLike);

router.get('/get-likes/:recipeId/:userId', likeController.getLikes);

module.exports = router;

