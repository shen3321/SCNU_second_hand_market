import { createRouter, createWebHistory } from 'vue-router'
//import Home from '../views/HomeView.vue'
import Login from '../views/Login.vue'
//import About from '../views/AboutView.vue'
import Register from '../views/Register.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/Register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/UploadProduct',
    name: 'UploadProduct',
    component: () => import('../views/UploadProduct.vue')
  },
  {
    path: '/MainPage',
    name: 'MainPage',
    component: () => import('../views/MainPage.vue')
  },
  {
    path: '/ProductDetail',
    name: 'ProductDetail',
    component: () => import('../views/ProductDetail.vue')
  },
  {
    path: '/ConfirmProduct',
    name: 'ConfirmProduct',
    component: () => import('../views/ConfirmProduct.vue')
  },
  {
    path: '/EditProduct',
    name: 'EditProduct',
    component:() => import('../views/EditProduct.vue')
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router