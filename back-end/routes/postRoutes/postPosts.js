const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require("express");
const router = express.Router();

router.post("/posts", async (req, res) => {
  try {
    const {
      content,
      imageUrl,
      createdAt,
      updatedAt,
      userId,
      organizationId,
      orgMemberId,
      higherOrgId,
      decisionMakerId,
    } = req.body;

    // Log request body for debugging
    console.log("Request Body From posts: ", req.body);

    const newPostData = await prisma.post.create({
      data: {
        content,
        imageUrl,
        createdAt,
        updatedAt,
        userId,
        organizationId,
        orgMemberId,
        higherOrgId,
        decisionMakerId,
      },
    });

    res.status(201).json(newPostData);
  } catch (error) {
    console.error("Error inserting new Post Data: ", error);
    res.status(500).json({
      error: "Failed to insert newPostData ",
      details: error.message,
    });
  }
});

module.exports = router;
