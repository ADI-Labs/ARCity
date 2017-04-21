let markers = [];

function initialize() {
    const columbia = {
        lat: 40.8078,
        lng: -73.9641
    };
    const map = new google.maps.Map(document.getElementById('map'), {
        center: columbia,
        zoom: 14
    });
    const placeService = new google.maps.places.PlacesService(map);
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

    searchBox.addListener('places_changed', () => {
        const places = searchBox.getPlaces();
        if (places.length === 0) {
            return;
        }
        // Clear out the old markers.
        markers.forEach(marker => {
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

    const stores = document.getElementById('Stores');
    function getLocation() {
        if (navigator.geolocation) {
            return navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            x.innerHTML = "Geolocation is not supported by this browser.";
        }
    }

    function showPosition(position) {
        x.innerHTML = "Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude;
    }

    function callback(results, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK){
        markers.forEach(marker => {
            marker.setMap(null);
        });
        markers = [];
        results.forEach(result => {
          const place = result;
          const icon = {
              url: place.icon,
              size: new google.maps.Size(150, 150),
              scaledSize: new google.maps.Size(150, 150)
          };
          const tempMarker = new google.maps.Marker({
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
          tempMarker.addListener('click', () => {
              infowindow.open(panorama, tempMarker);
          });
          markers.push(tempMarker);
        }
      }
    }

    stores.addEventListener('click', event => {
      const request = {
        location: columbia,
        radius: '100',
        types: ['store']
      };
      placeService.nearbySearch(request, callback);
    });
}
