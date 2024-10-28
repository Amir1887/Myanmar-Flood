const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.post("/mozela/bulk", async (req, res) => {
  const { warnings } = req.body; // Expect an array of warnings
  console.log("Received batch:", warnings); // Log the received warnings to check if the data matches

  for (const warning of warnings) {
    const {  title, date, hydrograph,readMoreLink,  imageUrl, paragraph, url  } = warning;

    // Validation Before Storing Data
    if (
      !title ||
      !readMoreLink ||
      !date
    ) {
      console.log("Invalid warning, skipping:", warning);
      continue; // Skip this warning if validation fails
    }

    try {
      // Check if the record already exists based on URL
      const existingEntry = await prisma.mozela.findUnique({
        where: { date },
      });

      if (existingEntry) {
        console.log("This warning at this time  already exists in the database:", date);
        continue; // Skips to the next warning in the loop
      }

      // Create new Mimu entry
      const newMozela = await prisma.mozela.create({
        data: {
            title, date, hydrograph,readMoreLink,  imageUrl, paragraph, url
        },
      });

      console.log("New mozela entry created:", newMozela);
    } catch (error) {
      console.error("Error saving mozela data:", error);
    }
  }
});


  router.get("/mozela/bulk", async (req, res) => {
    const mozela = await prisma.mozela.findMany();
    res.json(mozela);
    console.log("All mozela data", mozela);
});

module.exports = router;
