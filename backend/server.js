require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const socketManager = require("./socket/socketManager");
const recipeRoutes = require("./routes/recipeRoutes");
const userRoutes = require("./routes/userRoutes");
const commentRoutes = require("./routes/commentRoutes");
const authRoutes = require("./routes/authRoutes");
const collectionRoutes = require("./routes/collectionRoutes");
const bookmarkRoutes = require("./routes/bookmarkRoutes");
const followRoutes = require("./routes/followRoutes");
const likeRoutes = require("./routes/likeRoutes");
if (!process.env.PORT)
  throw new Error("PORT environment variable is not defined.");
if (!process.env.MONGO_URI)
  throw new Error("MONGO_URI environment variable is not defined.");
if (!process.env.CORS_ORIGIN)
  throw new Error("CORS_ORIGIN environment variable is not defined.");

const app = express();
const port = process.env.PORT;
const server = http.createServer(app);

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB successfully!");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  }
};

connectToDatabase();

app.use("/api/recipe", recipeRoutes);
app.use("/api/user", userRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/collections", collectionRoutes);
app.use("/api/bookmark", bookmarkRoutes);
app.use("/api/followers", followRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/like", likeRoutes);

const io = socketIo(server, {
  cors: {
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  },
});

socketManager.initialize(io);

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
