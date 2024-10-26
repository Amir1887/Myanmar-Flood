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

        // Check for quality - e.g., if summary is too short or lacks important content, return the full text instead
        if (summary.summary && summary.summary.length > 50) {
            return summary.summary;
        } else {
            console.log('Summary quality too low, using full content.');
            return text;
        }
    } catch (error) {
        console.error('Error summarizing content:', error);
        return text;  // If an error occurs, fall back to the full text
    }
}

module.exports = { summarizeContent };
