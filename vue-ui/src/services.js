let axios = require('axios');
const ACCOUNT_SERVICE_URL = "https://prod-e4ec6c256a5b83d8016a795888bf0a8b.apicentral.axwayamplify.com/sfdc_sandbox_connector_185401-";
const REPAIR_TICKET_FLOW_URL = "https://prod-e4ec6c256a5b83d8016a795888bf0a8b.apicentral.axwayamplify.com/AcmeRepairIncidentResponse_sandbox_flow_395012-";
const TICKET_SERVICE_URL = "https://phx-90.demo.axway.com:8080/ticket/ticket";
const DISPATCH_SERVICE_URL = "https://phx-90.demo.axway.com:8080/vehicleDispatch/dispatch";
const GOOGLE_MAP_URL="https://maps.googleapis.com/maps/api/geocode/json";

export function getAccounts() {
    var url = encodeURI(`${ACCOUNT_SERVICE_URL}/accounts?where=SLA__c='Platinum'&fields=Id,Name,BillingAddress`);
    return axios.get(url).then(response => response.data);
}

export function repairTicketFlow(accountCity, accountName, accountIncident) {
    var url = encodeURI(`${REPAIR_TICKET_FLOW_URL}/executions`);
    return axios.post(url, { city: accountCity, account: accountName, incident: accountIncident }).then(response => response.data);
}

export function resetDemo() {
    var ticketServiceUrl = encodeURI(`${TICKET_SERVICE_URL}`);
    axios.delete(ticketServiceUrl);
    var dispatchServiceUrl = encodeURI(`${DISPATCH_SERVICE_URL}`);
    axios.delete(dispatchServiceUrl);
    return;
}

export function geocodeAddress(address, key) {
    var url = encodeURI(`${GOOGLE_MAP_URL}?address=${address}&key=${key}`);
    console.log(address);
    return axios.get(url).then(response => response.data.results[0].geometry);
    
}

/*
getLocalVehicles(city) {
    let url = encodeURI();
    axios
        .get(url, {
            data: { city: this.accountCity }
        })
        .then(response => {
            this.localVehicles = response.data;
        });
}
},
*/