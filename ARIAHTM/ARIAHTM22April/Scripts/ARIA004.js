$(document).ready(function () {

		//declare map
        var flickrmap;
		var flickrmarker;
		var curLatLng;
		var curLat;
		var curLng;
        var flickr = [];
		
		var autoInfoWin;
		var autoInput;
		var autoTypes;
		var autoComplete;
		var autoPlace


        //defines bounding box of all locations
        var bounds;
       
        //info window
        var infowindow = new google.maps.InfoWindow();
		
		var geocoder = new google.maps.Geocoder();
       
        //trace function for debugging
        function trace(message)
        {
            if (typeof console != 'undefined')
            {
                console.log(message);
            }
        }
       
        //toggle array layers on/off
        function toggleArrayLayer(arraylayer)
        {
            if (arraylayer) {
                for (i in arraylayer) {                
                    if (arraylayer[i].getVisible() == true)
                    {
                        arraylayer[i].setMap(null);
                        arraylayer[i].visible = false;
                    }
                    else
                    {
                        arraylayer[i].setMap(flickrmap);
                        arraylayer[i].visible = true;
                    }
                }
            }
        }
       
        //Function to create Flickr Marker
        function createFlickrMarker(i,latitude,longitude,infowindowcontent,icon)
        {
            var markerLatLng = new google.maps.LatLng(latitude,longitude);  
			
            //extent bounds for each stop and adjust map to fit to it
            bounds.extend(markerLatLng);
            flickrmap.fitBounds(bounds);
            //set marker to be the flickr image, resizing it to 32 by 32 pixels
            var image = new google.maps.MarkerImage(icon, null, null, null, new google.maps.Size(32,32));
           
            //create and map the marker
            flickr[i] = new google.maps.Marker({
                position: markerLatLng,
                map: flickrmap,
                title: infowindowcontent,
                icon: image
            });
           
            //add an onclick event
            google.maps.event.addListener(flickr[i], 'click', function() {
                infowindow.setContent(infowindowcontent);
                infowindow.open(flickrmap,flickr[i]);
            });
        }
               
        //Function to get data from Flickr
        function getFlickr(search)
        {
            bounds = new google.maps.LatLngBounds ();
            $.getJSON('http://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=c7da18f4cdc5e79a5f073858e7871a53&text='+search+'&lat='+curLat+'&lon='+curLng+'&extras=geo,url_t,url_m,url_sq&radius=20&radius_units=mi&per_page=20&jsoncallback=?',
                function(data)
                {trace(data);
                    $.each(data.photos.photo, function(i,item){
                        infowindowcontent = '<strong>'+item.title+'</strong><br>';
                        infowindowcontent += '<a href="'+item.url_m+'" target="_top">';
                        infowindowcontent += '<img src="'+item.url_t+'"></a>';
                        createFlickrMarker(i,item.latitude,item.longitude,infowindowcontent,item.url_sq); 
                    });    
                }
            );
        }
                       
        //Function that gets run when the document loads
        function flickrinitialise(flickrquery)
        {
			var ctrlVal = document.getElementById("toggleFlickr").checked;
			if (ctrlVal == true) {
				toggleArrayLayer(flickr)
			}
			flickr=[];
			document.getElementById("toggleFlickr").checked = true;
            getFlickr(flickrquery);
        }
	
		$('#toggleFlickr').click(function () {
			toggleArrayLayer(flickr);
		});
		
		$('#flickrsearch').click(function() { 

			var flickrquery = $('#flickrquery').val();
			if (flickrquery) 
				flickrinitialise(flickrquery); 
		}); 
		
		function geocodePosition(pos) {
			geocoder.geocode({
				latLng: pos
			}, function(responses) {
				if (responses && responses.length > 0) {
					updateMarkerAddress(responses[0].formatted_address);
				} else {
					updateMarkerAddress('Cannot determine address at this location.');
				}
			});
            //Adding call for forcast here as position updated
			alert(pos.lat() + "" + pos.lng());
            //Finish calls for forecast
		}

		function updateMarkerStatus(str) {
			document.getElementById('markerStatus').innerHTML = str;
		}

		function updateMarkerPosition(latLng) {
			curLat = latLng.lat();
			curLng = latLng.lng();
			document.getElementById('info').innerHTML = [
				curLat,
				curLng
			].join(', ');
		}

		function updateMarkerAddress(str) {
			document.getElementById('address').innerHTML = str;
		}

		function contInit(position) {
		
			curLat = position.coords.latitude;
			curLng = position.coords.longitude;
			
			curLatLng = new google.maps.LatLng(curLat, curLng);

            var myOptions = {
                zoom: 8,
                center: curLatLng,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };			
			flickrmap = new google.maps.Map(document.getElementById('map_canvas'), myOptions);
			
			flickrmarker = new google.maps.Marker({
				position: curLatLng,
				title: 'Point A',
				map: flickrmap,
				draggable: true
			});

			// Update current position info.
			updateMarkerPosition(curLatLng);
			geocodePosition(curLatLng);
			
			// Auto complete code start
			autoInfoWin = new google.maps.InfoWindow();
			autoInput = (document.getElementById('pac-input'));
			autoTypes = document.getElementById('type-selector');
			flickrmap.controls[google.maps.ControlPosition.TOP_LEFT].push(autoInput);
			flickrmap.controls[google.maps.ControlPosition.TOP_LEFT].push(autoTypes);
			autoComplete = new google.maps.places.Autocomplete(autoInput);
			autoComplete.bindTo('bounds', flickrmap);
			
			google.maps.event.addListener(autoComplete, 'place_changed', 
				function() {
					autoInfoWin.close();
					flickrmarker.setVisible(false);
					autoPlace = autoComplete.getPlace();
					if (!autoPlace.geometry) {
						return;
					}

					// If the place has a geometry, then present it on a map.
					if (autoPlace.geometry.viewport) {
						flickrmap.fitBounds(autoPlace.geometry.viewport);
					} else {
						flickrmap.setCenter(autoPlace.geometry.location);
						flickrmap.setZoom(8);  // Why 17? Because it looks good.
					}
					/*
					marker.setIcon(({
						url: autoPlace.icon,
						size: new google.maps.Size(71, 71),
						origin: new google.maps.Point(0, 0),
						anchor: new google.maps.Point(17, 34),
						scaledSize: new google.maps.Size(35, 35)
					}));
					*/
					var myPos = autoPlace.geometry.location;
					flickrmarker.setPosition(myPos);
					updateMarkerPosition(myPos);
					geocodePosition(myPos);
					flickrmarker.setVisible(true);

					var address = '';
					if (autoPlace.address_components) {
						address = [
							(autoPlace.address_components[0] && autoPlace.address_components[0].short_name || ''),
							(autoPlace.address_components[1] && autoPlace.address_components[1].short_name || ''),
							(autoPlace.address_components[2] && autoPlace.address_components[2].short_name || '')
							].join(' ');
					}

					autoInfoWin.setContent('<div><strong>' + autoPlace.name + '</strong><br>' + address);
					autoInfoWin.open(flickrmap, flickrmarker);
			});
			
			// Sets a listener on a radio button to change the filter type on Places
			// Autocomplete.
			function setupClickListener(id, types) {
				var radioButton = document.getElementById(id);
				google.maps.event.addDomListener(radioButton, 'click', function() {
				autoComplete.setTypes(types);
				});
			}

			setupClickListener('changetype-all', []);
			setupClickListener('changetype-establishment', ['establishment']);
			setupClickListener('changetype-geocode', ['geocode']);

			// Auto complete code end 

			
			// Add dragging event listeners.
			google.maps.event.addListener(flickrmarker, 'dragstart', function() {
				autoInfoWin.close();
				updateMarkerAddress('Dragging...');
			});

			google.maps.event.addListener(flickrmarker, 'drag', function() {
				updateMarkerStatus('Dragging...');
				updateMarkerPosition(flickrmarker.getPosition());
			});

			google.maps.event.addListener(flickrmarker, 'dragend', function() {
				updateMarkerStatus('Drag ended');
				geocodePosition(flickrmarker.getPosition());
			});		
		}
		
		function dispError(error) {
			var errors = { 
				1: 'Permission denied',
				2: 'Position unavailable',
				3: 'Request timeout'
			};
			alert("Error: " + errors[error.code]);
		}
	
		function initialize() {		
			if (navigator.geolocation) {
		        var timeoutVal = 10 * 1000 * 1000;
		        navigator.geolocation.getCurrentPosition(
					contInit,
					dispError,
					{ enableHighAccuracy: true, timeout: timeoutVal, maximumAge: 0 }
				); 
		    }
		    else {
		        alert("Geolocation is not supported by this browser");
		    }
		}
		
		$(window).resize(function () {
			var h = $(window).height(),
			offsetTop = 60; // Calculate the top offset
			$('#map-canvas').css('height', (h - offsetTop));
		}).resize();

		$('#flickrstart').click(function() { 
			//google.maps.event.addDomListener(window, 'load', initialize);
			initialize();
		}); 

});
