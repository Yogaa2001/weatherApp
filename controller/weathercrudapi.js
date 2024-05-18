
const Weather = require('../model/weather');

 const getData = async (req, res) => {
    const city = req.params.city;
    const apiKey = 'c7101942bf62df6c2f142729b7ac4bdf'; // Replace with your API key
  
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
      const weatherData = response.data;
  
      const newWeather = new Weather({
        city: weatherData.name,
        date: new Date(),
        temperature: weatherData.main.temp,
        description: weatherData.weather[0].description
      });
  
      await newWeather.save();
  
      res.json(weatherData);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching weather data' });
    }
  };

// Create weather data
 const createData = async (req, res) => {
    try {
      const weather = new Weather(req.body);
      await weather.save();
      res.status(201).send(weather);
    } catch (error) {
      res.status(400).send(error);
    }
  };
  
  // Read all weather data
  const getAllData =  async (req, res) => {
    try {
      const weatherData = await Weather.find();
      res.send(weatherData);
    } catch (error) {
      res.status(500).send(error);
    }
  };
  
  // Update weather data
   const updateData = async (req, res) => {
    try {
      const { id } = req.params;
      const weather = await Weather.findByIdAndUpdate(id, req.body, { new: true });
      if (!weather) {
        return res.status(404).send();
      }
      res.send(weather);
    } catch (error) {
      res.status(400).send(error);
    }
  };

  // Delete weather data
   const deleteData = async (req, res) => {
    try {
      const { id } = req.params;
      const weather = await Weather.findByIdAndDelete(id);
      if (!weather) {
        return res.status(404).send();
      }
      res.send(weather);
    } catch (error) {
      res.status(500).send(error);
    }
  };

  module.exports = {getData,createData,getAllData,updateData,deleteData};