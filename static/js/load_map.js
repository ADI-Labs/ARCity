const output = document.getElementById("map");

function initialize() {
    const columbia = {
        lat: 40.8078,
        lng: -73.9641
    };
    const map = new google.maps.Map(document.getElementById('map'), {
        center: columbia,
        zoom: 14
    });
    const panorama = map.getStreetView();
    panorama.setOptions({
        addressControl: false,
        addressControlOptions: {
            position: google.maps.ControlPosition.LEFT_CENTER
        },
        linksControl: true,
        position: map.center,
        pov: {
            heading: 180,
            pitch: 0
        },
        visible: true,
        motionTracking: true,
        motionTrackingControlOptions: {
            position: google.maps.ControlPosition.LEFT_BOTTOM
        }
    });

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
            const nextMarker = new google.maps.Marker({
                map: map,
                icon: icon,
                title: place.name,
                position: place.geometry.location,
                zIndez: google.maps.Marker.MAX_ZINDEX
            });
            const infowindow = new google.maps.InfoWindow({
                content: '<span style="padding: 0px; text-align:left" align="left"><h5>${place.name}&nbsp;' +
                    '&nbsp;${place.rating}</h5><p>${place.formatted_address}<br />${place.formatted_phone_number}<br />' +
                    '<a target="_blank" href=${place.website}>${place.website}</a></p>'
            });
            nextMarker.addListener('click', () => {
                infowindow.open(panorama, nextMarker);
            });
            markers.push(nextMarker);
        });
    });
}
