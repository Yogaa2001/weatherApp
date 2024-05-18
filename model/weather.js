const mongoose = require('mongoose');
// Weather schema
const weatherSchema = new mongoose.Schema({
    city: String,
    date: Date,
    temperature: Number,
    description: String
  });
  
  const Weather = mongoose.model('Weather', weatherSchema);

module.exports = Weather;