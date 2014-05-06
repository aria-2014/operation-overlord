describe("ARIA Call Outs", function () {

var flickrData = 
	//jsonFlickrApi
	({
	"photos":{
		"page":1,"pages":119,"perpage":20,"total":"2368",
		"photo":[
			{"id":"6512462117","owner":"39730574@N07","secret":"4ac5599449","server":"7151","farm":8,"title":"Thu, Nov 3rd, 2011 Found Male Cat - Collins Ave, Droim Conrach, Dublin","ispublic":1,"isfriend":0,"isfamily":0,"latitude":53.379744,"longitude":-6.235942,"accuracy":"16","context":0,"place_id":"J5cjqg5UVLt5Lwk","woeid":"561656","geo_is_family":0,"geo_is_friend":0,"geo_is_contact":0,"geo_is_public":1,"url_t":"http:\/\/farm8.staticflickr.com\/7151\/6512462117_4ac5599449_t.jpg","height_t":"75","width_t":"100","url_m":"http:\/\/farm8.staticflickr.com\/7151\/6512462117_4ac5599449.jpg","height_m":"375","width_m":"500","url_sq":"http:\/\/farm8.staticflickr.com\/7151\/6512462117_4ac5599449_s.jpg","height_sq":75,"width_sq":75},
			{"id":"7015612679","owner":"39730574@N07","secret":"efde6619dc","server":"7232","farm":8,"title":"[Reunited] Sun, Mar 25th, 2012 Lost Male Cat - Grace Park Heights, Drumcondra, Dublin","ispublic":1,"isfriend":0,"isfamily":0,"latitude":53.378362,"longitude":-6.238603,"accuracy":"16","context":0,"place_id":"J5cjqg5UVLt5Lwk","woeid":"561656","geo_is_family":0,"geo_is_friend":0,"geo_is_contact":0,"geo_is_public":1,"url_t":"http:\/\/farm8.staticflickr.com\/7232\/7015612679_efde6619dc_t.jpg","height_t":"100","width_t":"75","url_sq":"http:\/\/farm8.staticflickr.com\/7232\/7015612679_efde6619dc_s.jpg","height_sq":75,"width_sq":75},
			{"id":"8651969148","owner":"39730574@N07","secret":"b69196e8d5","server":"8383","farm":9,"title":"Thu, Nov 15th, 2012 Found Female Cat - The Local Area, Beaumont, Dublin","ispublic":1,"isfriend":0,"isfamily":0,"latitude":53.385376,"longitude":-6.229763,"accuracy":"16","context":0,"place_id":"xqeDjNlUV7PdmxY","woeid":"559897","geo_is_family":0,"geo_is_friend":0,"geo_is_contact":0,"geo_is_public":1,"url_t":"http:\/\/farm9.staticflickr.com\/8383\/8651969148_b69196e8d5_t.jpg","height_t":"60","width_t":"100","url_m":"http:\/\/farm9.staticflickr.com\/8383\/8651969148_b69196e8d5.jpg","height_m":"301","width_m":"500","url_sq":"http:\/\/farm9.staticflickr.com\/8383\/8651969148_b69196e8d5_s.jpg","height_sq":75,"width_sq":75}
			]
		},"stat":"ok"});
		
var forecastData = 
	//typeof === 'function' && 
({"latitude":53.426898,"longitude":-6.257120999999984,"timezone":"Europe/Dublin","offset":1,
"currently":{"time":1399218316,"summary":"Drizzle","icon":"rain","nearestStormDistance":0,"precipIntensity":0.1803,"precipIntensityError":0.0762,"precipProbability":0.81,"precipType":"rain","temperature":13.6,"apparentTemperature":13.6,"dewPoint":11.22,"humidity":0.86,"windSpeed":7.41,"windBearing":122,"visibility":10.59,"cloudCover":0.8,"pressure":1017.18,"ozone":337.85},
	"daily":{"summary":"Drizzle tomorrow through Sunday, with temperatures falling to 12°C tomorrow.","icon":"rain",
		"data":[
			{"time":1399158000,"summary":"Mostly cloudy throughout the day.","icon":"partly-cloudy-day","sunriseTime":1399178763,"sunsetTime":1399233604,"moonPhase":0.17,"precipIntensity":0.0508,"precipIntensityMax":0.0813,"precipIntensityMaxTime":1399172400,"precipProbability":0.85,"precipType":"rain","temperatureMin":9.66,"temperatureMinTime":1399240800,"temperatureMax":15.29,"temperatureMaxTime":1399201200,"apparentTemperatureMin":6.82,"apparentTemperatureMinTime":1399240800,"apparentTemperatureMax":15.29,"apparentTemperatureMaxTime":1399201200,"dewPoint":10.23,"humidity":0.88,"windSpeed":5.7,"windBearing":123,"visibility":11.46,"cloudCover":0.81,"pressure":1018.85,"ozone":340.51},
			{"time":1399244400,"summary":"Light rain in the evening.","icon":"rain","sunriseTime":1399265047,"sunsetTime":1399320111,"moonPhase":0.2,"precipIntensity":0.0635,"precipIntensityMax":0.2769,"precipIntensityMaxTime":1399312800,"precipProbability":0.6,"precipType":"rain","temperatureMin":8.97,"temperatureMinTime":1399255200,"temperatureMax":12.25,"temperatureMaxTime":1399298400,"apparentTemperatureMin":5.8,"apparentTemperatureMinTime":1399255200,"apparentTemperatureMax":12.25,"apparentTemperatureMaxTime":1399298400,"dewPoint":8.71,"humidity":0.88,"windSpeed":7.28,"windBearing":113,"visibility":16.08,"cloudCover":0.97,"pressure":1006.14,"ozone":347.87},
			{"time":1399330800,"summary":"Drizzle starting in the afternoon, continuing until evening.","icon":"rain","sunriseTime":1399351333,"sunsetTime":1399406617,"moonPhase":0.23,"precipIntensity":0.0711,"precipIntensityMax":0.2083,"precipIntensityMaxTime":1399377600,"precipProbability":0.42,"precipType":"rain","temperatureMin":7.45,"temperatureMinTime":1399352400,"temperatureMax":13.16,"temperatureMaxTime":1399377600,"apparentTemperatureMin":5.04,"apparentTemperatureMinTime":1399352400,"apparentTemperatureMax":13.16,"apparentTemperatureMaxTime":1399377600,"dewPoint":8.33,"humidity":0.86,"windSpeed":4.58,"windBearing":157,"visibility":16.06,"cloudCover":0.53,"pressure":1003.13,"ozone":379.05},
			{"time":1399417200,"summary":"Mostly cloudy throughout the day.","icon":"partly-cloudy-day","sunriseTime":1399437621,"sunsetTime":1399493123,"moonPhase":0.26,"precipIntensity":0.033,"precipIntensityMax":0.094,"precipIntensityMaxTime":1399453200,"precipProbability":0.26,"precipType":"rain","temperatureMin":7.59,"temperatureMinTime":1399431600,"temperatureMax":12.6,"temperatureMaxTime":1399474800,"apparentTemperatureMin":4.31,"apparentTemperatureMinTime":1399431600,"apparentTemperatureMax":12.6,"apparentTemperatureMaxTime":1399474800,"dewPoint":7.5,"humidity":0.83,"windSpeed":6.37,"windBearing":186,"visibility":16.09,"cloudCover":0.6,"pressure":1006.95,"ozone":375.94},
			{"time":1399503600,"summary":"Mostly cloudy throughout the day.","icon":"partly-cloudy-day","sunriseTime":1399523910,"sunsetTime":1399579628,"moonPhase":0.29,"precipIntensity":0.0686,"precipIntensityMax":0.1016,"precipIntensityMaxTime":1399572000,"precipProbability":0.21,"precipType":"rain","temperatureMin":8.91,"temperatureMinTime":1399514400,"temperatureMax":14.23,"temperatureMaxTime":1399557600,"apparentTemperatureMin":6.11,"apparentTemperatureMinTime":1399514400,"apparentTemperatureMax":14.23,"apparentTemperatureMaxTime":1399557600,"dewPoint":9.21,"humidity":0.86,"windSpeed":5.44,"windBearing":234,"cloudCover":0.72,"pressure":1006.45,"ozone":373.96},
			{"time":1399590000,"summary":"Light rain starting in the afternoon.","icon":"rain","sunriseTime":1399610200,"sunsetTime":1399666133,"moonPhase":0.32,"precipIntensity":0.1321,"precipIntensityMax":0.2413,"precipIntensityMaxTime":1399672800,"precipProbability":0.54,"precipType":"rain","temperatureMin":9.74,"temperatureMinTime":1399593600,"temperatureMax":14.46,"temperatureMaxTime":1399636800,"apparentTemperatureMin":7.17,"apparentTemperatureMinTime":1399593600,"apparentTemperatureMax":14.46,"apparentTemperatureMaxTime":1399636800,"dewPoint":10.17,"humidity":0.87,"windSpeed":5.66,"windBearing":239,"cloudCover":0.86,"pressure":1008.5,"ozone":363.51},
			{"time":1399676400,"summary":"Drizzle until evening.","icon":"rain","sunriseTime":1399696493,"sunsetTime":1399752637,"moonPhase":0.35,"precipIntensity":0.1321,"precipIntensityMax":0.2464,"precipIntensityMaxTime":1399676400,"precipProbability":0.55,"precipType":"rain","temperatureMin":8.8,"temperatureMinTime":1399759200,"temperatureMax":14.91,"temperatureMaxTime":1399726800,"apparentTemperatureMin":6.22,"apparentTemperatureMinTime":1399759200,"apparentTemperatureMax":14.91,"apparentTemperatureMaxTime":1399726800,"dewPoint":9.33,"humidity":0.84,"windSpeed":5.51,"windBearing":254,"cloudCover":0.38,"pressure":1007.52,"ozone":394.64},
			{"time":1399762800,"summary":"Drizzle until evening.","icon":"rain","sunriseTime":1399782787,"sunsetTime":1399839141,"moonPhase":0.39,"precipIntensity":0.1041,"precipIntensityMax":0.1905,"precipIntensityMaxTime":1399809600,"precipProbability":0.3,"precipType":"rain","temperatureMin":7.84,"temperatureMinTime":1399773600,"temperatureMax":14.05,"temperatureMaxTime":1399816800,"apparentTemperatureMin":4.88,"apparentTemperatureMinTime":1399777200,"apparentTemperatureMax":14.05,"apparentTemperatureMaxTime":1399816800,"dewPoint":8.18,"humidity":0.85,"windSpeed":5.23,"windBearing":257,"cloudCover":0.32,"pressure":1010.12,"ozone":398.34}
			]
		}
	}
);

	var data1 = [
			{x: 0,  y: 0,  radius: 5},
			{x: 10, y: 10, radius: 10}
		];
	
    var server;

    beforeEach(function() {
        server = sinon.fakeServer.create();
    });

    afterEach(function () {
        server.restore();
    });
	
	var reqURL = "testURL";
	var reqJsonp = "";
	var reqDataType = "";
	var reqHeaders = {};
	function reqSuccess (data){};
	function reqError (data){};
	function reqComplete (){};
	
    it ("Should hit a fake Flickr server for data", function() {
	
        server.respondWith(JSON.stringify(flickrData));
		var request = "";
        var callback = jasmine.createSpy('callback')
        ARIACallOuts.FlickrCallOut(request, callback)
        server.respond();
        expect(callback).toHaveBeenCalled();

        var response = callback.calls.mostRecent().args[0];
		
		expect(response.photos.photo[0].id).toEqual(flickrData.photos.photo[0].id);
		expect(response.photos.photo[1].id).toEqual(flickrData.photos.photo[1].id);
		expect(response.photos.photo[1].id).toEqual(flickrData.photos.photo[1].id);
		expect(response.photos.stat).toEqual(flickrData.photos.stat);
    });

	
	
	it("Forecast test: should make an Ajax request to the correct URL", function() {
		var reqURL = "testURL";
		var reqJsonp = "";
		var reqDataType = "";
		var reqHeaders = {};
	
		sinon.spy($, "ajax");
		ARIACallOuts.ForecastCallOut( reqURL, reqJsonp, reqDataType, reqHeaders, reqSuccess, reqError, reqComplete);
		var call = $.ajax.getCall(0);
		expect (call).not.toBeNull();
		expect(call.args[0]["url"]).toEqual(reqURL);
		//expect($.ajax.mostRecentCall.args[0]["url"]).toEqual(reqURL);
		$.ajax.restore();
	});	
	
	it("Forecast test: should receive a successful response", function() {
	
		// simulate a successful Ajax result
		// chain to the spyOn() constructor, the andCallFake() method, passing in an anonymous function that calls the Ajax success() event handler
	
		spyOn($, "ajax").and.callFake(function(e) {
			e.success({});
			e.complete({});
		});
 
		var reqSuccess = jasmine.createSpy("reqSuccess");
 		var reqError = jasmine.createSpy("reqError");
		var reqComplete = jasmine.createSpy("reqComplete");
 	
		ARIACallOuts.ForecastCallOut( reqURL, reqJsonp, reqDataType, reqHeaders, reqSuccess, reqError, reqComplete);

		expect(reqSuccess).toHaveBeenCalled();  //Verifies this was called
		expect(reqError).not.toHaveBeenCalled();  //Verifies this was NOT called
		expect(reqComplete).toHaveBeenCalled();  //Verifies this was called
	});

	it("Forecast test: should receive a on error response", function() {
	
		// simulate a successful Ajax result
		// chain to the spyOn() constructor, the andCallFake() method, passing in an anonymous function that calls the Ajax error() event handler
	
		spyOn($, "ajax").and.callFake(function(e) {
			e.error({});
			e.complete({});
		});
 
		var reqSuccess = jasmine.createSpy("reqSuccess");
 		var reqError = jasmine.createSpy("reqError");
		var reqComplete = jasmine.createSpy("reqComplete");
 	
		ARIACallOuts.ForecastCallOut( reqURL, reqJsonp, reqDataType, reqHeaders, reqSuccess, reqError, reqComplete);

		expect(reqSuccess).not.toHaveBeenCalled();  //Verifies this was NOT called
		expect(reqError).toHaveBeenCalled();  //Verifies this was called
		expect(reqComplete).toHaveBeenCalled();  //Verifies this was called
	});

	it("Forecast test: should return data", function() {
		var fakeData = JSON.stringify(forecastData);
	
		// simulate a successful Ajax result
		// chain to the spyOn() constructor, the andCallFake() method, passing in an anonymous function that calls the Ajax success() event handler
	
		spyOn($, "ajax").and.callFake(function(e) {
			e.success( { data:forecastData } );
		});
 
 		var reqSuccess = jasmine.createSpy("reqSuccess");
 		var reqError = jasmine.createSpy("reqError");
		var reqComplete = jasmine.createSpy("reqComplete");
 	
		ARIACallOuts.ForecastCallOut( reqURL, reqJsonp, reqDataType, reqHeaders, reqSuccess, reqError, reqComplete);

		var resData = reqSuccess.calls.mostRecent().args[0];
		
		//expect(reqSuccess).toHaveBeenCalled();
		//expect(resData.data.latitude).toEqual(forecastData.latitude);
		expect(reqSuccess).toHaveBeenCalledWith( { data:forecastData } );

	});
	
})