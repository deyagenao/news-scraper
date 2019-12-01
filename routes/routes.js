// Server Routes 
// =========================================

// Import scrape Function 
var scrape = require("../scripts/scrape");

// Import Article and Comments controllers 
var articlesController = require("../controllers/article");
var commentsController = require("../controllers/comment");

module.exports = function(app) {
    app.get("/", function(req, res) {
        res.render("index");
    });

    app.get("/saved", function(req, res) {
        res.render("saved");
    });

    app.get("/api/addNewArticles", function(req, res) {
        articlesController.addNewArticles(function(err, docs) {
            if (!docs || docs.insertedCount === 0) {
                res.json({
                    message: "No new articles today! Check back tomorrow!"
                });
            }
            else {
                res.json({
                    message: "Added " + docs.insertedCount + " new articles!"
                });
            }
        });
    });

    app.get("/api/articles", function(req, res) {
        var query = {};
        if (req.query.saved) {
            query = req.query;
        }

        articlesController.getArticles(query, function(data) {
            res.json(data);
        });
    });

    app.delete("/api/articles/:id", function(req, res) {
        var query = {};
        query._id = req.params.id;

        articlesController.deleteArticles(query, function(err, data){
            res.json(data);
        });
    });

    app.put("/api/articles", function(req, res) {
        articlesController.updateArticle(req.body, function(err, data) {
            res.json(data);
        });
    });

    app.get("/api/comments/:article_id?", function(req, res){
        var query ={};
        if (req.params.article_id) {
            query._id = req.params.article_id;
        }

        commentsController.getComments(query, function(err, data) {
            res.json(data);
        });
    });

    app.delete("/api/comments/:id", function(req, res) {
        var query = {};
        query._id = req.params.id;

        commentsController.deleteComment(query, function(err, data){
            res.json(data);
        });
    });

    app.post("/api/comments", function(req, res){
        commentsController.saveNewComment(req.body, function(data){
            res.json(data);
        });
    });
}