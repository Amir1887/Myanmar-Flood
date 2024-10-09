const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express'); 
const router = express.Router();




router.get('/emergency-response-plan', async (req, res) => {
  const emergencyResponsePlanData = await prisma.emergencyResponsePlan.findMany();
  res.json(emergencyResponsePlanData);
  console.log("new inserted emergency Response Plan Data", floodData);
});

module.exports = router;
