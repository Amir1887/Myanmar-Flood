const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express'); 
const router = express.Router();




router.get('/decision-maker', async (req, res) => {
  const decisionMakerData = await prisma.decisionMaker.findMany();
  res.json(decisionMakerData);
  console.log("decision Maker Data ", decisionMakerData);
});

module.exports = router;
