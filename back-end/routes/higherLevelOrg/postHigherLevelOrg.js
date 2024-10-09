const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require("express");
const router = express.Router();

router.post("/higher-level-org", async (req, res) => {
  try {
    const { id, name, contactInfo, region, createdAt } = req.body;

    // Log request body for debugging
    console.log("Request Body: ", req.body);

    const newHigherLevelOrgData = await prisma.highLevelOrganization.create({
      data: {
        id,
        name,
        contactInfo,
        region,
        createdAt,
      },
    });

    res.status(201).json(newHigherLevelOrgData);
  } catch (error) {
    console.error("Error inserting new Higher Level Org Data: ", error);
    res.status(500).json({
      error: "Failed to insert new Higher Level Org Data",
      details: error.message,
    });
  }
});

module.exports = router;
