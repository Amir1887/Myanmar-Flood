const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require("express");
const router = express.Router();

router.post("/visualization", async (req, res) => {
  try {
    const { id, title, description, type, data, createdAt } = req.body;

    // Log request body for debugging
    console.log("Request Body: ", req.body);

    const newVisualizationData = await prisma.visualization.create({
      data: {
        id,
        title,
        description,
        type,
        data,
        createdAt,
      },
    });

    res.status(201).json(newVisualizationData);
  } catch (error) {
    console.error("Error creating visualization: ", error);
    res
      .status(500)
      .json({
        error: "Failed to create visualization",
        details: error.message,
      });
  }
});

module.exports = router;
