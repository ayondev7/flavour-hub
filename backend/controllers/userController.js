const bcrypt = require("bcrypt");
const User = require("../models/User");
const Follow = require("../models/Follow");
const jwt = require("jsonwebtoken");
const { uploadImage } = require("../utils/imageUpload");
require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY;
const GUEST_USER_EMAIL = process.env.GUEST_USER_EMAIL;
const GUEST_USER_PASSWORD = process.env.GUEST_USER_PASSWORD;

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const imageUrl = await uploadImage(req.file.buffer, `user_${Date.now()}_${req.file.originalname}`);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      image: imageUrl,
      points: 0,
      averageRating: 0,
      numberOfRecipes: 0,
    });

    await newUser.save();

    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    return res.status(201).json({
      message: "User created successfully",
      token,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getLeaderboardRankings = async (req, res) => {
  try {
    const { user } = req;
    const userId = user._id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const users = await User.find();

    const getRank = (points) => {
      if (points >= 1001) return "Legendary Chef";
      if (points >= 501) return "Master Chef";
      if (points >= 301) return "Chef de Cuisine";
      if (points >= 101) return "Sous Chef";
      return "Apprentice Chef";
    };

    const usersWithImagesAndRanks = await Promise.all(
      users.map(async (user) => {
        const rank = getRank(user.points);

        let following = false;
        if (userId) {
          const followStatus = await Follow.findOne({
            follower: userId,
            following: user._id,
          });
          following = !!followStatus;
        }

        return {
          _id: user._id,
          name: user.name,
          email: user.email,
          points: user.points,
          averageRating: user.averageRating,
          numberOfRecipes: user.numberOfRecipes,
          image: user.image,
          rank: rank,
          following: following,
        };
      })
    );

    const sortedUsers = usersWithImagesAndRanks.sort(
      (a, b) => b.points - a.points
    );

    return res.status(200).json(sortedUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const { user } = req;
    const userId = user._id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const users = await User.find();

    const getRank = (points) => {
      if (points >= 1001) return "Legendary Chef";
      if (points >= 501) return "Master Chef";
      if (points >= 301) return "Chef de Cuisine";
      if (points >= 101) return "Sous Chef";
      return "Apprentice Chef";
    };

    const usersWithImagesAndRanks = await Promise.all(
      users.map(async (user) => {
        const rank = getRank(user.points);

        let following = false;
        if (userId) {
          const followStatus = await Follow.findOne({
            follower: userId,
            following: user._id,
          });
          following = followStatus ? true : false;
        }

        return {
          _id: user._id,
          name: user.name,
          email: user.email,
          points: user.points,
          averageRating: user.averageRating,
          numberOfRecipes: user.numberOfRecipes,
          image: user.image,
          rank: rank,
          following: following,
        };
      })
    );

    const filteredUsers = usersWithImagesAndRanks.filter(
      (user) => user._id.toString() !== userId
    );

    return res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.user._id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const foundUser = await User.findById(userId);

    if (!foundUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const userWithImage = {
      _id: foundUser._id,
      name: foundUser.name,
      image: foundUser.image,
    };

    return res.status(200).json(userWithImage);
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email!",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Incorrect Password!",
      });
    }

    const token = jwt.sign({ email: user.email, id: user._id }, SECRET_KEY, {
      expiresIn: "3h",
    });

    return res.status(200).json({
      success: true,
      message: "Login successful!",
      token,
    });
  } catch (error) {
    console.error("Error logging in:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};

const guestLogin = async (req, res) => {
  try {
    if (!GUEST_USER_EMAIL || !GUEST_USER_PASSWORD) {
      console.error("Guest credentials are not defined in environment variables");
      return res.status(500).json({ success: false, message: "Server configuration error" });
    }

    // Find the guest user by email from env
    const user = await User.findOne({ email: GUEST_USER_EMAIL });
    if (!user) {
      return res.status(400).json({ success: false, message: "Guest user not found" });
    }

    // Compare provided guest password from env with stored hashed password
    const isPasswordValid = await bcrypt.compare(GUEST_USER_PASSWORD, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ success: false, message: "Guest credentials are incorrect" });
    }

    const token = jwt.sign({ email: user.email, id: user._id }, SECRET_KEY, {
      expiresIn: "3h",
    });

    return res.status(200).json({ success: true, message: "Guest login successful", token });
  } catch (error) {
    console.error("Error during guest login:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  loginUser,
  getUserById,
  getLeaderboardRankings,
  guestLogin,
};
