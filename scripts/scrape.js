// Require dependencies 
var axios = require("axios");
var cheerio = require("cheerio");

// Make request via axios to grab HTML body from NPR sit 
var scrape = function(){
    axios.get("https://www.npr.org/").then(function(response){

        // Load HTML into cheerio and save it to variable
        var $ = cheerio.load(response.data)

        // Create an empty array to save scraped data 
        var results = [];

        // Select each element in the HTML body from where we scrape information 
        $("div.story-wrap").each(function(i, element) {

            var title = $(element).find("h3.title").text();
            var link = $(element).find("a").attr("href");
            var description = $(element).find("p.teaser").text();
            var imgLink = $(element).find("img").attr("src");

            results.push({
                title: title,
                link: link,
                description: description,
                imgLink: imgLink
            })
        })
        
        console.log(results)
    })

    
}