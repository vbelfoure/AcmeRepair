'use strict';

var trucks = [
    // Denver [0-3]
    { "truckId": "1", "driver": "James Smith", "lat": 0, "lng": 0 },
    { "truckId": "2", "driver": "Bill Wilson", "lat": 0, "lng": 0 },
    { "truckId": "3", "driver": "Barbara Austin", "lat": 0, "lng": 0 },
    { "truckId": "4", "driver": "Tony Duckworth", "lat": 0, "lng": 0 },
    // Pittsburgh [4-7]
    { "truckId": "5", "driver": "Michael Dawson", "lat": 0, "lng": 0 },
    { "truckId": "6", "driver": "Annie Dylan", "lat": 0, "lng": 0 },
    { "truckId": "7", "driver": "George Lang", "lat": 0, "lng": 0 },
    { "truckId": "8", "driver": "Amy Lawson", "lat": 0, "lng": 0 },
    // Omaha [8-11]
    { "truckId": "9", "driver": "Michael Jones", "lat": 0, "lng": 0 },
    { "truckId": "10", "driver": "Bobby King", "lat": 0, "lng": 0 },
    { "truckId": "11", "driver": "Nate Hudson", "lat": 0, "lng": 0 },
    { "truckId": "12", "driver": "Tom Ryan", "lat": 0, "lng": 0 },
    // Phoenix [12-15]
    { "truckId": "13", "driver": "Matt Hall", "lat": 0, "lng": 0 },
    { "truckId": "14", "driver": "Larry Wolf", "lat": 0, "lng": 0 },
    { "truckId": "15", "driver": "Julie Kay", "lat": 0, "lng": 0 },
    { "truckId": "16", "driver": "Robert Cherry", "lat": 0, "lng": 0 }
]

function initiailizeTruckLocation() {

    var centerDenver = { 'lat': 39.7, 'lng': -105 };
    var centerPittsburgh = { 'lat': 40.44, 'lng': -80 };
    var centerOmaha = { 'lat': 41.25, 'lng': -96 };
    var centerPhoenix = { 'lat': 33.45, 'lng': 112 };

    console.log("Initializing...");

    for (var i = 0; i < 5; i++) {
        var latOffset = (Math.floor((Math.random() * 10) + 1) * .1) * (Math.random() < 0.5 ? -1 : 1);
        var lngOffset = (Math.floor((Math.random() * 10) + 1) * .1) * (Math.random() < 0.5 ? -1 : 1);
        trucks[i].lat = (centerDenver.lat + latOffset).toFixed(1);
        trucks[i].lng = (centerDenver.lng + lngOffset).toFixed(1);
    };
    for (var i = 5; i < 9; i++) {
        var latOffset = (Math.floor((Math.random() * 10) + 1) * .1).toPrecision(1) * (Math.random() < 0.5 ? -1 : 1);
        var lngOffset = (Math.floor((Math.random() * 10) + 1) * .1).toPrecision(1) * (Math.random() < 0.5 ? -1 : 1);
        trucks[i].lat = (centerPittsburgh.lat + latOffset).toFixed(1);
        trucks[i].lng = (centerPittsburgh.lng + lngOffset).toFixed(1);
    };
    for (var i = 9; i < 13; i++) {
        var latOffset = (Math.floor((Math.random() * 10) + 1) * .1).toPrecision(1) * (Math.random() < 0.5 ? -1 : 1);
        var lngOffset = (Math.floor((Math.random() * 10) + 1) * .1).toPrecision(1) * (Math.random() < 0.5 ? -1 : 1);
        trucks[i].lat = (centerOmaha.lat + latOffset).toFixed(1);
        trucks[i].lng = (centerOmaha.lng + lngOffset).toFixed(1);
    };
    for (var i = 13; i < 17; i++) {
        var latOffset = (Math.floor((Math.random() * 10) + 1) * .1).toPrecision(1) * (Math.random() < 0.5 ? -1 : 1);
        var lngOffset = (Math.floor((Math.random() * 10) + 1) * .1).toPrecision(1) * (Math.random() < 0.5 ? -1 : 1);
        trucks[i].lat = (centerPhoenix.lat + latOffset).toFixed(1);
        trucks[i].lng = (centerPhoenix.lng + lngOffset).toFixed(1);
    };
}

exports.locate_all_trucks = function (req, res) {

    var localTrucks = [];

    if (trucks[0].lat != 0) {

        console.log("Fetching Trucks for " + req.body.city);
        console.log(req.body);

        if (req.body.city == "Denver") {
            for (var i = 0; i < 5; i++) {
                localTrucks.push(trucks[i]);
            }
        } else if (req.body.city == "Pittsburgh") {
            for (var i = 4; i < 8; i++) {
                localTrucks.push(trucks[i]);
            }
        } else if (req.body.city == "Omaha") {
            for (var i = 8; i < 12; i++) {
                localTrucks.push(trucks[i]);
            }
        } else if (req.body.city == "Phoenix") {
            for (var i = 12; i < 16; i++) {
                localTrucks.push(trucks[i]);
            }
        }
    } else {
        initiailizeTruckLocation();
    }
    res.send(localTrucks);
};

exports.get_truck_by_id = function (req, res) {

};

exports.initialze_truck_locations = function (req, res) {
    initiailizeTruckLocation();
    res.send();
};