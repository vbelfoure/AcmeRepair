let axios = require('axios');
const ACCOUNT_URL = "https://prod-e4ec6c3369cdafa50169ce18e33d00bb.apicentral.axwayamplify.com/sfdc_sandbox_connector_179239-/accounts";
const Vehicle_SERVICE_URL = "http://localhost:3000";
const NEAREST_VEHICLE_SERVICE_URL = "http://localhost:3001/findNearestVehicle";


export function getAccounts() {
    var url = encodeURI(`${ACCOUNT_URL}?where=SLA__c='Platinum'&fields=Id,Name,BillingAddress`);
    return axios.get(url).then(response => response.data);
}

export function getLocalVehicles(searchCity) {
    var url = encodeURI(`${Vehicle_SERVICE_URL}/locateVehicles`);
    return axios.post(url, {city : searchCity} ).then(response => response.data);
}

export function getNearestVehicle(vehicleList) {
    var url = encodeURI(`${NEAREST_VEHICLE_SERVICE_URL}`);
    return axios.post(url, {vehicles : vehicleList} ).then(response => response.data);
}

export function locateVehicle(VehicleId) {
    var url = encodeURI(`${Vehicle_SERVICE_URL}/locateVehicle/${VehicleId}`);
    return axios.get(url).then(response => response.data);
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