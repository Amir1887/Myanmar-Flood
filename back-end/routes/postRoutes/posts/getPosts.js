const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require("express");
const router = express.Router();

router.get("/posts/grouped", async (req, res) => {
  try {
    // Fetch organization posts with comments and user/org details for each comment
    const organizationPosts = await prisma.post.findMany({
      where: {
        organizationId: {
          not: null,
        },
      },
      include: {
        comments: {
          include: {
            user: true,           // Include user details if comment was made by a user
            organization: true,    // Include organization details if comment was made by an organization
          },
        },
        likes: true,
      },
    });

    // Fetch user posts with comments and user/org details for each comment
    const userPosts = await prisma.post.findMany({
      where: {
        userId: {
          not: null,
        },
      },
      include: {
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
