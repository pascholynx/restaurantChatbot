const mongoose = require("mongoose");
require("dotenv").config();

const mongoURI = process.env.MONGO_URI;

const connectToMongoDB = async () => {
    try {
      await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("MongoDB connected.");
    } catch (err) {
      console.error("Error connecting to MongoDB:", err);
    }
  };
  

module.exports = { connectToMongoDB };