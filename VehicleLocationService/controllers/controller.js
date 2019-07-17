'use strict';

var Vehicles = [
    // Denver [0-3]
    { "VehicleId": "1", "driver": "James Smith", "lat": 0, "lng": 0 },
    { "VehicleId": "2", "driver": "Bill Wilson", "lat": 0, "lng": 0 },
    { "VehicleId": "3", "driver": "Barbara Austin", "lat": 0, "lng": 0 },
    { "VehicleId": "4", "driver": "Tony Duckworth", "lat": 0, "lng": 0 },
    // Pittsburgh [4-7]
    { "VehicleId": "5", "driver": "Michael Dawson", "lat": 0, "lng": 0 },
    { "VehicleId": "6", "driver": "Annie Dylan", "lat": 0, "lng": 0 },
    { "VehicleId": "7", "driver": "George Lang", "lat": 0, "lng": 0 },
    { "VehicleId": "8", "driver": "Amy Lawson", "lat": 0, "lng": 0 },
    // Omaha [8-11]
    { "VehicleId": "9", "driver": "Michael Jones", "lat": 0, "lng": 0 },
    { "VehicleId": "10", "driver": "Bobby King", "lat": 0, "lng": 0 },
    { "VehicleId": "11", "driver": "Nate Hudson", "lat": 0, "lng": 0 },
    { "VehicleId": "12", "driver": "Tom Ryan", "lat": 0, "lng": 0 },
    // Phoenix [12-15]
    { "VehicleId": "13", "driver": "Matt Hall", "lat": 0, "lng": 0 },
    { "VehicleId": "14", "driver": "Larry Wolf", "lat": 0, "lng": 0 },
    { "VehicleId": "15", "driver": "Julie Kay", "lat": 0, "lng": 0 },
    { "VehicleId": "16", "driver": "Robert Cherry", "lat": 0, "lng": 0 }
]

function initiailizeVehicleLocation() {

    var centerDenver = { 'lat': 39.7, 'lng': -105 };
    var centerPittsburgh = { 'lat': 40.44, 'lng': -80 };
    var centerOmaha = { 'lat': 41.25, 'lng': -96 };
    var centerPhoenix = { 'lat': 33.45, 'lng': 112 };

    // console.log("Initializing...");

    for (var i = 0; i < 4; i++) {
        var latOffset = (Math.floor((Math.random() * 10) + 1) * .1) * (Math.random() < 0.5 ? -1 : 1);
        var lngOffset = (Math.floor((Math.random() * 10) + 1) * .1) * (Math.random() < 0.5 ? -1 : 1);
        Vehicles[i].lat = (centerDenver.lat + latOffset).toFixed(1);
        Vehicles[i].lng = (centerDenver.lng + lngOffset).toFixed(1);
    };
    for (var i = 4; i < 8; i++) {
        var latOffset = (Math.floor((Math.random() * 10) + 1) * .1).toPrecision(1) * (Math.random() < 0.5 ? -1 : 1);
        var lngOffset = (Math.floor((Math.random() * 10) + 1) * .1).toPrecision(1) * (Math.random() < 0.5 ? -1 : 1);
        Vehicles[i].lat = (centerPittsburgh.lat + latOffset).toFixed(1);
        Vehicles[i].lng = (centerPittsburgh.lng + lngOffset).toFixed(1);
    };
    for (var i = 8; i < 12; i++) {
        var latOffset = (Math.floor((Math.random() * 10) + 1) * .1).toPrecision(1) * (Math.random() < 0.5 ? -1 : 1);
        var lngOffset = (Math.floor((Math.random() * 10) + 1) * .1).toPrecision(1) * (Math.random() < 0.5 ? -1 : 1);
        Vehicles[i].lat = (centerOmaha.lat + latOffset).toFixed(1);
        Vehicles[i].lng = (centerOmaha.lng + lngOffset).toFixed(1);
    };
    for (var i = 12; i < 16; i++) {
        var latOffset = (Math.floor((Math.random() * 10) + 1) * .1).toPrecision(1) * (Math.random() < 0.5 ? -1 : 1);
        var lngOffset = (Math.floor((Math.random() * 10) + 1) * .1).toPrecision(1) * (Math.random() < 0.5 ? -1 : 1);
        Vehicles[i].lat = (centerPhoenix.lat + latOffset).toFixed(1);
        Vehicles[i].lng = (centerPhoenix.lng + lngOffset).toFixed(1);
    };
}

exports.locate_all_vehicles = function (req, res) {

    var localVehicles = [];

    if (Vehicles[0].lat != 0) {

        // console.log("Fetching Vehicles for " + req.body.city);
        // console.log("City: " + req.query.city);

        if (req.query.city == "Denver") {
            for (var i = 0; i < 5; i++) {
                localVehicles.push(Vehicles[i]);
            }
        } else if (req.query.city == "Pittsburgh") {
            for (var i = 4; i < 8; i++) {
                localVehicles.push(Vehicles[i]);
            }
        } else if (req.query.city == "Omaha") {
            for (var i = 8; i < 12; i++) {
                localVehicles.push(Vehicles[i]);
            }
        } else if (req.query.city == "Phoenix") {
            for (var i = 12; i < 16; i++) {
                localVehicles.push(Vehicles[i]);
            }
        }
    } else {
        initiailizeVehicleLocation();
    }
    res.send(localVehicles);
};

exports.get_vehicle_by_id = function (req, res) {
    res.json(Vehicles[parseInt(req.query.vehicleId) - 1]);
};

exports.initialze_vehicle_locations = function (req, res) {
    initiailizeVehicleLocation();
    res.send();
};