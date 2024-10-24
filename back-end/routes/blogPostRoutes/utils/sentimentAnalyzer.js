const SummarizerManager = require('node-summarizer');


async function getSentiment(text) {
    const summarizer = new SummarizerManager(text, 5);
    return await summarizer.getSentiment();
}

module.exports = { getSentiment };