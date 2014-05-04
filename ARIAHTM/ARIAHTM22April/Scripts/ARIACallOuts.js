var ARIACallOuts = (function () {

    // Public methods here
    return {
        FlickrCallOut: function (request, callback) {

            $.getJSON(request, callback);

        },
		ForecastCallOut: function (calloutObject) {

            $.ajax(calloutObject);

        }

    }

}())



