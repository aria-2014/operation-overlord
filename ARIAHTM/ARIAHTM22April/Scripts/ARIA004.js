$(document).ready(function () {

		//Global variables
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
		var autoPlace;


        //defines bounding box of all locations
        var bounds;
       
        //info window
        var infowindow = new google.maps.InfoWindow();
		
		var geocoder = new google.maps.Geocoder();
		
		//Layers
		var trafficLayer;
		var transitLayer;
		var weatherLayer;
		var cloudLayer;
		var bicycleLayer;
        var panoramioLayer;
		var fusTblLayer;
		var fusTblLayerTwitter;

		var photoPanel;
		
		var gobalforecastData = [];


// Misc 
		
        //trace function for debugging
        function trace(message)
        {
            if (typeof console != 'undefined')
            {
                console.log(message);
            }
        }

        //alert function for debugging		
		function mlAlertMsg(msg){
			var mlAlertMsgShow;
			mlAlertMsgShow = false;
			if (mlAlertMsgShow) {
				alert( msg );
			}
		}
		function mlAlertMsg2(msg){
			var mlAlertMsgShow2;
			mlAlertMsgShow2 = false;
			if (mlAlertMsgShow2) {
				alert( msg );
			}
		}   		
		
		
// Weather Chart
function getForecast() {
	gobalforecastData = [];
    var forecastData = [];
	var reqURL = "https://api.forecast.io/forecast/89279fee14f6fcc1b7d86ca3cf7908cb/";
	reqURL = reqURL + curLat + "," + curLng;
	//reqURL = reqURL + "53.426898,-6.257120999999984";
	reqURL = reqURL + "?callback=?&units=si&exclude=minutely,hourly,alerts,flags";
	//https://api.forecast.io/forecast/89279fee14f6fcc1b7d86ca3cf7908cb/53.426898,-6.257120999999984?callback=?&units=si&exclude=minutely,hourly,alerts,flags
	
    //$.ajax({
	ARIACallOuts.ForecastCallOut({
        url: reqURL,//exclude=[blocks]
        jsonp: "callback",
        dataType: "jsonp",
        headers: {
            'Access-Control-Allow-Origin': '*',
            "Content-type": "application/json"
        },
        success: function (data) {
            //forecastData = data.daily.data; //forecastData = data.daily;
            $.each(data.daily, function (index, value) {
                if (index == "icon") {
                    //console.log(value);
                }
                if (index == "data") {
                    $.each(value, function (index, value1) {
                        gobalforecastData.push({
                            time: value1.time,
                            summary: value1.summary,
                            precipProbability: value1.precipProbability,
                            temperatureMin: value1.temperatureMin,
                            temperatureMax: value1.temperatureMax,
                            cloudCover: value1.cloudCover
                        });
                        //forecastData.push(value);
                        //console.log(value1.summary);
                    });
                }
                if (index == "summary") {
                    //console.log(value);
                }

            });
        },
        error: function (data) {
            alert("error");
        },
        complete: function () {
            forecastJSON();
            drawGraph();
        }
    });
}


function forecastJSON() {
    //jsonfcstdata.title = { text: "Weather Forecast", fontFamily: "Times New Roman", fontweight: "bold", fontStyle: "italic", padding: 5, cornerRadius: 4, borderThickness: 2 };
    jsonfcstdata.axisX = { title: "", fontFamily: "Ariel", fontweight: "bold", tickColor: "#5f5", lineColor: "#9c9", };
    jsonfcstdata.axisY = { title: "", fontFamily: "Ariel", fontweight: "bold", suffix: " %", interval: 20, gridColor: "#fee", tickColor: "#5f5", lineColor: "#9c9", };
	
    $.each(gobalforecastData, function (index, value) {
        jsonfcstdata.data[0].dataPoints[index] = ({ click: function () { alert(value.summary + "\n\r Max Temp " + value.temperatureMax + "\n\r Min Temp " + value.temperatureMin); }, x: new Date(value.time * 1000), y: (value.cloudCover) * 100 });
        jsonfcstdata.data[1].dataPoints[index] = ({ click: function () { alert(value.summary + "\n\r Max Temp " + value.temperatureMax + "\n\r Min Temp " + value.temperatureMin); }, x: new Date(value.time * 1000), y: (value.precipProbability) * 100 });
    });
}


function drawGraph() {
    var chart = new CanvasJS.Chart("chartContainer", jsonfcstdata);
	resizeChart();
    chart.render();
}

function resizeChart() {
			mlAlertMsg2("resizeChart");

			var tmpWidth = parseInt( $(window).width() );
			mlAlertMsg2( tmpWidth + " ");
			
			//var chartDiv = document.getElementById("chartRowSeg");
			//tmpWidth = chartDiv.style.width;
			//mlAlertMsg2( tmpWidth + " ");
			
			var varWidth;
			//480, 768, 980
			//if ( tmpWidth <= 980 ) {
			//	varWidth = tmpWidth;
			//} else {
			//	varWidth = Math.floor(tmpWidth / 2) - 50;
			//}
			//mlAlertMsg2( varWidth + " ");
			
			switch (true) {
				case (tmpWidth <= 480): 
					varWidth = Math.floor( tmpWidth - ((tmpWidth / 100)*10) );
					break;
				case (tmpWidth >= 481 && tmpWidth <=767):
					varWidth = Math.floor( tmpWidth - ((tmpWidth / 100)*10) );
					break;
				case (tmpWidth >= 768 && tmpWidth <=979): 
					varWidth = Math.floor( tmpWidth - ((tmpWidth / 100)*10) );
					break;
				default:
					mlAlertMsg2( "default" );
					varWidth = Math.floor( (tmpWidth / 2) - ((tmpWidth / 2)/100)*10 );
					break;
			}
			mlAlertMsg2( varWidth + " ");
			var varHeight = 250;
		
			jsonfcstdata.width = varWidth;
			jsonfcstdata.height = varHeight;
			
			$('#chartContainer').css('width', (varWidth));
			$('#chartContainer').css('height', (varHeight));
}


var jsonfcstdata = {
    data: [
		{ type: "line", showInLegend: true, legendText: "Cloud cover", indexLabelFontSize: 22, dataPoints: [] },
		{ type: "line", showInLegend: true, legendText: "Chance of rain", indexLabelFontSize: 22, dataPoints: [] }
    ],
	width: 0,
	height: 0
};

	
		
	   
// Flickr
	   
        //toggle array layers on/off
		function removeArrayLayer(arraylayer)
        {
            if (arraylayer) {
                for (i in arraylayer) {                
                    if (arraylayer[i].getVisible() == true)
                    {
                        arraylayer[i].setMap(null);
                        arraylayer[i].visible = false;
                    }
                }
            }
        }

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
		function getFlickr(search, searchbyuserid)
        {
            bounds = new google.maps.LatLngBounds ();

            //alert("(1) " + search + " (2) " +  searchbyuserid);
            
            //setup request based on search and searchbyuserid function parameters
            if (search && searchbyuserid) {
                var req = 'http://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=c7da18f4cdc5e79a5f073858e7871a53&text='+search+'&id=' + searchbyuserid +'&lat='+curLat+'&lon='+curLng+'&extras=geo,url_t,url_m,url_sq&radius=20&radius_units=mi&per_page=20&jsoncallback=?';
            }
            else {
                if (search) {
                    var req = 'http://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=c7da18f4cdc5e79a5f073858e7871a53&text='+search+'&lat='+curLat+'&lon='+curLng+'&extras=geo,url_t,url_m,url_sq&radius=20&radius_units=mi&per_page=20&jsoncallback=?';
                }
                else {
                    var req = 'http://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=c7da18f4cdc5e79a5f073858e7871a53&id=' + searchbyuserid +'&lat='+curLat+'&lon='+curLng+'&extras=geo,url_t,url_m,url_sq&radius=20&radius_units=mi&per_page=20&jsoncallback=?';
                }
            }
			
			//alert (req);
			//console.log(req);
			// sample call
			//http://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=c7da18f4cdc5e79a5f073858e7871a53&text=cats&lat=53.377699&lon=-6.236904999999979&extras=geo,url_t,url_m,url_sq&radius=20&radius_units=mi&per_page=20&jsoncallback=?
			
			/*
            $.getJSON(req,
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
			*/
			
			ARIACallOuts.FlickrCallOut(req,
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
        function flickrinitialise(flickrquery, flickrquerybyuserid)
        {
			removeArrayLayer(flickr);
			flickr=[];
            getFlickr(flickrquery, flickrquerybyuserid);
        }

// Twitter

        function twitterinitialise(twitterquery)
        {
			//(twitterquery);
			removeLayer(fusTblLayerTwitter);

			fusTblLayerTwitter = null;
			
			var lrLat = curLat - 0.20;
			var upLat = curLat + 0.20;
			var lrLng = curLng - 0.30;
			var upLng = curLng + 0.30;
			
			var whereClause = "ST_INTERSECTS(col4, RECTANGLE(LATLNG(" + lrLat + "," + lrLng + "), LATLNG(" + upLat + "," + upLng + ")))";
			whereClause = whereClause + "AND TweetText CONTAINS IGNORING CASE '" + twitterquery + "'";
			//alert (whereClause);
			
			if (!fusTblLayerTwitter) {
				fusTblLayerTwitter = new google.maps.FusionTablesLayer({
					heatmap: { enabled: false },
					query: {
						select: "col4",
						from: "11_sPhhQ3OtuaOxmPL9unURAOq-5JPSq6tXusqwYF",
						where: whereClause
					},
					options: {
						styleId: 2,
						templateId: 2
					}
				});
			}
			toggleLayer(fusTblLayerTwitter);
        }		

		/* Using flicker fusion table for testing while twitter fusion table was under construction
        function twitterinitialise(twitterquery)
        {

			removeLayer(fusTblLayerTwitter);

			fusTblLayerTwitter = null;
			
			var lrLat = curLat - 0.20;
			var upLat = curLat + 0.20;
			var lrLng = curLng - 0.30;
			var upLng = curLng + 0.30;
			
			var whereClause = "ST_INTERSECTS(col3, RECTANGLE(LATLNG(" + lrLat + "," + lrLng + "), LATLNG(" + upLat + "," + upLng + ")))";
			whereClause = whereClause + "AND Attraction CONTAINS IGNORING CASE '" + twitterquery + "'";
			//alert (whereClause);
			
			if (!fusTblLayerTwitter) {
				fusTblLayerTwitter = new google.maps.FusionTablesLayer({
					heatmap: { enabled: false },
					query: {
						select: "col3",
						from: "1749GF6jtMIFaZkXqGCOiXBDuSyijD5ARqdWVpGRX",
						where: whereClause
					},
					options: {
						styleId: 2,
						templateId: 2
					}
				});
			}
			toggleLayer(fusTblLayerTwitter);
        }		
		*/

// Google layers	

		function removeLayer(this_layer)
		{
			mlAlertMsg("toggleLayer")
			if (this_layer) {
				if( this_layer.getMap() ){
					this_layer.setMap(null);
				}
			}
		}
		
		function toggleLayer(this_layer)
		{
			mlAlertMsg("toggleLayer")
			if( this_layer.getMap() ){
				this_layer.setMap(null);
			}else{
				this_layer.setMap(flickrmap);
			}
		}
				
		$('#transitlayer').click(function() { 
			if (!transitLayer) {
				removeLayer(transitLayer);
				transitLayer = null;
				transitLayer = new google.maps.TransitLayer();
			}
			toggleLayer(transitLayer);
		}); 

		$('#trafficlayer').click(function() { 
			if (!trafficLayer) {
				removeLayer(trafficLayer);
				trafficLayer = null;
				trafficLayer = new google.maps.TrafficLayer();
			}
			toggleLayer(trafficLayer);
		}); 
		
		$('#bicyclelayer').click(function() { 
			if (!bicycleLayer) {
				removeLayer(bicycleLayer);
				bicycleLayer = null;
				bicycleLayer = new google.maps.BicyclingLayer();;
			}
			toggleLayer(bicycleLayer);
		}); 
		
		$('#weatherlayer').click(function() { 
			if (!weatherLayer) {
				removeLayer(weatherLayer);
				weatherLayer = null;			
				weatherLayer = new google.maps.weather.WeatherLayer({
					temperatureUnits: google.maps.weather.TemperatureUnit.CELSIUS
				});
			}
			toggleLayer(weatherLayer);
			
			if (!cloudLayer) {	
				removeLayer(cloudLayer);
				cloudLayer = null;			
				cloudLayer = new google.maps.weather.CloudLayer();
			}			
			toggleLayer(cloudLayer);
		}); 

		$('#panoramiolayer').click(function() { 

			if (!panoramioLayer) {
				removeLayer(panoramioLayer);
				panoramioLayer = null;
				panoramioLayer = new google.maps.panoramio.PanoramioLayer();
			}
			toggleLayer(panoramioLayer);
			
			/*
			photoPanel = document.getElementById('photo-panel');
			flickrmap.controls[google.maps.ControlPosition.RIGHT_TOP].push(photoPanel);

			google.maps.event.addListener(panoramioLayer, 'click', function(photo) {
				var li = document.createElement('li');
				var link = document.createElement('a');
				link.innerHTML = photo.featureDetails.title + ': ' +
					photo.featureDetails.author;
				link.setAttribute('href', photo.featureDetails.url);
				li.appendChild(link);
				photoPanel.appendChild(li);
				photoPanel.style.display = 'block';
			});
			*/	
			
		}); 


// Fusion Table for top 10
		
		$('#fusTbllayer').click(function() { 
			if (!fusTblLayer) {
				removeLayer(fusTblLayer);
				fusTblLayer = null;
				fusTblLayer = new google.maps.FusionTablesLayer({
					heatmap: { enabled: false },
					query: {
						select: "col3",
						from: "1749GF6jtMIFaZkXqGCOiXBDuSyijD5ARqdWVpGRX",
						where: ""
					},
					options: {
						styleId: 2,
						templateId: 2
					}
				});
			}
			toggleLayer(fusTblLayer);
			
		}); 



// Search criteria		
		

		function isSourceFlickr()
		{
			var inputSearchTypeVal =  $("input[name='inputSearchType']:checked").val();
			if( inputSearchTypeVal == 0  ) {
				return true
			} else {
				return false
			}
		}

		function isSourceTwitter()
		{
			var inputSearchTypeVal =  $("input[name='inputSearchType']:checked").val();
			if( inputSearchTypeVal == 1  ) {
				return true
			} else {
				return false
			}
		}
	
		$('#togglesource').click(function () {
			if (isSourceFlickr()) {		
				toggleArrayLayer(flickr);
			} else {
				toggleLayer(fusTblLayerTwitter);
			}
		});
		
		function StartSearch () {
			if (isSourceFlickr()) {		
				var flickrquery = $('#sourcequery').val() + "";
				var flickrquerybyuserid = $('#squbyuserid').val() + "";
				if (flickrquery || flickrquerybyuserid) 
					flickrinitialise(flickrquery, flickrquerybyuserid); 
			} else {
				var twitterquery = $('#sourcequery').val();
				if (twitterquery) 
					twitterinitialise(twitterquery);
			}
		}		
//		$('#sourcesearch, #sourcesearchbyuserid').click(function() { 
		$('#sourcesearch').click(function() { 
			StartSearch();			
		}); 
		
		
// Map initialisation
		
		function geocodePosition(pos) {
			geocoder.geocode({ latLng: pos }, function(responses) {
				if (responses && responses.length > 0) {
					updateMarkerAddress(responses[0].formatted_address);
				} else {
					updateMarkerAddress('Cannot determine address at this location.');
				}
			});
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
			flickrmap.setCenter(flickrmarker.getPosition());
		}

		function updateMarkerAddress(str) {
			document.getElementById('address').innerHTML = str;
		}	
	
		function contInit(position) {
			mlAlertMsg("contInit");

			curLat = position.coords.latitude;
			curLng = position.coords.longitude;
			
			curLatLng = new google.maps.LatLng(curLat, curLng);

            var myOptions = {
                zoom: 8,
                center: curLatLng,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
				zoomControl: true,
				zoomControlOptions: {
					style: google.maps.ZoomControlStyle.SMALL
				}
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
			
			// Weather chart
			getForecast();
			
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
					
					// Weather chart
					getForecast();

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
				//updateMarkerPosition(flickrmarker.getPosition());
			});

			google.maps.event.addListener(flickrmarker, 'dragend', function() {
				updateMarkerStatus('Drag ended');
				geocodePosition(flickrmarker.getPosition());
				updateMarkerPosition(flickrmarker.getPosition());
				// Weather chart
				getForecast();

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
		//http://www.bootply.com/tagged/maps
		//css-tricks.com/box-sizing/
		function initialize() {	
			mlAlertMsg("initialise");
		
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
		
		function compResizing() {
			var h = $(window).height();		

			//Resize map
			offsetTop = 60;
			$('#map-canvas').css('height', (h - offsetTop));
			
			//Resize chart
			resizeChart();
		}

		//$('#chtAccBtn').click(function() { 
		//	compResizing();
		//}).resize(); 
		
		$(window).resize(function () {
			compResizing();
		}).resize();

		function flickrStart() {	
			//google.maps.event.addDomListener(window, 'load', initialize);
			mlAlertMsg("flickrstart");
			
			//$("input[name='trafficlayer']").prop('checked', false);
			//$("input[name='transitlayer']").prop('checked', false);
			//$("input[name='weatherlayer']").prop('checked', false);
			//$("input[name='bicyclelayer']").prop('checked', false);
			//$("input[name='panoramiolayer']").prop('checked', false);
			//$("input[name='fusTbllayer']").prop('checked', false);
			
			$("input[name='sourcequery']").prop('value', "");
			$("input[name='squbyuserid']").prop('value', "");

			trafficLayer = null;
			transitLayer = null;
			weatherLayer = null;
			cloudLayer = null;
			bicycleLayer = null;
			panoramioLayer = null;
			fusTblLayer = null;
			fusTblLayerTwitter = null;
	        flickr = [];	
			
			initialize();
			
		}
		
		$('#flickrstart').click(function() { 
			flickrStart();
		}); 
		
		$(function(){
			flickrStart();
		});
		
});
