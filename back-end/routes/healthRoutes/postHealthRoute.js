const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express'); 
const router = express.Router();



router.post('/health', async (req, res) => {
    try {
      const { userId, waterAccess, diseaseRisk, healthNotes, createdAt } = req.body;
      
      // Log request body for debugging
      console.log("Request Body: ", req.body);
      
      const newhealthData = await prisma.healthData.create({
        data: {
          userId,
          waterAccess,
          diseaseRisk,
          healthNotes,
          createdAt,
        },
      });
      
      res.status(201).json(newhealthData);
    } catch (error) {
      console.error("Error inserting health data: ", error);
      res.status(500).json({ error: 'Failed to insert health data', details: error.message });
    }
  });
  

module.exports = router;
