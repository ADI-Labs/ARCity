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
    map.setStreetView(panorama);

    // Create the search box and link it to the UI element.
    const input = document.getElementById('pac-input');
    panorama.controls[google.maps.ControlPosition.TOP].push(input);
    var searchBox = new google.maps.places.SearchBox(input);
    map.addListener('bounds_changed', () => {
        searchBox.setBounds(map.getBounds());
    });
    let markers = [];
    searchBox.addListener('places_changed', () => {
        const places = searchBox.getPlaces();
        if (places.length === 0) {
            return;
        }
        // Clear out the old markers.
        markers.forEach(function(marker) {
            marker.setMap(null);
        });
        markers = [];
        // For each place, get the icon, name and location.
        places.forEach(place => {
            if (!place.geometry) {
                return;
            }

            const icon = {
                url: place.icon,
                size: new google.maps.Size(150, 150),
                scaledSize: new google.maps.Size(150, 150)
            };
            markers.push(new google.maps.Marker({
                map: panorama,
                icon: icon,
                title: place.name,
                position: place.geometry.location,
                size: new google.maps.Size(150, 150),
                scaledsize: new google.maps.Size(150, 150)
            }));
        });
        console.log(markers);
    });
}
