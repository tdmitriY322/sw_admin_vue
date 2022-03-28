// import mapPoint from "@/data/points.json";
import api from '@/api'
export default {
  name: 'MapPoints',
  namespaced: true,
  state: {
    map_points: []
  },

  getters: {
    MAP_STATE(state) {
      return state;
    },
  },

  mutations: {
    MAP_LIST(state, payload) {
      state.map_points = payload;
    }
  },

  actions: {
    // async GET_POINTS_LIST(context) {
    //   try {
    //     const res = mapPoint;
    //     context.commit('MAP_LIST', res);
    //     return res;
    //   } catch (error) {
    //     console.error(error);
    //   }
    // },
    // async GET_MAP_SINGLE(context, payload) {
    //   try {
    //     for (let i = 0; i < mapPoint.length; i++) {
    //       if(mapPoint[i].id == payload) {
    //           return mapPoint[i];
    //       }
    //     }
    //     return [];
    //   } catch (error) {
    //     console.error(error);
    //   }
    // },
    async GET_POINTS_LIST(context) {
      const response = await api.Category.getCategoryList();
      context.commit('MAP_LIST', response); // Рабоает
      return response;
    },
    async GET_MAP_SINGLE(context, payload) {
      const response = await api.Category.getCategoryList();
      try {
        for (let i = 0; i < response.length; i++) {
          if (response[i].id == payload) {
            return response[i];
          }
        }
        return [];
      } catch (error) {
        console.error(error);
      }
    },
  },

};