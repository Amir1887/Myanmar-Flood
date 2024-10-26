async function summarizeContent(text, maxLength = 150) {
    if (!text || text.length < 100) {
        console.log("Text too short or invalid for summarization.");
        return text;
    }

    try {
        // Dynamically import the pipeline function from @xenova/transformers
        const { pipeline } = await import('@xenova/transformers');

        // Initialize the summarization pipeline
        const summarizer = await pipeline('summarization', 'facebook/bart-large-cnn');
        
        // Generate the summary with specific settings
        const summary = await summarizer(text, {
            max_length: maxLength,
            min_length: 30,
            do_sample: false,
        });
        
        console.log("Summarized text:", summary[0].summary_text);

        // Return the summary if it's valid and long enough
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
