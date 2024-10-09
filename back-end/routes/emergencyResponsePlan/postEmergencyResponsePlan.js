const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require("express");
const router = express.Router();

router.post("/emergency-response-plan", async (req, res) => {
  try {
    const {
      id,
      region,
      planDetails,
      emergencyType,
      responsibleOrgId,
      contactPerson,
      contactEmail,
      status,
      timeline,
      riskLevel,
      priority,
      createdAt,
    } = req.body;

    // Log request body for debugging
    console.log("Request Body: ", req.body);

    const newEmergencyResponsePlanData =
      await prisma.emergencyResponsePlan.create({
        data: {
          id,
          region,
          planDetails,
          emergencyType,
          responsibleOrgId,
          contactPerson,
          contactEmail,
          status,
          timeline,
          riskLevel,
          priority,
          createdAt,
        },
      });

    res.status(201).json(newEmergencyResponsePlanData);
  } catch (error) {
    console.error("Error inserting new Emergency Response Plan Data: ", error);
    res
      .status(500)
      .json({
        error: "Failed to insert new Emergency Response Plan Data",
        details: error.message,
      });
  }
});

module.exports = router;
