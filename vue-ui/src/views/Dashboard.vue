<template>
  <div class="dashboard">
    <h1 class="subheading grey--text">Dashboard</h1>
    <v-container fluid grid-list-md>
      <v-layout row justify-start class="mb-3">
        <v-btn small flat color="grey" @click="resetDemo()">
          <v-icon>cached</v-icon>
          <span>Reset</span>
        </v-btn>
      </v-layout>
      <v-card flat>
        <v-form class="class px-3">
          <v-layout row wrap>
            <v-flex xs4>
              <v-radio-group label="Account" v-model="accountCity">
                <v-radio
                  v-for="account in accounts"
                  :key="account.Name"
                  :label="account.Name"
                  :value="account.BillingAddress.city"
                ></v-radio>
              </v-radio-group>
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
                <v-flex>Ticket 34256 assigned to {{nearestVehicleClass(9)}} for {{selectedIncident}} at Gadgets R Us</v-flex>
              </v-layout>
            </v-flex>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex d-flex xs4>
          <v-card flat>
            <v-card-title>Trucks</v-card-title>
            <div class="caption grey--text ml-4">Driver : Location</div>
            <v-flex
              d-flex
              v-for="truck in localTrucks"
              :key="truck.TruckId"
              :class="{ 'nearestVehicle': truck.TruckId == nearestVehicleId }"
            >
              <v-layout row wrap>
                <v-flex>
                  <v-icon small left>local_shipping</v-icon>
                   {{ nearestVehicleId }} {{ truck.driver }}
                </v-flex>
                <v-flex d-flex>{{ truck.lat }} : {{ truck.lng }}</v-flex>
              </v-layout>
            </v-flex>
          </v-card>
        </v-flex>
        <v-flex xs4>
          <v-card flat>
            <v-card-title>Tickets</v-card-title>
            <v-flex>
              <v-layout row wrap>
                <v-flex>Ticket 34256 assigned to Michael Jones for Busted HVAC at Gadgets R Us</v-flex>
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

export default {
  data() {
    return {
      // Form fields
      accountCity: "",
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
      nearestVehicleId: ""
    };
  },
  methods: {
    submitIncident() {
      // console.log(this.accountCity, this.selectedIncident);
      getLocalTrucks(this.accountCity).then(response => {
        this.localTrucks = response;
        // Find nearest vehicle
        getNearestVehicle(this.localTrucks).then(response => {
          console.log(response);
          this.nearestVehicleId = response;
        });
        // TO-DO create ticket
      });
    },
    resetDemo() {
      getAccounts().then(response => {
        this.accounts = response;
      });
    },
    nearestVehicleClass(vehicleId) {
      return vehicleId == this.nearestVehicleId ? 'blue--text' : '';
    }
  },
  mounted() {
    // this.fetchAccounts();
  },
  computed: {}
};
</script>

<style>
.nearestVehicle {
  background-color: blue;
}
</style>
