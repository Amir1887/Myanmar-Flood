const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express'); 
const router = express.Router();




router.get('/comments', async (req, res) => {
  const commentsData = await prisma.comment.findMany();
  res.json(commentsData);
  console.log(" comments data", commentsData);
});

module.exports = router;
