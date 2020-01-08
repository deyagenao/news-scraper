$(document).ready(function(){

    // Set a reference to article container on Index page 
    var articleContainer = $(".article-container");
    
    // Event handlers for different buttons on the index page (saving an article, scraping new articles and clearing the current articles)
    $(document).on("click", ".btn.save", handleArticleSave);
    $(document).on("click", ".scrape-new", handleArticleScrape);
    $(".clear").on("click", handleArticleClear);

    function initPage() {
        // AJAX request to retrieve all unsaved articles and then display in the article container on page 
        $.get("/api/articles?saved=false").then(function(data) {
            articleContainer.empty();
            // If there are any articles to display, render
            if (data && data.length) {
                renderArticles(data);
            } else {
                // Else, display message saying no articles and suggesting scrape 
                renderEmpty();
            }
        });
    }

    // Function for retrieving articles from the database and displaying on page 
    function renderArticles(articles) {
        // 

    }

    // Function for creating a bootstrap card to display each individual article (for renderArticles function)
    function createCard(article) {
        
    }

    // Function for displaying a message saying there are no articles if none are saved in the database 
    function renderEmpty(){

        // HTML to create the message in an array 
        var emptyAlert = $(
            [
                "<div class ='alert alert-warning text-center'>",
                "<h4> Oops. Looks like we don't have any articles to view.</h4>",
                "</div>",
                "<div class='card'>",
                "<div class ='card-header text-center'>",
                "<h3>What would you like to do?</h3>",
                "</div>",
                "<div class='card-body text-center'>",
                "<h4><a class ='scrape-new'>Try Scraping New Articles</a></h4>",
                "<h4><a href='/saved'>Go to Saved Articles</a></h4>",
                "</div>",
                "</div>"
            ].join("")
        );

        // Append the empty alert element to the reference of the article container already on the page
        articleContainer.append(emptyAlert);

    }

    // Function for when "Save Article" button is pressed 
    function handleArticleSave() {

        // Retrieve article object id from the card data 
        var articleToSave = $(this)
            .parents(".card")
            .data();

        // Remove card from page, as the article will now be on the saved page 
        $(this)
            .parents(".card")
            .remove();

        articleToSave.saved = true;

        // Use the put method to update this document, since the saved property has now been changed from false to true
        $.ajax({
            method: "PUT",
            url: "/api/articles/" + articleToSave._id,
            data: articleToSave
        }).then(function(data) {
            // If data was saved correctly
            if (data.saved) {
                // Re render the page and reload the list of articles 
                initPage();
            }
        });
    }

    // Function for scraping new articles, when "Scrape Articles" button is clicked 
    function handleArticleScrape() {
        // Call to the scrape API route, will add new articles to the database 
        $.get("/api/fetch").then(function(data){
            // After scraping new articles to the database, check if any are already in the collection, and then re-render articles on the page 
            console.log("scraped articles")
            initPage();
            bootbox.alert($("<h3 class ='text-center m-top-80'>").text(data.message));
        });
    }

    // Function for clearing all articles from database, for when clear button is clicked 
    function handleArticleClear() {
        $.get("/api/clear").then(function() {
            articleContainer.empty();
            initPage();
        });
    }

})