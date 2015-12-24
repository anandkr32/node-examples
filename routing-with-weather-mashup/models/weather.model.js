"use strict";

var async, request;
async = require("async");
request = require("request");

class Weather {

    getWeather(place, callback) {
        async.parallel({
            yahoo: function getWeatherFromYahoo(cb) {
                var url;


                url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.placefinder%20where%20text%3D%22" + place +"%22%20limit%201)&format=json&callback=";
                request(url, function (err, resp, body) {
                    body = JSON.parse(body);
                    cb(err, body.query.results.channel.item);
                });
            },
            openweathermap: function getWeatherFromOpenWeatherMap(cb) {
                var url;

                url = "http://api.openweathermap.org/data/2.5/weather?q=" + place + "&appid=2de143494c0b295cca9337e1e96b00e0";
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