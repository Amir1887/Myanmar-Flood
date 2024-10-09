const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require("express");
const router = express.Router();

router.post("/user-preference", async (req, res) => {
  try {
    const {
      id,
      userId,
      notificationMethod,
      alertFrequency,
      preferredLanguage,
      alertType,
      createdAt,
    } = req.body;

    // Log request body for debugging
    console.log("Request Body: ", req.body);

    const newUserPreferenceData = await prisma.userPreference.create({
      data: {
        id,
        userId,
        notificationMethod,
        alertFrequency,
        preferredLanguage,
        alertType,
        createdAt,
      },
    });

    res.status(201).json(newUserPreferenceData);
  } catch (error) {
    console.error("Error creating new User Preference Data: ", error);
    res.status(500).json({
      error: "Failed to create  new User Preference Data",
      details: error.message,
    });
  }
});

module.exports = router;
