const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require("express");
const router = express.Router();

router.post("/api-log", async (req, res) => {
  try {
    const {
      id,
      apiName,
      endpoint,
      responseCode,
      responseTime,
      requestPayload,
      errorMessage,
      retries,
      createdAt,
      userId,
    } = req.body;

    // Log request body for debugging
    console.log("Request Body: ", req.body);

    const newApiLogData = await prisma.aPILog.create({
      data: {
        id,
        apiName,
        endpoint,
        responseCode,
        responseTime,
        requestPayload,
        errorMessage,
        retries,
        createdAt,
        userId,
      },
    });

    res.status(201).json(newApiLogData);
  } catch (error) {
    console.error("Error inserting new Api Log Data: ", error);
    res.status(500).json({
      error: "Failed to insert new new Api Log Data",
      details: error.message,
    });
  }
});

module.exports = router;
