const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express'); 
const router = express.Router();




router.get('/api-log', async (req, res) => {
  const apiLogData = await prisma.aPILog.findMany();
  res.json(apiLogData);
  console.log("api Log Data ", apiLogData);
});

module.exports = router;
