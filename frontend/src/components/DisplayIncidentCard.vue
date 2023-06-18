<template>
    <div class="card card-margin">
        <div class="card-header no-border">
            <h5 class="card-title">INCIDENT INFO</h5>
        </div>
        <div class="card-body pt-0">
            <IncidentMap></IncidentMap>
        </div>
    </div>
</template>

<script>
import IncidentMap from './DisplayIncidentMap.vue'

export default {
    components: {
        IncidentMap
    }
} 
</script>

<style>
.card {
    width: 100%;
    height: 100%;
    margin: 200px 100px;

    max-width: 1700px;
}


.carousel {
    height: 100%
}

.carousel__viewport,
.carousel__track {
    height: 100%
}
</style>