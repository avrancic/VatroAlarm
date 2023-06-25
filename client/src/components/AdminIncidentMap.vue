<template>
    <ol-map :loadTilesWhileAnimating="true" :loadTilesWhileInteracting="true">
        <ol-view :center="center" :rotation="rotation" :zoom="zoom" :projection="projection" />

        <ol-tile-layer>
            <ol-source-osm />
        </ol-tile-layer>

        <ol-vector-layer>
            <ol-source-vector ref="vectors">
                <ol-interaction-draw @drawstart="drawstart" @drawend="outputData" type="Point">
                </ol-interaction-draw>
            </ol-source-vector>

            <ol-style>
                <ol-style-icon :src="markerIcon" :scale="0.6" :size="[50, 152]"></ol-style-icon>
            </ol-style>
        </ol-vector-layer>
    </ol-map>
</template>

<script>
import { ref } from "vue";

import markerIcon from "@/assets/marker.png";
import MapDataService from "../services/AdminIncidentsMapDataService";

export default {
    setup() {
        const vectors = ref(null);
        return {
            vectors
        }
    },
    data() {
        return {
            center: ref([13.639553292389696, 45.0831547052052]),
            projection: ref('EPSG:4326'),
            zoom: ref(15),
            rotation: ref(0),
            markerIcon: markerIcon,
            drawedMarker: ref()
        };
    },
    methods: {
        drawstart(event) {
            this.vectors.source.removeFeature(this.drawedMarker);
            this.drawedMarker = event.feature;
        },
        outputData(event) {
            MapDataService.get(event.feature.getGeometry().getCoordinates())
                .then(response => {
                    this.$emit('PickedLocation', {
                        latitude: event.feature.getGeometry().getCoordinates()[0],
                        longitude: event.feature.getGeometry().getCoordinates()[1],
                        cityName: response.data.address.town,
                        streetName: response.data.address.road + ' ' + response.data.address.house_number
                    })
                })
                .catch(() => {
                    this.$emit('PickedLocation', {
                        latitude: event.feature.getGeometry().getCoordinates()[0],
                        longitude: event.feature.getGeometry().getCoordinates()[1],
                        cityName: "",
                        streetName: ""
                    })
                });
        }
    }
}
</script>