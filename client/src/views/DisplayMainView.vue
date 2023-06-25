<template>
  <div id="wrapper">
    <div class="container-fluid min-vh-100 d-flex flex-column">

      <div class="row m-4">
        <div class="col-md-6 col-xl-3">
          <div class="widget-rounded-circle card bg-danger shadow-none">
            <div class="card-body">
              <div class="row">
                <div class="col-6">
                  <div class="avatar-lg rounded-circle bg-soft-light">
                    <i class="fe-bar-chart-line- font-28 avatar-title text-white"></i>
                  </div>
                </div>
                <div class="col-6">
                  <div class="text-end">
                    <h2 class="text-white mt-2"><span data-plugin="counterup">{{ incidents.length }}</span></h2>
                    <p class="text-white mb-0 text-truncate">Incidents active</p>
                  </div>
                </div>
              </div> <!-- end row-->
            </div>
          </div> <!-- end widget-rounded-circle-->
        </div> <!-- end col-->

        <div class="col-md-6 col-xl-3">
          <div class="widget-rounded-circle card bg-info shadow-none">
            <div class="card-body">
              <div class="row">
                <div class="col-6">
                  <div class="avatar-lg rounded-circle bg-soft-light">
                    <i class="fe-users font-28 avatar-title text-white"></i>
                  </div>
                </div>
                <div class="col-6">
                  <div class="text-end">
                    <h2 class="text-white mt-2"><span data-plugin="counterup">{{ shiftsAvailable.length }}</span></h2>
                    <p class="text-white mb-0 text-truncate">shifts available</p>
                  </div>
                </div>
              </div> <!-- end row-->
            </div>
          </div> <!-- end widget-rounded-circle-->
        </div> <!-- end col-->

        <div class="col-md-6 col-xl-3">
          <div class="widget-rounded-circle card bg-warning shadow-none">
            <div class="card-body">
              <div class="row">
                <div class="col-6">
                  <div class="avatar-lg rounded-circle bg-soft-light">
                    <i class="fe-shuffle font-28 avatar-title text-white"></i>
                  </div>
                </div>
                <div class="col-6">
                  <div class="text-end">
                    <h2 class="text-white mt-2"><span data-plugin="counterup">{{ this.employeesInShiftOut.length }}</span>
                    </h2>
                    <p class="text-white mb-0 text-truncate">Employees available</p>
                  </div>
                </div>
              </div> <!-- end row-->
            </div>
          </div> <!-- end widget-rounded-circle-->
        </div> <!-- end col-->

        <div class="col-md-6 col-xl-3">
          <div class="widget-rounded-circle card bg-success shadow-none">
            <div class="card-body">
              <div class="row">
                <div class="col-6">
                  <div class="avatar-lg rounded-circle bg-soft-light">
                    <i class="fe-download font-28 avatar-title text-white"></i>
                  </div>
                </div>
                <div class="col-6">
                  <div class="text-end">
                    <h2 class="text-white mt-2"><span data-plugin="counterup">{{ this.vehiclesIn.length }}</span></h2>
                    <p class="text-white mb-0 text-truncate">Vehicles available</p>
                  </div>
                </div>
              </div> <!-- end row-->
            </div>
          </div> <!-- end widget-rounded-circle-->
        </div> <!-- end col-->
      </div>

      <div class="row flex-grow-1 m-4">
        <div class="d-flex align-content-stretch bd-highlight">
          <div class="flex-grow-1 bd-highlight me-5">
            <IncidentCard :data="currentData"></IncidentCard>
          </div>

          <div class="d-flex flex-column bd-highlight">

            <div class="bd-highlight flex-grow-1 card mb-3">
              <div class="card-header no-border">
                <h5 class="card-title">VEHICLES</h5>
              </div>
              <div class="card-body p-0">
                <div class="table-full-width">
                  <table class="table">
                    <tbody>
                      <tr v-for="item in vehiclestOut" :key="item._id">
                        <td class="yellow">
                          {{ item.number }} {{ item.plate }} {{ item.type.name }}
                        </td>
                      </tr>
                      <tr v-for="item in vehiclesIn" :key="item._id">
                        <td class="green">
                          {{ item.number }} {{ item.plate }} {{ item.type.name }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div class="card card-margin bd-highlight flex-grow-1 mt-3">
              <div class="card-header no-border">
                <h5 class="card-title">EMPLOYEES</h5>
              </div>
              <div class="card-body p-0">
                <div class="table-full-width">
                  <table class="table">
                    <tbody>
                      <tr v-for="item in employeesInShiftOut" :key="item._id">
                        <td class="yellow">
                          {{ item.name }} {{ item.surname }} {{ item.type.name }}
                        </td>
                      </tr>
                      <tr v-for="item in employeesInShiftIn" :key="item._id">
                        <td class="green">
                          {{ item.name }} {{ item.surname }} {{ item.type.name }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<script>
import 'vue3-carousel/dist/carousel.css'
//import { Carousel, Slide, Navigation } from 'vue3-carousel'
import IncidentCard from '@/components/DisplayIncidentCard.vue'
import io from "socket.io-client";

export default {
  data() {
    return {
      employeesInShiftIn: [],
      employeesInShiftOut: [],
      vehiclesIn: [],
      vehiclestOut: [],
      incidents: [],
      shiftsAvailable: [],
      currentData: [],
      incidentIndex: 0
    }
  },
  created() {
    const socket = io(process.env.NODE_ENV === 'development' ? 'http://localhost/api/socket' : '/api/socket');

    socket.on("displayNewData", (items) => {
      if (items != null) {
        if (items.employeesInShiftIn != null) this.employeesInShiftIn = items.employeesInShiftIn;
        if (items.employeesInShiftOut != null) this.employeesInShiftOut = items.employeesInShiftOut;
        if (items.vehiclesIn != null) this.vehiclesIn = items.vehiclesIn;
        if (items.vehiclestOut != null) this.vehiclestOut = items.vehiclestOut;
        if (items.incidents != null) this.incidents = items.incidents;
        if (items.shiftsAvailable != null) this.shiftsAvailable = items.shiftsAvailable;

        if (this.incidents && this.incidents.length != 0) {
          this.incidentIndex = 0;
          this.currentData = this.incidents[0];
          console.log(this.currentData)
        }
      }
    });

    var test = this;

    setInterval(function () {
      try {
        if (test.incidents && test.incidents.length != 0) {
          if (test.incidentIndex > test.incidents.length -1) {
            test.incidentIndex = 0
          }

          test.currentData = test.incidents[test.incidentIndex];

          test.incidentIndex++;
        }
      } catch (error) {
        console.log(error);
      }
    }, 3000);
  },
  components: {
    //Carousel,
    // Slide,
    ///  Navigation,
    IncidentCard,
  },
}
</script>

<style>
*,
::after,
::before {
  box-sizing: border-box;
}

#wrapper {
  height: 100%;
  width: 100%;
  background: #efefef;
}

body {
  overflow-x: hidden;
}

.carousel__viewport,
.carousel__track {
  height: 100%
}

.yellow {
  background-color: #F9E79F !important;
}

.green {
  background-color: #ABEBC6 !important;
}
</style>