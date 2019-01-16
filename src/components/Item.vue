<template>
  <div class="item" :class="{'is-reserved': item.isReserved}">
    <div v-on:click="toggleItemVisibility(item.itemId)">
      <div class="item__label">{{item.itemLabel}}</div>
      <div class="item__price">{{item.itemPrice}}</div>
      <div class="item__icons">
        <i class="far fa-times-circle fa-lg" v-if="item.isReserved"></i>
        <i v-bind:class="iconClasses"></i>
      </div>
    </div>
    <!-- <transition
      name="custom-transition"
      enter-active-class="animated fadeInUp"
      leave-active-class="animated fadeOutDown"
    >-->
    <div v-if="item.isOpen">
      <div class="item__image">
        <img :src="item.itemImage" :alt="item.itemLabel">
      </div>
      <div class="item__link">{{item.itemLink}}</div>
      <div class="item__isReserved" v-if="item.isReserved">ist reserviert</div>
      <button v-if="!item.isReserved" v-on:click="toggleItemReservation(item.itemId)">reservieren</button>
    </div>
    <!-- </transition> -->
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";

export default {
  name: "Item",
  props: { item: { type: Object, required: true } },
  data() {
    return {};
  },
  computed: {
    iconClasses() {
      return [
        "fa fa-lg",
        {
          "fa-plus": !this.item.isOpen,
          "fa-minus": this.item.isOpen
        }
      ];
    }
  },
  methods: {
    ...mapActions([
      "toggleItemVisibilityAction",
      "toggleItemReservationAction"
    ]),
    toggleItemVisibility(itemId) {
      this.toggleItemVisibilityAction(itemId);
    },
    toggleItemReservation(itemId) {
      this.toggleItemReservationAction(itemId);
    }
  }
};
</script>

<style scoped lang="scss">
.item {
  background: #fff;
  margin: 10px 5px;
  padding: 20px;

  &.is-reserved {
    background: #ffefef;
  }

  &__label {
    width: calc(60% - 40px);
    float: left;
  }

  &__price {
    width: calc(40% - 65px);
    padding-left: 5px;
    float: left;
    text-align: right;
  }

  &__icons {
    float: left;
    width: 80px;
    margin-left: 20px;
    text-align: right;
  }

  i {
    margin: -5px 10px 5px;
  }

  & > div {
    cursor: pointer;
    padding: 5px 0;

    &:after {
      content: "";
      display: table;
      clear: both;
    }

    & + div {
      clear: both;
      margin-top: 10px;
      padding-top: 10px;
      border-top: 1px solid #efefef;
    }
  }
}
</style>