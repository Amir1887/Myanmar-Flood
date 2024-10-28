const axios = require('axios');
const cheerio = require('cheerio');
const { SummarizerManager } = require('node-summarizer');


let scrapedUrls = new Set(); // To keep track of scraped URLs and prevent revisiting
const MAX_DEPTH = 3; // Set a limit to avoid infinite recursion

// Function to fetch flood warnings and process the main article page
async function fetchFloodWarningsReliefWeb(depth = 1) {
    try {
        if (depth > MAX_DEPTH) {
            console.log('Max depth reached, stopping recursion.');
            return;
        }

        const { data } = await axios.get('https://reliefweb.int/updates?advanced-search=%28PC165%29_%28C165%29_%28DT4624_DT4611%29');
        const $ = cheerio.load(data);

        const results = [];

        // Iterate through each article in the list
        $('.rw-river-article').each(async (i, element) => {  // Added `async` here
            const titleElement = $(element).find('.rw-river-article__title a');
            const titleText = titleElement.text().trim();
            const articleUrl = titleElement.attr('href');

            // Find the posted and published dates
            const postedDate = $(element).find('dd.rw-entity-meta__tag-value--posted time').attr('datetime');
            const publishedDate = $(element).find('dd.rw-entity-meta__tag-value--published time').attr('datetime');

            // Convert dates to Date objects for comparison
            const postedDateObj = new Date(postedDate);
            const publishedDateObj = new Date(publishedDate);

            // Filter based on dates (must be after the current year)
            const currentYear = new Date().getFullYear();
            if (postedDateObj.getFullYear() < currentYear || publishedDateObj.getFullYear() < currentYear) {
                return; // Skip this article if it's before current year
            }

            // Filter articles by keywords in the title
            const keywords = ['Flood', 'Disaster', 'Cyclone', 'Typhoon', 'Rain', 'Storm'];
            const isRelevant = keywords.some(keyword => titleText.includes(keyword));

            if (isRelevant) {
                // Get the country link (Myanmar or others)
                const countryLink = $(element).find('.rw-entity-country-slug a').attr('href');
                const updatedCountryLink = `https://reliefweb.int${countryLink}`;

                // Add the relevant data to the results array
  
                  // Await `scrapeArticleContent` to handle its asynchronous nature
                  const articleContent = await scrapeArticleContent(articleUrl, depth + 1);

                    // Check if articleContent is valid before pushing to results
                    if (articleContent && articleContent.articleContent) {
                        results.push({
                            title: titleText || articleContent.articleTitle,
                            articleContent: articleContent.articleContent,
                            articleUrl: articleUrl,
                            summary: articleContent.summary,
                            sentiment: articleContent.sentiment,
                            categorizedSentiment: articleContent.categorizedSentiment,
                            countryLink: updatedCountryLink,
                            publishedDate: publishedDateObj,
                        });
                    } else {
                        console.log(`No valid article content for URL: ${articleUrl}`);
                    }
  
                  // Now fetch and include related content
                  const relatedResults = await scrapeRelatedContent($, depth + 1);
                  console.log("related results", relatedResults);
                  // Check if relatedResults has valid data before pushing
                  if (relatedResults && relatedResults.length > 0) {
                  results.push(...relatedResults); // Push related results into the main results array
                } else {
                    console.log('No related results found.');
                }
              
            }
            console.log("results....", results);
        });

        return results; // Return the filtered results
    } catch (error) {
        console.error('Error fetching flood warnings from ReliefWeb:', error);
        return [];
    }
}

// Function to scrape the article content and process its elements
async function scrapeArticleContent(articleUrl, depth) {
    try {
        if (scrapedUrls.has(articleUrl)) {
            return; // Prevent re-scraping the same URL
        }

        scrapedUrls.add(articleUrl);
        const { data } = await axios.get(articleUrl);
        const $ = cheerio.load(data);

        console.log("--------------------------------------------------------------------------");
        console.log('Scraping:', articleUrl);

        // Extract the title
        const articleTitle = $('.rw-article__title').text().trim();
        console.log('Title:', articleTitle);

        // Extract the main content, skipping the download link section
        const articleContent = $('.rw-report__content')
            .find('p, strong') // Get paragraphs and strong text tags within content which typically hold the key text.
            .filter((i, el) => {
                const text = $(el).text().trim();
      
                // Skip any text that includes 'Download Report' or other download links
                return !text.includes('Download Report') && !text.includes('PDF');
            })
            .map((i, el) => $(el).text().trim()) // Extract text from filtered elements
            .get().join('\n'); // Join text paragraphs for easier readability

            console.log('Original Article Content:', articleContent);
            console.log("***********************************")
  
        // Summarize the content
        const summarizer = new SummarizerManager(articleContent, 5); // Limit to 5 sentences in the summary
        const summary = await summarizer.getSummaryByRank(); // Generate the summary
        console.log('Summarized Content:', summary.summary);

        // Get the sentiment score
        const sentiment = await summarizer.getSentiment();
        console.log("Sentiment Score:", sentiment);

        // Categorize sentiment based on custom thresholds
        const categorizedSentiment = categorizeSentiment(sentiment);
        console.log("Categorized Sentiment:", categorizedSentiment);
        console.log("--------------------------------------------------------------------------");
        // Process related content (if any)
        await scrapeRelatedContent($, depth);
        return {
            articleTitle,
            articleContent,
            summary: summary.summary,
            sentiment,
            categorizedSentiment
        };
    } catch (error) {
        console.error('Error scraping article content:', error);
    }
}

// Helper function to categorize sentiment based on thresholds
function categorizeSentiment(score) {
    if (score > 0.05) {
        return "Positive";
    } else if (score < -0.05) {
        return "Negative";
    } else {
        return "Neutral";
    }
}

// Function to scrape related content and process them recursively
async function scrapeRelatedContent($, depth) {
    if (depth > MAX_DEPTH) {
        return[];
    }
  
    const relatedResults = [];
    // Access the "Related Content" section
    $('#related .rw-river-article').each(async(i, element) => {
        // Extract the country link and text, and make the comparison case-insensitive
        const countryLink = $(element).find('.rw-entity-country-slug a').attr('href');
        const countryText = $(element).find('.rw-entity-country-slug a').text().trim().toLowerCase(); // Convert to lowercase
        const updatedCountryLink = `https://reliefweb.int${countryLink}`
        console.log("country link", updatedCountryLink);
        // Check if the country is Myanmar (case-insensitive)
        if (countryText !== 'myanmar') {
            console.log(`Skipping related content not from Myanmar: ${countryText}`);
            return; // Skip this related content if it's not related to Myanmar
        }

        // If country is Myanmar, proceed with other checks
        const relatedTitle = $(element).find('.rw-river-article__title a').text().trim();
        const relatedUrl = $(element).find('.rw-river-article__title a').attr('href');

        const postedDate = $(element).find('dd.rw-entity-meta__tag-value--posted time').attr('datetime');
        const postedDateObj = new Date(postedDate);

        const currentYear = new Date().getFullYear();
        const keywords = ['Flood', 'Disaster', 'Cyclone', 'Typhoon', 'Rain', 'Storm'];

        // Check if the date is after the current year and the title contains relevant keywords
        if (postedDateObj.getFullYear() >= currentYear) {
            const isRelevant = keywords.some(keyword => relatedTitle.includes(keyword));
            if (isRelevant) {
                console.log(`Related Content: ${relatedTitle} | URL: ${relatedUrl} | Country: Myanmar`);
                // Recursively scrape related content
                const articleContent = await scrapeArticleContent(relatedUrl, depth + 1); // Using await here
                if (articleContent) {  // Ensure the content is not undefined
                    relatedResults.push({
                        title: relatedTitle || articleContent.articleTitle,
                        articleContent: articleContent.articleContent,
                        articleUrl: relatedUrl,
                        summary: articleContent.summary,
                        sentiment: articleContent.sentiment,
                        categorizedSentiment: articleContent.categorizedSentiment,
                        countryLink: updatedCountryLink,
                        publishedDate: postedDateObj,
                    });
                } else {
                    console.log(`Failed to fetch article content for: ${relatedTitle}`);
                }
            }
        }
    });
    return relatedResults;
}
fetchFloodWarningsReliefWeb();
module.exports = { fetchFloodWarningsReliefWeb };
