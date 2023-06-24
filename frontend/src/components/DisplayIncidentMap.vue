<template>
    <ol-map :loadTilesWhileAnimating="true" :loadTilesWhileInteracting="true" style="height: 100%;">
        <ol-view :center="center" :rotation="rotation" :zoom="zoom" :projection="projection" />
        <ol-tile-layer>
            <ol-source-osm />
        </ol-tile-layer>
        <ol-vector-layer>
            <ol-source-vector>
                <ol-feature>
                    <ol-geom-point :coordinates="center"></ol-geom-point>
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

export default {
    props: ['latitude', 'longitude'],

    data() {
        return {
            center: ref([this.latitude, this.longitude]),
            projection: ref('EPSG:4326'),
            zoom: ref(15),
            rotation: ref(0),
            markerIcon: markerIcon,
            drawedMarker: ref()
        };
    },
}
</script>