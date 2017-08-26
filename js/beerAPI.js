Key: d396971583c5fd990eb18bf4f205d2dc

$(document).ready(function() {
  console.log("Document Ready");

  $("form").submit(function(event){
    event.preventDefault();
    var searchTerm = $("#search-term").val().trim();
    console.log("searchTerm is ", searchTerm)
    getBeers(searchTerm)
  });



})
