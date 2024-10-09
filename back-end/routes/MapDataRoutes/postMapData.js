const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require("express");
const router = express.Router();

router.post("/map-data", async (req, res) => {
  try {
    const {
      id,
      region,
      mapUrl,
      coordinates,
      floodDataId,
      zoomLevel,
      createdAt,
      apiSource,
    } = req.body;

    // Log request body for debugging
    console.log("Request Body: ", req.body);

    const mapData = await prisma.mapData.create({
      data: {
        id,
        region,
        mapUrl,
        coordinates,
        floodDataId,
        zoomLevel,
        createdAt,
        apiSource,
      },
    });

    res.status(201).json(mapData);
  } catch (error) {
    console.error("Error inserting new map Data: ", error);
    res.status(500).json({
      error: "Failed to insert new  map Data",
      details: error.message,
    });
  }
});

module.exports = router;
