const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express'); 
const router = express.Router();




router.get('/organization-response', async (req, res) => {
  const organizationResponseData = await prisma.organizationResponse.findMany();
  res.json(organizationResponseData);
  console.log("historical organization Response Data", organizationResponseData);
});

module.exports = router;
