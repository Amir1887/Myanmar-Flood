const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express'); 
const router = express.Router();



router.post('/user', async (req, res) => {
    try {
        const { name, email, password, role, location, isInNeed, createdAt } = req.body;
      
      // Log request body for debugging
      console.log("Request Body: ", req.body);
      
      const newUserData = await prisma.user.create({
        data: {
            name,
            email,
            password,
            role: role || 'USER',
            location,
            isInNeed,
            createdAt,
        },
      });
      
      res.status(201).json(newUserData);
    } catch (error) {
      console.error("Error creating user: ", error);
      res.status(500).json({ error:  'Failed to create user', details: error.message });
    }
  });
  

module.exports = router;
