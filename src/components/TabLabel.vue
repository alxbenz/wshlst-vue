<template>
  <div class="tab__labels">
    <div
      class="tab__label"
      :class="{'is-active': category.categoryId === activeCategory}"
      v-for="(category) in categories"
      :key="category.categoryId"
      v-on:click="setActiveCategoryTo(category.categoryId)"
    >{{category.categoryLabel}}</div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "TabLabel",
  data() {
    return {};
  },
  computed: {
    ...mapState(["categories", "activeCategory"])
  },
  methods: {
    ...mapActions(["setActiveCategoryAction"]),
    setActiveCategoryTo(categoryId) {
      this.setActiveCategoryAction(categoryId);
    }
  }
};
</script>

<style scoped lang="scss">
.tab__labels {
  .tab__label {
    cursor: pointer;
    float: left;
    padding: 10px 20px;
    background: #ccc;

    margin-right: 5px;

    &.is-active {
      background: #eef4ee;
    }
  }

  clear: both;
}
</style>