const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express'); 
const router = express.Router();




router.get('/visualization', async (req, res) => {
  const visualizationData = await prisma.visualization.findMany();
  res.json(visualizationData);
  console.log("new inserted visualization data", visualizationData);
});

module.exports = router;
