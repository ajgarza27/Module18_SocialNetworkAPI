// server.js
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up routes
const apiRoutes = require('./routes');
app.use('/api', apiRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/myspace', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Mongoose is connected');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});