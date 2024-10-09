const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require("express");
const router = express.Router();

router.post("/decision-maker", async (req, res) => {
  try {
    const { id, name, email, role, highLevelOrgId, createdAt } = req.body;

    // Log request body for debugging
    console.log("Request Body: ", req.body);

    const newDecisionMakerData = await prisma.decisionMaker.create({
      data: {
        id,
        name,
        email,
        role,
        highLevelOrgId,
        createdAt,
      },
    });

    res.status(201).json(newDecisionMakerData);
  } catch (error) {
    console.error("Error inserting new Decision Maker Data: ", error);
    res.status(500).json({
      error: "Failed to insert new Decision Maker Data",
      details: error.message,
    });
  }
});

module.exports = router;
