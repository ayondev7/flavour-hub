const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const http = require('http');
const socketIo = require('socket.io');
const Notification = require('./models/Notification');
const cors = require('cors');
const recipeRoutes = require('./routes/recipeRoutes')
const userRoutes = require('./routes/userRoutes');
const commentRoutes = require('./routes/commentRoutes');
require('dotenv').config(); // Load environment variables

const app = express();
const port = process.env.PORT || 5000; // Change port to 5000
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*', // Adjust this to restrict allowed origins
    methods: ['GET', 'POST'],
  },
});

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to enable CORS
app.use(cors());

// Body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI);

app.use('/api/recipe',recipeRoutes);

app.use('/api/user',userRoutes);

app.use('/api/comment',commentRoutes);

  // Watch for changes in notifications
const changeStream = Notification.watch();
changeStream.on('change', (change) => {
  if (change.operationType === 'insert') {
    io.emit('new_notification'); // Emit only the event without any data
  }
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
