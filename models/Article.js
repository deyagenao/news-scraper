var mongoose = require("mongoose");

// Save reference to Schema constructor from mongoose 
var Schema = mongoose.Schema;

// Use the Schema constructor to create a new ArticleSchema object 
var ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    description: {
        type: String, 
        required: true
    },
    imgLink: {
        type: String 
    },
    // Linking the article with all associated Comments 
    comments: {
        type: Schema.Types.ObjectId
    }
})

// Create the model based on the ArticleSchema using mongoose's model method 
var Article = mongoose.model("Article", ArticleSchema);

// Export Article model
module.exports = Article;