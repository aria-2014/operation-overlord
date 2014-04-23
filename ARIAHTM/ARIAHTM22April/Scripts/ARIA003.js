$(document).ready(function () {
    /*   alert("got here");
       $.ajax({
           url: "https://george-vustrey-weather.p.mashape.com/api.php?location=Dublin",
           headers: { 'X-Mashape-Authorization': 'L6Abj40efQ4Q4G5pDOml48z0UP8ZEQPw' },
           dataType: "json",
           success: function (data) {
               $.each(data, function (index, value) {
                   console.log(value.condition);
                   console.log(value.day_of_week);
                   console.log(value.high);
                   console.log(value.high_celsius);
                   console.log(value.low);
                   console.log(value.low_celsius);
                   console.log("*************");
               });
               alert("success" + data);
           },
           error: function (data) {
               alert("error");
           }
       });
       */
});

//https://api.forecast.io/forecast/APIKEY/LATITUDE,LONGITUDE       ***Access-Control-Allow-Origin*** headers: {  Access-Control-Allow-Origin: '*' },  &callback=[callback]
//http://jsonlint.com/

var forecastData = [];
$.ajax({
    url: "https://api.forecast.io/forecast/89279fee14f6fcc1b7d86ca3cf7908cb/53.426898,-6.257120999999984?callback=?&units=si&exclude=minutely,hourly,alerts,flags",//exclude=[blocks]
    jsonp: "callback",
    dataType: "jsonp",
    headers: {  'Access-Control-Allow-Origin': '*',
        "Content-type": "application/json"
    },
		
    success: function(data) {
        //console.log("ssss"+data.daily.data);
        forecastData = data.daily.data;
        $.each(forecastData, function (index, value) {
            console.log("time:"+value.time);
            console.log("summary:"+value.summary);
            console.log("precipProbability:"+value.precipProbability);
            console.log("temperatureMin:"+value.temperatureMin);
            console.log("temperatureMax:"+value.temperatureMax);
            console.log("cloudCover:"+value.cloudCover);
            console.log("*************");
        });
    },
    error: function(data) {
        alert("error");
    }		
});		
	
function convertUtime(unixtime){
    var convertedTime = "";
    $.ajax({
        url: "http://www.convert-unix-time.com/api?timestamp="+unixtime+"&returnType=jsonp&callback=convertUnixTimeCallback",//exclude=[blocks]
        // tell jQuery we're expecting JSON
        dataType: "json",

        success: function(data) {
            //console.log(""+data.utcDate);
            convertedTime = data.utcDate;
            //alert("success"+data);
        },
        error: function(data) {
            alert("error");
        }		
    });	
    return convertedTime;
}
	
	
