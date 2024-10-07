const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express'); 
const router = express.Router();




router.get('/commuinityResil', async (req, res) => {
  const commuinityResilData = await prisma.communityResilience.findMany();
  res.json(commuinityResilData);
  console.log("commuinityResilData data", commuinityResilData);
});

module.exports = router;
