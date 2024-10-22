const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.post("/volunteer-application", async (req, res) => {
  try {
    // Extracting the volunteer application data from the request body
    const volunteerApplication = req.body;

    const {
      userId,
      skills,
      education,
      preferredAreas,
      previousExperience,
      availability,
      languages,
      location,
      emergencyContact,
      motivation,
      certifications,
      notes,
    } = volunteerApplication;

    // Create a new volunteer application record in the database
    const volunteerApplicationData = await prisma.volunteerApplication.create({
      data: {
        userId,
        skills,
        education,
        preferredAreas,
        previousExperience,
        availability,
        languages,
        location,
        emergencyContact,
        motivation,
        certifications,
        notes,
      },
    });

    res.status(201).json(volunteerApplicationData);
  } catch (error) {
    console.error("Error inserting new submitted volunteer application data: ", error);
    res.status(500).json({
      error: "Failed to insert new submitted volunteer application data",
      details: error.message,
    });
  }
});


router.post("/volunteer-application/:appId", async (req, res) => {
  try {
    // Extracting the volunteer application data from the request body
    const { appId } = req.params;

    const {
      status,
      reviewedAt,
      organizationId,
    } = req.body;

    // Update the existing volunteer application record in the database
    const volunteerApplicationData = await prisma.volunteerApplication.update({
      where: {
        id: parseInt(appId),  // Ensure appId is parsed as an integer
      },
      data: {
        status,
        reviewedAt,
        organizationId,
      },
    });

    res.status(201).json(volunteerApplicationData);
  } catch (error) {
    console.error("Error updating volunteer application status: ", error);
    res.status(500).json({
      error: "Failed to update volunteer application status",
      details: error.message,
    });
  }
});

module.exports = router;
