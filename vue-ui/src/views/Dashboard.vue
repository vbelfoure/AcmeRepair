<template>
  <div class="dashboard">
    <v-container fluid>
      <v-layout row>
        <h1 class="subheading grey--text">Dashboard</h1>
        <v-spacer></v-spacer>
      </v-layout>
    </v-container>
    <v-container>
      <v-layout>
        <div v-if="!ticketStreamConnected">
          <v-btn small flat color="green" @click="connectTicketStream()">
            <v-icon>layers</v-icon>
            <span>Connect Ticket Stream</span>
          </v-btn>
        </div>
        <div v-if="ticketStreamConnected">
          <v-btn small flat color="red" @click="disconnectTicketStream()">
            <v-icon>layers_clear</v-icon>
            <span>Disconnect Ticket Stream</span>
          </v-btn>
        </div>
        <div v-if="!dispatchStreamConnected">
          <v-btn small flat color="green" @click="connectDispatchStream()">
            <v-icon>layers</v-icon>
            <span>Connect Dispatch Stream</span>
          </v-btn>
        </div>
        <div v-if="dispatchStreamConnected">
          <v-btn small flat color="red" @click="disconnectDispatchStream()">
            <v-icon>layers_clear</v-icon>
            <span>Disconnect Dispatch Stream</span>
          </v-btn>
        </div>
        <v-btn small flat color="grey" @click="resetDemoData()">
          <v-icon>cached</v-icon>
          <span>Reset Demo Data</span>
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
    </v-container>
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <!-- Vehicles view -->
        <v-flex d-flex xs4>
          <v-card flat>
            <v-card-title>Vehicles</v-card-title>

            <div>
              <gmap-map
                :center="mapCenter"
                :zoom="10"
                :options="mapOptions"
                style="height:250px; width: 100%;"
              >
                <gmap-custom-marker :marker="mapCenter">
                  <i class="material-icons">home</i>
                </gmap-custom-marker>
                <gmap-custom-marker
                  v-for="vehicle in vehicleMap.vehicles"
                  :key="vehicle.VehicleId"
                  :marker="vehicle.location"
                >
                  <i class="material-icons">local_shipping</i>
                </gmap-custom-marker>
              </gmap-map>
            </div>
            <!--
            <v-flex
              d-flex
              v-for="Vehicle in localVehicles"
              :key="Vehicle.VehicleId"
              :class="nearestVehicleClass(Vehicle.VehicleId)"
            >
              <v-layout row wrap>
                <v-flex d-flex xs1>
                  <v-icon small left>local_shipping</v-icon>
                </v-flex>
                <v-flex d-flex xs2>{{ Vehicle.driver }}</v-flex>
                <v-flex d-flex xs2>{{ Vehicle.lat }} : {{ Vehicle.lng }}</v-flex>
              </v-layout>
            </v-flex>
            -->
          </v-card>
        </v-flex>
        <!-- Tickets view -->
        <v-flex xs8>
          <v-card flat>
            <v-card-title>Tickets</v-card-title>
            <v-layout>
              <v-flex xs1></v-flex>
              <v-flex xs2 grey--text>Ticket ID</v-flex>
              <v-flex xs2 grey--text>Driver</v-flex>
              <v-flex xs2 grey--text>Account</v-flex>
              <v-flex xs2 grey--text>Incident</v-flex>
              <v-flex xs2 grey--text>Created</v-flex>
            </v-layout>
            <v-flex d-flex v-for="ticket in ticketData.tickets" :key="ticket.ticketId">
              <v-layout row wrap>
                <v-flex d-flex xs1>
                  <v-icon v-if="ticket.status == 'open' " small left color="green">local_offer</v-icon>
                  <v-icon v-else small left>local_offer</v-icon>
                </v-flex>
                <v-flex d-flex xs2>{{ ticket.ticketId }}</v-flex>
                <v-flex d-flex xs2>{{ ticket.driver }}</v-flex>
                <v-flex d-flex xs2>{{ ticket.account }}</v-flex>
                <v-flex d-flex xs2>{{ ticket.incident }}</v-flex>
                <v-flex d-flex xs2>{{ ticket.created }}</v-flex>
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
import { repairTicketFlow } from "@/services";
import { StreamDataIo } from "streamdataio-js-sdk";
import * as jsonpatch from "fast-json-patch";
import { resetDemo } from "@/services";
import { geocodeAddress } from "@/services";
import GmapCustomMarker from "vue2-gmap-custom-marker";

import * as VueGoogleMaps from "vue2-google-maps";
import Vue from "vue";

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GOOGLE_API_KEY,
    libraries: "places"
  }
});

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
      localVehicles: [],
      nearestVehicleId: "",
      nearestDriver: "",
      currentIncident: "",
      ticketStreamConnected: false,
      streamToken: process.env.VUE_APP_STREAMTOKEN,
      ticketStreamUrl: process.env.VUE_APP_REPAIR_TICKET_STREAM_URL,
      ticketStreamData: null,
      ticketStreamMessage: "",
      ticketData: [],
      streamsConnected: false,
      dispatchStreamUrl: process.env.VUE_APP_DISPATCH_STREAM_URL,
      dispatchStreamData: null,
      dispatchStreamMessage: "",
      dispatchData: [],
      dispatchStreamConnected: false,
      vehicleMap: [],
      mapCenter: { lat: 10.0, lng: 10.0 },
      accountAddress: "",
      mapOptions: {
        zoomControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        disableDefaultUi: true
      },
      googleApiKey: process.env.VUE_APP_GOOGLE_API_KEY
    };
  },
  methods: {
    submitIncident() {
      repairTicketFlow(
        this.accounts[this.accountIndex].BillingAddress.city,
        this.accounts[this.accountIndex].Name,
        this.selectedIncident
      ).then(response => {
        this.currentIncident = response.id;
      });
      this.accountAddress =
        this.accounts[this.accountIndex].BillingAddress.street +
        " " +
        this.accounts[this.accountIndex].BillingAddress.city +
        " " +
        this.accounts[this.accountIndex].BillingAddress.state +
        " " +
        this.accounts[this.accountIndex].BillingAddress.postalCode;
      geocodeAddress(
        this.accountAddress.replace(/ /g, "+"),
        process.env.VUE_APP_GOOGLE_API_KEY
      ).then(response => {
        this.mapCenter = response.location;
        console.log(this.mapCenter);
      });
    },
    resetDemoData() {
      resetDemo();
    },
    connectDispatchStream: function() {
      // Open Dispatch stream
      this.dispatchStreamData = StreamDataIo.createEventSource(
        process.env.VUE_APP_DISPATCH_STREAM_URL,
        process.env.VUE_APP_STREAMTOKEN,
        []
      );
      this.dispatchStreamData
        .onData(data => {
          this.dispatchData = data;
        }, this)
        .onPatch(patch => {
          jsonpatch.applyPatch(this.dispatchData, patch);
          if (patch[1] != null) {
            this.vehicleMap = patch[1].value;
            console.log(this.vehicleMap);
          }
        }, this)
        .onError(error => {
          this.dispatchStreamData.close();
          this.dispatchStreamConencted = false;
          this.dispatchStreamMessage = error;
        }, this)
        .onOpen(function() {
          this.dispatchStreamConnected = true;
        }, this);
      this.dispatchStreamData.open();
    },
    connectTicketStream: function() {
      // Open ticket stream
      this.ticketStreamData = StreamDataIo.createEventSource(
        process.env.VUE_APP_REPAIR_TICKET_STREAM_URL,
        process.env.VUE_APP_STREAMTOKEN,
        []
      );
      this.ticketStreamData
        .onData(data => {
          this.ticketData = data;
        }, this)
        .onPatch(patch => {
          jsonpatch.applyPatch(this.ticketData, patch);
        }, this)
        .onError(error => {
          this.ticketStreamData.close();
          this.ticketStreamConnected = false;
          this.ticketStreamMessage = error;
        }, this)
        .onOpen(function() {
          this.ticketStreamConnected = true;
        }, this);
      this.ticketStreamData.open();
    },
    disconnectDispatchStream: function() {
      // Close Dispatch stream
      if (this.dispatchStreamData) {
        this.dispatchStreamData.close();
        this.dispatchStreamConnected = false;
      }
    },
    disconnectTicketStream: function() {
      if (this.ticketStreamData) {
        this.ticketStreamData.close();
        this.ticketStreamConnected = false;
      }
    },
    nearestVehicleClass(vehicleId) {
      return vehicleId == this.nearestVehicleId ? "blue--text" : "";
    },
    stub(value) {
      return value;
    }
  },
  mounted() {
    getAccounts().then(response => {
      this.accounts = response;
      this.loading = false;
    });
  },
  computed: {},
  components: {
    "gmap-custom-marker": GmapCustomMarker
  }
};
</script>

<style>
.nearestVehicle {
  background-color: blue;
}
</style>
