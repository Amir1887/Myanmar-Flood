const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express'); 
const router = express.Router();




router.get('/posts', async (req, res) => {
  const postData = await prisma.post.findMany({
    include: {
      comments: true, // Include all comments related to each post
      likes: true     // Include all likes related to each post
    }
  });
  res.json(postData);
  console.log(" post data", postData);
});

module.exports = router;
