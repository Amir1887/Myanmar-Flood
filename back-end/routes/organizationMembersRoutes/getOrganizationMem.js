const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express'); 
const router = express.Router();




router.get('/organiztion-members', async (req, res) => {
  const organizationMemData = await prisma.organizationMember.findMany();
  res.json(organizationMemData);
  console.log(" organiztion members data", organizationMemData);
});

module.exports = router;
