const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.post("/api/subscribe", async (req, res) => {
  const subscription = req.body;

  try {
    // Check if the subscription already exists by checking the unique endpoint
    const existingSubscription = await prisma.pushSubscription.findUnique({
      where: {
        endpoint: subscription.endpoint,
      },
    });

    // If the subscription does not exist, create a new one
    if (!existingSubscription) {
      await prisma.pushSubscription.create({
        data: {
          endpoint: subscription.endpoint,
          keys: subscription.keys,
        },
      });
      res.status(201).json({ message: "Subscription saved successfully" });
    } else {
      // If subscription already exists, send a 200 status indicating it's already saved
      res.status(200).json({ message: "Subscription already exists" });
    }
  } catch (error) {
    console.error("Error saving subscription:", error);
    res.status(500).json({ error: "Failed to save subscription" });
  }
});

module.exports = router;
