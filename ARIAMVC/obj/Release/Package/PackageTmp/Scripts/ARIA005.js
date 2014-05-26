/*! Bing Search Helper v1.0.0 - requires jQuery v1.7.2 */ 
$(function() { 
	// Attaches a click handler to the button. 
	$('#bt_search').click(function(e) { 
		e.preventDefault(); 
		// Clear the results div. 
		$('#results').empty(); 
		var query = $('#query').val();
		var serviceOp = $('input[name=service_op]:checked', '#my_form').val(); 
		if (query) 
			search(query, serviceOp); 
	}); 

	// Performs the search. 
	function search(query, serviceOp) { 

		//user and account
	    var user = "user";
        var accountKey = "+FNZ3V14CFJFybW5si3ttOwO7rFWOScpWLzf9OGraZs";

		// Establish the data it going to  pass to controller. 
		var data = { q: query, sop: serviceOp, market: 'en-us' }; 

		// Construct the full URL for the query. 
		// var rootUri = "https://api.datamarket.azure.com/Bing/Search/"; //This does not work ... account type
		var rootUri = "https://api.datamarket.azure.com/Bing/SearchWeb/v1/"; 
		//alert(rootUri);
		//var requestStr = "https://api.datamarket.azure.com/Data.ashx/Bing/Search/Web?Query=%27hi%27&$top=50&$format=Atom";
		//var requestUri = rootUri + "/" + serviceOp + "?\$format=json&Query=$" + query + "&Market=" + data.market + ";";
		var requestUri = rootUri + serviceOp + "?Query=%27" + query + "%27&Market=%27" + data.market + "%27";
		//alert(requestUri);
		
		// Calls the proxy, passing the query, service operation and market. 		
		$.ajax({
			type: "GET",
			beforeSend: function (xhr) {
				//var accountKeyEncoded = base64_encode(":" + accountKey);
				//xhr.setRequestHeader('Authorization', "Basic " + accountKeyEncoded);
				var bytes = Crypto.charenc.Binary.stringToBytes(user + ":" + accountKey);
                var base64 = Crypto.util.bytesToBase64(bytes);
                xhr.setRequestHeader("Authorization", "Basic " + base64);
            },
            url: requestUri,
            dataType: "json",               
            success: function (obj) {
				if (obj.d !== undefined) { 
					var items = obj.d.results; 
					for (var k = 0, len = items.length; k < len; k++) { 
						var item = items[k]; 
						switch (item.__metadata.type) { 
							case 'WebResult': 
								showWebResult(item); 
								break; 
							case 'ImageResult': 
								showImageResult(item); 
								break; 
						} 
					} 
				} 
            },
            error: function (jqXHR, exception) {                    
				if (jqXHR.status === 0) {
					alert('Not connect.\n Verify Network.');
				} else if (jqXHR.status == 404) {
					alert('Requested page not found. [404]');
				} else if (jqXHR.status == 500) {
					alert('Internal Server Error [500].');
				} else if (exception === 'parsererror') {
					alert('Requested JSON parse failed.');
				} else if (exception === 'timeout') {
					alert('Time out error.');
				} else if (exception === 'abort') {
					alert('Ajax request aborted.');
				} else {
					alert('Uncaught Error.\n' + jqXHR.responseText);
				}
            }
        });
	
	} 

	// Shows one item of Web result. 
	function showWebResult(item) { 
		var p = document.createElement('p'); 
		var a = document.createElement('a'); 
		a.href = item.Url; 
		$(a).append(item.Title); 
		$(p).append(item.Description); 
		// Append the anchor tag and paragraph with the description to the results div. 
		$('#results').append(a, p); 
	} 

	// Shows one item of Image result. 
	function showImageResult(item) { 
		var p = document.createElement('p'); 
		var a = document.createElement('a'); 
		a.href = item.MediaUrl; 
		// Create an image element and set its source to the thumbnail. 
		var i = document.createElement('img'); 
		i.src = item.Thumbnail.MediaUrl; 
		// Make the object that the user clicks the thumbnail image. 
		$(a).append(i); 
		$(p).append(item.Title); 
		// Append the anchor tag and paragraph with the title to the results div. 
		$('#results').append(a, p); 
	} 
	
function base64_encode(data) {
  // http://kevin.vanzonneveld.net
  // +   original by: Tyler Akins (http://rumkin.com)
  // +   improved by: Bayron Guevara
  // +   improved by: Thunder.m
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   bugfixed by: Pellentesque Malesuada
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Rafal Kukawski (http://kukawski.pl)
  // *     example 1: base64_encode('Kevin van Zonneveld');
  // *     returns 1: 'S2V2aW4gdmFuIFpvbm5ldmVsZA=='
  // mozilla has this native
  // - but breaks in 2.0.0.12!
  //if (typeof this.window['btoa'] == 'function') {
  //    return btoa(data);
  //}
  var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
    ac = 0,
    enc = "",
    tmp_arr = [];

  if (!data) {
    return data;
  }

  do { // pack three octets into four hexets
    o1 = data.charCodeAt(i++);
    o2 = data.charCodeAt(i++);
    o3 = data.charCodeAt(i++);

    bits = o1 << 16 | o2 << 8 | o3;

    h1 = bits >> 18 & 0x3f;
    h2 = bits >> 12 & 0x3f;
    h3 = bits >> 6 & 0x3f;
    h4 = bits & 0x3f;

    // use hexets to index into b64, and append result to encoded string
    tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
  } while (i < data.length);

  enc = tmp_arr.join('');

  var r = data.length % 3;

  return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);

}

}); 
