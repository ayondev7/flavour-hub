const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.verifyToken = async (req, res) => {
  const authHeader = req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found. Invalid token.' });
    }

    res.status(200).json({
      message: 'Token is valid',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};
