const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.post("/reliefweb/bulk", async (req, res) => {
  const { results } = req.body; // Expect an array of results

  for (const result of results) {
    const {
      articleUrl,
      title,
      articleContent,
      summary,
      relatedContent,
      sentiment,
      categorizedSentiment,
      publishedDate,
    } = result;

    // Validation Before Storing Data
    if (!articleUrl || !title || !summary || !articleContent || sentiment === undefined || !categorizedSentiment) {  
        console.log("Invalid result from relief web, skipping:", result);  
        continue; // Skip this resource if validation fails   
    }

    try {
      // Check if the record already exists based on URL
      const existingEntry = await prisma.reliefWeb.findUnique({
        where: { articleUrl },
      });

      if (existingEntry) {
        console.log("This entry already exists in the database:", articleUrl);
        continue; // Skip this resource if validation fails  
      }

let processedCount = 0;  
let skippedCount = 0;  

for (const result of results) {  
    // ... processing logic  
    if (existingEntry) {  
        skippedCount++;  
        continue; // Skips to the next resource in the loop  
    }  

    // If creating  
    processedCount++;  
}  

// After processing  
console.log(`Processed: ${processedCount}, Skipped: ${skippedCount}`);

      // Create new Mimu entry
      const newRelief = await prisma.reliefWeb.create({
        data: {
          articleUrl,
          title,
          articleContent,
          summary,
          relatedContent,
          sentiment,
          categorizedSentiment,
          publishedDate,
        },
      });

      console.log("New reliefWeb entry created:", newRelief);
    } catch (error) {
      console.error("Error saving reliefWeb data:", error);
    }
  }

      // Send a response back indicating success  
      res.status(200).send({ message: "Bulk save completed." }); 
});

module.exports = router;
