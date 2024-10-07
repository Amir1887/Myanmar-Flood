const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express'); 
const router = express.Router();




router.get('/donations', async (req, res) => {
  const donationsData = await prisma.donation.findMany();
  res.json(donationsData);
  console.log("new inserted flood data", floodData);
});

module.exports = router;
