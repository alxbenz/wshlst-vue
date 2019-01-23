<template>
  <div class="item" :class="{'is-reserved': item.isReserved}">
    <div v-on:click="toggleItemVisibility(item.itemId)">
      <div class="item__label">{{item.itemLabel}}</div>
      <div class="item__price">{{formatValueToCurrency(item.itemPrice)}}</div>
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
      <div class="item__left">
        <div class="item__image">
          <img :src="item.itemImage" :alt="item.itemLabel">
        </div>
      </div>
      <div class="item__right">
        <div class="item__link">
          <a :href="item.itemLink">Hier bestellen.</a>
        </div>
        <div class="item__description">{{item.itemDescription}}</div>
        <div class="item__isReserved" v-if="item.isReserved">reserviert von {{item.reservedBy}}</div>
        <input
          v-if="!item.isReserved"
          type="text"
          v-model="reservedBy"
          placeholder="reserviert von ..."
        >
        <button
          class="item__reserveBtn"
          v-if="!item.isReserved"
          v-on:click="toggleItemReservation(item.itemId)"
        >reservieren</button>
      </div>
      <div class="admin" v-if="$route.params.user === 'admin'">
        <i class="fas fa-trash fa-2x" title="Eintrag löschen" @click="removeItem(item.itemId)"/>
        <br>
        <br>
        <i
          class="fas fa-user-slash fa-2x"
          title="Reservierung löschen"
          @click="resetItemReservation(item.itemId)"
        />
      </div>
    </div>
    <!-- </transition> -->
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
import { hlpr_formatValueToCurrency } from "../../node_modules/hlpr/hlpr";

export default {
  name: "Item",
  props: { item: { type: Object, required: true } },
  data() {
    return {
      reservedBy: ""
    };
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
      "resetItemReservationAction",
      "toggleItemReservationAction",
      "setItemReservationNameAction",
      "removeItemAction"
    ]),
    toggleItemVisibility(itemId) {
      this.toggleItemVisibilityAction(itemId);
    },
    toggleItemReservation(itemId) {
      this.setItemReservationNameAction({
        itemId,
        reservedBy: this.reservedBy
      });
    },
    resetItemReservation(itemId) {
      if (confirm("Reservierung zurücksetzen?")) {
        this.resetItemReservationAction(itemId);
      }
    },
    formatValueToCurrency(value) {
      return hlpr_formatValueToCurrency(value);
    },
    removeItem(itemId) {
      if (confirm("Wirklich löschen?")) {
        this.removeItemAction(itemId);
      }
    }
  }
};
</script>

<style scoped lang="scss">
.item {
  background: #fff;
  margin: 10px 5px;
  padding: 20px;
  position: relative;

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

  &__image {
    img {
      display: block;
      max-width: 400px;
      width: 100%;
      height: 100%;
    }
  }

  &__description,
  &__isReserved,
  &__reserveBtn {
    margin-top: 10px;
  }

  &__left {
    float: left;
    margin-right: 20px;
  }

  &__right {
    float: left;
  }

  .admin {
    position: absolute;
    background: #efefef;
    left: 0;
    padding: 10px;
    text-align: center;
  }

  &__icons {
    i {
      margin: -5px 10px 5px;
    }
  }

  input {
    width: 200px;
    padding: 5px;
    margin-right: 10px;
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