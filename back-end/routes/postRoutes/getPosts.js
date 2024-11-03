const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require("express");
const router = express.Router();

router.get("/posts/grouped", async (req, res) => {
  try {
    // Fetch organization posts with comments, user/org details for each comment, and post author
    const organizationPosts = await prisma.post.findMany({
      where: {
        organizationId: {
          not: null,
        },
      },
      include: {
        organization: true,  // Include organization details if the post is authored by an organization
        comments: {
          include: {
            user: true,           // Include user details if comment was made by a user
            organization: true,    // Include organization details if comment was made by an organization
          },
        },
        likes: true,
      },
    });

    // Fetch user posts with comments, user/org details for each comment, and post author
    const userPosts = await prisma.post.findMany({
      where: {
        userId: {
          not: null,
        },
      },
      include: {
        user: true,  // Include user details if the post is authored by a user
        comments: {
          include: {
            user: true,
            organization: true,
          },
        },
        likes: true,
      },
    });

    res.json({ organizationPosts, userPosts });
    console.log("Grouped posts by organization and user:", { organizationPosts, userPosts });
  } catch (error) {
    console.error("Error fetching grouped posts:", error);
    res.status(500).json({ error: "An error occurred while fetching grouped posts." });
  }
});

module.exports = router;
