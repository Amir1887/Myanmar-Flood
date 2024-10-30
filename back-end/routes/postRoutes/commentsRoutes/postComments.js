const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require("express");
const router = express.Router();

router.post("/comments-org", async (req, res) => {
  try {
    const {
      commentInfo, PostId, orgId
    } = req.body;

    // Log request body for debugging
    console.log("Request Body From comments: ", req.body);

    const newCommentData = await prisma.comment.create({
      data: {
        content: commentInfo, 
        postId: PostId, 
        organizationId: orgId
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

router.post("/comments-user", async (req, res) => {
  try {
    const {
        content, createdAt, postId, userId
    } = req.body;

    // Log request body for debugging
    console.log("Request Body From comments: ", req.body);

    // const newCommentData = await prisma.comment.create({
    //   data: {
    //     content, createdAt, postId, userId, organizationId
    //   },
    // });

    // res.status(201).json(newCommentData);
  } catch (error) {
    console.error("Error inserting new comment Data: ", error);
    res.status(500).json({
      error: "Failed to insert commetn data ",
      details: error.message,
    });
  }
});

module.exports = router;
