const bcrypt = require('bcrypt');
const User = require('../models/User');
const Follow = require('../models/Follow');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables
const SECRET_KEY = process.env.SECRET_KEY; // Store this securely in environment variables

// Controller function to handle user creation
const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if a user with the given email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of salt rounds

        // Create a new user instance with the new fields (points, averageRating, and numberOfRecipes)
        const newUser = new User({
            name,
            email,
            password: hashedPassword, // Save the hashed password
            image: req.file?.buffer, // Assuming multer middleware saves the image data to req.file.buffer
            points: 0,               // Default points to 0
            averageRating: 0,        // Default average rating to 0
            numberOfRecipes: 0       // Default number of recipes to 0
        });

        // Save the new user to the database
        await newUser.save();

        // Generate a JWT token
        const token = jwt.sign({ email: newUser.email, id: newUser._id }, SECRET_KEY, { expiresIn: '1h' });

        // Respond with success message and token
        return res.status(201).json({ 
            message: 'User created successfully', 
            token 
        });
    } catch (error) {
        // Handle errors
        console.error('Error creating user:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const getLeaderboardRankings = async (req, res) => {
    try {
        const { userId } = req.params; // Extract userId from request params

        // Find all users
        const users = await User.find();

        // Define rank tiers based on points
        const getRank = (points) => {
            if (points >= 1001) return 'Legendary Chef';
            if (points >= 501) return 'Master Chef';
            if (points >= 301) return 'Chef de Cuisine';
            if (points >= 101) return 'Sous Chef';
            return 'Apprentice Chef'; // For 0 to 100 points
        };

        // Map users to include additional data (image, rank, following status)
        const usersWithImagesAndRanks = await Promise.all(
            users.map(async (user) => {
                const base64Image = user.image ? user.image.toString('base64') : null;
                const rank = getRank(user.points); // Get rank based on user's points

                // Check if userId is provided, and if so, lookup follow status
                let following = false;
                if (userId) {
                    const followStatus = await Follow.findOne({ follower: userId, following: user._id });
                    following = !!followStatus; // Convert to boolean
                }

                return {
                    _id: user._id,
                    name: user.name,
                    email: user.email, // Include email if needed
                    points: user.points,
                    averageRating: user.averageRating,
                    numberOfRecipes: user.numberOfRecipes,
                    image: base64Image,
                    rank: rank, // Add rank to the response
                    following: following // Add following status if userId is provided
                };
            })
        );

        // Sort users by points in descending order
        const sortedUsers = usersWithImagesAndRanks.sort((a, b) => b.points - a.points);

        // Respond with the sorted list
        return res.status(200).json(sortedUsers);
    } catch (error) {
        // Handle errors
        console.error('Error fetching users:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};


const getAllUsers = async (req, res) => {
    try {
        const { userId } = req.params; // Extract userId from request params

        // Find all users
        const users = await User.find();

        // Define rank tiers based on points
        const getRank = (points) => {
            if (points >= 1001) return 'Legendary Chef';
            if (points >= 501) return 'Master Chef';
            if (points >= 301) return 'Chef de Cuisine';
            if (points >= 101) return 'Sous Chef';
            return 'Apprentice Chef'; // For 0 to 100 points
        };

        // If userId is provided, lookup the 'follow' collection to check for following status
        const usersWithImagesAndRanks = await Promise.all(users.map(async (user) => {
            const base64Image = user.image ? user.image.toString('base64') : null;
            const rank = getRank(user.points); // Get rank based on user's points

            // Check if userId is provided, and if so, lookup follow status
            let following = false;
            if (userId) {
                const followStatus = await Follow.findOne({ follower: userId, following: user._id });
                following = followStatus ? true : false;
            }

            return {
                _id: user._id,
                name: user.name,
                email: user.email, // Include email if needed
                points: user.points,
                averageRating: user.averageRating,
                numberOfRecipes: user.numberOfRecipes,
                image: base64Image,
                rank: rank, // Add rank to the response
                following: following // Add following status if userId is provided
            };
        }));

        // Filter out the user with the userId from the list
        const filteredUsers = usersWithImagesAndRanks.filter(user => user._id.toString() !== userId);

        // Respond with the list of users with images, ranks, and following status
        return res.status(200).json(filteredUsers);
    } catch (error) {
        // Handle errors
        console.error('Error fetching users:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};



const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;

        // Find the user by ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Convert user's image binary data to Base64
        const base64Image = user.image ? user.image.toString('base64') : null;

        // Construct the user object with Base64 image
        const userWithImage = {
            _id: user._id,
            name: user.name,
            image: base64Image,
            // Add other user properties here if needed
        };

        // Respond with the user object including the image as JSON
        return res.status(200).json(userWithImage);
    } catch (error) {
        // Handle errors
        console.error('Error fetching user:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};


// Controller function to handle user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid Email!"
            });
        }

        // Validate the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: "Incorrect Password!"
            });
        }

        // Generate JWT token
        const token = jwt.sign({ email: user.email, id: user._id }, SECRET_KEY, { expiresIn: '1h' });

        // Send a successful response
        return res.status(200).json({
            success: true,
            message: "Login successful!",
            token
        });
    } catch (error) {
        console.error('Error logging in:', error);

        // Send a generic server error response
        return res.status(500).json({
            success: false,
            message: "Internal server error. Please try again later."
        });
    }
};



module.exports = { createUser, getAllUsers, loginUser, getUserById,getLeaderboardRankings  };
