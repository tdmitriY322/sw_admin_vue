import axios from "axios";
export default {
  name: 'Test',
  namespaced: true,
  state: {
    test_data: {},
    products: [],
  },

  getters: {
    TEST_STATE(state) {
      return state;
    },
  },

  mutations: {
    SET_PRODUCTS_TO_STATE(state, payload) {
      // state.categories.unshift(payload)
      // this.$set(state, "categories", payload );
      state.test_data = payload;
      console.log('mutatins is done', state.test_data);
    }
  },

  actions: {
    GET_PRODUCTS_FROM_API: async (context, payload) => {
      return payload;
    },
    async GET_PRODUCTS_FROM_API_2({commit}) {
      return axios('https://jsonplaceholder.typicode.com/posts', {
        method: "POST",
        body: JSON.stringify({ // сюда данные которые хочешь отпраивтиь?
          title: 'foo',
          body: 'bar',
          userId: 1,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((products) => {
          commit('SET_PRODUCTS_TO_STATE', products.data);
          return products;
        })
        .catch((error) => {
          console.log(error)
          return error;
        })
      }
  }
};