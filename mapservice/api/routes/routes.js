'use strict';

require('../../node_modules/dotenv/lib/main').config();

module.exports = function (app) {
    var controller = require('../controllers/controller');

    app.route('/nearestVehicle')
        .get(controller.find_nearest)
        .post(controller.find_nearest);
}