import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { RootState, Item, Category, ReservePayload } from './index';
import {
  queryItemsApollo,
  queryCategoriesApollo,
  reserveItemApollo
} from './gql';

Vue.use(Vuex);

const initialState = {
  activeCategory: '',
  items: [],
  categories: []
};

const getters = {
  itemsForActiveCategory: (state: RootState): Item[] => {
    return state.items.filter(item => item.categoryId === state.activeCategory);
  }
};

const mutations = {
  UPDATE_ACTIVE_CATEGORY: (state: RootState) => {
    state.activeCategory = state.categories[0].categoryId;
  },
  UPDATE_ITEMS: (state: RootState, items: Item[]) => {
    state.items = items;
  },
  UPDATE_CATEGORIES: (state: RootState, categories: Category[]) => {
    state.categories = categories;
  },
  ADD_ITEM: (state: RootState, itemObject: Item) => {
    state.items.push(itemObject);
  },
  REMOVE_ITEM: (state: RootState, itemId: string) => {
    state.items.forEach((item, index) => {
      if (item.itemId === itemId) {
        state.items.splice(index, 1);
      }
    });
  },
  ADD_CATEGORY: (state: RootState, categoryObject: Category) => {
    state.categories.push(categoryObject);
  },
  SET_ACTIVE_CATEGORY: (state: RootState, categoryId: string) => {
    state.activeCategory = categoryId;
  },
  TOGGLE_ITEM_VISIBILITY: (state: RootState, itemId: string) => {
    state.items.forEach(item => {
      if (item.itemId === itemId) {
        item.isOpen = !item.isOpen;
      }
    });
  },
  TOGGLE_ITEM_RESERVATION: (state: RootState, itemId: string) => {
    state.items.forEach(item => {
      if (item.itemId === itemId) {
        item.isReserved = !item.isReserved;
      }
    });
  },
  RESET_ITEM_RESERVATION: (state: RootState, itemId: string) => {
    state.items.forEach(item => {
      if (item.itemId === itemId) {
        item.isReserved = false;
        item.reservedBy = '';
      }
    });
  }
};

const actions = {
  setActiveCategoryAction: (context: any, categoryId: string) => {
    context.commit('SET_ACTIVE_CATEGORY', categoryId);
  },
  toggleItemVisibilityAction: (context: any, itemId: string) => {
    context.commit('TOGGLE_ITEM_VISIBILITY', itemId);
  },
  toggleItemReservationAction: (context: any, itemId: string) => {
    //context.commit('TOGGLE_ITEM_RESERVATION', itemId);
  },
  resetItemReservationAction: (context: any, itemId: string) => {
    context.commit('RESET_ITEM_RESERVATION', itemId);
  },
  setItemReservationNameAction: (
    context: any,
    { itemId, reservedBy }: ReservePayload
  ) => {
    reserveItemApollo(itemId, reservedBy).then(() => {
      actions.getItemsAction(context);
    });
  },
  removeItemAction: (context: any, itemId: string) => {
    context.commit('REMOVE_ITEM', itemId);
  },
  addItemAction: (context: any, itemObject: Item) => {
    context.commit('ADD_ITEM', itemObject);
  },
  getItemsAction: (context: any) => {
    queryItemsApollo().then(data => {
      context.commit('UPDATE_ITEMS', data.items);
    });
  },
  getCategoriesAction: (context: any) => {
    queryCategoriesApollo().then(data => {
      context.commit('UPDATE_CATEGORIES', data.categories);
      context.commit('UPDATE_ACTIVE_CATEGORY');
    });
  }
};

const store: StoreOptions<RootState> = {
  state: initialState,
  getters,
  mutations,
  actions
};

export default new Vuex.Store<RootState>(store);
