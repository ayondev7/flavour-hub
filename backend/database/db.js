const mongoose = require('mongoose');

const connectToDatabase = async (mongoUri) => {
  if (!mongoUri) throw new Error('MONGO_URI is required to connect to the database');
  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB successfully!');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  }
};

module.exports = { connectToDatabase };
