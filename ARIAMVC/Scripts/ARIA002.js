$(document).ready(function () {
    // Variables  
        var curPosition;
        var map;
        var marker;
        var markers = new Array();
        var locations;
        var tempLocations = [
            {title: 'Current Position', lat: 0.0, lng: 0.0},
            {title: 'Shop1', lat: 53.890542, lng: -8.274856},
            {title: 'Shop2', lat: 53.923036, lng: -8.259052},
            {title: 'Shop3', lat: 52.028249, lng: -8.157507},
            {title: 'Shop4', lat: 53.80010128657071, lng: -8.28747820854187},
            {title: 'Shop5', lat: 53.950198, lng: -8.259302}
        ];
     
    // Locations     
		function dispLocations() {
            var iconURLPrefix = 'http://maps.google.com/mapfiles/ms/icons/';
            var icons = [
                iconURLPrefix + 'red-dot.png',
                iconURLPrefix + 'green-dot.png',
                iconURLPrefix + 'blue-dot.png',
                iconURLPrefix + 'orange-dot.png',
                iconURLPrefix + 'purple-dot.png',
                iconURLPrefix + 'pink-dot.png',      
                iconURLPrefix + 'yellow-dot.png'
            ];
            var icons_length = icons.length;

            //displayCoord(curPosition);
            
            var pos = new google.maps.LatLng(curPosition.coords.latitude, curPosition.coords.longitude);

            var options = {
                    zoom: 10,
                    center: pos,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
			map = new google.maps.Map(document.getElementById("map"), options);

            var infowindow = new google.maps.InfoWindow({
                    maxWidth: 160
                });
               
            var iconCounter = 0;   
               
            // Add the markers and infowindows to the map        
            //var i = Object.keys(locations).length;
            for (var i = 0; i < locations.length; i++) {  
                var locat = locations[i];
                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(locat.lat, locat.lng),
                    map: map,
                    icon : icons[iconCounter]
                });

                markers.push(marker);

                google.maps.event.addListener(marker, 'click', (function(marker, i) {
                    return function() {
                                var locat = locations[i];
                                infowindow.setContent(locat.title);
                                infowindow.open(map, marker);
                            }
                    })(marker, i)
                );
      
                iconCounter++;
                // We only have a limited number of possible icon colors, so we may have to restart the counter
                if(iconCounter >= icons_length){
                    iconCounter = 0;
                }
            }
            
            AutoCenter();
 		}
        
        function AutoCenter() {
            //  Create a new viewpoint bound
            var bounds = new google.maps.LatLngBounds();
            //  Go through each...
            $.each(markers, function (index, marker) {
                bounds.extend(marker.position);
            });
            //  Fit these bounds to the map
            map.fitBounds(bounds);
        }
              
        function addMarker(latlng, myTitle) {
          markers.push(new google.maps.Marker({
            position: latlng, 
            map: map,
            title: myTitle,
          }));    
        }
       
        function displayCoord(pos) {
            var crd = pos.coords;
            alert("Coord: lat:" + crd.latitude + ", long:" + crd.longitude + ", accuracy:" + crd.accuracy + ' meters.');
        };
        
		function displayError(error) {
			var errors = { 
				1: 'Permission denied',
				2: 'Position unavailable',
				3: 'Request timeout'
			};
			alert("Error: " + errors[error.code]);
		}
   
		function parseTimestamp(timestamp) {
			var d = new Date(timestamp);
			var day = d.getDate();
			var month = d.getMonth() + 1;
			var year = d.getFullYear();
			var hour = d.getHours();
			var mins = d.getMinutes();
			var secs = d.getSeconds();
			var msec = d.getMilliseconds();
			return day + "." + month + "." + year + " " + hour + ":" + mins + ":" + secs + "," + msec;
		}

        function setDispLocations(data) {
            locations = cloneJSON(data);
            var locat = locations[0];
            locat.lat=curPosition.coords.latitude;
            locat.lng=curPosition.coords.longitude;
            dispLocations();
        }

		function setCurPosition(position) {
            curPosition = cloneJSON(position);
            $.getJSON('/ARIA001/GetLocationsJSON', null, function (data) { setDispLocations(data); });
            //setDispLocations(tempLocations)
        }
        
		$('#locats').click(function () {
		    if (navigator.geolocation) {
		        var timeoutVal = 10 * 1000 * 1000;
		        navigator.geolocation.getCurrentPosition(
					setCurPosition,
					displayError,
					{ enableHighAccuracy: true, timeout: timeoutVal, maximumAge: 0 }
				);
		    }
		    else {
		        alert("Geolocation is not supported by this browser");
		    }
		});

    // General functions
        function cloneJSON(obj) {
            // basic type deep copy
            if (obj === null || obj === undefined || typeof obj !== 'object')  {
                return obj
            }
            // array deep copy
            if (obj instanceof Array) {
                var cloneA = [];
                for (var i = 0; i < obj.length; ++i) {
                    cloneA[i] = cloneJSON(obj[i]);
                }              
                return cloneA;
            }                  
            // object deep copy
            var cloneO = {};   
            for (var i in obj) {
                cloneO[i] = cloneJSON(obj[i]);
            }                  
            return cloneO;
        }
        
    //Tester functionc	
		function showDogs(data) {
            var list = '<p>Dog List:</p><ul>';
            $.each(data, function () {
                list += '<li>' + this.Name + ', age ' + this.Age + '</li>';
            });
            list += '</ul>';
            $('#divResults').replaceWith(list);
        }
        
        function test() {
            return 99;
        }


        $('#prods').click(function () {
            $.getJSON('/ARIA001/GetDogListJSON', null, function (data) { showDogs(data); });
        });
    
        
});
       function test1() {
            return 99;
        }
