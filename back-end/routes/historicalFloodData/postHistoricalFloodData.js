const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require("express");
const router = express.Router();

router.post("/historical-flood-data", async (req, res) => {
  try {
    const { id, region, year, severity, affectedPeople, floodDataId } =
      req.body;

    // Log request body for debugging
    console.log("Request Body: ", req.body);

    const historicalFloodData = await prisma.historicalFloodData.create({
      data: {
        id,
        region,
        year,
        severity,
        affectedPeople,
        floodDataId,
      },
    });

    res.status(201).json(historicalFloodData);
  } catch (error) {
    console.error("Error inserting new historical Flood Data: ", error);
    res.status(500).json({
      error: "Failed to insert new historical Flood Data",
      details: error.message,
    });
  }
});

module.exports = router;
