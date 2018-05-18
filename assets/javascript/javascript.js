$(document).ready(function(){
    // Array of the artits to be displayed as buttons 
    var topics = ["Michael Jackson","Linkin Park","Taylor Swift","Beyonce","Mariah Carey","Jennifer Lopez",
    "Justin Bieber","Coldplay","The Beatles","Drake","Ed Sheeran"];

        function displaygif(){
            var artist = $(this).attr("data-name");
            var queryURL = "https://api.giphy.com/v1/gifs/search?q="+ encodeURI(artist) +"&api_key=dc6zaTOxFJmzC&limit=10";
            console.log(queryURL);
            $.ajax({
            url: queryURL,
            method: "GET"
            }).then(function(response){
                var results = response.data;
                console.log(response);

            for(var i=0; i<results.length; i++){                
                    var gifDiv = $("<div class='item'>");
                    var rating = results[i].rating;
                    var p = $("<p>").text("Rating: "+rating);

                    var gif = $("<img>");
                    gif.attr("src",results[i].images.fixed_height.url)
                    gif.attr("data-still",results[i].images.fixed_height_still.url); 
                    gif.attr("data-animate",results[i].images.fixed_height.url); 
                    gif.addClass("image");

                    gifDiv.append(p);
                    gifDiv.append(gif);
                    
                    $("#giphs").prepend(gifDiv);
            }
        })
        }

        function renderButtons(){
        //  Loop to dynamically display the buttons of the topics in the array
            $("#artist-buttons").empty();
            for(var i=0; i<topics.length; i++){
                var a = $("<button>");
                a.addClass("artist");
                a.attr("data-name",topics[i]);
                a.text(topics[i]);
                $("#artist-buttons").append(a);
        }
        } 

        renderButtons();

        // User added topics
        $("#add-artist").on("click", function(){
            event.preventDefault();
            var artist = $("#movie-input").val().trim(); 
            topics.push(artist);
            renderButtons();
            console.log(artist);
        });

        $(document).on("click", ".artist", displaygif);
        $(document).on("click", ".image", function(){
            var state = $(this).attr('data-state');
            if ( state == 'still'){
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            }else{
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            }
        });
        renderButtons();
});