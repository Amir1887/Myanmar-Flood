const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express'); 
const router = express.Router();



router.post('/resources', async (req, res) => {
    try {
      const { type, quantity, status, userId, floodDataId, communityResilienceId, createdAt } = req.body;
      
      // Log request body for debugging
      console.log("Request Body: ", req.body);
      
      const newResourceData = await prisma.resource.create({
        data: {
          type,
          quantity,
          status,
          userId,
          floodDataId,
          communityResilienceId,
          createdAt,
        },
      });
      
      res.status(201).json(newResourceData);
    } catch (error) {
      console.error("Error inserting resource data: ", error);
      res.status(500).json({ error: 'Failed to insert resource data', details: error.message });
    }
  });
  

module.exports = router;
