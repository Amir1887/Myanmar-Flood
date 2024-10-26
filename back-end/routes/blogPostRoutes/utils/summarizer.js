async function summarizeContent(text, maxLength = 130) {
    if (!text || text.length < 100) {
        console.log("Text too short or invalid for summarization.");
        return "Text too short to summarize.";
    }

    try {
        // Dynamically import the pipeline function
        const { pipeline } = await import('@xenova/transformers');

        // Initialize the summarization pipeline with a model
        const summarizer = await pipeline('summarization', 'facebook/bart-large-cnn');
        const summary = await summarizer(text, {
            maxLength: maxLength,
            minLength: 30,
            doSample: false
        });

        if (summary[0]?.summary_text.length > 50) {
            return summary[0].summary_text;
        } else {
            console.log('Summary quality too low, using full content.');
            return text;
        }
    } catch (error) {
        console.error('Error summarizing content:', error);
        return text;  // Fall back to full text on error
    }
}

module.exports = { summarizeContent };
