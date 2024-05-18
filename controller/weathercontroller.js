const axios = require('axios');

// Function to fetch weather data from API (assuming API supports historical data)
async function getWeatherData(city, date) {
    const apiKey = 'c7101942bf62df6c2f142729b7ac4bdf'; // Replace with your API key
    const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'; // Replace with appropriate endpoint for historical data if your API supports it
  
    try {
      const response = await axios.get(`${baseUrl}?q=${city}&appid=${apiKey}&dt=${date.getTime() / 1000}`);
      return response.data;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
  
  // API endpoint to get weather data for a specific location and date range
  
  const getFilterData =  async (req, res) => {
    const city = req.params.city;
    const fromDate = new Date(req.params.from);
    const toDate = new Date(req.params.to);
  
    const validCities = ['Delhi', 'Moscow', 'Paris', 'New York', 'Sydney', 'Riyadh'];
    if (!validCities.includes(city)) {
      return res.status(400).json({ message: 'Invalid city' });
    }
  
    if (fromDate > toDate) {
      return res.status(400).json({ message: 'From date cannot be after To date' });
    }
  
    let weatherData = [];
    for (let currentDate = fromDate; currentDate <= toDate; currentDate.setDate(currentDate.getDate() + 1)) {
      const data = await getWeatherData(city, currentDate);
      if (data) {
        weatherData.push(data);
      }
    }
  
    res.json(weatherData);
  };

  module.exports = {getFilterData}