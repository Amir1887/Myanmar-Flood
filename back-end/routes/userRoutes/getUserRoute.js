const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express'); 
const router = express.Router();




router.get('/user', async (req, res) => {
  const userData = await prisma.user.findMany();
  res.json(userData);
  console.log("new inserted user data", userData);
});

module.exports = router;
