var server, express, port, Weather, routes, log;

express = require("express");
routes = require("./../routing-with-weather-mashup/routes.json");

server = express();
Weather = require("./models/weather.model");
log = require("bunyan").createLogger({"name": "weatherapp:index"});

log.info("Starting server");

server.get("/weather", function (req, res) {
   new Weather().getWeather(req.query.place, function (err, results) {
       if (err) {
           res.status(err.code || 500).send(err);
           return;
       }
       res.type("application/json").send(results);
       log.info(results);
   });
});

server.get("*", function (req, res) {
    res.send("hello");
});

port = 8080;
server.listen(port, function () {
    log.info("Started on port: ", {port: port, time: new Date()});
});