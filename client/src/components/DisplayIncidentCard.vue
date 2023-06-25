<template>
    <div class="card card-margin">
        <div class="card-header no-border">
            <h5 class="card-title">INCIDENT INFO</h5>
        </div>
        <div class="card-body p-0">
            <IncidentMap :latitude="data.latitude" :longitude="data.longitude"></IncidentMap>
        </div>
        <div class="row m-l-0 m-r-0">
                <div class="card-block">
                    <h6 class="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
                    <div class="d-flex bd-highlight">
                        <div class="p-2 flex-fill bd-highlight">
                            <p class="m-b-10 f-w-600">Date</p>
                            <h6 class="text-muted f-w-400">{{ data.created_at }}</h6>
                        </div>
                        <div class="p-2 flex-fill bd-highlight">
                            <p class="m-b-10 f-w-600">Description</p>
                            <h6 class="text-muted f-w-400">{{ data.description }}</h6>
                        </div>
                        <div class="p-2 flex-fill bd-highlight">
                            <p class="m-b-10 f-w-600">Location</p>
                            <h6 class="text-muted f-w-400">{{ data.city + ', ' + data.address }}</h6>
                        </div>
                        <div class="p-2 flex-fill bd-highlight">
                            <p class="m-b-10 f-w-600">Type</p>
                            <h6 class="text-muted f-w-400">{{ data.address }}</h6>
                        </div>
                    </div>
                    <h6 class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Projects</h6>
                    <div class="d-flex bd-highlight">
                        <div class="p-2 flex-fill bd-highlight">
                            <p class="m-b-10 f-w-600">Vehicles</p>
                            <h6 class="text-muted f-w-400">{{ data.Vehicles }}</h6>
                        </div>
                        <div class="p-2 flex-fill bd-highlight">
                            <p class="m-b-10 f-w-600">Employees</p>
                            <h6 class="text-muted f-w-400">{{ data.Employees }}</h6>
                        </div>
                    </div>
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
    }
} 
</script>

<style scoped>
.card {
    width: 100%;
    height: 100%;
}
</style>