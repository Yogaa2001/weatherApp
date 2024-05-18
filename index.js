const express = require('express');
const mongoose = require('mongoose');
const route = require('./routes/route');
// const route = require('./routes/route')

const app = express();
const port = 3000;

app.use('/api',route)
// Replace with your MongoDB connection string
const connectionString = 'mongodb://localhost:27017/weather-app';

// Connect to MongoDB
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));


app.listen(port, () => console.log(`Server listening on port ${port}`));
