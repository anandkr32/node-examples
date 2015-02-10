var http, server;
http = require("http");
server = http.createServer(function (req, res) {
    console.log("fe called, calling api; waiting for api");
    http.get("http://localhost:8000", function () {
        res.write("ok");
        res.end();
    });
});
server.listen(8080);
console.log("Listening on port 8080");