const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.post("/api/subscribe", async (req, res) => {
  const subscription = req.body;

  // Save the subscription in the database (PushSubscription)
  try {
    await prisma.pushSubscription.create({
      data: {
        endpoint: subscription.endpoint,
        keys: subscription.keys,
      },
    });
    res.status(201).json({ message: "Subscription saved successfully" });
  } catch (error) {
    console.error("Error saving subscription:", error);
    res.status(500).json({ error: "Failed to save subscription" });
  }
});

module.exports = router;
