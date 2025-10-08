require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const rateLimit = require('express-rate-limit');
const socketManager = require("./socket/socketManager");
const { connectToDatabase } = require('./database/db');
const apiRoutes = require('./routes/index');

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
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectToDatabase(process.env.MONGO_URI);

app.use('/api', apiRoutes);

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
