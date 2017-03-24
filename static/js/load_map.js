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

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function() {
        console.log("what the fuck");
        console.log(searchBox.getPlaces())
        const places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }
        console.log("hello");
        // Clear out the old markers.
        markers.forEach(function(marker) {
            marker.setMap(null);
        });
        markers = [];
        console.log("what");
        // For each place, get the icon, name and location.
        const bounds = new google.maps.LatLngBounds();
        places.forEach(function(place) {
            if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
            }
            const icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
                map: map,
                icon: icon,
                title: place.name,
                position: place.geometry.location
            }));

            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        console.log(markers);
        map.fitBounds(bounds);
    });
    panorama.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

}
