const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require("express");
const router = express.Router();

router.post("/user-consent", async (req, res) => {
  try {
    const {
      id,
      userId,
      consentGiven,
      consentDate,
      consentType,
      consentInfo,
      cancelledAt,
      createdAt,
    } = req.body;

    // Log request body for debugging
    console.log("Request Body: ", req.body);

    const newUserConsentData = await prisma.userConsent.create({
      data: {
        id,
        userId,
        consentGiven,
        consentDate,
        consentType,
        consentInfo,
        cancelledAt,
        createdAt,
      },
    });

    res.status(201).json(newUserConsentData);
  } catch (error) {
    console.error("Error creating new User Consent Data: ", error);
    res
      .status(500)
      .json({
        error: "Failed to create  new User Consent Data",
        details: error.message,
      });
  }
});

module.exports = router;
