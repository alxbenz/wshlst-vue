<template>
  <div id="app">
    <h1>wshlst</h1>
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class App extends Vue {}
</script>


<style lang="scss">
#app {
  font-family: "Roboto", sans-serif;
  max-width: 1000px;
  margin: 0 auto;
}
h1 {
  text-align: center;
}
</style>
