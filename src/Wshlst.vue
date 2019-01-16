<template>
  <div id="wshlst">
    <h1>whslst</h1>
    <Tabs/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Tabs from "./components/Tabs.vue";

@Component({
  components: {
    Tabs
  }
})
export default class Wshlst extends Vue {}
</script>

<style>
@import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css");
</style>
<style>
@import "https://use.fontawesome.com/releases/v5.6.3/css/all.css";
</style>
<style>
@import url("https://fonts.googleapis.com/css?family=Roboto");
</style>
<style lang="scss">
#wshlst {
  font-family: "Roboto", sans-serif;
  max-width: 1000px;
  margin: 0 auto;

  h1 {
    text-align: center;
  }
}
</style>

 