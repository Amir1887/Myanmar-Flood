const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express'); 
const router = express.Router();




router.get('/resources', async (req, res) => {
  const resourceData = await prisma.resource.findMany();
  res.json(resourceData);
  console.log(" resource data", resourceData);
});

module.exports = router;
