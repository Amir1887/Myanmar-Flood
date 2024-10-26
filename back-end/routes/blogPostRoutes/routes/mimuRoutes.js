const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/mimu/bulk', async (req, res) => {
    const { resource  } = req.body;
    const { url, title, uploadedDate, pdfLink, summary  } = resource;

    //Validation Before Storing Data
    function validateResource(resource) {
        if (!title || !uploadedDate || !pdfLink) {
            console.log('Invalid resource, skipping:', resource);
            return false;
        }
        return true;
    }

    try {
        // Check if the record already exists based on URL
        const existingEntry = await prisma.mimu.findUnique({
            where: { url }
        });

        if (existingEntry) {
            console.log('This entry already exists in the database:', url);
            return; // Stop execution here without sending a response to the frontend
        }

        // Create new Mimu entry
        const newMimu = await prisma.mimu.create({
            data: {
                url,
                title,
                uploadedDate,
                pdfLink,
                summary
            }
        });

      
        console.log('New Mimu entry created:', newMimu);
    } catch (error) {
        console.error('Error saving Mimu data:', error);
    }
});

module.exports = router;
