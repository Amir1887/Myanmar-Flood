const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express'); 
const router = express.Router();



router.post('/organiztions', async (req, res) => {
    try {
      const { name, contactInfo, location, createdAt } = req.body;
      
      // Log request body for debugging
      console.log("Request Body: ", req.body);
      
      const newOrganiztionData = await prisma.organization.create({
        data: {
          name,
          contactInfo,
          location,
          createdAt,
        },
      });
      
      res.status(201).json(newOrganiztionData);
    } catch (error) {
      console.error("Error inserting organiztion data: ", error);
      res.status(500).json({ error: 'Failed to insert organiztion data', details: error.message });
    }
  });
  

module.exports = router;
