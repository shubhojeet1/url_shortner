const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,  
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    if (err.name === 'MongoTimeoutError') {
      console.error('MongoDB connection timeout. Please try again later.');
    }
    process.exit(1); 
  }
};

module.exports = connectDB;
