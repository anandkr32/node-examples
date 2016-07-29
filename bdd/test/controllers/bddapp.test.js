var mockRequest, assert, mockery;
assert = require("assert");
mockery = require("mockery");

mockRequest = function (url, callback) {
    if (url == "http://api.openweathermap.org/data/2.5/weather?q=%22%20+%20place%20+%20%22&appid=7680f2b1ed8ffb99d964a78db16b5263") {
        setTimeout(function () {
            callback(null, null, JSON.stringify(require("../data/openweather.data.json")));
        }, 1);
        return;
    }
    if (url == "http://api.icndb.com/jokes/random/10?limitTo=%5Bnerdy%5D") {
        setTimeout(function () {
            callback(null, null, JSON.stringify(require("../data/jokes.data.json")));
        }, 1);
        return;
    }
    throw new Error("Unmocked url: " + url);
};

describe("getDashboard", function () {
    before(function () {
        mockery.enable();
        mockery.registerMock('request', mockRequest);
    });

    after(function () {
        mockery.disable();
        mockery.deregisterAll();
    });

    it("should get data from openweather", function (done) {
        var BddController = require("../../controllers/bddapp.controller");
        var bddController = new BddController();
        var req = {};
        var res = {
            send: function (data) {
                data = JSON.parse(data);

                assert.deepEqual(data.openweather, require("../data/openweather.data.json"));
                assert.deepEqual(data.jokes, require("../data/jokes.data.json"));
                done();
            }
        };

        bddController.getDashboard(req, res);
    });
});