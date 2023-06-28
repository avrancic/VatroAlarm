<template>
    <div class="card card-margin">
        <div class="card-header no-border">
            <h5 class="card-title">INCIDENTS MAP</h5>
        </div>
        <div class="card-body p-0">
            <IncidentMap :CenterCoordinates="centerCoordinates" :MarkerCoordinates="markerCoordinates"></IncidentMap>
        </div>
        <div class="row m-l-0 m-r-0 overlay" v-if="showInfo">
            <div class="card-block">
                <div><b>Location: </b> {{ (data.city ? data.city : '') + ', ' + (data.address ? data.address : '') }}</div>
                <div><b>Description: </b> {{ (data.description ? data.description : '') }}</div>
                <div><b>Type: </b> {{ (data.type ? data.type.name : '') }}</div>
                <div><b>Vehicles: </b> {{ vehicles() }}</div>
                <div><b>Employees: </b> {{ employees() }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import IncidentMap from './DisplayIncidentMap.vue'

export default {
    props: ['data'],
    components: {
        IncidentMap
    },
    data() {
        return {
            centerCoordinates: [13.639553292389696, 45.0831547052052],
            markerCoordinates: [0, 0],
            showInfo: false
        };
    },
    watch: {
        data(newData) {
            if (Object.keys(newData).includes("latitude") && Object.keys(newData).includes("longitude")) {
                this.centerCoordinates = [newData.latitude, newData.longitude];
                this.markerCoordinates = [newData.latitude, newData.longitude];
                this.showInfo = true;
            } else {
                this.centerCoordinates = [13.639553292389696, 45.0831547052052];
                this.markerCoordinates = [0, 0];
                this.showInfo = false;
            }
        }
    },
    methods: {
        employees: function () {
            if (!this.data) return;
            if (!this.data.shifts) return;

            return this.data.shifts.map(a => a.employees.map(a => a.name + ' ' + a.surname + ' (' + a.type.name + ')').join(', ')).join(', ')
        },
        vehicles: function () {
            if (!this.data) return;
            if (!this.data.vehicles) return;

            return this.data.vehicles.map(a => a.plate + ' (' + a.type.name + ')').join(', ')
        }
    },
} 
</script>

<style scoped>
.card {
    width: 100%;
    height: 100%;
}

.overlay {
    position: absolute;
    left: 40px;
    bottom: 20px;
    background: white;
    padding: 20px;
    border-radius: 30px;
    box-shadow: 0 1px 3px 0 rgba(50, 50, 93, 0.1), 0 1px 2px 0 rgba(50, 50, 93, 0.06);
}
</style>