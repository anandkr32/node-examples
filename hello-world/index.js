var http, server;
http = require("http");
server = http.createServer(function (req, res) {
    console.log("hello, nodejs");
    res.write("ok");
    res.end();
});
server.listen(8080);
console.log("Listening on port 8080");