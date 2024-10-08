const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require("express");
const router = express.Router();

router.post("/disease-outbreak", async (req, res) => {
  try {
    const {
      id,
      region,
      disease,
      confirmedCases,
      suspectedCases,
      fatalities,
      waterContamination,
      outbreakStatus,
      submitterName,
      submitterEmail,
      submitterRole,
      timestamp,
      createdAt,
    } = req.body;

    // Log request body for debugging
    console.log("Request Body: ", req.body);

    const newdiseaseOutbreakData = await prisma.diseaseOutbreak.create({
      data: {
        id,
        region,
        disease,
        confirmedCases,
        suspectedCases,
        fatalities,
        waterContamination,
        outbreakStatus,
        submitterName,
        submitterEmail,
        submitterRole,
        timestamp,
        createdAt,
      },
    });

    res.status(201).json(newdiseaseOutbreakData);
  } catch (error) {
    console.error("Error inserting new disease Outbreak Data: ", error);
    res
      .status(500)
      .json({
        error: "Failed to insert new disease Outbreak Data",
        details: error.message,
      });
  }
});

module.exports = router;
