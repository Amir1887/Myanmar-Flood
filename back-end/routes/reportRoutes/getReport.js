
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express'); 
const router = express.Router();




router.get('/report', async (req, res) => {
  const reportData = await prisma.report.findMany();
  res.json(reportData);
  console.log(" report Data", reportData);
});

module.exports = router;
