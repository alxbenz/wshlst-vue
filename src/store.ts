import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    activeCategory: 'asdfasdf123',
    categories: [
      {
        categoryId: 'asdfasdf123',
        categoryLabel: 'category 1'
      },
      {
        categoryId: 'asdfasdf234',
        categoryLabel: 'category 2'
      }
    ],
    items: [
      {
        itemId: '1234',
        itemLink: 'SDFASDF',
        itemLabel: 'ASD asdfAsf asdf asdf af',
        itemDescription:
          'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim, libero?',
        itemPrice: 123123,
        itemImage: 'https://picsum.photos/900/600/?random',
        categoryId: 'asdfasdf123',
        isOpen: true,
        isReserved: false,
        reservedBy: ''
      },
      {
        itemId: '2345',
        itemLink: 'SDFASDF',
        itemLabel: 'ASD asdfAsf asdf af',
        itemPrice: 123123,
        itemImage: 'https://picsum.photos/900/600/?random',
        categoryId: 'asdfasdf123',
        isOpen: false,
        isReserved: false,
        reservedBy: ''
      },
      {
        itemId: '4567',
        itemLink: 'SDFASDF',
        itemLabel: 'ASD asdfAsf asdf asdf ',
        itemPrice: 123123,
        itemImage: 'https://picsum.photos/900/600/?random',
        categoryId: 'asdfasdf234',
        isOpen: false,
        isReserved: false,
        reservedBy: ''
      },
      {
        itemId: '4567',
        itemLink: 'SDFASDF',
        itemLabel: 'ASD asdfAsf asdf asdf ',
        itemPrice: 123123,
        itemImage: 'https://picsum.photos/900/600/?random',
        categoryId: 'asdfasdf123',
        isOpen: false,
        isReserved: false,
        reservedBy: ''
      }
    ]
  },
  getters: {
    itemsForActiveCategory: state => {
      return state.items.filter(
        item => item.categoryId === state.activeCategory
      );
    }
  },
  mutations: {
    ADD_ITEM: (state, itemObject) => {
      state.items.push(itemObject);
    },
    REMOVE_ITEM: (state, itemId) => {
      state.items.forEach((item, index) => {
        if (item.itemId === itemId) {
          state.items.splice(index, 1);
        }
      });
    },
    ADD_CATEGORY: (state, categoryObject) => {
      state.categories.push(categoryObject);
    },
    SET_ACTIVE_CATEGORY: (state, categoryId) => {
      state.activeCategory = categoryId;
    },
    TOGGLE_ITEM_VISIBILITY: (state, itemId) => {
      state.items.forEach(item => {
        if (item.itemId === itemId) {
          item.isOpen = !item.isOpen;
        }
      });
    },
    TOGGLE_ITEM_RESERVATION: (state, itemId) => {
      state.items.forEach(item => {
        if (item.itemId === itemId) {
          item.isReserved = !item.isReserved;
        }
      });
    },
    RESET_ITEM_RESERVATION: (state, itemId) => {
      state.items.forEach(item => {
        if (item.itemId === itemId) {
          item.isReserved = false;
          item.reservedBy = '';
        }
      });
    },
    SET_ITEM_RESERVATION_NAME: (state, { itemId, reservedBy }) => {
      state.items.forEach(item => {
        if (item.itemId === itemId) {
          item.reservedBy = reservedBy;
        }
      });
    }
  },
  actions: {
    setActiveCategoryAction: (context, categoryId) => {
      context.commit('SET_ACTIVE_CATEGORY', categoryId);
    },
    toggleItemVisibilityAction: (context, itemId) => {
      context.commit('TOGGLE_ITEM_VISIBILITY', itemId);
    },
    toggleItemReservationAction: (context, itemId) => {
      context.commit('TOGGLE_ITEM_RESERVATION', itemId);
    },
    resetItemReservationAction: (context, itemId) => {
      context.commit('RESET_ITEM_RESERVATION', itemId);
    },
    setItemReservationNameAction: (context, { itemId, reservedBy }) => {
      context.commit('SET_ITEM_RESERVATION_NAME', { itemId, reservedBy });
    },
    removeItemAction: (context, itemId) => {
      context.commit('REMOVE_ITEM', itemId);
    },
    addItemAction: (context, itemObject) => {
      context.commit('ADD_ITEM', itemObject);
    }
  }
});
