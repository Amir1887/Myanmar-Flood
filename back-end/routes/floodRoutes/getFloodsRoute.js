const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express'); 
const router = express.Router();



// Example: Fetch all flood data
router.get('/floods', async (req, res) => {
  const floodData = await prisma.floodData.findMany();
  res.json(floodData);
  console.log("new inserted flood data", floodData);
});

module.exports = router;
