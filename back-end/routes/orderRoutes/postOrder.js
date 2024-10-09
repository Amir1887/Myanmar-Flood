const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require("express");
const router = express.Router();

router.post("/order", async (req, res) => {
  try {
    const {
      id,
      decisionMakerId,
      targetType,
      organizationId,
      highLevelOrgId,
      message,
      status,
      startDate,
      completionDate,
      notes,
      createdAt,
    } = req.body;

    // Log request body for debugging
    console.log("Request Body: ", req.body);

    const orderData = await prisma.order.create({
      data: {
        id,
        decisionMakerId,
        targetType,
        organizationId,
        highLevelOrgId,
        message,
        status,
        startDate,
        completionDate,
        notes,
        createdAt,
      },
    });

    res.status(201).json(orderData);
  } catch (error) {
    console.error("Error inserting new order Data: ", error);
    res.status(500).json({
      error: "Failed to insert new  order Data",
      details: error.message,
    });
  }
});

module.exports = router;
