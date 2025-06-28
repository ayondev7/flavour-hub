const express = require('express');
const authController = require('../controllers/authController'); 
const router = express.Router();

router.get('/verify', authController.verifyToken); 

module.exports = router;
