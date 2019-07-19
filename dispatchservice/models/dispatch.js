var APIBuilder = require('@axway/api-builder-runtime');
var Model = APIBuilder.createModel('dispatch', {
    "description": "Vehicle Dispatch",
    "connector": "memory",
    "fields": {
        "ticketId": {
            "type": "string",
            "description": "Ticket Id",
            "required": true
        },
        "assignedVehicle": {
            "type": "string",
            "description": "Vehicle assigned to ticket",
            "required": true
        },
        "vehicles": {
            "type": "array",
            "description": "Array of vehicles in vicinity",
            "required": true,
            "items": {
                "type": "object",
                "properties": {
                    "vehicleId": {
                        "type": "string"
                    },
                    "driver": {
                        "type": "string"
                    },
                    "lat": {
                        "type": "string"
                    },
                    "lng": {
                        "type": "string"
                    }
                }
            }
        },
    },
    "actions": [
        "create",
        "read",
        "update",
        "delete",
        "deleteAll"
    ]
});
module.exports = Model;