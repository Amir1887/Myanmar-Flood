const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/mimu/bulk', async (req, res) => {
    const { resources } = req.body;  // Expect an array of resources


    for (const resource of resources) {
    const { url, title, uploadedDate, pdfLink  } = resource;

// Validation Before Storing Data
if (!title || !uploadedDate || !pdfLink ) {
    console.log('Invalid resource , skipping:', resource);
    continue;  // Skip this resource if validation fails
}


    try {
        // Check if the record already exists based on URL
        const existingEntry = await prisma.mimu.findUnique({
            where: { pdfLink }
        });

        if (existingEntry) {
            console.log('This entry already exists in the database:', url);
            continue; // Skips to the next resource in the loop
        }

        // Create new Mimu entry
        const newMimu = await prisma.mimu.create({
            data: {
                url,
                title,
                uploadedDate,
                pdfLink,
                // summary: pdfData
            }
        });

      
        console.log('New Mimu entry created:', newMimu);
    } catch (error) {
        console.error('Error saving Mimu data:', error);
    }
}
});


router.get("/mimu/bulk", async (req, res) => {
    const mimu = await prisma.mimu.findMany();
    res.json(mimu);
    console.log("All mimu data", mimu);
});

module.exports = router;
