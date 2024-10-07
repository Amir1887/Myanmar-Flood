const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express'); 
const router = express.Router();


router.post('/damage-assessment', async (req, res) => {
    try {
      const { id, floodDataId, userId, severity, estimatedLoss, needsAnalysis, additionalNotes, timestamp, createdAt } = req.body;
      
      // Log request body for debugging
      console.log("Request Body: ", req.body);
      
      const newDamageAssessmentData = await prisma.damageAssessment.create({
        data: {
          id,
          floodDataId,
          userId,
          severity,
          estimatedLoss,
          needsAnalysis,
          additionalNotes,
          timestamp,
          createdAt
        },
      });
      
      res.status(201).json(newDamageAssessmentData);
    } catch (error) {
      console.error("Error inserting organiztion data: ", error);
      res.status(500).json({ error: 'Failed to insert new Damage Assessment Data ', details: error.message });
    }
  });
  

module.exports = router;
