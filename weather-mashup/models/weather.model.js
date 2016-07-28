"use strict";

var async, request, log;
async = require("async");
request = require("request");
log = require("bunyan").createLogger({"name": "weatherapp:model:weather"});

class Weather {

    getWeather(place, callback) {


        async.parallel({
            yahoo: function getWeatherFromYahoo(cb) {
                var url;

                url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20geo.places%20where%20text%3D%22" + place + "%22%20limit%201&format=json&callback=";
                log.info("hitting yahoo API", {url: url});
                request(url, function (err, resp, body) {
                    body = JSON.parse(body);
                    cb(err, body.query.results);
                });
            },
            openweathermap: function getWeatherFromOpenWeatherMap(cb) {
                var url;

                url = "http://api.openweathermap.org/data/2.5/weather?q=" + place + "&appid=7680f2b1ed8ffb99d964a78db16b5263";
                request(url, function (err, resp, body) {
                    body = JSON.parse(body);
                    cb(err, body);
                });
            }
        }, function (err, results) {
            callback(err, results);
        });
    }
}

module.exports = Weather;