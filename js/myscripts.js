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
    // console.log("albumSearch is ", albumSearch)
    getAlbums(albumSearch)
  });

  //  Beer search function
  function getBeers(beerSearch) {
    console.log("getting beer info", beerSearch)

    beerStyleId = 120;
    var beerAPIKey = 'd396971583c5fd990eb18bf4f205d2dc';

    // the ajax call
    // Example: "http://api.brewerydb.com/v2/beers?styleId=" + styleIdNum + "&key=d396971583c5fd990eb18bf4f205d2dc"
    $.ajax({
      url: `http://api.brewerydb.com/v2/beers?styleId=${beerStyleId}&key=${beerAPIKey}`,
      method: 'GET',
    }).done((responseBeer) => {
      var beers = responseBeer.data;
      console.log("My Beers Given a Style:", beers)

      // Randomly choose a beer in array beers
      var displayedBeer = beers[Math.floor(Math.random() * beers.length)]
      console.log("my random beer is", displayedBeer)
      parseBeer(displayedBeer)
    })
  }

  function parseBeer(displayedBeer) {
    let displayedBeerName = displayedBeer.name
    let displayedBeerABV = displayedBeer.abv
    let displayedBeerDesc= displayedBeer.description
    let displayedBeerLabel = displayedBeer.labels.medium || `http://placekitten.com/g/300/300`

    console.log("Beer Data to be rendered: ",displayedBeerName,displayedBeerABV,displayedBeerDesc, displayedBeerLabel)
  }



  // Album search function
  function getAlbums(albumSearch) {
    // console.log("getting album info", albumSearch);

    // the ajax call
    // client ID 031b1f06c0c2483cb3939e84b632e3da
    // client secret 64d8620a69614ae0aff51ce29f2a7d36
    // the ACTUAL Authorization code: Bearer BQBcpHGBK4mAXga-rw_pyD453CQkb9FlCw6YUwX0_McGrLft2XgmsD8_KM4oSRdVboZP458sbxjLH8yxVMpYMS7WqtnQdpJfNZP7OpcVoeR86BTYcS8cpW18jQkWB0L9kzBm5e0S4A
    $.ajax({
        url: 'https://api.spotify.com/v1/search',
        method: 'GET',
        dataType: 'JSON',
        headers: {
          Authorization: "Bearer BQBf3CGEV22PPfFATuML2tu4Z6huQawFXG13m9h009ZqQauNkZtY6ukqMtA7emCtf9uLxvJYhnl3a3lH0xMm0w37GWLkgOUKDDffKWuzMDW1Th7VoLRed0RKzf-jeT2LmRdlajAgVQ"
        },
        data: {
          q: `artist:${albumSearch}`,
          type: "album",
          limit: 18
        }
      }).done((responseAlbum) => {
        console.log("Spotify response: ", responseAlbum.albums.items)
        var albums = responseAlbum.albums.items
        // get a random album
        var displayedAlbum = albums[Math.floor(Math.random() * albums.length)]
        // console.log("my random album is", displayedAlbum)
        parseAlbum(displayedAlbum)
      })

      .fail((err) => {
        console.log("a bad thing happened with getting albums", err)
      })

  }

  // extract albums from JSON AND add to DOM
  function parseAlbum(displayedAlbum) {
    // console.log("parsing displayedAlbum:", displayedAlbum)

    // go through albums, extract the url, name and image, then render
    let displayedAlbumUrl = displayedAlbum.href
    let displayedAlbumName = displayedAlbum.name
    let displayedAlbumImageUrl = displayedAlbum.images ? displayedAlbum.images[0].url : ''

    console.log("Album data to be rendered: ", displayedAlbumUrl, displayedAlbumName, displayedAlbumImageUrl);

    renderAlbum(displayedAlbumUrl, displayedAlbumName, displayedAlbumImageUrl)

  }

  // add an album to the result UL
  function renderAlbum(displayedAlbumUrl, displayedAlbumName, displayedAlbumImageUrl) {
    let ul = $('ul.results')

    let li = $('<li>').append(`<a href="${displayedAlbumUrl}">
          <img src="${displayedAlbumImageUrl}">
          <p class='caption'>${displayedAlbumName}</p>
        </a>`)
    ul.append(li)
  }

}); //end of document.ready
