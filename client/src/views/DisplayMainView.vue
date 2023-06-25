<template>
  <nav class="navbar navbar-inverse navbar-fixed-top">
    <div class="container">
      <div class="navbar-header">
        <a class="navbar-brand" href="#">VatroAlarm</a>
      </div>
      <div id="navbar" class="collapse navbar-collapse">
        <ul class="nav navbar-nav">
          <li class="active"><a href="#">Home</a></li>
        </ul>
      </div>
    </div>
  </nav>

  <div class="container-fluid p-0">
    <div class="main-content">
      <carousel :transition="1500" :wrapAround="true">
          <slide v-for="item in incidents" :key="item.id">
          <IncidentCard :data="item"></IncidentCard>
        </slide>

        <template #addons>
          <navigation />
        </template>
      </carousel>
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
    const socket = io(`http://localhost/api/socket`);

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

<style scoped>
html {
  position: relative;
  min-height: 100%;
}

body {
  margin-bottom: 60px;
  height: 100%;
}


body>.container-fluid {
  padding-top: 50px;
}

.navbar {
  margin-bottom: 0;
}


.main-content {
  background: #efefef;
  padding: 50px;
  height: calc(100vh - 46px);
}


.container-fluid{
overflow: hidden;
}


</style>