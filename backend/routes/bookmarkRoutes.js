const express = require('express');
const bookmarkController = require('../controllers/bookmarkController');
const router = express.Router();

// Create a new bookmark
router.post('/create',  bookmarkController.createBookmark);

router.delete('/remove/:recipeId',bookmarkController.removeBookmark);

// Get all bookmarks for a collection
router.get('/get-bookmarks/:collectionId',  bookmarkController.getBookmarks);

module.exports = router;
