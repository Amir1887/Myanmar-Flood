const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express'); 
const router = express.Router();


router.post('/damage-assessment', async (req, res) => {
    try {
      const { id, floodDataId, userId, severity, estimatedLoss, needsAnalysis, additionalNotes, timestamp, createdAt, organizationMemberId } = req.body;
      
      // Log request body for debugging
      console.log("Request Body: ", req.body);
        //checking that either userId or organizationMemberId is present, but not both.
      if ((userId && organizationMemberId) || (!userId && !organizationMemberId)) {
        throw new Error("Either 'userId' or 'organizationMemberId' must be provided, but not both.");
      }
      
      
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
          createdAt,
          organizationMemberId
        },
      });
      
      res.status(201).json(newDamageAssessmentData);
    } catch (error) {
      console.error("Error inserting organiztion data: ", error);
      res.status(500).json({ error: 'Failed to insert new Damage Assessment Data ', details: error.message });
    }
  });
  

module.exports = router;
