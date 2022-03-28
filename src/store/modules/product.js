// import productData from "@/data/products.json";
import api from '@/api'
export default {
  name: 'Product',
  namespaced: true,
  state: {
    goods: [],
    users: [],
    newUsers: [],
    product: [],
  },

  getters: {
    STATE(state) {
      return state;
    },
  },

  mutations: {
    CREATE_PRODUCT(state, newProd) {
      state.goods.unshift(newProd); //добавить в начало массива 
      console.log('come to mutation', newProd);
    },
    CHECK_USER_DATA(state, data) {
      state.users.unshift(data); //добавить в начало массива 
      console.log('come to users data', data);
    },
    ADD_NEW_USER_DATA(state, data) {
      state.newUsers.unshift(data);
      console.log('come to users data', data);
    },
    PRODUCT_LIST(state, payload) {
      state.product = payload
    }
  },

  actions: {
    // async GET_PRODUCT_LIST(context) {
    //   try {
    //     const response = productData;
    //     context.commit('PRODUCT_LIST', res);
    //     return res;
    //   } catch (error) {
    //     console.error(error);
    //   }
    // },
    // async GET_PRODUCT_SINGE(context, payload) {
    //   try {
    //     for (let i = 0; i < productData.length; i++) {
    //       if(productData[i].id == payload) {
    //           return productData[i];
    //       }
    //     }
    //     return [];
    //   } catch (error) {
    //     console.error(error);
    //   }
    // },
    async GET_PRODUCT_LIST(context) {
      const response = await api.Category.getProductList();
      context.commit('PRODUCT_LIST', response); // Рабоает
      return response;
    },
    async GET_PRODUCT_SINGE() {
      const response = await api.Category.getProductList();
      return response
      // try {
      //   for (let i = 0; i < response.length; i++) {
      //     if (response[i].id == payload) {
      //       return response[i];
      //     }
      //   }
      //   return [];
      // } catch (error) {
      //   console.error(error);
      // }
    },
    async DELETE_PRODUCT_LIST() {
      return await api.Category.deleteProductList();
    },
    CREATE_PRODUCT: async (context, payload) => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      return payload;
    },
    CHECK_SIGN_IN: async (context, payload) => {
      await new Promise(resolve => setTimeout(resolve, 5000));
      return payload;

      
    },

  },

};