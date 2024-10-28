const express = require("express");

const { startFloodWarningsReliefWeb } = require("./cronJobs/cronReliefWeb");
const { startFloodWarningsMozela } = require("./cronJobs/cronMozela");

const router = express.Router();
require("dotenv").config();

// Define the route to trigger the scraping and blog post creation process
router.get("/blog-posts", async (req, res) => {
    try {

        await startFloodWarningsReliefWeb ();
        await startFloodWarningsMozela ();

        res.status(200).json({
            message: "Blog post fetch started"
        });
    } catch (error) {
        console.error("Error during blog post fetch:", error);
        res.status(500).json({ message: "Failed to fetch blog posts" });
    }
});

module.exports = router;
