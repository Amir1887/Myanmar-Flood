const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express'); 
const router = express.Router();



// Example: Fetch all flood data
router.get('/health', async (req, res) => {
  const healthData = await prisma.healthData.findMany();
  res.json(healthData);
  console.log(" health data", healthData);
});

module.exports = router;
