var express;
express = require("express")();
express.get("/hello-world", function (req, res) {
    res.send("hello, nodejs");
});
express.listen(8000);
console.log("Listening on port: 8000");