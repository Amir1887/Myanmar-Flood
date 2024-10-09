const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require("express");
const router = express.Router();

router.post("/volunteer", async (req, res) => {
  try {
    const { id, name, email, role, availability, createdAt } = req.body;

    // Log request body for debugging
    console.log("Request Body: ", req.body);

    const volunteerData = await prisma.volunteer.create({
      data: {
        id,
        name,
        email,
        role,
        availability,
        createdAt,
      },
    });

    res.status(201).json(volunteerData);
  } catch (error) {
    console.error("Error inserting new submitted volunteer Data: ", error);
    res.status(500).json({
      error: "Failed to insert new  submitted volunteer Data",
      details: error.message,
    });
  }
});

module.exports = router;
