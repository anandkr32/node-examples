var async, request;

async = require("async");
request = require("request");

function BDDModel() {


}


BDDModel.prototype.getOpenWeather = function (cb) {
    request("http://api.openweathermap.org/data/2.5/weather?q=%22%20+%20place%20+%20%22&appid=7680f2b1ed8ffb99d964a78db16b5263", function (err, data, body) {
        cb(err, JSON.parse(body));
    });
};

BDDModel.prototype.getJokes = function (cb) {
    request("http://api.icndb.com/jokes/random/10?limitTo=%5Bnerdy%5D", function (err, data, body) {
        cb(err, JSON.parse(body));
    });
};



BDDModel.prototype.getData = function (cb) {
    async.parallel({
        openweather: this.getOpenWeather.bind(this),
        jokes: this.getJokes.bind(this)
    }, function (err, data) {
        cb(err, data);
    });
};

module.exports = BDDModel;
