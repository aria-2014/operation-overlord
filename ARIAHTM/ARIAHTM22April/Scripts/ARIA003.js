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


function getforecast(loc) {
    var forecast = [];
    $.ajax({
        url: "https://george-vustrey-weather.p.mashape.com/api.php?location="+loc,
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
                forecast.push({ dof: value.day_of_week, high: value.high, low: value.low, conditions: value.condition });
            });
            alert("success" + data);
        },
        error: function (data) {
            alert("error");
        }
    });
    return forecast;
}