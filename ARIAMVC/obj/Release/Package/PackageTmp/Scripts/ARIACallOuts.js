var ARIACallOuts = (function () {

    // Public methods here
    return {
        FlickrCallOut: function (request, callback) {

            $.getJSON(request, callback);

        },
		ForecastCallOut: function (reqURL,reqJsonp,reqDataType,reqHeaders,reqSuccess,reqError,reqComplete) {

            $.ajax({ url: reqURL,
				jsonp: reqJsonp,
				dataType: reqDataType,
				headers: reqHeaders,
				success: function (data) {
						reqSuccess( data );
					},
				error: function (data) {
						reqError( data );
					},
				complete: function () {
						reqComplete();
					}
				});

        }

    }

}())



