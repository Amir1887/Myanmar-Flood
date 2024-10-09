const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require("express");
const router = express.Router();

router.post("/volunteer-application", async (req, res) => {
  try {
    const {
      id,
      userId,
      organizationId,
      skills,
      status,
      createdAt,
      reviewedAt,
      notes,
    } = req.body;

    // Log request body for debugging
    console.log("Request Body: ", req.body);

    const volunteerApplicationData = await prisma.volunteerApplication.create({
      data: {
        id,
        userId,
        organizationId,
        skills,
        status,
        createdAt,
        reviewedAt,
        notes,
      },
    });

    res.status(201).json(volunteerApplicationData);
  } catch (error) {
    console.error(
      "Error inserting new submitted volunteer Application Data: ",
      error
    );
    res.status(500).json({
      error: "Failed to insert new  submitted volunteer Application Data",
      details: error.message,
    });
  }
});

module.exports = router;
