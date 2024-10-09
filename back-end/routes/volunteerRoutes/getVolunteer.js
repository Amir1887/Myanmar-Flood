
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express'); 
const router = express.Router();




router.get('/volunteer', async (req, res) => {
  const volunteerData = await prisma.volunteer.findMany();
  res.json(volunteerData);
  console.log("historical submitted volunteer Data", volunteerData);
});

module.exports = router;
