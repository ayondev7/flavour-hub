const express = require('express');
const multer = require('multer');
const authenticateJWT = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

const router = express.Router();

const upload = multer({
  limits: {
    fileSize: 5 * 1024 * 1024, 
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Only JPEG, JPG, PNG, and WEBP formats are allowed"));
    }
    cb(null, true);
  },
});

router.post('/create-user', upload.single('image'), userController.createUser);

router.post('/loginUser', userController.loginUser);

router.get('/get-all-users/:userId', userController.getAllUsers); 

router.get('/get-leaderboard-rankings/:userId', userController.getLeaderboardRankings);

router.get('/getUser/:id', userController.getUserById); 

module.exports = router;
