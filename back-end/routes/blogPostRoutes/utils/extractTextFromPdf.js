const pdfParse = require('pdf-parse');
const axios = require('axios');
const { summarizeContent } = require('./summarizer');

// Function to download the PDF and process it
async function processPdf(pdfUrl) {
    try {
        console.log("Downloading PDF:", pdfUrl);
        
        // Fetch the PDF as a stream
        const response = await axios.get(pdfUrl, { responseType: 'arraybuffer' });
        
        // Use the fetched data as a buffer for pdf-parse
        const pdfBuffer = Buffer.from(response.data);
        
        // Extract the text from the PDF using pdf-parse
        const data = await pdfParse(pdfBuffer);
        console.log('Extracted Text:', data.text);

        // You can now pass the extracted text to summarizer or store it for further use
    } catch (error) {
        console.error('Error processing PDF:', error);
    }
}
// const pdfUrl = 'path/to/pdf-file.pdf';
// processPdf(pdfUrl);

module.exports = {processPdf};