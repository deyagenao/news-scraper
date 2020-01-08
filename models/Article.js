var mongoose = require("mongoose");

// Save reference to Schema constructor from mongoose 
var Schema = mongoose.Schema;

// Use the Schema constructor to create a new ArticleSchema object 
var articleSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: { index: {unique: true } }
    },
    link: {
        type: String,
        required: true
    },
    description: {
        type: String, 
        required: true
    },
    data: {
        type: Date,
        default: Date.now
    },
    imgLink: {
        type: String 
    },
    saved: {
        type: Boolean,
        default: false
    }
})

// Create the model based on the ArticleSchema using mongoose's model method 
var Article = mongoose.model("Article", articleSchema);

// Export Article model
module.exports = Article;