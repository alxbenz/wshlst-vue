import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';

Vue.use(Vuex);

import { postData } from './helper';
import { ReservePayload, Item, RootState, Category } from '.';

const updateItem = ({
  itemId,
  reservedBy,
  isReserved = true,
  isOpen = false
}: ReservePayload) =>
  postData(`http://localhost:4000/item`, {
    itemId,
    isReserved,
    reservedBy,
    isOpen
  });

const getItemsAPI = () => fetch(`http://localhost:4000/items`);
const getCategoriesAPI = () => fetch(`http://localhost:4000/categories`);

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
  resetItemReservationAction: (context: any, itemId: string) => {
    context.commit('RESET_ITEM_RESERVATION', itemId);
  },
  setItemReservationNameAction: (
    context: any,
    { itemId, reservedBy }: ReservePayload
  ) => {
    updateItem({ itemId, reservedBy }).then(() => {
      actions.getItemsAction(context);
      actions.getCategoriesAction(context);
    });
  },
  removeItemAction: (context: any, itemId: string) => {
    context.commit('REMOVE_ITEM', itemId);
  },
  addItemAction: (context: any, itemObject: Item) => {
    context.commit('ADD_ITEM', itemObject);
  },
  getItemsAction: (context: any) => {
    getItemsAPI()
      .then(response => response.json())
      .then(items => context.commit('UPDATE_ITEMS', items));
  },
  getCategoriesAction: (context: any) => {
    getCategoriesAPI()
      .then(response => response.json())
      .then(categories => context.commit('UPDATE_CATEGORIES', categories));
  }
};

const store: StoreOptions<RootState> = {
  state: initialState,
  getters,
  mutations,
  actions
};

export default new Vuex.Store<RootState>(store);
