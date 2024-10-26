const { pipeline } = require('@huggingface/transformers');  // Import the pipeline function from transformers

async function summarizeContent(text, maxLength = 130) {
    if (!text || text.length < 100) {
        console.log("Text too short or invalid for summarization.");
        return "Text too short to summarize.";
    }

    try {
        // Load the summarization pipeline using the bart-large-cnn model
        const summarizer = pipeline('summarization', 'facebook/bart-large-cnn');
        
        // Generate a summary with the given max and min lengths
        const summary = await summarizer(text, {
            max_length: maxLength,
            min_length: 30,
            do_sample: false
        });

        // Check if the summary is of good quality (not too short)
        if (summary[0].summary_text && summary[0].summary_text.length > 50) {
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
