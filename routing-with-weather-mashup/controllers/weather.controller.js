"use strict";
var Weather;
Weather = require("../models/weather.model");
class WeatherController {
    getWeather(req, res) {
        new Weather().getWeather(req.query.place, function (err, results) {
            if (err) {
                res.status(err.code || 500).send(err);
                return;
            }
            res.type("application/json").send(results);
            log.info(results);
        });
    }
}

module.exports = WeatherController;