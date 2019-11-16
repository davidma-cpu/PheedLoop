// Grab the articles as a json
$.getJSON("/sessions", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page
      $("#sessions").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].description + "</p>");
    }
  });
  
  
  // Whenever someone clicks a p tag
  $(document).on("click", "p", function() {
    // Empty the#speakers from the note section
    $("#speakers").empty();
    // Save the id from the p tag
    var thisId = $(this).attr("data-id");
  
    // Now make an ajax call for the Article
    $.ajax({
      method: "GET",
      url: "/sessions/" + thisId
    })
      // With that done, add the note information to the page
      .then(function(data) {
        console.log(data);
        // The title of the article
        // $("#speakers").append("<h2>" + data.speakers[0].name + "</h2>");
        // An input to enter a new title
        $("#speakers").append("<h2>" + "Enter a rating for the session from 1-5" + "</h2>");
        $("#speakers").append("<input id='ratinginput' name='rating' >");
        // A textarea to add a new note body
        // $("#speakers").append("<textarea id='bodyinput' name='body'></textarea>");
        // // A button to submit a new note, with the id of the article saved to it
        $("#speakers").append("<button data-id='" + thisId + "' id='saverating'>Save Rating</button>");
  
        // If there's a note in the article
        if (data.speakers) {
          for (var i = 0; i < data.speakers.length; i++) {
            // Display the apropos information on the page
            $("#speakers").append("<p data-id='" + data.speakers[i]._id + "'>" + data.speakers[i].name + "<br />" + data.speakers[i].biography + "</p>");
          }
          // Place the title of the note in the title input
          // $("#titleinput").val(data.note.title);
          // Place the body of the note in the body textarea
          // $("#bodyinput").val(data.note.body);
        }
      });
  });
  
  // When you click the savenote button
  $(document).on("click", "#saverating", function() {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");
    var rating = $("#ratinginput").val();
    //console.log(rating);
  
    // Run a POST request to change the rating, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/sessions/" + thisId,
      data: {
        rating: rating
      }
    })
      // With that done
      .then(function(data) {
        // Log the response
        console.log(data);
        // Empty the#speakers section
        $("#speakers").empty();
      });
  
    // Also, remove the values entered in the input and textarea for rating entry
    $("#ratinginput").val("");
  });
  