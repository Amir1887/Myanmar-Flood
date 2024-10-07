const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express'); 
const router = express.Router();



router.post('/donations', async (req, res) => {
    try {
      const { donorName, amount, userId, createdAt } = req.body;
      
      // Log request body for debugging
      console.log("Request Body: ", req.body);
      
      const newDonationsData = await prisma.donation.create({
        data: {
          donorName,
          amount,
          userId,
          createdAt,
        },
      });
      
      res.status(201).json(newDonationsData);
    } catch (error) {
      console.error("Error inserting new donations data: ", error);
      res.status(500).json({ error: 'Failed to insert new donations data', details: error.message });
    }
  });
  

module.exports = router;
