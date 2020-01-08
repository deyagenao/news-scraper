// Import the Comment mongoose model
var db = require("../models");

module.exports = {
    // Find comments associated with a specific article 
    find: function(req, res) {
        db.Comment.find({ _articleId: req.params.id }).then(function(dbComment) {
            res.json(dbComment);
        })
    },
    // create new comment
    create: function(req, res) {
        db.Comment.create(req.body).then(function(dbComment) {
            res.json(dbComment);
        });
    },
    // Delete a comment
    delete: function(req, res) {
        db.Comment.remove({ _id: req.params.id }).then(function(dbComment) {
            res.json(dbComment);
        });
    }
};