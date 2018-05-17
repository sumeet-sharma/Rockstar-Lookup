$(document).ready(function(){
    // Array of the artits to be displayed as buttons 
    var artists = ["Michael Jackson","Linkin Park","Taylor Swift","Beyonce","Mariah Carey","Jennifer Lopez",
    "Justin Bieber","Coldplay","The Beatles","Drake","Ed Sheeran"];

        function displaygif(){
            var artist = $(this).attr("data-name");
            var artistURL = encodeURIComponent(artist.trim());
            console.log(artist);
            var queryURL = "https://api.giphy.com/v1/gifs/search?q="+ artistURL +"&api_key=dc6zaTOxFJmzC&limit=10";
            console.log(queryURL);
            $.ajax({
            url: queryURL,
            method: "GET"
            }).then(function(response){
                var results = response.data;
                console.log(response);

            for(var i=0; i<results.length; i++){

                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                    var gifDiv = $("<div class='item'>");
                    var rating = results[i].rating;
                    var p = $("<p>").text("Rating: "+rating);

                    var gif = $("<img>");
                    gif.attr("src",results[i].images.fixed_height.url)

                    gifDiv.append(p);
                    gifDiv.append(gif);
                    
                    $("#giphs").prepend(gifDiv);
            
                }
            }
        })
        }

        function renderButtons(){
        //  Loop to dynamically display the buttons of the artists in the array
            $("#artist-buttons").empty();
            for(var i=0; i<artists.length; i++){
                var a = $("<button>");
                a.addClass("artist");
                a.attr("data-names",artists[i]);
                a.text(artists[i]);
                $("#artist-buttons").append(a);
        }
        } 

        renderButtons();

        // User added artists
        $("#add-artist").on("click", function(){
            event.preventDefault();
            var artist = $("#movie-input").val().trim(); 
            artists.push(artist);
            renderButtons();
            console.log(artist);
        });

        $(document).on("click", ".artist", displaygif);
        renderButtons();
});