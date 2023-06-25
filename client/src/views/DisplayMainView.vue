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
                    <h2 class="text-white mt-2">$<span data-plugin="counterup">92,847</span></h2>
                    <p class="text-white mb-0 text-truncate">Test</p>
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
                    <h2 class="text-white mt-2"><span data-plugin="counterup">56</span>k</h2>
                    <p class="text-white mb-0 text-truncate">Test</p>
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
                    <h2 class="text-white mt-2"><span data-plugin="counterup">2568</span></h2>
                    <p class="text-white mb-0 text-truncate">Test</p>
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
                    <h2 class="text-white mt-2"><span data-plugin="counterup">523</span></h2>
                    <p class="text-white mb-0 text-truncate">Test</p>
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
            <carousel class="h-100"  itemsToShow="1" :wrapAround="true" autoplay="20000"
>              <slide v-for="item in incidents" :key="item.id">
                <IncidentCard :data="item"></IncidentCard>
              </slide>

              <template #addons>
                <navigation />
              </template>
            </carousel>
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
													<tr>
														<td>Planning new project structure</td>
													</tr>
													<tr>
														<td>Planning new project structure</td>
													</tr>
													<tr>
														<td>Planning new project structure</td>
													</tr>
													<tr>
														<td>Planning new project structure</td>
													</tr>
													<tr>
														<td>Planning new project structure</td>
													</tr>
													<tr>
														<td>Planning new project structure</td>
													</tr>
													<tr>
														<td>Planning new project structure</td>
													</tr>
													<tr>
														<td>Planning new project structure</td>
													</tr>
													<tr>
														<td>Planning new project structure</td>
													</tr>
													<tr>
														<td>Planning new project structure</td>
													</tr>
													<tr>
														<td>Planning new project structure</td>
													</tr>
													<tr>
														<td>Planning new project structure</td>
													</tr>
													<tr>
														<td>Planning new project structure</td>
													</tr>
													<tr>
														<td>Planning new project structure</td>
													</tr>
													<tr>
														<td>Planning new project structure</td>
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
													<tr>
														<td>Planning new project structure</td>
													</tr>
													<tr>
														<td>Planning new project structure</td>
													</tr>
													<tr>
														<td>Planning new project structure</td>
													</tr>
													<tr>
														<td>Planning new project structure</td>
													</tr>
													<tr>
														<td>Planning new project structure</td>
													</tr>
													<tr>
														<td>Planning new project structure</td>
													</tr>
													<tr>
														<td>Planning new project structure</td>
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
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import IncidentCard from '@/components/DisplayIncidentCard.vue'
import io from "socket.io-client";

export default {
  data() {
    return {
      incidents: []
    }
  },
  created() {
    const socket = io(`/api/socket`);

    socket.on("displayNewData", (items) => {
      this.incidents = items;
      console.log(items);
    });
  },
  components: {
    Carousel,
    Slide,
    Navigation,
    IncidentCard,
  }
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

}

body {
  overflow-x: hidden;
  background: #efefef;
}

.carousel__viewport,
.carousel__track {
    height: 100%
}

</style>