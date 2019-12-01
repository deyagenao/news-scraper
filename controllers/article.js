// Import scrape function 
var scrape = require("../scripts/scrape");

// Import the Article mongoose model
var Article = require("../models/Article");

module.exports = { 
    addNewArticles: function(cb) {
        scrape(function(articles){
            Article.collection.insertMany(articles, {ordered:false}, function(err, docs){
                cb(err,docs);
            });
        });
    },
    deleteArticles: function(query, cb) {
        Article.remove(query, cb);
    },
    getArticles: function(query, cb) {
        Article.find(query)
            .sort({
                _id: -1
            })
            .exec(function(err, doc){
                cb(doc);
            });
    },
    updateArticle: function(query, cb) {
        Article.update({_id: query.id}, {
            $set: query
        }, {}, cb);
    }

}