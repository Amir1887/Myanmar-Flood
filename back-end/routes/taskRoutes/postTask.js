const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require("express");
const router = express.Router();

router.post("/task", async (req, res) => {
  try {
    const { id, description, floodDataId, status, createdAt, volunteerId } =
      req.body;

    // Log request body for debugging
    console.log("Request Body: ", req.body);

    const taskData = await prisma.task.create({
      data: {
        id,
        description,
        floodDataId,
        status,
        createdAt,
        volunteerId,
      },
    });

    res.status(201).json(taskData);
  } catch (error) {
    console.error("Error inserting new submitted task Data: ", error);
    res.status(500).json({
      error: "Failed to insert new  submitted task Data",
      details: error.message,
    });
  }
});

module.exports = router;
