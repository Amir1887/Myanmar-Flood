const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require("express");
const router = express.Router();

router.post("/user", async (req, res) => {
  try {
    const {
      name,
      username,
      phoneNumber, 
      imageUrl,
      email,
      password,
      location,
      isInNeed,
      createdAt,
      privacyAgreement,
    } = req.body;

    // Log request body for debugging
    console.log("Request Body: ", req.body);

    const newUserData = await prisma.user.create({
      data: {
        name,
        username,
        phoneNumber, 
        imageUrl,
        email,
        passwordProvided: password,
        location,
        isInNeed,
        createdAt,
        privacyAgreement,
      },
    });

    res.status(201).json(newUserData);
  } catch (error) {
    console.error("Error creating user: ", error);
    res
      .status(500)
      .json({ error: "Failed to create user", details: error.message });
  }
});

module.exports = router;
