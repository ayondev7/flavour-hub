const express = require('express');
const multer = require('multer');
const commentController = require('../controllers/CommentController');

const router = express.Router();
const upload = multer();

router.post('/post-comment', upload.none(), commentController.postComment);

router.get('/get-comments/:recipeId', commentController.getComments);

router.put('/update-comments',upload.none(), commentController.updateComment);

router.delete('/delete-comments',upload.none(), commentController.deleteComment);

router.get('/get-notifications/:userId', commentController.getNotificationsById);

module.exports = router;

