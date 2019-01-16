<template>
  <div class="tabs">
    <TabLabel/>
    <TabContent/>
  </div>
</template>

<script>
import TabContent from "./TabContent.vue";
import TabLabel from "./TabLabel.vue";
import { mapState } from "vuex";

export default {
  name: "Tabs",
  data() {
    return {};
  },
  components: {
    TabContent,
    TabLabel
  }
};
</script>

<style scoped>
.tabs {
}
</style>