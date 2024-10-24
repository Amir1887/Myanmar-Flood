const cron = require('node-cron');
const axios = require('axios');
const cheerio = require('cheerio');
const pdf = require('pdf-parse');
const { NlpManager } = require('node-nlp');
const nlpManager = new NlpManager();




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

//  https://reliefweb.int/report/myanmar/who-south-east-asia-region-epidemiological-bulletin-21st-edition-2024-16-october-2024-reporting-period-30-september-13-october-2024
//'https://reliefweb.inthttps://reliefweb.int/report/myanmar/situation-update-no-8-combined-effects-tropical-cyclone-yagi-and-southwest-monsoon-27-september-2024'
async function fetchFloodWarningsReliefWeb() {
  try {
    const { data } = await axios.get('https://reliefweb.int/updates?advanced-search=%28PC165%29_%28C165%29_%28DT4624_DT4611%29');
    const $ = cheerio.load(data);
    
    const results = [];

    // Iterate through each article in the list
    $('.rw-river-article').each((i, element) => {
      const titleElement = $(element).find('.rw-river-article__title a');
      const titleText = titleElement.text().trim();
      const articleUrl = titleElement.attr('href');

      // Find the posted and published dates
      const postedDate = $(element).find('dd.rw-entity-meta__tag-value--posted time').attr('datetime');
      const publishedDate = $(element).find('dd.rw-entity-meta__tag-value--published time').attr('datetime');

      // Convert dates to Date objects for comparison
      const postedDateObj = new Date(postedDate);
      const publishedDateObj = new Date(publishedDate);

      // Filter based on dates (must be after 2024)
      const currentYear = new Date().getFullYear();
      if (postedDateObj.getFullYear() < currentYear || publishedDateObj.getFullYear() < currentYear) {
        return; // Skip this article if it's before 2024
      }

      // Filter articles by keywords in the title
      const keywords = ['Flood', 'Disaster', 'Cyclone', 'Typhoon', 'Rain', 'Storm']; // Add more keywords if needed
      const isRelevant = keywords.some(keyword => titleText.includes(keyword));

      if (isRelevant) {
        // Get the country link (Myanmar or others)
        const countryLink = $(element).find('.rw-entity-country-slug a').attr('href');
        const updatedCountryLink = ` https://reliefweb.int${countryLink}`
      
        // Add the relevant data to the results array
        results.push({
          title: titleText,
          articleUrl: `${articleUrl}`, // Full URL of the article
          countryLink,
        });

        // Print or log the results
        console.log('Title:', titleText);
        console.log('Article URL:', `https://reliefweb.int${articleUrl}`);
        console.log('Country Link:', updatedCountryLink);
        console.log('--------------------------');
      }
    });

    return results; // Return the filtered results
  } catch (error) {
    console.error('Error fetching flood warnings from ReliefWeb:', error);
  }
}

// Example usage
fetchFloodWarningsReliefWeb().then((results) => {
  console.log('Filtered articles:', results);
});


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
