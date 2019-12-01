// Require dependencies 
var express = require("express");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");

// Set up port, either host port or local 3000
var PORT = process.env.PORT || 3000;

// Define express app variable 
var app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Handlebars
app.engine(
    "handlebars",
    exphbs({
      defaultLayout: "main"
    })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/routes")(app);

// If deployed, use deployed database. Otherwise, use local mongoArticles database 
var db = process.env.MONGODB_URI || "mongodb://localhost/mongoArticles";

// Connect mongoose to database 
mongoose.connect(db, function(err){
    if (err){
        console.log(err)
    }
    else {
        console.log("mongoose connection is successful");
    }
});

// Listen on PORT
app.listen(PORT, function() {
    console.log("Listening on port:" + PORT);
})