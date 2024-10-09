const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express'); 
const router = express.Router();




router.get('/feedback', async (req, res) => {
  const feedbackData = await prisma.feedback.findMany();
  res.json(feedbackData);
  console.log("new inserted feedback Data", feedbackData);
});

module.exports = router;
