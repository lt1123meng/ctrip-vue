<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'app'
}
</script>
<style>
  #app{
    height: 100%;
  }
  /*slider*/
  .slider .slider-arrows-wrap{
    display: none;
  }
  .slider .slider-dots-wrap .slider-dot {
    border: 0 !important;
    background-color: #fff;
  }
  .slider .slider-dots-wrap .slider-dot:hover {
    width: 10px;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
</style>
