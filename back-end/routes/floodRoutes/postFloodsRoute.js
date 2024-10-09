const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express'); 
const router = express.Router();



router.post('/floods', async (req, res) => {
    try {
      const { region, severity, details, riskLevel, affectedPeople, predictedDate, timestamp, createdAt } = req.body;
      
      // Log request body for debugging
      console.log("Request Body: ", req.body);
      
      const newFloodData = await prisma.floodData.create({
        data: {
          region,
          severity,
          details,
          riskLevel,
          affectedPeople,
          predictedDate,
          timestamp: timestamp || new Date(),
          createdAt
        },
      });
      
      res.status(201).json(newFloodData);
    } catch (error) {
      console.error("Error inserting flood data: ", error);
      res.status(500).json({ error: 'Failed to insert flood data', details: error.message });
    }
  });
  

module.exports = router;
