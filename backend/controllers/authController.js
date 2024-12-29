const jwt = require('jsonwebtoken');

// Controller function to verify token
const verifyToken = (req, res) => {
  // Extract the token from the "Authorization" header
  const token = req.headers['authorization']?.split(' ')[1]; // Get token after "Bearer"

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized, token required' });
  }

  try {
    // Verify the token using the secret key stored in environment variables
    jwt.verify(token, process.env.SECRET_KEY);

    // Respond with success status
    res.status(200).json({ message: 'Token is valid' });
  } catch (error) {
    // Handle invalid or expired token
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};

module.exports = { verifyToken };
