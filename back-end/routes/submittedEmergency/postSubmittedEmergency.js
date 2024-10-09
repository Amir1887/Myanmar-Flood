const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require("express");
const router = express.Router();

router.post("/submitted-emergency", async (req, res) => {
  try {
    const {
      id,
      region,
      emergencyType,
      description,
      submitterId,
      submissionStatus,
      createdAt,
      associatedPlanId,
    } = req.body;

    // Log request body for debugging
    console.log("Request Body: ", req.body);

    const submittedEmergencyData = await prisma.submittedEmergency.create({
      data: {
        id,
        region,
        emergencyType,
        description,
        submitterId,
        submissionStatus,
        createdAt,
        associatedPlanId,
      },
    });

    res.status(201).json(submittedEmergencyData);
  } catch (error) {
    console.error("Error inserting new submitted EmergencyData: ", error);
    res.status(500).json({
      error: "Failed to insert new  submitted EmergencyData",
      details: error.message,
    });
  }
});

module.exports = router;
