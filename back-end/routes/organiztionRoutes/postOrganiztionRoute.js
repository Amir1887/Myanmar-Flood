const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require("express");
const router = express.Router();

router.post("/organiztions", async (req, res) => {
  try {
    const {
      name,
      email,
      createdAt,
      imageUrl,
      username,
      highLevelOrg,
      location,
      phoneNumber,
      password,
    } = req.body;

    // Log request body for debugging
    console.log("Request Body From org route: ", req.body);

    const newOrganiztionData = await prisma.organization.create({
      data: {
        name,
        email,
        createdAt,
        imageUrl,
        username,
        RelatedhighLevelOrg: highLevelOrg,
        location,
        phoneNumber,
        passwordEnabled: password,
      },
    });

    res.status(201).json(newOrganiztionData);
  } catch (error) {
    console.error("Error inserting organiztion data: ", error);
    res
      .status(500)
      .json({
        error: "Failed to insert organiztion data",
        details: error.message,
      });
  }
});

module.exports = router;
