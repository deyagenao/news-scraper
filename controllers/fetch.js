// Controller for Article Scraper
// =============================
var db = require("../models");
var scrape = require("../scripts/scrape");

module.exports = {
    scrapeHeadlines: function(req, res) {
        // Return the NPR scrape
        return scrape()
            .then(function(results) {
                return db.Article.create(results);
            })
            .then(function(dbArticle) {
                if (dbArticle.length === 0) {
                    res.json({
                        message: "No new articles today. Check back tomorrow."
                    });
                }
                else {
                    res.json({
                        message: "Added " + dbArticle.length + " new articles."
                    });
                }
            })
            .catch(function(err) {
                res.json({ 
                    message: "Scrape complete."
                });
            });
    }
};