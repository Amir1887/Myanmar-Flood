const axios = require('axios');
const cheerio = require('cheerio');
const { SummarizerManager } = require('node-summarizer');


// Function to fetch flood warnings and get the "Read More" links
async function fetchFloodWarningsMoezala() {
    try {
        const { data } = await axios.get('https://www.moezala.gov.mm/flood-warning%20');
        const $ = cheerio.load(data);

        const readMoreLinks = [];

        // Accessing each flood warning row
        $('.views-row').each((index, element) => {
            const title = $(element).find('.views-field-title .field-content').text().trim();
            const date = $(element).find('.views-field-field-warning-post-date .field-content').text().trim();
            const hydrograph = $(element).find('.views-field-body .field-content').text().trim();
            const readMoreLink = $(element).find('.views-field-view-node .field-content a').attr('href');

            console.log(`Title: ${title}`);
            console.log(`Date: ${date}`);
            console.log(`Hydrograph: ${hydrograph}`);
            console.log(`Read More: ${readMoreLink}`);
            console.log('--------------------------');

            // Collect the readMoreLink if it exists
            if (readMoreLink) {
                readMoreLinks.push(readMoreLink);
            }
        });

        return readMoreLinks; // Return the array of readMore links

    } catch (error) {
        console.error('Error fetching flood warnings:', error);
    }
}


// Function to scrape image from the "Read More" page
async function getFloodWarningImage(readMoreLink) {
    try {
        // Fetch the "Read More" page content
        const response = await axios.get(`https://www.moezala.gov.mm${readMoreLink}`);
        const $ = cheerio.load(response.data);

        // Select the image element within the article content
        const imageSrc = $('article .field-name-body img').attr('src');

        // If the image URL is relative, convert it to an absolute URL
        const imageUrl = imageSrc.startsWith('http') ? imageSrc : `https:${imageSrc}`;

        // console.log('Flood Warning Image URL:', imageUrl);
        return imageUrl;
    } catch (error) {
        console.error('Error fetching image:', error);
        return null;
    }
}

// Example usage to fetch the "Read More" links and get images
(async () => {
    const readMoreLinks = await fetchFloodWarningsMoezala(); // Fetch the links

    if (readMoreLinks && readMoreLinks.length > 0) {
        // Iterate over each link and get the flood warning image
        for (const readMoreLink of readMoreLinks) {
            await getFloodWarningImage(readMoreLink); // Get the image for each link
        }
    } else {
        console.log('No "Read More" links found.');
    }
})();


module.exports = { fetchFloodWarningsMoezala };