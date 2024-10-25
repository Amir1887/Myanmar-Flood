const pdfParse = require('pdf-parse');
const fs = require('fs');
const { summarizeContent } = require('./summarizer');

//without summary
async function extractTextFromPdf(pdfUrl) {
    // Fetch or read the PDF (from URL or file)
    const dataBuffer = await fs.promises.readFile(pdfUrl);
    
    // Extract text
    const data = await pdfParse(dataBuffer);
    return data.text;
}

//with summary
async function processPdf(pdfUrl) {
    try {
        // Extract text from the PDF
        const pdfText = await extractTextFromPdf(pdfUrl);
        
        // Summarize the extracted text
        const summary = await summarizeContent(pdfText, 7);
        
        console.log('Summary of pdf:', summary);
        return summary;
    } catch (error) {
        console.error('Error processing PDF:', error);
    }
}

// const pdfUrl = 'path/to/pdf-file.pdf';
// processPdf(pdfUrl);

module.exports = {extractTextFromPdf, processPdf};