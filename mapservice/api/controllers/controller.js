'use strict';

require('../../node_modules/dotenv/lib/main').config();

exports.find_nearest = function (req,res) {

    // return a random Vehicle ID

    var nearest = Math.floor(Math.random() * (req.body.vehicles.length - 1));
    // res.send(req.body.vehicles[nearest].VehicleId);
    res.send(nearest.toString());
};