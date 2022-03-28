import Vue from 'vue';
import Vuex from 'vuex';
import Product from './modules/Product';
import Map from './modules/Map';
import ProductCategory from './modules/ProductCategory';
import Test from './modules/Test';
// vuex модули 
Vue.use(Vuex);


export default new Vuex.Store({
    modules: {
        Product,
        ProductCategory,
        Map,
        Test,
    },
});