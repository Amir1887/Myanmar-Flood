const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express'); 
const router = express.Router();




router.get('/posts', async (req, res) => {
  const postData = await prisma.post.findMany();
  res.json(postData);
  console.log(" post data", postData);
});

module.exports = router;
