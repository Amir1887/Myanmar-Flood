const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express'); 
const router = express.Router();




router.get('/historical-flood-data', async (req, res) => {
  const historicalFloodData = await prisma.historicalFloodData.findMany();
  res.json(historicalFloodData);
  console.log("historical Flood Data", historicalFloodData);
});

module.exports = router;
