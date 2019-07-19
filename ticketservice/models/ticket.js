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
            "type": "string",
            "description": "Repair ticket creation date",
            "required": true
        },
        "status": {
            "type": "string",
            "description": "Ticket status open/closed",
            "required": true
        },
        "incident": {
            "type": "string",
            "description": "Reported Incident",
            "required": true
        },
        "ticketId": {
            "type": "string",
            "description": "Ticket Id",
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