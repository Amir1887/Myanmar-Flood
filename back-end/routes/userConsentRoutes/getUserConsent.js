const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express'); 
const router = express.Router();




router.get('/user-consent', async (req, res) => {
  const userConsentData = await prisma.userConsent.findMany();
  res.json(userConsentData);
  console.log("new inserted userConsent data", userConsentData);
});

module.exports = router;
