'use strict';

module.exports = function (app) {
    var controller = require('../controllers/controller');

    app.route('/locateVehicles')
        .get(controller.locate_all_vehicles);

    app.route('/locateVehicle')
        .get(controller.get_vehicle_by_id);

    app.route('/initVehicles')
        .get(controller.initialze_vehicle_locations);
}