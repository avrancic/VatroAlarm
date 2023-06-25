<template>
    <div class="card card-margin">
        <div class="card-header no-border">
            <h5 class="card-title">ACTIVE INCIDENT INFO</h5>
        </div>
        <div class="card-body p-0">
            <IncidentMap :data="data"></IncidentMap>
        </div>
        <div class="row m-l-0 m-r-0 overlay">
            <div class="card-block">
                <p><b>Location: </b> {{ data.city ? data.city : '' + ', ' + data.address ? data.address : '' }}</p>
                <p><b>Description: </b> {{ data.description ? data.description : '' }}</p>
                <p><b>Type: </b> {{ data.type ? data.type.name : '' }}</p>
                <p><b>Vehicles: </b> {{ vehicles() }}</p>
                <p><b>Employees: </b> {{ employees() }}</p>
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
    methods: {
        employees: function () {
            if (!this.data) return;
            if (!this.data.shifts) return;

            return this.data.shifts.map(a => a.employees.map(a => a.name + a.surname + ' (' + a.type.name + ')').join(', ')).join(', ')
        },
        vehicles: function () {
            if (!this.data) return;
            if (!this.data.vehicles) return;

            return this.data.vehicles.map(a => a.plate + ' (' + a.type.name +')').join(', ')
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
}
</style>