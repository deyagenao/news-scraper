// Import the Article model
var db = require("../models");

module.exports = { 
    // Find all articles, sort them by date, send them back to client 
    findAll: function(req, res) {
        db.Article
        .find(req.query)
        .sort({ date: -1 })
        .then(function(dbArticle) {
            res.json(dbArticle);
        });
    },
    // Delete specific articles
    delete: function(req, res) {
        db.Article.remove({ _id: req.params.id }).then(function(dbArticle) {
            res.json(dbArticle);
        });
    },
    // Update specific article
    update: function(req, res) {
        db.Article.findOneAndUpdate({_id: req.params.id}, { $set: req.body }, { new: true }).then(function(dbArticle) {
            res.json(dbArticle);
        });
    }
};