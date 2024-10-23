const cron = require('node-cron');
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse'); // Library for parsing PDF content
const { NlpManager } = require('node-nlp');
const nlpManager = new NlpManager();

const urls = [
  "https://reliefweb.int/updates?list=Myanmar%3A%20Floods%20-%20Jul%202024%20Updates&advanced-search=%28D52069%29",
  "https://www.moezala.gov.mm/flood-warning",
  "https://themimu.info/emergencies/floods-2024",
];

async function fetchAndExtract(url) {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const textContent = $('body').text();

    // Extract PDFs
    const pdfLinks = [];
    $('a').each((i, link) => {
      const href = $(link).attr('href');
      if (href && href.endsWith('.pdf')) {
        pdfLinks.push(href);
      }
    });

    // Extract Images
    const imageLinks = [];
    $('img').each((i, img) => {
      const src = $(img).attr('src');
      if (src) {
        imageLinks.push(src);
      }
    });

    // Find specific section for Flood Warnings
    const floodWarnings = [];
    $('a').each((i, link) => {
      const title = $(link).text().trim();
      const href = $(link).attr('href');
      if (title.includes('Flood Warning') && href) {
        floodWarnings.push({ title, href });
      }
    });

    // Extract Latest Resources section
    const resources = [];
    $('.view-content table tbody tr').each((i, row) => {
      const titleElement = $(row).find('td.views-field-nothing a');
      const title = titleElement.text().trim();
      const href = titleElement.attr('href');
      const uploadedDate = $(row).find('td.views-field-changed-1').text().trim();

      if (title && href) {
        resources.push({ title, href, uploadedDate });
      }
    });

    // Return all collected data in a structured format
    return { 
      textContent, 
      pdfLinks, 
      imageLinks, 
      floodWarnings, 
      resources 
    };
  } catch (error) {
    console.error('Error fetching the page:', error);
    return { 
      textContent: '', 
      pdfLinks: [], 
      imageLinks: [], 
      floodWarnings: [], 
      resources: [] 
    };
  }
}

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

async function analyzeContent(text) {
  await nlpManager.train();
  const summary = nlpManager.process('en', text);
  return summary;
}

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

  const startBlogPostFetchCron = () => {
    cron.schedule('0 * * * *', async () => {
      console.log('Checking for updates...');
      for (const url of urls) {
        const { textContent, pdfLinks, imageLinks, floodWarnings, resources } = await fetchAndExtract(url);
        let contentToAnalyze = textContent;
  
        // Fetch and analyze PDF content if any
        for (const pdfUrl of pdfLinks) {
          const pdfContent = await fetchPdfContent(pdfUrl);
          contentToAnalyze += pdfContent;
        }
  
        if (contentToAnalyze) {
          const title = 'Generated Title'; // Optionally extract from HTML
          const summary = await analyzeContent(contentToAnalyze);
          const blogPost = createBlogPost(title, summary, contentToAnalyze, imageLinks, pdfLinks);
          
          console.log('Flood Warnings:', floodWarnings);
          console.log('Resources:', resources);
          console.log('Blog Post:', blogPost);
  
          // Here, you can save the blogPost, floodWarnings, and resources to your database
        }
      }
    });
  }
  

module.exports = { startBlogPostFetchCron };
