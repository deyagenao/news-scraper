// Import the Comment mongoose model
var Comment = require("../models/Comment");

module.exports = {
    getComments: function(data, cb) {
        Comment.find({
            _articleId: data._id
        }, cb);
    },
    saveNewComment: function(data, cb) {
        var newComment = {
            _articleId: data._id,
            body: data.body
        };

        Comment.create(newComment, function(err, doc) {
            if(err) {
                console.log(err);
            }
            else {
                console.log(doc);
                cb(doc);
            }
        })
    },
    deleteComment: function(data,cb) {
        Comment.remove({
            _id: data._id
        }, cb);
    }
}