const SummarizerManager = require('node-summarizer');

async function summarizeContent(text, sentenceCount) {
    const summarizer = new SummarizerManager(text, sentenceCount);
    const summary = await summarizer.getSummaryByRank();
    return summary.summary;
}

module.exports = { summarizeContent };