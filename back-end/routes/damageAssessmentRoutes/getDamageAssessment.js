const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express'); 
const router = express.Router();




router.get('/damage-assessment', async (req, res) => {
  const damageAssessmentData = await prisma.damageAssessment.findMany();
  res.json(damageAssessmentData);
  console.log(" damage Assessment Data ", damageAssessmentData);
});

module.exports = router;
