var bunyan, Model;

bunyan = require("bunyan");
Model = require("../models/bddapp.model");

function BDDController() {
    this.log = bunyan.createLogger({"name": "weatherapp:index"});
}

BDDController.prototype.getDashboard = function (req, res) {
    this.log.info("getDashboard", {req: req.path});

    var model = new Model();
    model.getData(function (err, data) {
        if (err) {
            res.status(err.code).send({error: err});
            return;
        }
        res.send(JSON.stringify(data));
    });

};

module.exports = BDDController;