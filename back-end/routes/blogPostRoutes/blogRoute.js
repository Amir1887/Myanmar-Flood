const express = require("express");
const { startBlogPostFetchCron } = require("./cronReportsFetch");
const { fetchFloodWarningsReliefWeb } = require("./reliefwebScraper");
const { fetchFloodWarningsMoezala } = require("./moezalaScraper");
const { fetchLatestResources } = require("./mimuScraper"); // Import the Mimu scraper function
const { startFloodWarningsReliefWeb } = require("./cronJobs/cronReliefWeb");

const router = express.Router();
require("dotenv").config();

// Define the route to trigger the scraping and blog post creation process
router.get("/blog-posts", async (req, res) => {
    try {
        // Trigger the function that fetches data from MIMU
        // const mimuResources = await fetchLatestResources(); // Await the result of the function
        
        // Add other fetch calls for different scrapers if needed
        await startFloodWarningsReliefWeb ();
        // await fetchFloodWarningsMoezala();

        res.status(200).json({
            message: "Blog post fetch started"
        });
    } catch (error) {
        console.error("Error during blog post fetch:", error);
        res.status(500).json({ message: "Failed to fetch blog posts" });
    }
});

module.exports = router;
