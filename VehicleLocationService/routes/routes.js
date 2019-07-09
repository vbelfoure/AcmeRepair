'use strict';

module.exports = function (app) {
    var controller = require('../controllers/controller');

    app.route('/locateTrucks')
        .get(controller.locate_all_trucks)
        .post(controller.locate_all_trucks);

    app.route('/locateTruck/:id')
        .get(controller.get_truck_by_id);

    app.route('/initTrucks')
        .get(controller.initialze_truck_locations);
}