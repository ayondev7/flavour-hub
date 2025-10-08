const express = require('express');
const router = express.Router();

const recipeRoutes = require('./recipeRoutes');
const userRoutes = require('./userRoutes');
const commentRoutes = require('./commentRoutes');
const authRoutes = require('./authRoutes');
const collectionRoutes = require('./collectionRoutes');
const bookmarkRoutes = require('./bookmarkRoutes');
const followRoutes = require('./followRoutes');
const likeRoutes = require('./likeRoutes');

router.use('/recipe', recipeRoutes);
router.use('/user', userRoutes);
router.use('/comment', commentRoutes);
router.use('/collections', collectionRoutes);
router.use('/bookmark', bookmarkRoutes);
router.use('/followers', followRoutes);
router.use('/auth', authRoutes);
router.use('/like', likeRoutes);

router.get('/ping', (req, res) => {
	res.status(200).json({
		status: 'ok',
		timestamp: new Date().toISOString()
	});
});

module.exports = router;
