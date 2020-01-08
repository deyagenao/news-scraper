var router = require("express").Router();
var db = require("../../models");

// Route to render homepage 
router.get("/", function(req, res) {
    db.Article.find({ saved: false })
        .sort({ date: -1})
        .then(function(dbArticles) {
            res.render("index", { articles: dbArticles });
        });
});

// Route to render saved articles page
router.get("/saved", function(req, res) {
    db.Article.find({ saved: true })
        .sort({ date: -1 })
        .then(function(dbArticles) {
            res.render("saved", { articles: dbArticles });
        });
});

module.exports = router;