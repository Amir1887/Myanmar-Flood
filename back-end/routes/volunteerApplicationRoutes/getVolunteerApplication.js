const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express'); 
const router = express.Router();



//getting all applications of all users
router.get('/volunteer-application', async (req, res) => {
  const volunteerApplicationData = await prisma.volunteerApplication.findMany();
  res.json(volunteerApplicationData);
  console.log("historical submitted volunteer Application Data", volunteerApplicationData);
});


// Getting a specific user's application based on userId
router.get('/volunteer-application/:userId', async (req, res) => {
  const { userId } = req.params;
  
  try {
    const volunteerApplicationData = await prisma.volunteerApplication.findUnique({
      where: {
        userId: parseInt(userId), // Ensure the userId is an integer
      },
    });
    
    if (volunteerApplicationData) {
      res.json(volunteerApplicationData);
      console.log("Volunteer application data for user:", volunteerApplicationData);
    } else {
      res.status(404).json({ message: "No volunteer application found for this user." });
    }
  } catch (error) {
    console.error("Error fetching volunteer application for user:", error);
    res.status(500).json({ error: "Failed to fetch volunteer application for user." });
  }
});
module.exports = router;
