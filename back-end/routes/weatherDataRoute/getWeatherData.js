const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express'); 
const router = express.Router();




router.get('/weather-data', async (req, res) => {
  const weatherData = await prisma.weatherData.findMany();
  res.json(weatherData);
  console.log("new inserted weather Data", weatherData);
});

module.exports = router;
