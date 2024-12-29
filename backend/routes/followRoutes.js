const express = require('express');
const router = express.Router();
const { followUser} = require('../controllers/followController');

// Route to follow a user
router.post('/follow', followUser);


module.exports = router;
