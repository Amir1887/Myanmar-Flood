const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express'); 
const router = express.Router();




router.get('/disease-outbreak', async (req, res) => {
  const diseaseOutbreakData = await prisma.donation.findMany();
  res.json(diseaseOutbreakData);
  console.log("new inserted disease Outbreak Data ", floodData);
});

module.exports = router;
