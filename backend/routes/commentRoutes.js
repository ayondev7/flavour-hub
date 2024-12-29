const express = require('express');
const multer = require('multer');
const commentController = require('../controllers/commentController');

const router = express.Router();
const upload = multer();

router.post('/postComment', upload.none(), commentController.postComment);

router.get('/getComments/:recipeId', commentController.getComments);

router.put('/updateComment',upload.none(), commentController.updateComment);

router.delete('/deleteComment',upload.none(), commentController.deleteComment);

router.get('/getNotifications/:userId', commentController.getNotificationsById);

module.exports = router;

