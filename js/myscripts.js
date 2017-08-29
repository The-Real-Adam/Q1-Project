$(document).ready(function() {
  console.log("Document Ready");

  $("form").submit(function(event) {
    event.preventDefault();



    // GRAB VALUE OF THE BEER SELECT DROP DOWN
    var beerStyleId;


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
    console.log("getting beer info", beerSearch)
    // generates a random style number for returning to the search
    // function randomBeerGen(min, max) {
    //   return Math.floor(Math.random() * (max - min + 1) + min);
    // }
    beerStyleId = 120;
    var beerAPIKey = 'd396971583c5fd990eb18bf4f205d2dc';

    // the ajax call
    // "http://api.brewerydb.com/v2/beers?styleId=" + styleIdNum + "&key=d396971583c5fd990eb18bf4f205d2dc"
    $.ajax({
      url: `http://api.brewerydb.com/v2/beers?styleId=${beerStyleId}&key=${beerAPIKey}`,
      method: 'GET',
    }).done((response) => {
      var beers = response.data;

      console.log("My Beers Given a Style:", beers)

      // Randomly choose a beer in array beers
    })
  }

  // Album search function
  function getAlbums(albumSearch) {
    console.log("getting album info", albumSearch);

    // the ajax call
    // client ID 031b1f06c0c2483cb3939e84b632e3da
    // client secret 64d8620a69614ae0aff51ce29f2a7d36
    $.ajax({
      url: 'https://api.spotify.com/v1/search',
      method: 'GET',
      dataType: 'JSON',
      headers: {
        Authorization: "Bearer BQBcpHGBK4mAXga-rw_pyD453CQkb9FlCw6YUwX0_McGrLft2XgmsD8_KM4oSRdVboZP458sbxjLH8yxVMpYMS7WqtnQdpJfNZP7OpcVoeR86BTYcS8cpW18jQkWB0L9kzBm5e0S4A"
      },
      data: {
        q: `artist:${albumSearch}`,
        type: "album",
        limit: 18
      }
    }).done((response) => {
      console.log("Spotify response: ", response.albums.items)
    }).fail((err) => {
      console.log("a bad thing happened with getting albums", err)
    })
  }

  /*
  function getAlbums(searchTerm) {
    console.log("doing tough ajax stuff with", searchTerm)

    // do the AJAX
    $.ajax({
      url: 'https://api.spotify.com/v1/search',
      method: 'GET',
      dataType: 'JSON',
      headers: { Authorization: "Bearer YOURTOKENHERE" },
      data: {
        q: `artist:${searchTerm}`,
        type: "album",
        limit: 18
      }
    }).done((response) => {
      console.log("data from spotify is...", response)
      parseAlbum(response)
    }).fail((err) => { console.log("a bad thing happened with getting albums", err) })
  }
  */


}); //end of document.ready
