const express = require('express');
const multer = require('multer');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

const upload = multer({
  limits: {
    fileSize: 3 * 1024 * 1024, 
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Only JPEG, JPG, PNG, and WEBP formats are allowed"));
    }
    cb(null, true);
  },
});

router.post('/create-user',upload.single('image'), userController.createUser);

router.post('/login-user', userController.loginUser);

// Guest login route
router.post('/guest-login', userController.guestLogin);

router.get('/get-all-users', authMiddleware.auth, userController.getAllUsers); 

router.get('/get-leaderboard-rankings', authMiddleware.auth, userController.getLeaderboardRankings);

router.get('/get-user', authMiddleware.auth, userController.getUserById); 

module.exports = router;
