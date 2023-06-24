<template>
    <div class="card card-margin">
        <div class="card-header no-border">
            <h5 class="card-title">INCIDENT INFO</h5>
        </div>
        <div class="card-body pt-0">
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

<style>
.padding {
    padding: 3rem !important
}

.user-card-full {
    overflow: hidden;
}

.card {
    border-radius: 5px;
    -webkit-box-shadow: 0 1px 20px 0 rgba(69, 90, 100, 0.08);
    box-shadow: 0 1px 20px 0 rgba(69, 90, 100, 0.08);
    border: none;
    margin-bottom: 30px;
}

.m-r-0 {
    margin-right: 0px;
}

.m-l-0 {
    margin-left: 0px;
}

.user-card-full .user-profile {
    border-radius: 5px 0 0 5px;
}

.bg-c-lite-green {
    background: -webkit-gradient(linear, left top, right top, from(#f29263), to(#ee5a6f));
    background: linear-gradient(to right, #ee5a6f, #f29263);
}

.user-profile {
    padding: 20px 0;
}

.card-block {
    padding: 1.25rem;
}

.m-b-25 {
    margin-bottom: 25px;
}

.img-radius {
    border-radius: 5px;
}

h6 {
    font-size: 14px;
}

.card .card-block p {
    line-height: 25px;
}

@media only screen and (min-width: 1400px) {
    p {
        font-size: 14px;
    }
}

.card-block {
    padding: 1.25rem;
}

.b-b-default {
    border-bottom: 1px solid #e0e0e0;
}

.m-b-20 {
    margin-bottom: 20px;
}

.p-b-5 {
    padding-bottom: 5px !important;
}

.card .card-block p {
    line-height: 25px;
}

.m-b-10 {
    margin-bottom: 10px;
}

.text-muted {
    color: #919aa3 !important;
}

.b-b-default {
    border-bottom: 1px solid #e0e0e0;
}

.f-w-600 {
    font-weight: 600;
}

.m-b-20 {
    margin-bottom: 20px;
}

.m-t-40 {
    margin-top: 20px;
}

.p-b-5 {
    padding-bottom: 5px !important;
}

.m-b-10 {
    margin-bottom: 10px;
}

.m-t-40 {
    margin-top: 20px;
}

.user-card-full .social-link li {
    display: inline-block;
}

.user-card-full .social-link li a {
    font-size: 20px;
    margin: 0 10px 0 0;
    -webkit-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
}

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