const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express'); 
const router = express.Router();




router.get('/map-data', async (req, res) => {
  const mapData = await prisma.mapData.findMany();
  res.json(mapData);
  console.log("historical map Data", mapData);
});

module.exports = router;
