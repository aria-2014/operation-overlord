$(document).ready(function () {

       //declare map
        var flickrmap;
	
        var flickr = [];

        //defines bounding box of all locations
        var bounds;
       
        //info window
        var infowindow = new google.maps.InfoWindow();
       
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
            $.getJSON('http://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=c7da18f4cdc5e79a5f073858e7871a53&text='+search+'&lat='+flickrmap.getCenter().lat()+'&lon='+flickrmap.getCenter().lng()+'&extras=geo,url_t,url_m,url_sq&radius=20&radius_units=mi&per_page=20&jsoncallback=?',
                function(data)
                {trace(data);
                    $.each(data.photos.photo, function(i,item){
                        infowindowcontent = '<strong>'+item.title+'</strong><br>';
                        infowindowcontent += '<a href="'+item.url_m+'" target="_blank">';
                        infowindowcontent += '<img src="'+item.url_t+'"></a>';
                        createFlickrMarker(i,item.latitude,item.longitude,infowindowcontent,item.url_sq); 
                    });    
                }
            );

        }
                       
        //Function that gets run when the document loads
        function flickrinitialise(flickrquery)
        {
            var latlng = new google.maps.LatLng(53.3536105, -6.2426705);
            var myOptions = {
                zoom: 12,
                center: latlng,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            flickrmap = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

            //Sample call for yelp data for cafe's
            getFlickr(flickrquery);
        }
	
		$('#toggleFlickr').click(function () {
			toggleArrayLayer(flickr)
		});
		
		$('#flickrsearch').click(function() { 

			var flickrquery = $('#flickrquery').val();
			if (flickrquery) 
				flickrinitialise(flickrquery); 
		}); 

});
