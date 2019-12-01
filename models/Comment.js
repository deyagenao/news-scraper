var mongoose = require("mongoose");

// Save reference to Schema constructor from mongoose 
var Schema = mongoose.Schema;

// Use the Schema constructor to create a new CommentSchema object 
var CommentSchema = new Schema({
    body: {
        type: String
    }
})

// Create the model based on the ArticleSchema using mongoose's model method 
var Comment = mongoose.model("Comment", CommentSchema);

// Export Article model
module.exports = Comment;