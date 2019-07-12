<template>
  <div class="dashboard">
    <v-container fluid>
      <v-layout row>
        <h1 class="subheading grey--text">Dashboard</h1>
        <v-spacer></v-spacer>
        <v-btn small flat color="grey" @click="resetDemo()">
          <v-icon>cached</v-icon>
          <span>Reset</span>
        </v-btn>
      </v-layout>
    </v-container>
    <v-container fluid grid-list-md>
      <v-layout row justify-start class="mb-3"></v-layout>
      <v-card flat>
        <v-form class="class px-3">
          <v-layout row wrap>
            <v-flex xs4>
              <v-radio-group label="Account" v-model="accountIndex">
                <v-radio
                  v-for="(account, index) in accounts"
                  :key="account.Name"
                  :label="account.Name"
                  :value="index"
                ></v-radio>
              </v-radio-group>
              <div v-if="loading">
                <v-progress-circular indeterminate color="primary"></v-progress-circular>
              </div>
            </v-flex>
            <v-flex xs4>
              <v-radio-group label="Incident" v-model="selectedIncident">
                <v-radio
                  v-for="policy in policies"
                  :key="policy.type"
                  :label="policy.type"
                  :value="policy.type"
                ></v-radio>
              </v-radio-group>
            </v-flex>
          </v-layout>
          <v-btn flat class="success mx-2 mt-3" @click="submitIncident">Submit Incident</v-btn>
        </v-form>
      </v-card>

      <v-layout row wrap>
        <v-flex d-flex xs6>
          <v-card flat>
            <v-card-title>Vehicles</v-card-title>
            <v-layout>
              <v-flex xs1></v-flex>
              <v-flex xs3 grey--text>Driver</v-flex>
              <v-flex xs2 grey--text>Location</v-flex>
            </v-layout>
            <v-flex
              d-flex
              v-for="truck in localTrucks"
              :key="truck.truckId"
              :class="nearestVehicleClass(truck.truckId)"
            >
              <v-layout row wrap>
                <v-flex d-flex xs1>
                  <v-icon small left>local_shipping</v-icon>
                </v-flex>
                <v-flex d-flex xs3>{{ truck.driver }}</v-flex>
                <v-flex d-flex xs2>{{ truck.lat }} : {{ truck.lng }}</v-flex>
              </v-layout>
            </v-flex>
          </v-card>
        </v-flex>
        <v-flex xs6>
          <v-card flat>
            <v-card-title>Tickets</v-card-title>
            <v-flex>
              <v-layout row wrap>
                <v-flex>Ticket 34256 assigned to</v-flex>
              </v-layout>
            </v-flex>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { getAccounts } from "@/services";
import { getLocalTrucks } from "@/services";
import { getNearestVehicle } from "@/services";
import { locateTruck } from "@/services";

export default {
  data() {
    return {
      // Control Variables
      loading: true,
      // Form fields
      accountIndex: "",
      selectedIncident: "",
      // Application data
      accounts: [],
      policies: [
        { type: "Leaky Pipe" },
        { type: "Broken Window" },
        { type: "Wonky Electrical" },
        { type: "Busted HVAC" }
      ],
      localTrucks: [],
      nearestVehicleId: "",
      nearestDriver: ""
    };
  },
  methods: {
    submitIncident() {
      // console.log(this.accountCity, this.selectedIncident);
      getLocalTrucks(this.accounts[this.accountIndex].BillingAddress.city).then(
        response => {
          this.localTrucks = response;
          // Find nearest vehicle
          getNearestVehicle(this.localTrucks).then(response => {
            this.nearestVehicleId = response;
            // Get details for closest vehicle
            console.log("NearestVehicle: " + this.nearestVehicleId);
            locateTruck(this.nearestVehicleId).then(response => {
              this.nearestDriver = response.driver;
              console.log("Generating ticket - Assigned to: " + this.nearestDriver + " for " + this.selectedIncident + " at " + this.accounts[this.accountIndex].Name)
              console.log(response.driver);
            });
          });

          // console.log("Ticket assigned to " + this.localTrucks[this.nearestVehicleId].driver + " for " + this.selectedIncident + " at " + this.accounts[this.accountIndex].Name);
        }
      );
    },
    resetDemo() {
      getAccounts().then(response => {
        this.accounts = response;
        this.loading = false;
      });
    },
    nearestVehicleClass(vehicleId) {
      return vehicleId == this.nearestVehicleId ? "blue--text" : "";
    }
  },
  mounted() {
    this.resetDemo();
  },
  computed: {}
};
</script>

<style>
.nearestVehicle {
  background-color: blue;
}
</style>
