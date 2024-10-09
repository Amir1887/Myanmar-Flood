const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express'); 
const router = express.Router();




router.get('/order', async (req, res) => {
  const orderData = await prisma.order.findMany();
  res.json(orderData);
  console.log("historical order Data", orderData);
});

module.exports = router;
