$(document).ready(function() {



const createMarkers = () =>{
    var allLatlng = [];
    $.ajax({
        method: 'GET',
        url: `https://data.nasa.gov/resource/y77d-th95.json`,
        dataType: "JSON",
        success: function(data) {
            console.log('success');
            console.log(data);
            for (let set of data) {

                let name = set.name;
                let mass = set.mass;
                let year = set.year ? set.year.substring(0, 4) : null
                let lat = set.reclat;
                let lng = set.reclong;

                var latLng = new google.maps.LatLng(lat, lng);

                allLatlng.push(latLng);

                let image = 'meteor.png';

                // Create our info window content
                var infoWindowContent = '<div class="info_content">' +
                    `<h3>Meteor Name: ${name}</h3>` +
                    `<p>Mass: ${mass}g </p>` +
                    `<p>Year Meteor Fell: ${year} </p>` +
                    '</div>';

                // Initialise the inforWindow
                var infoWindow = new google.maps.InfoWindow({
                    content: infoWindowContent
                });

                var marker = new google.maps.Marker({
                    position: latLng,
                    map: map,
                    title: `Meteor name: ${name}`,
                    icon: image
                });

                // Display our info window when the marker is clicked
                (function(theMarker, theInfoWindow){
                  google.maps.event.addListener(marker, 'click', function() {
                    theInfoWindow.open(map, theMarker)
                  });
                  google.maps.event.addListener(map, "click", function() {
                    theInfoWindow.close();
                  });
                })(marker, infoWindow);


            }
        },
        error: function() {
            console.log('error')
        },
    })
}

const createMap = (() => {
    var mapOptions = {
        zoom: 4,
        center: new google.maps.LatLng(37.09024, -100.712891),
        panControl: false,
        panControlOptions: {
            position: google.maps.ControlPosition.BOTTOM_LEFT
        },
        zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.LARGE,
            position: google.maps.ControlPosition.RIGHT_CENTER
        },
        scaleControl: false

    };

    map = new google.maps.Map(document.getElementById('map'), mapOptions);

 createMarkers()

})()




})
