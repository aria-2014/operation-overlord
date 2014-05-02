describe("My callout", function () {

    var data = [
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

    it("Should hit remote endpoint", function () {

        sinon.spy($, "ajax");

        BackEndServiceCaller.doCallout(function() {
            console.log("Callback called");
        });

        var call = $.ajax.getCall(0);

        expect (call).not.toBeNull();

        $.ajax.restore();

    })

    it ("Should hit a fake server for data", function() {
        server.respondWith("GET", "/circles", [
            200, {"Content-Type":"application/json"}, JSON.stringify(data)
        ]);

        var callback = jasmine.createSpy('callback')
        BackEndServiceCaller.doCallout(callback)
        server.respond();
        expect(callback).toHaveBeenCalled();

        var circles = callback.calls.mostRecent().args[0];
        //var arg2 = callback.calls.mostRecent().args[1];
        expect(circles.length).toEqual(2);

        expect(circles[0].x).toEqual(data[0].x);
        expect(circles[0].y).toEqual(data[0].y);
        expect(circles[0].radius).toEqual(data[0].radius);

        expect(circles[1].x).toEqual(data[1].x);
        expect(circles[1].y).toEqual(data[1].y);
        expect(circles[1].radius).toEqual(data[1].radius);

    })
})