<template>
  <div class="tab__content">
    <Item v-for="item in itemsForActiveCategory" :key="item.itemId" :item="item"></Item>
  </div>
</template>

<script>
import Item from "./Item.vue";
import { mapGetters } from "vuex";

export default {
  name: "TabContent",
  components: {
    Item
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["itemsForActiveCategory"])
  }
};
</script>

<style scoped lang="scss">
.tab__content {
  clear: both;
  background: #eef4ee;
  padding: 5px;
}
</style>