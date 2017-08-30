$(document).ready(function() {
      console.log("Document Ready");

      // GRAB VALUE OF THE BEER SELECT DROP DOWN
      $("#beerSearch").click(function(event) {
        beerStyleId = event.target.value
        console.log("Beer Style Id is: ", beerStyleId)
      })

      //the submission form that kicks it all off
      $("form").submit(function(event) {
        event.preventDefault();

        // beer search term -- gets beer from the input feild
        var beerSearch = $("#beerSearch").val().trim();
        console.log("beerSearch is ", beerSearch)
        getBeers(beerSearch)

        // Album search term  -- gets artist from input feild
        var albumSearch = $("#albumSearch").val().trim();
        // console.log("albumSearch is ", albumSearch)
        getAlbums(albumSearch)
      });

      // add beer click event listener
      $('#beerRandom').click(function(event) {
        getBeers(beerSearch)
      })

      // add album event listener
      $('#albumRandom').click(function(event) {
        getAlbums(albumSearch)
      })

      // add both event listener
      $('#redoBoth').click(function(event) {
        getBeers(beerSearch)
        getAlbums(albumSearch)
      })

      //  Beer search function
      function getBeers(beerSearch) {
        console.log("getting beer info", beerSearch)

        // beerStyleId = 120;
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
        let displayedBeerDesc = displayedBeer.description
        let displayedBeerLabel = displayedBeer.labels.medium || `http://placekitten.com/g/300/300`

        console.log("Beer Data to be rendered: ", displayedBeerName, displayedBeerABV, displayedBeerDesc, displayedBeerLabel)

        renderBeer(displayedBeerName, displayedBeerABV, displayedBeerDesc, displayedBeerLabel)
      }

      // render your beer
      function renderBeer(displayedBeerName, displayedBeerABV, displayedBeerDesc, displayedBeerLabel) {
        let beerCard = $('div.MyBeer')
        let beerCardInfo = $('<div>').append(`
    <img class="card-img-top MyBeerImage" src="${displayedBeerLabel}" alt="Card image cap">
    <div class="card-body MyBeer">
      <h4 class="card-title">${displayedBeerName}</h4>
      <p class="card-text">${displayedBeerDesc}</p>
      <p class="card-text"><small class="text-muted">abv: ${displayedBeerABV}%</small></p>
    </div>`)
        beerCard.html(beerCardInfo)
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
              Authorization: "Bearer BQDAyuyw2fvDiFTsjVFMyt4cCsNxWPpk8Dln6JMDHuMQaPgUbp7KMtXw_LG_fh8DiaR0DjnuwKOdYZll22QCnn46jL0wuw7MMIWtatOuBSfqHEdRX1chSNBocw7s7ABwXKOCrTEstw"
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
        console.log("parsing displayedAlbum:", displayedAlbum)

        // go through albums, extract the url, name and image, then render
        let displayedAlbumUrl = displayedAlbum.href
        let displayedAlbumName = displayedAlbum.name
        let displayedAlbumImageUrl = displayedAlbum.images ? displayedAlbum.images[0].url : ''
        let displayedAlbumArtist =displayedAlbum.artists.name
        console.log("Album data to be rendered: ", displayedAlbumUrl, displayedAlbumName, displayedAlbumImageUrl, displayedAlbumArtist);

        renderAlbum(displayedAlbumUrl, displayedAlbumName, displayedAlbumImageUrl,displayedAlbumArtist)

      }

      // add an album to the result UL
      function renderAlbum(displayedAlbumUrl, displayedAlbumName, displayedAlbumImageUrl,displayedAlbumArtist) {
        let albumCard = $('div.MyAlbum')
        let albumCardInfo = $('<div>').append(`
           <img class="card-img-top MyAlbumImage" src="${displayedAlbumImageUrl}" alt="Card image cap">
           <div class="card-body MyAlbum">
             <h4 class="card-title">${displayedAlbumArtist}</h4>
             <p class="card-text">Album: ${displayedAlbumName}</p>
             <p class="card-text"><small class="text-muted">Enjoy!</small></p>
           </div>
      `)

          albumCard.html(albumCardInfo)
        }

      }); //end of document.ready
