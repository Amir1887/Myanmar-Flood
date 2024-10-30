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

router.get('/posts/grouped', async (req, res) => {
  try {
    // Fetch all posts related to organizations
    const organizationPosts = await prisma.post.findMany({
      where: {
        organizationId: {
          not: null // Ensures we only get posts associated with organizations
        }
      },
      include: {
        comments: true,
        likes: true,
      }
    });

    // Fetch all posts related to users
    const userPosts = await prisma.post.findMany({
      where: {
        userId: {
          not: null // Ensures we only get posts associated with users
        }
      },
      include: {
        comments: true,
        likes: true,
      }
    });

    // Return both groups of posts in a single response
    res.json({ organizationPosts, userPosts });
    console.log("Grouped posts by organization and user:", { organizationPosts, userPosts });
  } catch (error) {
    console.error("Error fetching grouped posts:", error);
    res.status(500).json({ error: "An error occurred while fetching grouped posts." });
  }
});

module.exports = router;
