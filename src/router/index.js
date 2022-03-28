import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    meta: {
      layout: 'main'
    },
    component: () => import('@/views/Dashboard')
  },
  {
    path: '/product',
    name: 'Product',
    meta: {
      layout: 'main'
    },
    component: () => import('@/views/product/Product')
  },
  {
    path: '/product/create',
    name: 'ProductCreate',
    meta: {
      layout: 'main'
    },
    component: () => import('@/views/product/ProductCreate')
  },
  {
    path: '/product/edit/:id',
    name: 'ProductEdit',
    meta: {
      layout: 'main'
    },
    component: () => import('@/views/product/ProductCreate')
  },
  {
    path: '/moreinfo',
    name: 'MoreInfo',
    meta: {
      layout: 'main'
    },
    component: () => import('@/views/InfoItems')
  },
  {
    path: '/signIn',
    name: 'SignInPage',
    meta: {
      layout: 'authorization'
    },
    component: () => import('@/views/SignPage')
  },
  {
    path: '/register',
    name: 'RegisterPage',
    meta: {
      layout: 'authorization'
    },
    component: () => import('@/views/RegisterPage')
  },
  {
    path: '/calendar',
    name: 'Calendar',
    meta: {
      layout: 'main'
    },
    component: () => import('@/components/Calendar')
  },
  {
    path: '/settings',
    name: 'Settings',
    meta: {
      layout: 'main'
    },
    component: () => import('@/views/Settings')
  },
  {
    path: '/user/profile',
    name: 'UserProfile',
    meta: {
      layout: 'main'
    },
    component: () => import('@/views/user/UserProfile')
  },
  {
    path: '/user/changepassword',
    name: 'ChangePassword',
    meta: {
      layout: 'main'
    },
    component: () => import('@/views/user/UserChangePassword')
  },
  {
    path: '/user/settings',
    name: 'UserSettings',
    meta: {
      layout: 'main'
    },
    component: () => import('@/views/user/UserSettings')
  },
  {
    path: '/product/category',
    name: 'ProductCategory',
    meta: {
      layout: 'main'
    },
    component: () => import('@/views/product/ProductCategory')
  },
  {
    path: '/category/edit/:id',
    name: 'CategoryEdit',
    meta: {
      layout: 'main'
    },
    component: () => import('@/views/product/CategoryEdit')
  },
  {
    path: '/category/creat',
    name: 'CategoryCreate',
    meta: {
      layout: 'main'
    },
    component: () => import('@/views/product/CategoryEdit')
  },

  {
    path: '/map/edit/:id',
    name: 'MapEdit',
    meta: {
      layout: 'main'
    },
    component: () => import('@/views/map/mapEdit')
  },
  {
    path: '/map/edit',
    name: 'MapCreate',
    meta: {
      layout: 'main'
    },
    component: () => import('@/views/map/mapEdit')
  },
  {
    path: '/map/test',
    name: 'MapTest',
    meta: {
      layout: 'main'
    },
    component: () => import('@/views/map/testMap')
  },
  {
    path: '/map/test/:id',
    name: 'Map',
    meta: {
      layout: 'main'
    },
    component: () => import('@/views/map/testMap')
  },
  {
    path: '/map',
    name: 'MapList',
    meta: {
      layout: 'main'
    },
    component: () => import('@/views/map/mapList')
  },

];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router