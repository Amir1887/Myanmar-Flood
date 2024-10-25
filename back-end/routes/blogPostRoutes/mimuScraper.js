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
        latestResourcesSection.find('tbody tr').each((i, element) => {
            // Extract the title
            const title = $(element).find('td.views-field-nothing a').text().trim();
            // Extract the uploaded date
            const uploadedDate = $(element).find('td.views-field-changed-1').text().trim();
            // Extract the PDF link
            const pdfLink = $(element).find('td.views-field-nothing a').attr('href');

            // Add the extracted information to the resources array
            resources.push({
                title,
                uploadedDate,
                pdfLink
            });
            processPdf(pdfLink);
        });

        // Print or process the scraped data
        console.log(resources);
        console.log("----------------------------------------------------------------------");
       

        return resources;
    } catch (error) {
        console.error('Error fetching resources from MIMU:', error);
    }
}

// Example usage
fetchLatestResources();


module.exports = {fetchLatestResources};
