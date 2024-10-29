const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require("express");
const router = express.Router();

router.post("/comments", async (req, res) => {
  try {
    const {
   
    } = req.body;

    // Log request body for debugging
    console.log("Request Body From comments: ", req.body);

    const newCommentData = await prisma.comment.create({
      data: {

      },
    });

    res.status(201).json(newCommentData);
  } catch (error) {
    console.error("Error inserting new comment Data: ", error);
    res.status(500).json({
      error: "Failed to insert commetn data ",
      details: error.message,
    });
  }
});

module.exports = router;
