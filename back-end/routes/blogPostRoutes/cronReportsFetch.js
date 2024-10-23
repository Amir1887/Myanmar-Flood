const cron = require('node-cron');
const axios = require('axios');
const cheerio = require('cheerio');
const pdf = require('pdf-parse');
const { NlpManager } = require('node-nlp');
const nlpManager = new NlpManager();

const urls = [
    // "https://reliefweb.int/updates?list=Myanmar%3A%20Floods%20-%20Jul%202024%20Updates&advanced-search=%28D52069%29",
    "https://www.moezala.gov.mm/fog-warning%20",
    // "https://themimu.info/emergencies/floods-2024",
];

// Function to fetch and extract data from a given URL
// async function fetchAndExtract(url) {
//     try {
//         const { data } = await axios.get(url);
//         const $ = cheerio.load(data);
//         const textContent = $('body').text(); // Extracting all text content from the body tag

//         // Extract PDFs directly linked on the page
//         const pdfLinks = [];
//         $('a').each((i, link) => {
//             const href = $(link).attr('href');
//             if (href && href.endsWith('.pdf')) {
//                 pdfLinks.push(href);
//             }
//         });

  
//         // Ensure all image URLs are absolute
//         $('img').each((i, img) => {
//           let src = $(img).attr('src');
//           if (src && src.startsWith('//')) {
//               src = 'https:' + src;
//               $(img).attr('src', src);
//           }
//       });

//         // Find specific section for Flood Warnings
//         const floodWarnings = [];
//         $('a').each((i, link) => {
//             const title = $(link).text().trim();
//             const href = $(link).attr('href');
//             if (title.includes('Flood Warning') && href) {
//                 floodWarnings.push({ title, href });
//             }
//         });

//         // Extract resources such as reports, updates, etc.
//         const resources = [];
//         $('.view-content table tbody tr').each((i, row) => {
//             const titleElement = $(row).find('td.views-field-nothing a');
//             const title = titleElement.text().trim();
//             const href = titleElement.attr('href');
//             const uploadedDate = $(row).find('td.views-field-changed-1').text().trim();

//             if (title && href) {
//                 resources.push({ title, href, uploadedDate });
//             }
//         });

//         // Fetch PDF content for resources that link to PDF pages
//         const resourcePdfContents = [];
//         for (const resource of resources) {
//             if (resource.href && resource.href.endsWith('.pdf')) {
//                 // If the link is directly a PDF file
//                 const pdfContent = await fetchPdfContent(resource.href);
//                 resourcePdfContents.push({ title: resource.title, content: pdfContent });
//             } else {
//                 // Fetch the resource page and look for PDF links
//                 const { pdfLinks: resourcePdfLinks } = await fetchAndExtract(resource.href);
//                 for (const pdfLink of resourcePdfLinks) {
//                     const pdfContent = await fetchPdfContent(pdfLink);
//                     resourcePdfContents.push({ title: resource.title, content: pdfContent });
//                 }
//             }
//         }

//         // Return all collected data in a structured format
//         return { 
//             textContent, 
//             pdfLinks, 
//             imageLinks, 
//             floodWarnings, 
//             resources, 
//             resourcePdfContents 
//         };
//     } catch (error) {
//         console.error('Error fetching the page:', error);
//         return { 
//             textContent: '', 
//             pdfLinks: [], 
//             imageLinks: [], 
//             floodWarnings: [], 
//             resources: [], 
//             resourcePdfContents: []
//         };
//     }
// }



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

// Separate function for another site
async function fetchFloodWarningsAnotherSite() {
  // Specific logic for another site
}
// "https://www.moezala.gov.mm/flood-warning%20"
// "https://www.moezala.gov.mm/flood-warning-209"
// "/flood-warning-208"

// -image sourcse in web : 	https://www.moezala.gov.mm/sites/default/files/Web%28Warning%29E.jpg
// -image sourcse in web : 	https://www.moezala.gov.mm/sites/default/files/__MACOSX/W-E.PNG
// Function to scrape image from the "Read More" page
async function getFloodWarningImage(readMoreLink) {
    try {
        // Fetch the "Read More" page content
        const response = await axios.get(`https://www.moezala.gov.mm${readMoreLink}`);
        console.log("respone", response);
        const $ = cheerio.load(response.data);

        // Select the image element within the article content
        const imageSrc = $('article .field-name-body img').attr('src');

        // If the image URL is relative, convert it to an absolute URL
        const imageUrl = imageSrc.startsWith('http') ? imageSrc : `https:${imageSrc}`;

        console.log('Flood Warning Image URL:', imageUrl);
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


// Function to fetch PDF content from a URL
async function fetchPdfContent(pdfUrl) {
    try {
        const { data } = await axios.get(pdfUrl, { responseType: 'arraybuffer' });
        const pdfText = await pdf(data);
        return pdfText.text;
    } catch (error) {
        console.error('Error fetching or parsing PDF:', error);
        return '';
    }
}

// Analyze content using NLP
async function analyzeContent(text) {
    await nlpManager.train();
    const summary = await nlpManager.process('en', text);
    return summary;
}

// Create a blog post object
function createBlogPost(title, summary, mainContent, images = [], pdfs = []) {
    return {
        title,
        summary,
        content: mainContent,
        images,
        pdfs,
        date: new Date(),
    };
}

// Process the fetched data and generate a blog post
async function processFetchedData({ textContent, pdfLinks, imageLinks, floodWarnings, resources, resourcePdfContents }) {
    let contentToAnalyze = textContent;

    // Append content from all fetched PDFs
    for (const pdfUrl of pdfLinks) {
        const pdfContent = await fetchPdfContent(pdfUrl);
        contentToAnalyze += pdfContent;
    }

    // Include content from dynamically fetched PDF resources
    for (const { content } of resourcePdfContents) {
        contentToAnalyze += content;
    }

    if (contentToAnalyze) {
        const title = 'Generated Title'; // This can be derived from the content if needed
        const summary = await analyzeContent(contentToAnalyze);
        const blogPost = createBlogPost(title, summary, contentToAnalyze, imageLinks, pdfLinks);

        console.log('Flood Warnings:', floodWarnings);
        console.log('Resources:', resources);
        console.log('Blog Post:', blogPost);

        // Code to save the blogPost, floodWarnings, and resources to a database can be added here
    }
}

// 30-minute schedule ("*/30 * * * *")
//for a 1-hour schedule:("0 * * * *")
//every minute: "* * * * *",
// Cron job to fetch data periodically
const startBlogPostFetchCron = () => {
    cron.schedule('* * * * *', async () => {
        console.log('Checking for updates...');
        for (const url of urls) {
            const fetchedData = await fetchAndExtract(url);
            await processFetchedData(fetchedData);
        }
    });
};

// Export the function to start the cron job
module.exports = { startBlogPostFetchCron };
