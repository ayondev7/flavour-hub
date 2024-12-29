const express = require('express');
const collectionController = require('../controllers/collectionController');
const router = express.Router();

// Create a new collection
router.post('/create', collectionController.createCollection);

// Get all collections
router.get('/get-collections/:userId', collectionController.getCollections);

module.exports = router;
