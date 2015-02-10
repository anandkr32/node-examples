var http, server, i = 0;
http = require("http");
server = http.createServer(function (req, res) {
    if ((i % 2) === 0) {
        console.log("api called, not returning");
    } else {
        console.log("api called, returning");
        res.write("ok");
        res.end();
    }
    i++;
});
server.listen(8000);
console.log("Listening on port 8000");