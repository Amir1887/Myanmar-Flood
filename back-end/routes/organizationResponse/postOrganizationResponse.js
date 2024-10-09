const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require("express");
const router = express.Router();

router.post("/organization-response", async (req, res) => {
  try {
    const {
      id,
      organizationId,
      emergencyId,
      responseDetails,
      responseStatus,
      createdAt,
    } = req.body;

    // Log request body for debugging
    console.log("Request Body: ", req.body);

    const OrganizationResponseData = await prisma.organizationResponse.create({
      data: {
        id,
        organizationId,
        emergencyId,
        responseDetails,
        responseStatus,
        createdAt,
      },
    });

    res.status(201).json(OrganizationResponseData);
  } catch (error) {
    console.error("Error inserting new Organization Response Data: ", error);
    res.status(500).json({
      error: "Failed to insert new  Organization Response Data",
      details: error.message,
    });
  }
});

module.exports = router;
