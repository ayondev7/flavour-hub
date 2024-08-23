const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables

// Controller function to handle user creation
const createUser = async (req, res) => {
    try {
        // Extract user data from the request body
        const { name, email, password } = req.body;

        // Check if user with the given email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of salt rounds

        // Create a new user instance
        const newUser = new User({
            name,
            email,
            password: hashedPassword, // Save the hashed password
            image: req.file.buffer // Assuming multer middleware saves the image data to req.file.buffer
        });

        // Save the new user to the database
        await newUser.save();

        // Respond with success message
        return res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        // Handle errors
        console.error('Error creating user:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const getAllUsers = async (req, res) => {
    try {
        // Find all users
        const users = await User.find();

        // Convert each user's image binary data to Base64
        const usersWithImages = users.map(user => {
            const base64Image = user.image ? user.image.toString('base64') : null;
            return {
                _id: user._id,
                name: user.name,
                image: base64Image,
            };
        });

        // Respond with the list of users with images as JSON
        return res.status(200).json(usersWithImages);
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


const SECRET_KEY = process.env.SECRET_KEY; // Store this securely in environment variables

// Controller function to handle user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid Email!" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Incorrect Password!" });
        }

        const token = jwt.sign({ email: user.email, id: user._id }, SECRET_KEY, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports = { createUser, getAllUsers, loginUser, getUserById  };
