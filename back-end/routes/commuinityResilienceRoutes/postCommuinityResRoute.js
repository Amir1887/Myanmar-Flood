const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express'); 
const router = express.Router();



router.post('/commuinityResil', async (req, res) => {
    try {
      const { region, recoveryPlans, createdAt } = req.body;
      
      // Log request body for debugging
      console.log("Request Body: ", req.body);
      
      const newcommuinityResilData = await prisma.communityResilience.create({
        data: {
          region,
          recoveryPlans,
          createdAt,
        },
      });
      
      res.status(201).json(newcommuinityResilData);
    } catch (error) {
      console.error("Error inserting new commuinityResil Data : ", error);
      res.status(500).json({ error: 'Failed to insert new commuinityResil Data', details: error.message });
    }
  });
  

module.exports = router;
