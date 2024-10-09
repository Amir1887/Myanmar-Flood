const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require("express");
const router = express.Router();

router.post("/report", async (req, res) => {
  try {
    const { id, reportType, data, createdAt, organizationId } =
      req.body;

    // Log request body for debugging
    console.log("Request Body: ", req.body);

    const newReportData = await prisma.report.create({
      data: {
        id,
        reportType,
        data,
        createdAt,
        organizationId,
      },
    });

    res.status(201).json(newReportData);
  } catch (error) {
    console.error("Error inserting new Report Data: ", error);
    res
      .status(500)
      .json({
        error: "Failed to insert new Report Data",
        details: error.message,
      });
  }
});

module.exports = router;
