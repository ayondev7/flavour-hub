const express = require('express');
const { verifyToken } = require('../controllers/authController'); // Import controller
const router = express.Router();

router.get('/verify', verifyToken); // Define the route

module.exports = router;
