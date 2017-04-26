"use strict";

/* exported initialize */
function getLocation() {
  if (navigator.geolocation) {
    return navigator.geolocation.getCurrentPosition(position => {
      return position;
    }, error => {
      alert(`Error ${error.code} encountered when attempting to retrieve ` +
            `location: ${error.message}`);
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function initialize() {
  let markers = [];

  /* Currently set as Columbia University */
  const CURRENT_LOCATION = {
    lat: 40.8078,
    lng: -73.9641
  };
  const map = new google.maps.Map(document.getElementById("map"), {
    center: CURRENT_LOCATION,
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
  const input = document.getElementById("pac-input");
  panorama.controls[google.maps.ControlPosition.TOP].push(input);
  var searchBox = new google.maps.places.SearchBox(input);

  function renderMarker(place, markers) {
    if (!place.geometry) {
      return;
    }

    const icon = {
      url: place.icon,
      size: new google.maps.Size(150, 150),
      scaledSize: new google.maps.Size(150, 150)
    };
    const marker = new google.maps.Marker({
      map: panorama,
      icon: icon,
      title: place.name,
      position: place.geometry.location,
      zIndez: google.maps.Marker.MAX_ZINDEX
    });
    const infoWindow = new google.maps.InfoWindow({
      content: `<span style="padding: 0px; text-align:left" align="left"><h5>${place.name}&nbsp;` +
        `&nbsp;${place.rating}</h5><p>${place.formatted_address}<br />${place.formatted_phone_number}<br />` +
        `<a target="_blank" href=${place.website}>${place.website}</a></p>`
    });

    marker.addListener("click", () => {
      infoWindow.open(panorama, marker);
    });

    markers.push(marker);
  }

  function renderNearbySearch(request) {
    placeService.nearbySearch(request, (results, status) => {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        markers.forEach(marker => {
          marker.setMap(null);
        });
        markers = [];
  
        results.forEach(result => {
          const place = result;
          renderMarker(place, markers);
        });
      }
    });
  }

  map.addListener("bounds_changed", () => {
    searchBox.setBounds(map.getBounds());
  });

  searchBox.addListener("places_changed", () => {
    const places = searchBox.getPlaces();
    if (places.length === 0) {
      return;
    }
    // Clear out the old markers.
    markers.forEach(marker => {
      marker.setMap(null);
    });
    markers = [];
    places.forEach(place => {
      renderMarker(place, markers);
    });
  });

  SEARCH_TYPES.forEach(labelTypePair => {
    const label = labelTypePair[0];
    const searchType = labelTypePair[1];
    const div = document.getElementById(label);

    div.addEventListener("click", () => {
      const request = {
        location: CURRENT_LOCATION,
        radius: "100",
        type: searchType
      };

      renderNearbySearch(request);
    });
  });
}
