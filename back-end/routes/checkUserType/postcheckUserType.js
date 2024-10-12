const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require("express");
const router = express.Router();

router.post("/check-user-type", async (req, res) => {
  try {
    const { email } = req.body;

    // Log request body for debugging
    console.log("Request Body: ", req.body);

    // Check each table for the email
    const user = await prisma.user.findUnique({ where: { email } });
    if (user) return res.json({ type: "user" });

    const organization = await prisma.organization.findUnique({
      where: { email },
    });
    if (organization) return res.json({ type: "organization" });

    const organizationMember = await prisma.organizationMember.findUnique({
      where: { email },
    });
    if (organizationMember) return res.json({ type: "organizationMember" });



    const highLevelOrg = await prisma.highLevelOrganization.findUnique({
      where: { email },
    });
    if (highLevelOrg) return res.json({ type: "highLevelOrganization" });

    const decisionMaker = await prisma.decisionMaker.findUnique({
      where: { email },
    });
    if (decisionMaker) return res.json({ type: "decisionMaker" });

    // If no match is found
    return res.json({ type: "unknown" }); // Or you can choose to send a 404 response
  } catch (error) {
    console.error("Error checking user type: ", error);
    res.status(500).json({
      error: "Failed to check user type",
      details: error.message,
    });
  }
});

module.exports = router;
