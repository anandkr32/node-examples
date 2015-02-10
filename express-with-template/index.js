var app;
app = require("express")();
app.set('view engine', 'jade');
app.get("/test", function (req, res) {
    res.render('test', {"name": "expressjs"});
    res.end();
});
app.listen(8000);
console.log("Listening on port: 8000");