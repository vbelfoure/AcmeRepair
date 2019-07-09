'use strict';

require('dotenv').config();

exports.find_nearest = function (req,res) {

    // return a random truck ID

    var x = Math.floor(Math.random() * req.body.vehicles.length);
    res.send(req.body.vehicles[x].truckId);
};