const axios = require('axios');
const cheerio = require('cheerio');
const { extractTextFromPdf, processPdf } = require('./utils/extractTextFromPdf');

async function fetchLatestResources() {
    try {
        // Fetch the HTML content from the page
        const { data } = await axios.get('https://themimu.info/emergencies/floods-2024');
        const $ = cheerio.load(data);

        // Array to hold the extracted resource information
        const resources = [];

        // Select the specific section "Latest Resources" using its parent class or ID
        const latestResourcesSection = $('section.pane-documents-panel-pane-158');

        // Now target the rows within this specific section
        // Use `map()` to create an array of promises for processing each PDF
        const promises = latestResourcesSection.find('tbody tr').map(async (i, element) => {
            // Extract the title
            const title = $(element).find('td.views-field-nothing a').text().trim();
            // Extract the uploaded date
            const uploadedDate = $(element).find('td.views-field-changed-1').text().trim();
            // Extract the PDF link
            const pdfLink = $(element).find('td.views-field-nothing a').attr('href');

            // Add the extracted information to the resources array
            if (title && uploadedDate && pdfLink) {
                const summary = await processPdf(pdfLink);  // Get summary from the PDF
                resources.push({
                    title,
                    uploadedDate,
                    pdfLink,
                    summary  // Add the summary from the processed PDF
                });
            }
          
            console.log("pdf link::::::::::", pdfLink);
        }).get(); // Extracts the array of promises

         
        await Promise.all(promises); // Await all the promises (processing each PDF) at once

        // Print or process the scraped data
        console.log(resources);
        console.log("----------------------------------------------------------------------");
       

           // Send the array of resources at once
           if (resources.length) {
            try {
                await axios.post('http://localhost:4000/mimu/bulk', { resources });  // Single POST request
                console.log('All Data from MIMU successfully saved.');
            } catch (err) {
                console.error('Error saving Mimu resources:', err.message);
            }
        } else {
            console.log('No valid resources found.');
        }

        return resources;
    } catch (error) {
        console.error('Error fetching resources from MIMU:', error);
    }
}

// Example usage
fetchLatestResources();


module.exports = {fetchLatestResources};
