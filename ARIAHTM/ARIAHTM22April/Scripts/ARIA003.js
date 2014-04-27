function myPinterestBoardsController($scope) {
    var pins = [];
    $.ajax({
        //url: "https://ismaelc-pinterest.p.mashape.com/TourismIreland/pins",
        url: "https://ismaelc-pinterest.p.mashape.com/TourismIreland/boards",
        headers: { 'X-Mashape-Authorization': 'L6Abj40efQ4Q4G5pDOml48z0UP8ZEQPw' },
        dataType: "json",
        async: false,
        success: function (data) {
            $.each(data, function (index, value) {
                if (index == "body") {
                    $.each(value, function (index1, value1) {
                        pins.push({ pinboardslink: "http://pinterest.com/" + value1.href, pinboardspic: value1.src, pinboardsdesc: value1.name });
                    });
                }
            });
        },
        error: function (data) {
            alert("error");
        }
    });
    $scope.services = pins;
}
