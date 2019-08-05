'use strict';

var Vehicles = [
    // Denver [0-3]
    { "VehicleId": "1", "driver": "James Smith", "location": {"lat": 0, "lng": 0 }},
    { "VehicleId": "2", "driver": "Bill Wilson", "location": {"lat": 0, "lng": 0 }},
    { "VehicleId": "3", "driver": "Barbara Austin", "location": {"lat": 0, "lng": 0 }},
    { "VehicleId": "4", "driver": "Tony Duckworth", "location": {"lat": 0, "lng": 0 }},
    // Pittsburgh [4-7]
    { "VehicleId": "5", "driver": "Michael Dawson", "location": {"lat": 0, "lng": 0 }},
    { "VehicleId": "6", "driver": "Annie Dylan", "location": {"lat": 0, "lng": 0 }},
    { "VehicleId": "7", "driver": "George Lang", "location": {"lat": 0, "lng": 0 }},
    { "VehicleId": "8", "driver": "Amy Lawson", "location": {"lat": 0, "lng": 0 }},
    // Omaha [8-11]
    { "VehicleId": "9", "driver": "Michael Jones", "location": {"lat": 0, "lng": 0 }},
    { "VehicleId": "10", "driver": "Bobby King", "location": {"lat": 0, "lng": 0 }},
    { "VehicleId": "11", "driver": "Nate Hudson", "location": {"lat": 0, "lng": 0 }},
    { "VehicleId": "12", "driver": "Tom Ryan", "location": {"lat": 0, "lng": 0 }},
    // Phoenix [12-15]
    { "VehicleId": "13", "driver": "Matt Hall", "location": {"lat": 0, "lng": 0 }},
    { "VehicleId": "14", "driver": "Larry Wolf", "location": {"lat": 0, "lng": 0 }},
    { "VehicleId": "15", "driver": "Julie Kay", "location": {"lat": 0, "lng": 0 }},
    { "VehicleId": "16", "driver": "Robert Cherry", "location": {"lat": 0, "lng": 0 }}
];
var centerDenver = { 'lat': 39.7, 'lng': -105 };
var centerPittsburgh = { 'lat': 40.44, 'lng': -80 };
var centerOmaha = { 'lat': 41.25, 'lng': -96 };
var centerPhoenix = { 'lat': 33.45, 'lng': -112 };
var offest = 5;
var precision = 4;

function initiailizeVehicleLocation() {

    for (var i = 0; i < 4; i++) {
        var latOffset = (((Math.random() * offest) + 1) * .01) * (Math.random() < 0.5 ? -1 : 1);
        var lngOffset = (((Math.random() * offest) + 1) * .01) * (Math.random() < 0.5 ? -1 : 1);
        Vehicles[i].location.lat = (centerDenver.lat + latOffset).toFixed(precision);
        Vehicles[i].location.lng = (centerDenver.lng + lngOffset).toFixed(precision);
    };
    for (var i = 4; i < 8; i++) {
        var latOffset = (((Math.random() * offest) + 1) * .01) * (Math.random() < 0.5 ? -1 : 1);
        var lngOffset = (((Math.random() * offest) + 1) * .01) * (Math.random() < 0.5 ? -1 : 1);
        Vehicles[i].location.lat = (centerPittsburgh.lat + latOffset).toFixed(precision);
        Vehicles[i].location.lng = (centerPittsburgh.lng + lngOffset).toFixed(precision);
    };
    for (var i = 8; i < 12; i++) {
        var latOffset = (((Math.random() * offest) + 1) * .01) * (Math.random() < 0.5 ? -1 : 1);
        var lngOffset = (((Math.random() * offest) + 1) * .01) * (Math.random() < 0.5 ? -1 : 1);
        Vehicles[i].location.lat = (centerOmaha.lat + latOffset).toFixed(precision);
        Vehicles[i].location.lng = (centerOmaha.lng + lngOffset).toFixed(precision);
    };
    for (var i = 12; i < 16; i++) {
        var latOffset = (((Math.random() * offest) + 1) * .01) * (Math.random() < 0.5 ? -1 : 1);
        var lngOffset = (((Math.random() * offest) + 1) * .01) * (Math.random() < 0.5 ? -1 : 1);
        Vehicles[i].location.lat = (centerPhoenix.lat + latOffset).toFixed(precision);
        Vehicles[i].location.lng = (centerPhoenix.lng + lngOffset).toFixed(precision);
    };
}

exports.locate_all_vehicles = function (req, res) {

    var localVehicles = [];

    if (Vehicles[0].location.lat != 0) {

        if (req.query.city == "Denver") {
            for (var i = 0; i < 4; i++) {
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