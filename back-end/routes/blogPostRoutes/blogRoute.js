const express = require("express");  
const router = express.Router();  

const { startBlogPostFetchCron } = require("./cronReportsFetch"); // Import from cron module  
require("dotenv").config(); 


router.get("/blog-posts", async (req, res) => {
    startBlogPostFetchCron();
 });

module.exports = router;