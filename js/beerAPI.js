// Key: d396971583c5fd990eb18bf4f205d2dc

$(document).ready(function() {
  console.log("Document Ready");

  $("form").submit(function(event) {
    event.preventDefault();

    // beer search term -- gets beer from the input feild
    var beerSearch = $("#beerSearch").val().trim();
    console.log("beerSearch is ", beerSearch)
    getBeers(beerSearch)

    // Album search term  -- gets artist from input feild
    var albumSearch = $("#albumSearch").val().trim();
    console.log("albumSearch is ", albumSearch)
    getAlbums(albumSearch)
  });

  //  Beer search function
  function getBeers(beerSearch) {
    console.log("getting beer info",beerSearch)
    // te ajax call
    $.ajax({
      url: 'http://api.brewerydb.com/v2/',
      method: 'GET',
      dataType: 'application/json',
      headers: {
        Authorization: "http://api.brewerydb.com/v2/?key=d396971583c5fd990eb18bf4f205d2dc"
      },
      data: {
        q: `:${beerSearch}`,
        name: "Beer",
        description:"",
        abv:"",
        labels:{"medium":""},
        limit: 10
      }
    }).done((response) => {
      console.log("data from breweryDB is...", response)
    })
  }

  // Album search function
  function getAlbums(albumSearch) {
    console.log("getting album info", albumSearch);

    // the ajax call
    $.ajax({
      url: 'https://api.spotify.com/v1/search',
      method: 'GET',
      dataType: 'JSON',
      headers: {
        Authorization: "31b1f06c0c2483cb3939e84b632e3da"
      },
      data: {
        q: `artist:${albumSearch}`,
        type: "album",
        limit: 18
      }
    }).done((response) => {
      console.log("data from spotify is...", response)
    })
  }


});//end of document.ready
