const { SummarizerManager } = require('node-summarizer');

async function summarizeContent(text, sentenceCount) {
    // Check if the text is valid before summarizing
    if (!text || text.length < 100) { // You can adjust this threshold based on your requirements
        console.log("Text too short or invalid for summarization.");
        return "Text too short to summarize.";
    }
    
    try {
        const summarizer = new SummarizerManager(text, sentenceCount);
        const summary = await summarizer.getSummaryByRank();
        return summary.summary;
    } catch (error) {
        console.error('Error summarizing content:', error);
        return "Failed to summarize the content.";
    }
}

module.exports = { summarizeContent };
