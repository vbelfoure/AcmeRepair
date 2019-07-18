var APIBuilder = require('@axway/api-builder-runtime');
var Model = APIBuilder.createModel('ticket', {
    "fields": {
        "driver": {
            "type": "string",
            "description": "Driver assigned to repair ticket",
            "required": true
        },
        "account": {
            "type": "string",
            "description": "Account submitting repair ticket",
            "required": true
        },
        "created": {
            "type": "date",
            "description": "Repair ticket creation date",
            "required": true
        },
        "status": {
            "type": "string",
            "description": "Ticket status open/closed",
            "required": true
        }
    },
    "connector": "memory",
    "actions": [
        "create",
        "read",
        "update",
        "delete",
        "deleteAll"
    ],
    "description": "Repair Ticket"
});
module.exports = Model;