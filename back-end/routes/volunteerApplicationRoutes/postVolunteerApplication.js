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

module.exports = router;
