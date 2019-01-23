<template>
  <div class="tabs">
    <TabLabel/>
    <TabContent/>
  </div>
</template>

<script>
import TabContent from "./TabContent.vue";
import TabLabel from "./TabLabel.vue";
import { mapState, mapActions } from "vuex";

export default {
  name: "Tabs",
  data() {
    return {};
  },
  components: {
    TabContent,
    TabLabel
  },
  methods: {
    ...mapActions(["getItemsAction", "getCategoriesAction"])
  },
  beforeMount() {
    this.getCategoriesAction();
    this.getItemsAction();
  }
};
</script>

<style scoped>
.tabs {
}
</style>