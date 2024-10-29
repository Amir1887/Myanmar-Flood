const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express'); 
const router = express.Router();




router.get('/likes', async (req, res) => {
  const likesData = await prisma.like.findMany();
  res.json(likesData);
  console.log(" likes data", likesData);
});

module.exports = router;
