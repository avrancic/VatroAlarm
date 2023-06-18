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
  <div class="container-fluid">
    <div class="main-content">
      <carousel :key="slide" :transition="1500" :wrapAround="true">
        <slide v-for="slide in 2" :key="slide">
          <IncidentCard></IncidentCard>
        </slide>

        <template #addons>
          <navigation />
        </template>
      </carousel>
    </div>
  </div>

  <footer class="footer">
    <div class="container">
      test footer
    </div>
  </footer>
</template>

<script>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import IncidentCard from '@/components/DisplayIncidentCard.vue'

export default {
  name: 'App',
  components: {
    Carousel,
    Slide,
    Navigation,
    IncidentCard,
  },
}
</script>

<style>
html {
  position: relative;
  min-height: 100%;
}

body {
  margin-bottom: 60px;
  height: 100%;
}

.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60px;
  background-color: #999999;
}

body>.container-fluid {
  padding-top: 50px;
}

.navbar {
  margin-bottom: 0;
}

.footer {
  padding: 15px 0;
}

.main-content {
  background: #efefef;
  padding: 50px;
  height: calc(100vh - 110px);
}
</style>