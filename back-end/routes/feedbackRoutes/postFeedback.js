const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require("express");
const router = express.Router();

router.post("/feedback", async (req, res) => {
  try {
    const {
      id,
      userId,
      feedbackType,
      resourceId,
      rating,
      comments,
      isAnonymous,
      status,
      adminResponse,
      respondedAt,
      createdAt,
      updatedAt,
    } = req.body;

    // Log request body for debugging
    console.log("Request Body: ", req.body);

    const newfeedbackData = await prisma.feedback.create({
      data: {
        id,
        userId,
        feedbackType,
        resourceId,
        rating,
        comments,
        isAnonymous,
        status,
        adminResponse,
        respondedAt,
        createdAt,
        updatedAt,
      },
    });

    res.status(201).json(newfeedbackData);
  } catch (error) {
    console.error("Error inserting new feedback Data: ", error);
    res.status(500).json({
      error: "Failed to insert new feedback Data",
      details: error.message,
    });
  }
});

module.exports = router;
