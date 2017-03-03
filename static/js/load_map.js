const output = document.getElementById("map");

function initialize() {
    const fenway = {
        lat: 42.345573,
        lng: -71.098326
    };
    const map = new google.maps.Map(document.getElementById('map'), {
      center: fenway,
      zoom: 14
    });

    const panorama = new google.maps.StreetViewPanorama(
        document.getElementById('pano'), {
            position: map.center,
            pov: {
                heading: 34,
                pitch: 10
            },
            motionTracking: true,
            motionTrackingControlOptions: {
                position: google.maps.ControlPosition.LEFT_BOTTOM
            }
        }
    );

    // Create the search box and link it to the UI element.
    const input = document.getElementById('pac-input');
    const searchBox = new google.maps.places.SearchBox(input);
    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function() {
      var service = new google.maps.places.PlacesService(panorama);
             service.nearbySearch({
               location: panorama.getPocation(),
               radius: 500,
               type: ['store']
             }, callback);
    })



  panorama.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

}
