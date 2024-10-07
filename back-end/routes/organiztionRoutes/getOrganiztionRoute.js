const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express'); 
const router = express.Router();




router.get('/organiztions', async (req, res) => {
  const organizationData = await prisma.organization.findMany();
  res.json(organizationData);
  console.log(" organiztion data", organizationData);
});

module.exports = router;
