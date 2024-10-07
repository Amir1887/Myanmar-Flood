const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express'); 
const router = express.Router();


router.post('/organiztion-members', async (req, res) => {
    try {
      const { id, name, email, password, role, organizationId, createdAt } = req.body;
      
      // Log request body for debugging
      console.log("Request Body: ", req.body);
      
      const newOrganiztionMemData = await prisma.organizationMember.create({
        data: {
            id, name, email, password, role, organizationId, createdAt
        },
      });
      
      res.status(201).json(newOrganiztionMemData);
    } catch (error) {
      console.error("Error inserting organiztion members data: ", error);
      res.status(500).json({ error: 'Failed to insert organiztion members data', details: error.message });
    }
  });
  

module.exports = router;
