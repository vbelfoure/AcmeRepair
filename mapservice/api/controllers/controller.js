'use strict';

require('../../node_modules/dotenv/lib/main').config();

exports.find_nearest = function (req,res) {

    // return a random Vehicle ID

    var x = Math.floor(Math.random() * req.body.vehicles.length);
    res.send(req.body.vehicles[x].VehicleId);
};