// import categories_list from "@/data/categories.json";
import api from '@/api'
// import axios from "axios";
export default {
  name: 'ProductCategory',
  namespaced: true,
  state: {
    categories: [],
    test: null,
  },

  getters: {
    CATEGORY_STATE(state) {
      return state;
    },
  },

  mutations: {
    CATEGORY_LIST(state, payload) {
      state.categories = payload;
      console.log('mutatins is done', state.categories);
    }
  },

  actions: {
    // async GET_CATEGORY_LIST(context) {
    //   try {
    //     // const res = categories_list
    //     const res = await categories_list
    //     context.commit('CATEGORY_LIST', res);
    //     console.log(res);
    //     return res;
    //   } catch (error) {
    //     console.error(error);
    //   }
    // },
    async GET_CATEGORY_LIST() {
      return await api.Category.getCategoryList();
    },
    async GET_CATEGORY_SINGLE(context, payload) {
      return await api.Category.getCategorySingle(payload);
    },
    async EDIT_CATEGORY(context, payload) {
      return await api.Category.editCategory(payload)
    },
    async CREATE_CATEGORY(context, payload) {
      return await api.Category.createCategory(payload)
    }

  },

};