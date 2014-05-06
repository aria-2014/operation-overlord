var BackEndServiceCaller = (function () {

    // Public methods here
    return {
        doCallout: function (callback) {

            $.get("/circles", callback);

        }
    }

}())



