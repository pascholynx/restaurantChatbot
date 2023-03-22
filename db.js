const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URL;

// connect to mongodb
function connectToMongoDB() {
    mongoose.connect(MONGODB_URI);

    mongoose.connection.on('connected', () => {
        console.log('Connected to MongoDB successfully');
    });

    mongoose.connection.on('error', (err) => {
        console.log('Error connecting to MongoDB', err);
    });

    //     mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    //   .then(() => console.log("Connected to MongoDB"))
    //   .catch(err => {
    //     console.error("Failed to connect to MongoDB:", err);
    //     process.exit(1);
    //   });
}

module.exports = { connectToMongoDB };