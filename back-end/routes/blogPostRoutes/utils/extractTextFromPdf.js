const pdfParse = require('pdf-parse');
const axios = require('axios');
const { summarizeContent } = require('./summarizer');

// Retry function to download the PDF with retries in case of failure
async function downloadPdfWithRetry(pdfUrl, retries = 3) {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            console.log(`Downloading PDF (Attempt ${attempt}):`, pdfUrl);

            // Fetch the PDF as a stream with a 10-second timeout
            const response = await axios.get(pdfUrl, { responseType: 'arraybuffer'});

            return response.data; // Return the PDF data if the download is successful
        } catch (error) {
            if (attempt === retries) {
                console.error(`Failed to download PDF after ${retries} attempts`, error);
                throw error; // If retries are exhausted, throw the error
            }
            console.log(`Retrying download... Attempt ${attempt} of ${retries}`);
        }
    }
}

// Function to download the PDF and process it
async function processPdf(pdfUrl) {
    try {
        // Download the PDF with retry logic
        const pdfData = await downloadPdfWithRetry(pdfUrl, 3); // 3 retry attempts

        // Convert the fetched data to a buffer for pdf-parse
        const pdfBuffer = Buffer.from(pdfData);

        // Extract the text from the PDF using pdf-parse
        const data = await pdfParse(pdfBuffer);
        // console.log('Extracted Text:', data.text);

        // Optionally, you can now pass the extracted text to summarizer or store it for further use
        const summary = await summarizeContent(data.text, 6);
        console.log('Summary:', summary);
        console.log('......................................................................');
        
    } catch (error) {
        console.error('Error processing PDF:', error);
    }
}

module.exports = { processPdf };
