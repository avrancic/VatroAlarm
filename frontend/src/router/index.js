import Vue from 'vue'
import Router from 'vue-router'
import VehiclesList from '@/components/VehiclesList'
import Vehicles from '@/components/Vehicles'
import AddVehicle from '@/components/AddVehicle'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      alias: "/vehicles",
      name: "vehicles",
      component: VehiclesList
     },
     {
      path: "/vehicles/:id",
      name: "vehicle-details",
      component: Vehicles
               },
     {
      path: "/add",
      name: "add",
      component: AddVehicle
     }
  ]
})