let axios = require('axios');
const ACCOUNT_URL = "https://prod-e4ec6c3369cdafa50169ce18e33d00bb.apicentral.axwayamplify.com/sfdc_sandbox_connector_179239-/accounts";
const TRUCK_SERVICE_URL = "http://localhost:3000";
const NEAREST_VEHICLE_SERVICE_URL = "http://localhost:3001/findNearestVehicle";


export function getAccounts() {
    var url = encodeURI(`${ACCOUNT_URL}?where=SLA__c='Platinum'&fields=Id,Name,BillingAddress`);
    return axios.get(url).then(response => response.data);
}

export function getLocalTrucks(searchCity) {
    var url = encodeURI(`${TRUCK_SERVICE_URL}/locateTrucks`);
    return axios.post(url, {city : searchCity} ).then(response => response.data);
}

export function getNearestVehicle(vehicleList) {
    var url = encodeURI(`${NEAREST_VEHICLE_SERVICE_URL}`);
    return axios.post(url, {vehicles : vehicleList} ).then(response => response.data);
}

export function locateTruck(truckId) {
    var url = encodeURI(`${TRUCK_SERVICE_URL}/locateTruck/${truckId}`);
    return axios.get(url).then(response => response.data);
}

/*
getLocalTrucks(city) {
    let url = encodeURI();
    axios
        .get(url, {
            data: { city: this.accountCity }
        })
        .then(response => {
            this.localTrucks = response.data;
        });
}
},
*/