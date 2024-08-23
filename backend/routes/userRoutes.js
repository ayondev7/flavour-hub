const express = require('express');
const multer = require('multer');
const authenticateJWT = require('../middleware/authMiddleware');
const {createUser, getAllUsers, loginUser, getUserById} = require('../controllers/userController');

const router = express.Router();
const upload = multer();

router.post('/createUser', upload.single('image'), createUser);

router.post('/loginUser', loginUser);

router.get('/getAllUsers', getAllUsers); // Add this line to get all users

router.get('/getUser/:id', getUserById); // Get a single user by ID

module.exports = router;