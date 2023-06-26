<template>
    <ol-map @click="click" :loadTilesWhileAnimating="true" :loadTilesWhileInteracting="true">
        <ol-view :center="center" :rotation="rotation" :zoom="zoom" :projection="projection" />

        <ol-tile-layer>
            <ol-source-osm />
        </ol-tile-layer>

        <ol-vector-layer>
            <ol-source-vector>
                <ol-feature>
                    <ol-geom-point :coordinates="marker"></ol-geom-point>
                    <ol-style>
                        <ol-style-icon :src="markerIcon" :scale="0.6" :size="[50, 152]"></ol-style-icon>
                    </ol-style>
                </ol-feature>
            </ol-source-vector>
        </ol-vector-layer>
    </ol-map>
</template>

<script>
import { ref } from "vue";

import markerIcon from "@/assets/marker.png";
import MapDataService from "../services/AdminIncidentsMapDataService";

export default {
    props: ['centerCoordinates', 'markerCoordinates'],

    setup() {
        return {
            markerIcon: markerIcon,
        }
    },
    data() {
        return {
            center: this.centerCoordinates,
            marker: this.markerCoordinates,
            projection: ref('EPSG:4326'),
            zoom: ref(15),
            rotation: ref(0),
        };
    },
    computed() {
    },
    methods: {
        click(event) {
            if (Array.isArray(event.coordinate)) {
                this.marker = event.coordinate;
                this.outputData(event.coordinate);
            }
        },
        outputData([x, y]) {
            MapDataService.get([x, y])
                .then(response => {
                    this.$emit('PickedLocation', {
                        latitude: x,
                        longitude: y,
                        cityName: response.data.address.town,
                        streetName: response.data.address.road + ' ' + response.data.address.house_number
                    })
                })
                .catch(() => {
                    this.$emit('PickedLocation', {
                        latitude: x,
                        longitude: y,
                        cityName: "",
                        streetName: ""
                    })
                });
        }
    },
    watch: {
        centerCoordinates: function (newVal) {
                this.center = newVal;
        },
        markerCoordinates: function (newVal) {
            this.marker = newVal;
        }
    }
}
</script>