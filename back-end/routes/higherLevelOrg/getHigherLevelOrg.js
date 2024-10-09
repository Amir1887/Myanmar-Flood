const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express'); 
const router = express.Router();




router.get('/higher-level-org', async (req, res) => {
  const higherLevelOrgData = await prisma.highLevelOrganization.findMany();
  res.json(higherLevelOrgData);
  console.log("higher Level Org Data ", higherLevelOrgData);
});

module.exports = router;
