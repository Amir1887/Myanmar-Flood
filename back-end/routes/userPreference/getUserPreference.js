const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express'); 
const router = express.Router();




router.get('/user-preference', async (req, res) => {
  const userPreferenceData = await prisma.userPreference.findMany();
  res.json(userPreferenceData);
  console.log("new inserted user Preference Data", userPreferenceData);
});

module.exports = router;
