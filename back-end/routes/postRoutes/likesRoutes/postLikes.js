const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require("express");
const router = express.Router();

router.post("/likes", async (req, res) => {
  try {
    const {
        createdAt, postId, userId, organizationId
    } = req.body;

    // Log request body for debugging
    console.log("Request Body From likes: ", req.body);

    const newlikeData = await prisma.like.create({
      data: {
        createdAt, postId, userId, organizationId
      },
    });

    res.status(201).json(newlikeData);
  } catch (error) {
    console.error("Error inserting new like Data: ", error);
    res.status(500).json({
      error: "Failed to insert newlikeData ",
      details: error.message,
    });
  }
});

module.exports = router;
