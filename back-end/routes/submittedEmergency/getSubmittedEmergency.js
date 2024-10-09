const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express'); 
const router = express.Router();




router.get('/submitted-emergency', async (req, res) => {
  const submittedEmergencyData = await prisma.submittedEmergency.findMany();
  res.json(submittedEmergencyData);
  console.log("historical submitted Emergency Data", submittedEmergencyData);
});

module.exports = router;
