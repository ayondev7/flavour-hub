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
const authRoutes = require('./routes/authRoutes');
const collectionRoutes = require('./routes/collectionRoutes');
const bookmarkRoutes = require('./routes/bookmarkRoutes');
const followRoutes = require('./routes/followRoutes');
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
const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB successfully!');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // Exit the process if the connection fails
  }
};

// Call the function to establish the connection
connectToDatabase();


app.use('/api/recipe',recipeRoutes);

app.use('/api/user',userRoutes);

app.use('/api/comment',commentRoutes);

app.use('/api/collections',collectionRoutes);

app.use('/api/bookmark',bookmarkRoutes);

app.use('/api/followers',followRoutes);

app.use('/api/auth', authRoutes);



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
