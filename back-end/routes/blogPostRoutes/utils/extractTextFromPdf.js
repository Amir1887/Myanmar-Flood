const pdfParse = require('pdf-parse');
const axios = require('axios');

// Dynamically import the ESM module for summarization
async function loadSummarizer() {
    const { summarizeContent } = await import('./summarizer.mjs');
    return summarizeContent;
}

// Retry function to download the PDF with retries in case of network failure
async function downloadPdfWithRetry(pdfUrl, retries = 3, retryDelay = 1000, timeout = 60000) { // Extended timeout to 30 seconds
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            console.log(`Downloading PDF (Attempt ${attempt}):`, pdfUrl);

            // Fetch the PDF with a 30-second timeout
            const response = await axios.get(pdfUrl, { 
                responseType: 'arraybuffer', 
                timeout,// Pass the extended timeout here
                maxContentLength: Infinity, // Set to Infinity to allow large PDFs
                maxBodyLength: Infinity // Set to Infinity to allow large PDFs
            });

            return response.data; // Return the PDF data if successful
        } catch (error) {
            if (attempt === retries || !error.code || !['ECONNRESET', 'ETIMEDOUT'].includes(error.code)) {
                console.error(`Failed to download PDF after ${retries} attempts:`, error.message);
                throw error; // If retries are exhausted or the error isn't network-related, throw the error
            }

            console.log(`Network error: ${error.code}. Retrying download in ${retryDelay}ms...`);
            await new Promise(resolve => setTimeout(resolve, retryDelay)); // Wait before retrying
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

        // Dynamically load the summarizeContent function
        const summarizeContent = await loadSummarizer();
        
        // Optionally, you can now pass the extracted text to summarizer or store it for further use
        const summary = await summarizeContent(data.text, 130).catch(err => {
            console.log('Summarization failed, using full content.');
            return data.text; // Fall back to the full text if summarization fails
        });
        console.log('Summary:', summary);
        console.log('......................................................................');
        return summary;  // Return the summary to be used in fetchLatestResources(for sending to db)
        
    } catch (error) {
        console.error('Error processing PDF:', error);
    }
}

module.exports = { processPdf };
