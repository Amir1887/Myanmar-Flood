const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express'); 
const router = express.Router();




router.get('/volunteer-application', async (req, res) => {
  const volunteerApplicationData = await prisma.volunteerApplication.findMany();
  res.json(volunteerApplicationData);
  console.log("historical submitted volunteer Application Data", volunteerApplicationData);
});

module.exports = router;
