'use strict';

require('dotenv').config();

module.exports = function (app) {
    var controller = require('../controllers/controller');

    app.route('/findNearestVehicle')
        .get(controller.find_nearest)
        .post(controller.find_nearest);
}