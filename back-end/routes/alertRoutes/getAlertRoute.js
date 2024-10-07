const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express'); 
const router = express.Router();




router.get('/alerts', async (req, res) => {
  const alertsData = await prisma.alert.findMany();
  res.json(alertsData);
  console.log("new inserted alert data", alertsData);
});

module.exports = router;
