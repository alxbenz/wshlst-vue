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
        itemPrice: 123123,
        categoryId: 'asdfasdf123',
        isOpen: true,
        isReserved: false
      },
      {
        itemId: '2345',
        itemLink: 'SDFASDF',
        itemLabel: 'ASD asdfAsf asdf af',
        itemPrice: 123123,
        categoryId: 'asdfasdf123',
        isOpen: false,
        isReserved: false
      },
      {
        itemId: '4567',
        itemLink: 'SDFASDF',
        itemLabel: 'ASD asdfAsf asdf asdf ',
        itemPrice: 123123,
        categoryId: 'asdfasdf234',
        isOpen: false,
        isReserved: false
      },
      {
        itemId: '4567',
        itemLink: 'SDFASDF',
        itemLabel: 'ASD asdfAsf asdf asdf ',
        itemPrice: 123123,
        categoryId: 'asdfasdf123',
        isOpen: false,
        isReserved: false
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
    }
  }
});
