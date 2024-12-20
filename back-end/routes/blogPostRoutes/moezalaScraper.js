const axios = require('axios');
const cheerio = require('cheerio');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Function to extract the flood warnings from a single page
async function fetchFloodWarningsFromPage(pageUrl) {
    try {
        const { data } = await axios.get(pageUrl);
        const $ = cheerio.load(data);

        // Fetch all existing warning dates from the database
        // const existingDates = await prisma.mozela.findMany({
        //     select: { date: true } // Get only the pdfLink field
        // });

        // Create a Set for faster lookup
        // const existingWarningDates = new Set(existingDates.map(date => date.date));

        const floodWarnings = [];

       // Use 'find' to locate the 'views-row' elements
      const floodWarningElements = $('.views-row').toArray();

   for (const element of floodWarningElements) {
         const title = $(element).find('.views-field-title .field-content').text().trim();
         const date = $(element).find('.views-field-field-warning-post-date .field-content').text().trim();
         const hydrograph = $(element).find('.views-field-body .field-content').text().trim();
         const readMoreLink = $(element).find('.views-field-view-node .field-content a').attr('href');

    // Check if the warning date already exists in the database
    //    if (existingWarningDates.has(date)) {
    //           console.log(`This Warning Date already exists in the database, skipping: ${date}`);
    //           continue; // Skip this warning and move to the next one
    //      }

            // Collect the readMoreLink and other details if it exists
            if (readMoreLink) {
                floodWarnings.push({
                    title,
                    date,
                    hydrograph,
                    readMoreLink: `https://www.moezala.gov.mm${readMoreLink}`
                });
            }
        };

        return floodWarnings; // Return the array of flood warnings

    } catch (error) {
        console.error('Error fetching flood warnings from page:', error.message);
        return [];
    }
}

// Function to get the total number of pages from the pagination
async function getTotalPages() {
    try {
        const { data } = await axios.get('https://www.moezala.gov.mm/flood-warning%20');
        const $ = cheerio.load(data);

        // Extract the last page number from the pagination
        const lastPageLink = $('.pager-last a').attr('href');
        const totalPages = lastPageLink ? parseInt(lastPageLink.match(/page=(\d+)/)[1], 10) + 1 : 1;

        return totalPages;
    } catch (error) {
        console.error('Error fetching total pages:', error.message);
        return 1;
    }
}

// Function to scrape the image from the "Read More" page
async function getFloodWarningContent(readMoreLink) {
    try {
        const response = await axios.get(readMoreLink);
        const $ = cheerio.load(response.data);

        // Select the image element within the article content
        const imageSrc = $('article .field-name-body img').attr('src');

        // If the image URL is relative, convert it to an absolute URL
        const imageUrl = imageSrc ? (imageSrc.startsWith('http') ? imageSrc : `https:${imageSrc}`) : null;
      

        // If no image is found, fetch the paragraph content
        if (!imageUrl) {
            const paragraph =  $('article .field-name-body .field-item')
            .contents()  // Get all child nodes (text, elements, etc.)( different from .children(), which only returns element nodes, not text nodes.)
            .filter(function() {
                // Filter out elements (like <ul>) and only keep text nodes or inline elements
                // In the DOM, text nodes have a nodeType of 3.
                return this.nodeType === 3 || $(this).is('p');  // Keep only text nodes and <p> tags
            })
            .text().trim();  // Combine the remaining text
            console.log("Paragraph content found:", paragraph);
            return { paragraph };
        }

        console.log("Image URL found:", imageUrl);
        return { imageUrl }; // Return the image URL if found

    } catch (error) {
        console.error('Error fetching content:', error.message);
        return {};
    }
}

// Function to fetch flood warnings across all pages and their images
async function fetchFloodWarningsMoezala() {
    try {
        const totalPages = await getTotalPages(); // Get total number of pages
        const baseUrl = 'https://www.moezala.gov.mm/flood-warning%20?page=';
        let allFloodWarnings = [];

        // Loop through all the pages
        for (let i = 0; i < totalPages; i++) {
            const pageUrl = i === 0 ? 'https://www.moezala.gov.mm/flood-warning%20' : `${baseUrl}${i}`;
            console.log(`Fetching page ${i + 1}/${totalPages}: ${pageUrl}`);

            const warningsFromPage = await fetchFloodWarningsFromPage(pageUrl);

            // Fetch image for each flood warning
            for (const warning of warningsFromPage) {
                const content = await getFloodWarningContent(warning.readMoreLink);

                // Add image URL or paragraph content to the warning object
                if (content.imageUrl) {
                    warning.imageUrl = content.imageUrl;
                } else if (content.paragraph) {
                    warning.paragraph = content.paragraph;
                }
                warning.url = pageUrl; // Add pageUrl to the warning object
                allFloodWarnings.push(warning);
            }
        }


        async function sendBatchedWarnings(warnings, batchSize = 10) {
            for (let i = 0; i < warnings.length; i += batchSize) {
                const batch = warnings.slice(i, i + batchSize);
                console.log('Sending batch:', batch); // Log the batch for debugging
                if (batch.length === 0) {
                    console.log('Skipping empty batch.');
                    continue;  // Skip empty batches
                }
                try {
                    await axios.post('http://localhost:4000/mozela/bulk', { warnings: batch  });
                    console.log('Warning Batch saved successfully.');
                } catch (err) {
                    console.error('Error saving batch:', err.response?.data || err.message); // Log detailed error
                }
            }
        }
        // Send the array of resources in batches
        if (allFloodWarnings.length) {
            await sendBatchedWarnings(allFloodWarnings, 10);
        } else {
            console.log('No valid resources found.');
        }

        return allFloodWarnings;

    } catch (error) {
        console.error('Error fetching flood warnings:', error.message);
        return [];
    }
}

// Example usage to fetch flood warnings across all pages
(async () => {
    const allFloodWarnings = await fetchFloodWarningsMoezala(); // Fetch all pages with images
    console.log('Total flood warnings fetched:', allFloodWarnings.length);

    // Log each flood warning with its image
    allFloodWarnings.forEach((warning, index) => {
        console.log(`Warning ${index + 1}:`);
        console.log(`Title: ${warning.title}`);
        console.log(`Date: ${warning.date}`);
        console.log(`Hydrograph: ${warning.hydrograph}`);
        console.log(`Read More Link: ${warning.readMoreLink}`);
        if (warning.imageUrl) {
            console.log(`Image URL: ${warning.imageUrl}`);
        } else if (warning.paragraph) {
            console.log(`Paragraph: ${warning.paragraph}`);
        };
        console.log('--------------------------');
    });
})();


module.exports = { fetchFloodWarningsMoezala };