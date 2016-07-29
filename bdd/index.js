var server, express, port, routes, log;

express = require("express");
routes = require("./routes.json");

server = express();
log = require("bunyan").createLogger({"name": "weatherapp:index"});

log.info("Starting server");


routes.forEach(function (route) {
    server[route.verb](route.path, function (req, res) {
        var Contoller = require("./controllers/" + route.controller.toLowerCase() + ".controller.js");
        (new Contoller())[route.action](req, res);
    });
});

server.get("*", function (req, res) {
    res.send("hello");
});

port = 8080;
server.listen(port, function () {
    log.info("Started on port: ", {port: port, time: new Date()});
});