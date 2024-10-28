const cron = require('node-cron');  

const { fetchFloodWarningsMoezala } = require('../moezalaScraper');

// Import your scraping function  
 

const startFloodWarningsMozela = () => {  
    // Schedule the cron job to run every hour (modify as needed)  
    // Schedule the cron job to run every 2 minutes  */2 * * * *
    // Schedule the cron job to run every hour  0 * * * *
    //
    cron.schedule('*/2 * * * *', async () => {  
        console.log('Checking for updates in flood warnings...');  
        try {  
            await fetchFloodWarningsMoezala(); // Call the scraping function  
            console.log('Flood warnings fetched successfully.');  
        } catch (error) {  
            console.error('Error fetching flood warnings:', error);  
        }  
    });  
};  

module.exports = { startFloodWarningsMozela };