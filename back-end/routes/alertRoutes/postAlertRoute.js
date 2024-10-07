const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express'); 
const router = express.Router();



router.post('/alerts', async (req, res) => {
    try {
      const { message, region, floodDataId, createdAt } = req.body;
      
      // Log request body for debugging
      console.log("Request Body: ", req.body);
      
      const newAlertData = await prisma.alert.create({
        data: {
          message,
          region,
          floodDataId,
          createdAt,
        },
      });
      
      res.status(201).json(newAlertData);
    } catch (error) {
      console.error("Error inserting new donations data: ", error);
      res.status(500).json({ error: 'Failed to insert new donations data', details: error.message });
    }
  });
  

module.exports = router;
