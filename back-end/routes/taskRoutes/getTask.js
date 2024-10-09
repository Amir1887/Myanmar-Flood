const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express'); 
const router = express.Router();




router.get('/task', async (req, res) => {
  const taskData = await prisma.task.findMany();
  res.json(taskData);
  console.log("historical submitted task Data", taskData);
});

module.exports = router;
