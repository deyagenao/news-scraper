var mongoose = require("mongoose");

// Save reference to Schema constructor from mongoose 
var Schema = mongoose.Schema;

// Use the Schema constructor to create a new CommentSchema object 
var commentSchema = new Schema({
    _articleId: {
        type: Schema.Types.ObjectId,
        ref: "Article"
    },
    date: {
        type: Date,
        default: Date.now
    },
    body: String
});

// Create the model based on the ArticleSchema using mongoose's model method 
var Comment = mongoose.model("Comment", commentSchema);

// Export Article model
module.exports = Comment;